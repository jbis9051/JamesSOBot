const polls = {};

module.exports = function (bot) {
    bot.addCommand({
        name: "poll",
        shortcuts: ["poll", "newpoll", "createpoll"],
        description: "Create a poll that users can vote on with the `|| vote` command. First arg is the thing to poll. The rest are the choices. If no choices are provided it will default to 'Yes' and 'No'. Choices with multiple words must be wrapped in quotes. The poll will close if the time since the most recent vote exceeds the timeout.  A poll can also be closed by its creator or admin with `|| poll close`.  The creator will be notified with the results when the poll closes.",
        examples: ["|| poll \"How do you guys like the new feature?\" \"A lot!\" \"I hate it\"", "|| poll 'spaces or tabs' 'spaces' 'tabs'", "|| Are you hungry?"],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            if (msg.quotedArgsList.length < 1) {
                return msg.roomContext.send("Please add an arg for something to poll");
            }
            if (msg.quotedArgsList[0] === "status") {
                return msg.roomContext.send("**Status**: " + polls[msg.getContext()].resultsSummary())
            }
            if (msg.quotedArgsList[0] === "close") {
                const poll = polls[msg.getContext()];
                if (!poll) {
                    return msg.roomContext.send("No poll is currently running.");
                }
                if (poll.creator.id !== msg.getStaticUserUID() && !msg.roomContext.isRoomOwnerId(msg.getStaticUserUID())) {
                    return msg.roomContext.send("You did not create this poll so you can't close it.");
                }
                poll.close();
                closePoll(msg);
                return;
            }
            if (polls.hasOwnProperty(msg.getContext())) {
                return msg.roomContext.send("A poll is already open for this room. Use `|| vote [choice]` to vote and `|| vote` to see options: " + polls[msg.getContext()].query);
            }
            polls[msg.getContext()] = new Poll(msg.quotedArgsList.shift(), msg.quotedArgsList, {
                name: msg.getVariableUsername(),
                id: msg.getStaticUserUID()
            }, _ => closePoll(msg));
            msg.roomContext.send("**New Poll Created**: " + polls[msg.getContext()].query).then(_ =>
                msg.roomContext.send("Choices: " + polls[msg.getContext()].choiceSummary())
            );
        }
    });

    bot.addCommand({
        name: "vote",
        shortcuts: ["vote"],
        description: "Vote for the current poll in the room you are in. Arg can be a number (the zeroed index) or the content of the choice. **Index takes precedent over content.**",
        examples: ["|| vote [0]", "|| vote Yes", "|| vote 'A lot!'"],
        ignore: false,
        permissions: ["all"],
        func: (msg) => {
            const poll = polls[msg.getContext()];
            if (msg.quotedArgsList.length === 0) {
                if (!poll) {
                    return msg.roomContext.send("No poll is currently running.")
                }
                msg.roomContext.send("Query: " + poll.query);
                msg.roomContext.send("Choices: " + poll.choiceSummary());
                return;
            }
            msg.roomContext.send(poll.vote(msg.quotedArgsList[0], msg.getStaticUserUID()));
        }
    });

    bot.addShutdownScript(() => {
        return Promise.all(
            Object.values(polls).map(async ([room, poll]) => {
                await bot.client.send("**Bot Shutdown Imminent. Polls Auto-Closing**", room);
                await bot.client.send("**Poll Closed**: " + poll.query, room);
                await bot.close.send("**Results**: " + poll.resultsSummary(), room);
            }))
    });
};

function closePoll(msg) {
    const poll = polls[msg.getContext()];
    delete polls[msg.getContext()];
    return msg.roomContext.send("**Poll Closed**: " + poll.query).then(_ =>
        msg.roomContext.send("**Results**: " + poll.resultsSummary())
    );
}

class Poll {
    /**
     *
     * @param {string} query - Poll query
     * @param {Array<String>} choices - poll choices
     * @param {Object} creator
     * @param {Function} timeoutCallback
     * @param {String} creator.name
     * @param {number} creator.id
     * @param {number} timeout (optional) - Timeout in milliseconds
     */
    constructor(query, choices, creator, timeoutCallback, timeout = 14400000) {
        this.query = query;
        this.timeout = timeout;
        this.choices = [];
        if (choices.length < 2) {
            choices = ["Yes", "No"];
        }
        this.addChoices(choices);
        this.creator = creator;
        this.votes = 0;
        this.creationDate = Date.now();
        this.lastVote = null;
        this.timeoutCallback = timeoutCallback;
        this.resetTimeout();
    }

    resetTimeout() {
        clearTimeout(this.setTimeout);
        this.setTimeout = setTimeout(this.timeoutCallback, this.timeout);
    }


    /**
     * @param {Array<String>} choices - poll choices
     */
    addChoices(choices) {
        choices.forEach(choice => {
            this.choices.push({
                content: choice,
                votes: []
            });
        })
    }

    removeAllVotesWithId(id) {
        this.choices.forEach(choice => {
            choice.votes = choice.votes.filter(vote => vote.id !== id);
        });
    }


    vote(arg, userid) {
        this.removeAllVotesWithId(userid);

        let choiceIndex;
        const match = arg.match(/\[(\d+)]/); // [1]
        if (match) {
            choiceIndex = match[1];
        } else {
            choiceIndex = this.choices.findIndex(choice => choice.content === arg)
        }

        if (!this.choices[choiceIndex]) {
            return "Could not find choice. Choice options are: " + this.choiceSummary();
        }
        this.choices[choiceIndex].votes.push({
            id: userid
        });
        this.votes++;
        this.lastVote = Date.now();
        this.resetTimeout();
        return "Vote recorded." + '.‍'.repeat(Math.random() * 10);
    }

    resultsSummary() {
        return this.choices
            .sort((a, b) => b.votes.length - a.votes.length)
            .map(choice => choice.content + ": " + choice.votes.length)
            .join(" | ");
    }

    choiceSummary() {
        return this.choices.map((choice, index) => `[${index}] ${choice.content}`).join(" | ");
    }

    close() {
        clearTimeout(this.setTimeout);
    }

    hasExpired() {
        if (this.votes === 0) {
            return this.creationDate - Date.now() >= this.timeout;
        }
        return this.lastVote - Date.now() >= this.timeout;
    }
}
