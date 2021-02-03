# Command Documentation

*A better version of the help menu*
[Learned Commands can be found here](#learned-commands)
To interact with the bot simply enter your command with the following prefix:`||`.

```
|| commandName arg1 arg2 arg3
```

The [eval](#eval) command has a shortcut of `||>`. See the examples in the eval section for how to use this. The eval is
sandboxed. If you find a vulnerability please contact me or a Room Owner immediately. They will be able to shut down the
bot until it is fixed.
----

# Default Plugins

# Plugins

## afk

Add an afk message
**Permissions**

- all

**Example**

- `|| afk bla`
- `|| afk foo`
  **Shortcuts**
- `afk`

## Android Docs

Searches for query on Android Developer Docs
**Permissions**
- all

**Example**

- `|| adoc bluetooth`
  **Shortcuts**
- `adocs`
- `adoc`
- `androiddocs`
- `droiddocs`

## Apple Search

Searches for query on Apple Support
**Permissions**
- all

**Example**

- `|| aps forgot Apple ID password`
  **Shortcuts**
- `aps`
- `apple`

## backup

Backup data to Gist and posts a link
**Permissions**
- admin

**Example**

- `|| backup`
  **Shortcuts**
- `backup`

## ban

Bans a user
**Permissions**
- owner
- admin

**Example**
- `|| ban @JBis`
- `|| ban JBis`
- `|| ban 7886229`
  **Shortcuts**
- `ban`

## calc

Calculates an expression using Math.js
**Permissions**
- all

**Example**

- `|| calc 5^2`
- `|| calc 9*2`
  **Shortcuts**
- `calc`
- `math`
- `calculator`
- `c`

## choose
Chooses an option from a space delimited string of options. Strips 'or's .
**Permissions**
- all

**Example**

- `|| choose heads tails`
- `|| choose 1 2 3 or 4`
  **Shortcuts**
- `choose`
- `pick`
- `choice`

## clap

Clap help
**Permissions**
- all

**Example**

- `|| clap`
  **Shortcuts**
- `clap`

## clap.add

Adds a member to a channel managed by clap
**Permissions**
- admin

**Example**

- `|| clap.add`
  **Shortcuts**
- `clap.add`

## clap.cancel

Unmanages the current room
**Permissions**
- admin

**Example**

- `|| clap.cancel`
  **Shortcuts**
- `clap.cancel`

## clap.enforce

Enforce policy
**Permissions**
- admin

**Example**

- `|| clap.enforce`
  **Shortcuts**
- `clap.enforce`

## clap.init

Clap initiate
**Permissions**
- admin

**Example**

- `|| clap.init`
  **Shortcuts**
- `clap.init`

## clap.kick

Kick a member from a channel managed by clap
**Permissions**
- admin

**Example**

- `|| clap.kick`
  **Shortcuts**
- `clap.kick`

## clap.snapshot

Snapshots the current members in the room
**Permissions**
- admin

**Example**

- `|| clap.snapshot`
  **Shortcuts**
- `clap.snapshot`

## clap.status

Checks the clap status
**Permissions**
- admin

**Example**

- `|| clap.status`
  **Shortcuts**
- `clap.status`

## debug

Disables/Enables the bot in the test room (193540)
**Permissions**
- admin

**Example**

- `|| sudo debug enable`
  **Shortcuts**
- `debug`

## disable
Disables the bot. Won't respond to messages until `|| enable` is ran by admin.
**Permissions**
- admin
- owner

**Example**

- `|| sudo disable`
  **Shortcuts**
- `disable`

## echo

Bot echo's what you say
**Permissions**
- all

**Example**

- `|| echo hi`
  **Shortcuts**
- `echo`
- `betterecho`
- `say`

## enable

Enables the bot.
**Permissions**
- admin
- owner

**Example**

- `|| enable`
  **Shortcuts**
- `enable`

## eval

Evaluates JS
**Permissions**
- all

**Example**
- `|| eval console.log('Hello World!');`
- `||> console.log('Hello World!');`
- `!!> console.log('Hello World!');`
  **Shortcuts**
- `eval`

## formatting

Message about formatting to an optional person
**Permissions**
- all

**Example**

- `|| formatting @JBis`
- `|| formatting`
  **Shortcuts**
- `formatting`

## funfact

Sends a fun fact
**Permissions**
- all

**Example**

- `|| funfact`
  **Shortcuts**
- `funfact`
- `ff`

## help

Lists commands
**Permissions**
- all

**Example**

- `|| help`
  **Shortcuts**
- `help`

## info

Gives information about the bot
**Permissions**
- all

**Example**

- `|| info`
  **Shortcuts**
- `info`

## joke

Sends a joke
**Permissions**
- all

**Example**

- `|| joke`
  **Shortcuts**
- `joke`

## kill

**Permissions**
- all

**Example**

- `|| kill self`
  **Shortcuts**
- `kill`

## laws

Lists the laws
**Permissions**
- all

**Example**

- `|| laws`
  **Shortcuts**
- `rules`
- `laws`

## learn

Teaches a bot a command. Will output the `output` when `|| shortcut` is called. You can also add args by wrapping the
arg number (starting with 1) in curly brackets. If you would like to escape spaces (like for a link) wrap the index in
regular brackets. You can also use `{a}` to include all the arguments and `[a]` to encode them all.
**Permissions**
- all

**Example**
- `|| learn shortcut output`
- `|| learn tbh to be honest`
- `|| learn hbd Happy Birthday {1}!`
- `|| learn vampire_redirect https://lmgtfy.com/?q=[1]`
  **Shortcuts**
- `learn`

## mdn

Searches for query on MDN
**Permissions**
- all

**Example**

- `|| mdn array sort`
  **Shortcuts**
- `mdn`
- `rtfm`

## obama
talktobama wrapper. (Converts text to a video of obama saying that text)
**Permissions**
- all

**Example**

- `|| obama Hey, I'm Obama!`
  **Shortcuts**
- `obama`
- `obamaize`
- `talkobama`

## random

Generates Random number in range of [min,max] (both inclusive)
**Permissions**
- all

**Example**
- `|| random 2 30`
- `|| random -2 30`
- `|| random 30 18`
  **Shortcuts**
- `random`

## stat

Gets info about a user
**Permissions**
- all

**Example**
- `|| stat @JBis`
- `|| stat JBis`
- `|| stat 7886229`
  **Shortcuts**
- `stats`
- `stat`

## status

Used to check if the bot is alive.
**Permissions**
- all

**Example**

- `|| status`
  **Shortcuts**
- `status`
- `poke`
- `test`

## suicide

Ends the bot's node process.
**Permissions**
- admin

**Example**

- `|| sudo restart`
  **Shortcuts**
- `die`
- `destroy`
- `selfdestruct`
- `suicide`
- `reboot`
- `restart`
- `just_do_it`
- `shutdown`

## timeout

Disables the bot for 30 sec.
**Permissions**
- admin
- owner

**Example**

- `|| sudo timeout`
  **Shortcuts**
- `timeout`

## timer

Creates a timer
**Permissions**
- all

**Example**

- `|| remind 'hello JBis' in 10 minutes`
- `|| remind 'hello JBis' 10 hours`
  **Shortcuts**
- `timer`
- `remind`
- `remindme`

## unban

Unbans a user
**Permissions**
- owner
- admin

**Example**
- `|| unban @JBis`
- `|| unban JBis`
- `|| unban 7886229`
  **Shortcuts**
- `unban`

## unlearn

Unlearns a learned command command
**Permissions**
- all

**Example**

- `|| unlearn tbh`
  **Shortcuts**
- `unlearn`
- `forget`

## welcome

Welcomes a new user to the room with a message
**Permissions**
- all

**Example**
- `|| welcome @JBis`
- `|| welcome JBis`
- `|| welcome`
  **Shortcuts**
- `welcome`

## wiki

Looks query up on Wikipedia
**Permissions**
- all

**Example**

- `|| wiki Alan Turing`
  **Shortcuts**
- `wiki`
- `lookup`
- `search`

# Learned Commands

These are commands created by users of the bot, not by me. Many were imported from the previous bot. I am not
responsible for these commands, however, if you find one that is offensive and/or against Stack Exchange's policy please
open an issue and it may be removed. 
