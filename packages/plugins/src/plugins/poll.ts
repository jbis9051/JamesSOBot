import { Message, PluginFunction, Client } from '@chatbot/bot';

const polls: { [key: string]: Poll } = {};

const poll: PluginFunction = function (bot) {
    bot.addCommand({
        name: 'poll',
        shortcuts: ['poll', 'newpoll', 'createpoll'],
        description:
            "Create a poll that users can vote on with the `|| vote` command. First arg is the thing to poll. The rest are the choices. If no choices are provided it will default to 'Yes' and 'No'. Choices with multiple words must be wrapped in quotes. The poll will close if the time since the most recent vote exceeds the timeout.  A poll can also be closed by its creator or admin with `|| poll close`.  The creator will be notified with the results when the poll closes.",
        examples: [
            '|| poll "How do you guys like the new feature?" "A lot!" "I hate it"',
            "|| poll 'spaces or tabs' 'spaces' 'tabs'",
            '|| Are you hungry?',
        ],
        ignore: false,
        permissions: ['all'],
        args: ["I'm too lazy to put them here"],
        cb: (msg, client) => {
            if (msg.quotedArgsList.length < 1) {
                return client.send(
                    'Please add an arg for something to poll',
                    msg
                );
            }
            if (msg.quotedArgsList[0] === 'status') {
                return client.send(
                    `**Status**: ${  polls[msg.info.contextId].resultsSummary()}`,
                    msg
                );
            }
            if (msg.quotedArgsList[0] === 'close') {
                const poll = polls[msg.info.content];
                if (!poll) {
                    return client.send('No poll is currently running.', msg);
                }
                if (
                    poll.creator.id !== msg.info.fromId &&
                    !client.isRoomOwnerId(msg.info.fromId, msg)
                ) {
                    return client.send(
                        "You did not create this poll so you can't close it.",
                        msg
                    );
                }
                poll.close();
                closePoll(msg, client);
                return;
            }
            if (polls.hasOwnProperty(msg.info.contextId)) {
                return client.send(
                    `A poll is already open for this room. Use \`|| vote [choice]\` to vote and \`|| vote\` to see options: ${ 
                        polls[msg.info.contextId].query}`,
                    msg
                );
            }
            polls[msg.info.contextId] = new Poll(
                msg.quotedArgsList.shift()!,
                msg.quotedArgsList,
                {
                    name: msg.info.fromName,
                    id: msg.info.fromId,
                },
                () => closePoll(msg, client)
            );
            client
                .send(
                    `**New Poll Created**: ${  polls[msg.info.contextId].query}`,
                    msg
                )
                .then((_) =>
                    client.send(
                        `Choices: ${  polls[msg.info.contextId].choiceSummary()}`,
                        msg
                    )
                );
        },
    });

    bot.addCommand({
        name: 'vote',
        shortcuts: ['vote'],
        description:
            'Vote for the current poll in the room you are in. Arg can be a number (the zeroed index) or the content of the choice. **Index takes precedent over content.**',
        examples: ['|| vote [0]', '|| vote Yes', "|| vote 'A lot!'"],
        ignore: false,
        args: [],
        permissions: ['all'],
        cb: (msg, client) => {
            const poll = polls[msg.info.contextId];
            if (msg.quotedArgsList.length === 0) {
                if (!poll) {
                    return client.send('No poll is currently running.', msg);
                }
                client.send(`Query: ${  poll.query}`, msg);
                client.send(`Choices: ${  poll.choiceSummary()}`, msg);
                return;
            }
            client.send(poll.vote(msg.quotedArgsList[0], msg.info.fromId), msg);
        },
    });

    bot.RegisterShutdownScript((msg, client) => Promise.all(
            // @ts-ignore
            Object.values(polls).map(async ([room, poll]) => {
                await client.send(
                    '**Bot Shutdown Imminent. Polls Auto-Closing**',
                    room
                );
                await client.send(`**Poll Closed**: ${  poll.query}`, room);
                await client.send(
                    `**Results**: ${  poll.resultsSummary()}`,
                    room
                );
            })
        ));
};

function closePoll(msg: Message, client: Client) {
    const poll = polls[msg.info.contextId];
    delete polls[msg.info.contextId];
    return client
        .send(`**Poll Closed**: ${  poll.query}`, msg)
        .then((_) => client.send(`**Results**: ${  poll.resultsSummary()}`, msg));
}

interface Choice {
    content: string;
    votes: { id: string }[];
}

class Poll {
    query: string;

    private timeout: number;

    private choices: Choice[] = [];

    creator: { id: string; name: string };

    private votes = 0;

    private creationDate: number = Date.now();

    private lastVote: null | number = null;

    private timeoutCallback: () => void;

    private setTimeout?: NodeJS.Timeout;

    constructor(
        query: string,
        choices: string[],
        creator: { id: string; name: string },
        timeoutCallback: () => void,
        timeout = 14400000
    ) {
        this.query = query;
        this.timeout = timeout;
        if (choices.length < 2) {
            choices = ['Yes', 'No'];
        }
        this.addChoices(choices);
        this.creator = creator;
        this.creationDate = Date.now();
        this.lastVote = null;
        this.timeoutCallback = timeoutCallback;
        this.resetTimeout();
    }

    resetTimeout() {
        if (this.setTimeout) {
            clearTimeout(this.setTimeout);
        }
        this.setTimeout = setTimeout(this.timeoutCallback, this.timeout);
    }

    addChoices(choices: string[]) {
        choices.forEach((choice) => {
            this.choices.push({
                content: choice,
                votes: [],
            });
        });
    }

    removeAllVotesWithId(id: string) {
        this.choices.forEach((choice) => {
            choice.votes = choice.votes.filter((vote) => vote.id !== id);
        });
    }

    vote(arg: string, userid: string) {
        this.removeAllVotesWithId(userid);

        let choiceIndex;
        const match = arg.match(/\[(\d+)]/); // [1]
        if (match) {
            choiceIndex = parseInt(match[1]);
        } else {
            choiceIndex = this.choices.findIndex(
                (choice) => choice.content === arg
            );
        }

        if (!this.choices[choiceIndex]) {
            return (
                `Could not find choice. Choice options are: ${ 
                this.choiceSummary()}`
            );
        }
        this.choices[choiceIndex].votes.push({
            id: userid,
        });
        this.votes++;
        this.lastVote = Date.now();
        this.resetTimeout();
        return `Vote recorded.${  '.‍'.repeat(Math.random() * 10)}`;
    }

    resultsSummary() {
        return this.choices
            .sort((a, b) => b.votes.length - a.votes.length)
            .map((choice) => `${choice.content  }: ${  choice.votes.length}`)
            .join(' | ');
    }

    choiceSummary() {
        return this.choices
            .map((choice, index) => `[${index}] ${choice.content}`)
            .join(' | ');
    }

    close() {
        if (this.setTimeout) {
            clearTimeout(this.setTimeout);
        }
    }

    hasExpired() {
        if (this.votes === 0) {
            return this.creationDate - Date.now() >= this.timeout;
        }
        return this.lastVote! - Date.now() >= this.timeout;
    }
}

export default poll;
