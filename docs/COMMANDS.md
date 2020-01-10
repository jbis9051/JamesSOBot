
# Command Documentation

*A better version of the help menu*

[Learned Commands can be found here](#learned-commands)

To interact with the bot simply enter your command with the following prefix:`||`.

```
|| commandName arg1 arg2 arg3
```

The [eval](#eval) command has a shortcut of `||>`. See the examples in the eval section for how to use this.

The eval is sandboxed. If you find a vulnerability please contact me or a Room Owner immediately. They will be able to shut down the bot until it is fixed.

----


# Default Plugins


## backup

Backup data to Gist and posts a link

**Permissions**

- admin
           
**Example**

- `|| backup`

**Shortcuts**

- `backup`

## disable

Disables the bot. Won't respond to messages until `|| enable` is ran by admin.

**Permissions**

- admin
- OWNER
           
**Example**

- `|| sudo disable`

**Shortcuts**

- `disable`

## enable

Enables the bot.

**Permissions**

- admin
- OWNER
           
**Example**

- `|| enable`

**Shortcuts**

- `enable`

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

## ban

Bans a user

**Permissions**

- OWNER
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

## debug

Disables/Enables the bot in the test room (193540)

**Permissions**

- admin
           
**Example**

- `|| sudo debug enable`

**Shortcuts**

- `debug`

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

Teaches a bot a command. Will output the `output` when `|| shortcut` is called. You can also add args by wrapping the arg number (starting with 1) in curly brackets. If you would like to escape spaces (like for a link) wrap the index in regular brackets. You can also use `{a}` to include all the arguments and `[a]` to encode them all.

**Permissions**

- all
           
**Example**

- `|| learn shortcut output`
- `|| learn tbh to be honest`
- `|| learn hbd Happy Birthday {1}!`
- `|| learn vampire_redirect https://lmgtfy.com/?q=[1]`

**Shortcuts**

- `learn`

## man

Displays the man page for a bot command

**Permissions**

- all
           
**Example**

- `|| man ban`

**Shortcuts**

- `man`

## mdn

Searches for query on MDN

**Permissions**

- all
           
**Example**

- `|| mdn array sort`

**Shortcuts**

- `mdn`

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

- OWNER
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

These are commands created by users of the bot, not by me. Many were imported from the previous bot. I am not responsible for these commands, however, if you find one that is offensive and/or against Stack Exchange's policy please open an issue and it may be removed. 


## `|| :p`

User-taught command: `http://www.clipartbest.com/cliparts/9TR/Re7/9TRRe7jTe.gif`

**Creator:** Shell

**Creator ID:** undefined

**Date Created:** 2014-09-04T08:44:56.331Z


## `|| !`

User-taught command: `'ok'`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-04T17:20:46.661Z


## `|| !!`

User-taught command: `say '<([a-z]+) *[^/]*?>`

**Creator:** Ryan Ternier

**Creator ID:** 324516

**Date Created:** 2015-02-17T23:41:07.187Z


## `|| ?`

User-taught command: `wat?`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-04T17:38:24.317Z


## `|| ???`

User-taught command: `https://i.stack.imgur.com/sxbZF.png`

**Creator:** mikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2017-07-12T17:44:23.819Z


## `|| "turn`

User-taught Command: `down for what?"`

**Creator:** Mauker

**Creator ID:** 4070469

**Date Created:** Tue Dec 10 2019 14:06:13 GMT-0500 (Eastern Standard Time)


## `|| (4337654<<1)+1`

User-taught command: `https://www.youtube.com/watch?v=axLRUszuu9I`

**Creator:** Shmiddty

**Creator ID:** undefined

**Date Created:** 2014-08-27T22:56:44.799Z


## `|| (y)`

User-taught command: `http://www.like-shop4u.com/image/1423211099-LIKE.png`

**Creator:** Sippy

**Creator ID:** 3846058

**Date Created:** 2015-04-21T11:04:14.575Z


## `|| /somecommand`

User-taught command: ` This is some command`

**Creator:** Cereal

**Creator ID:** 2424975

**Date Created:** 2016-01-18T14:26:03.724Z


## `|| ^`

User-taught command: `http://iconizer.net/files/DefaultIcon_ver_0.11/orig/arrow-up.png`

**Creator:** Sterling Archer

**Creator ID:** 774078

**Date Created:** 2015-05-21T15:14:27.693Z


## `|| ^5`

User-taught command: `https://i.imgur.com/OXCPLcA.gifv`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2018-02-07T15:31:03.398Z


## `|| </pissing>`

User-taught command: `http://i.stack.imgur.com/c1ALH.jpg`

**Creator:** Jhawins

**Creator ID:** undefined

**Date Created:** 2014-04-17T14:28:00.927Z


## `|| $.baby`

User-taught command: `http://chat.stackoverflow.com/transcript/message/1668581#1668581`

**Creator:** Jhawins

**Creator ID:** undefined

**Date Created:** 2014-05-20T18:50:41.338Z


## `|| 007`

User-taught command: `https://i.stack.imgur.com/QTujO.png`

**Creator:** MikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2018-02-21T17:34:09.811Z


## `|| 1+1-1`

User-taught command: `10 according to JS.`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2019-05-16T09:04:17.488Z


## `|| 111test`

User-taught command: `!!>'1'+'1'-'1'`

**Creator:** Captain Obvious

**Creator ID:** 3033062

**Date Created:** 2019-05-16T09:03:12.462Z


## `|| 2+2-1`

User-taught command: `Quick maths!`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2018-03-23T10:45:55.160Z


## `|| 2020/07/23`

User-taught command: `http://chat.stackoverflow.com/transcript/message/24642815#24642815`

**Creator:** Jeremy

**Creator ID:** 4560635

**Date Created:** 2015-07-23T23:26:15.602Z


## `|| 3`

User-taught command: `http://www.wpclipart.com/education/animal_numbers/animal_number_3_T.png`

**Creator:** tarboy9

**Creator ID:** 5521842

**Date Created:** 2015-11-04T00:49:33.523Z


## `|| 666`

User-taught command: ` ಊ(╰◣▂ ◢╯)Ψ`

**Creator:** monners

**Creator ID:** undefined

**Date Created:** 2014-04-14T07:41:52.847Z


## `|| abesnacking`

User-taught command: `http://i.imgur.com/3epNGAC.gif`

**Creator:** Abe

**Creator ID:** 4251625

**Date Created:** 2015-10-20T16:42:15.510Z


## `|| abhi`

User-taught command: `An individual who abuses my commands, handle with extreme caution.  As he will open the gates of hell and spit .gifs at the Chat with extreme prejudice.`

**Creator:** Greg

**Creator ID:** undefined

**Date Created:** 2014-04-28T17:10:32.027Z


## `|| abhishekpornfreak`

User-taught command: ` http://chat.stackoverflow.com/transcript/message/14206191#14206191`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2015-01-08T20:22:29.731Z


## `|| acronym`

User-taught command: (w+) `https://www.acronymfinder.com/$0.html`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-05T12:22:31.564Z


## `|| afsari`

User-taught command: `Hey Afsari`

**Creator:** Icche Guri

**Creator ID:** 6379197

**Date Created:** 2017-03-28T12:18:56.570Z


## `|| agario`

User-taught command: `https://agar.io`

**Creator:** TheOneWhoMade

**Creator ID:** 9107868

**Date Created:** 2018-03-04T01:13:20.443Z


## `|| ah`

User-taught command: `http://emotibot.net/pix/5157.gif`

**Creator:** Greg

**Creator ID:** undefined

**Date Created:** 2014-05-21T18:17:40.066Z


## `|| ahah`

User-taught command: `http://i.imgur.com/z0GabHa.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-28T01:29:20.779Z


## `|| algosmarts`

User-taught command: `http://chat.stackoverflow.com/transcript/message/21657301#21657301`

**Creator:** SomeKittens

**Creator ID:** 1216976

**Date Created:** 2015-02-19T23:27:13.040Z


## `|| aliens`

User-taught command: `http://wp-content.bluebus.com.br/wp-content/uploads/2014/05/aliens-meme.jpg`

**Creator:** Kitler

**Creator ID:** 1401094

**Date Created:** 2015-04-23T18:26:27.933Z


## `|| alienware`

User-taught command: `https://github.com/StackOverflowCSharpChat/Stories/blob/master/Alienware.txt`

**Creator:** Lee Butler

**Creator ID:** 3033062

**Date Created:** 2018-07-05T09:20:05.424Z


## `|| alot`

User-taught command: `https://i.stack.imgur.com/wtioz.png`

**Creator:** mikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2017-07-21T18:58:24.230Z


## `|| am`

User-taught command: `Definitely`

**Creator:** Jacques Marais

**Creator ID:** 5305938

**Date Created:** 2015-11-14T15:08:49.731Z


## `|| andy2`

User-taught command: `https://i.stack.imgur.com/H1P8V.jpg`

**Creator:** Andy K

**Creator ID:** 2572645

**Date Created:** 2018-04-18T07:50:17.514Z


## `|| angry`

User-taught command: ` https://lh3.googleusercontent.com/-pIf5CEVW0DE/UpQC3XGH2DI/AAAAAAAAAA4/_DHHRYLfc2kJeW_imphHjUOb3_0kPy-VwCK8B/s0/angry_image.gif`

**Creator:** TheLittleNaruto

**Creator ID:** 1944896

**Date Created:** 2017-04-03T04:37:52.119Z


## `|| angryticks`

User-taught command: `http://i.imgur.com/h5eFH.gif`

**Creator:** Evan L

**Creator ID:** undefined

**Date Created:** 2014-05-20T17:41:17.711Z


## `|| annoy`

User-taught command: Hello, `no`

**Creator:** Learn How To Be Transparent

**Creator ID:** 6820627

**Date Created:** 2017-04-01T03:49:15.203Z


## `|| apocalypse`

User-taught command: `http://i.stack.imgur.com/KJ3IX.jpg`

**Creator:** copy

**Creator ID:** undefined

**Date Created:** 2014-10-10T22:37:09.942Z


## `|| appreciated`

User-taught command: `http://i.imgur.com/NazRlGz.gif`

**Creator:** jAndy

**Creator ID:** 1386886

**Date Created:** 2014-10-31T15:29:59.467Z


## `|| archerneat`

User-taught command: `http://i.imgur.com/0xmRAaM.gif`

**Creator:** SomeKittens Ux2666

**Creator ID:** undefined

**Date Created:** 2014-09-04T05:31:23.147Z


## `|| artisticpoop`

User-taught command: ` http://chat.stackoverflow.com/transcript/message/9611625#9611625`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2014-12-10T15:14:29.203Z


## `|| artisticsilo`

User-taught command: `http://i.imgur.com/nw26b78.png`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-05-30T20:37:51.508Z


## `|| asd`

User-taught command: `http://chat.stackoverflow.com/rooms/7/c`

**Creator:** Psioniax

**Creator ID:** 3661754

**Date Created:** 2015-05-08T12:37:29.943Z


## `|| asdf`

User-taught command: `foo bar`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-09-04T13:51:49.082Z


## `|| ashucat`

User-taught command: `https://image.shutterstock.com/z/stock-photo-the-small-cat-is-isolated-on-a-white-background-101801980.jpg`

**Creator:** TCat

**Creator ID:** 6315209

**Date Created:** 2017-03-24T06:05:01.701Z


## `|| ashukumar`

User-taught command: `Ashukumar is a insane cat(small kitty)`

**Creator:** TCat

**Creator ID:** 6315209

**Date Created:** 2017-03-24T05:15:01.754Z


## `|| asians`

User-taught command: `http://www.troll.me/images/ancient-aliens-guy/asians.jpg`

**Creator:** Patsy Issa

**Creator ID:** undefined

**Date Created:** 2014-05-29T08:46:04.445Z


## `|| avner`

User-taught command: `https://chat.stackoverflow.com/transcript/message/44305841#44305841`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-10-18T10:28:48.705Z


## `|| awesome`

User-taught command: (.*) `[This is awesome](https://github.com/RapidtSoftware/DatePickr)`

**Creator:** Jacques Marais

**Creator ID:** 5305938

**Date Created:** 2015-12-02T12:53:54.906Z


## `|| aww`

User-taught command: `http://i.imgur.com/iymD2rC.gif`

**Creator:** Sterling Archer

**Creator ID:** 774078

**Date Created:** 2014-10-29T22:02:16.200Z


## `|| aye`

User-taught command: `https://media.tenor.com/images/2951cdf5aaab1d784aa00c4706d5b014/tenor.gif`

**Creator:** Metallkiller

**Creator ID:** 4364057

**Date Created:** 2017-10-19T09:45:11.328Z


## `|| backaway`

User-taught command: `http://i.stack.imgur.com/wbltV.gif`

**Creator:** mikedidthis

**Creator ID:** undefined

**Date Created:** 2014-04-17T20:50:34.531Z


## `|| backups`

User-taught command: `http://chat.stackexchange.com/transcript/message/36385560#36385560`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-04-05T13:20:32.337Z


## `|| bad`

User-taught command: `mad`

**Creator:** NoDownvotesPlz

**Creator ID:** 3556874

**Date Created:** 2015-03-20T08:48:16.239Z


## `|| bad_search`

User-taught Command: `[{1}](https://www.bing.com/search/?q=[1])`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Wed Dec 11 2019 16:52:59 GMT-0500 (Eastern Standard Time)


## `|| badanusday`

User-taught command: `http://i.imgur.com/UFIIhY3.jpg`

**Creator:** towc

**Creator ID:** undefined

**Date Created:** 2014-09-22T20:31:35.613Z


## `|| badanusdaydate`

User-taught command: `22nd`

**Creator:** towc

**Creator ID:** undefined

**Date Created:** 2014-09-22T20:31:55.321Z


## `|| badcat`

User-taught command: `https://image.shutterstock.com/z/stock-photo-bad-cat-271562180.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-31T13:51:52.428Z


## `|| badhans`

User-taught command: `https://media.giphy.com/media/ShlElIEiSrUk0/giphy.gif`

**Creator:** ballBreaker

**Creator ID:** 3968793

**Date Created:** 2017-07-14T19:53:24.245Z


## `|| badumtss`

User-taught command: `http://media.giphy.com/media/SUeUCn53naadO/giphy.gif`

**Creator:** Squirrel in training

**Creator ID:** 5757162

**Date Created:** 2018-03-21T07:20:49.742Z


## `|| bagcat`

User-taught command: `https://media.giphy.com/media/qdkzom7bF0tYk/giphy.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-07-11T13:36:36.625Z


## `|| ballbreaker`

User-taught Command: `!https://media.giphy.com/media/4pMX5rJ4PYAEM/giphy.gif`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Tue Dec 10 2019 14:20:28 GMT-0500 (Eastern Standard Time)


## `|| ballcat`

User-taught command: `https://s-media-cache-ak0.pinimg.com/736x/c2/16/25/c2162533930ef1b9ef8d5cb3ae8ada17--lose-belly-fat-fat-cats.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-08T13:20:09.262Z


## `|| ballmer`

User-taught command: `DEVELOPERS!`

**Creator:** Kendall Frey

**Creator ID:** undefined

**Date Created:** 2014-09-05T18:11:22.304Z


## `|| ballmerpeak`

User-taught command: `http://chat.stackoverflow.com/transcript/74583?m=22753428#22753428`

**Creator:** SomeKittens

**Creator ID:** 1216976

**Date Created:** 2015-04-17T17:57:27.189Z


## `|| banana`

User-taught command: `http://chat.stackoverflow.com/transcript/message/23991609#23991609`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2015-06-19T18:15:19.440Z


## `|| bananafox`

User-taught command: `https://deepfriedbits.files.wordpress.com/2016/06/wp-1466035178046.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-07-11T09:26:46.693Z


## `|| bananahorse`

User-taught command: `http://i.imgur.com/SDK0L.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-07-27T13:49:27.925Z


## `|| bananalemon`

User-taught command: `http://i.imgur.com/VKeBzMc.jpg`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-01-27T15:07:19.106Z


## `|| bath`

User-taught command: `http://gifrific.com/wp-content/uploads/2017/07/Dog-Bathes-Sith-Shower-Cap-and-Pacifier.gif`

**Creator:** Shadow Wizard

**Creator ID:** 447356

**Date Created:** 2017-08-01T12:42:27.807Z


## `|| baz`

User-taught command: biz `!!learn`

**Creator:** Shadow Wizard

**Creator ID:** 447356

**Date Created:** 2017-08-01T13:13:39.659Z


## `|| bbq`

User-taught command: `WHATksahdfklajjahskdfjhkashdkfjakshdfkhagskdfgkashgdfkagskdjfgkahsgdkfasd`

**Creator:** CSᵠ

**Creator ID:** 731947

**Date Created:** 2014-10-29T06:14:22.951Z


## `|| becauseimhappy`

User-taught command: `https://www.youtube.com/watch?v=DLzxrzFCyOs`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-08-27T09:17:40.420Z


## `|| bees`

User-taught command: `https://www.youtube.com/watch?v=PYtXuBN1Hvc`

**Creator:** SomeKittens Ux2666

**Creator ID:** undefined

**Date Created:** 2014-04-24T17:25:51.596Z


## `|| belolsprout`

User-taught command: `http://i.stack.imgur.com/mleic.gif`

**Creator:** easwee

**Creator ID:** 258400

**Date Created:** 2015-07-06T15:38:33.190Z


## `|| bender`

User-taught command: `http://i.imgur.com/Bl0RSeC.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-16T17:14:41.591Z


## `|| berserk`

User-taught command: `https://meta.stackexchange.com/users/282866/berserk`

**Creator:** Shadow Wizard

**Creator ID:** 447356

**Date Created:** 2017-08-01T13:20:27.078Z


## `|| beterr`

User-taught command: `between`

**Creator:** Sippy

**Creator ID:** 3846058

**Date Created:** 2014-10-30T15:08:09.504Z


## `|| bhens`

User-taught command: `Hans is a catmaster`

**Creator:** Charles Samuel

**Creator ID:** 7449701

**Date Created:** 2017-03-21T10:09:15.054Z


## `|| bigcat`

User-taught command: `http://i.imgur.com/MxfQws7.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-08T14:52:30.211Z


## `|| bing`

User-taught command: `http://www.bing.com/search?q=$encode($0)`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-11-05T15:38:14.181Z


## `|| birthinghips`

User-taught command: `https://chat.stackoverflow.com/transcript/message/12086475#12086475`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2015-11-02T16:51:34.259Z


## `|| bjb568`

User-taught command: ` http://chat.meta.stackexchange.com/transcript/message/2076534#2076534`

**Creator:** bjb568

**Creator ID:** undefined

**Date Created:** 2014-05-29T23:11:45.938Z


## `|| blame`

User-taught command: ` http://favoritememes.com/_nw/49/49053712.jpg`

**Creator:** TheLittleNaruto

**Creator ID:** 1944896

**Date Created:** 2017-04-11T04:00:47.437Z


## `|| bojack`

User-taught command: ` http://ak-hdl.buzzfed.com/static/2015-01/8/12/imagebuzz/webdr05/anigif_optimized-18643-1420738110-10.gif`

**Creator:** Josh LeBlanc

**Creator ID:** 2424975

**Date Created:** 2015-07-24T15:53:39.033Z


## `|| bomb`

User-taught command: `Bomb`

**Creator:** TCat

**Creator ID:** 6315209

**Date Created:** 2017-03-30T13:03:30.175Z


## `|| bookbook`

User-taught command: `https://www.youtube.com/watch?v=MOXQo7nURs0`

**Creator:** towc

**Creator ID:** undefined

**Date Created:** 2014-09-10T09:20:11.188Z


## `|| booyah`

User-taught command: `http://i.stack.imgur.com/RnJHf.gif`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2015-04-01T16:00:13.117Z


## `|| border-radius`

User-taught command: `http://chat.stackoverflow.com/rooms/7/conversation/border-radiusery`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-03-28T10:40:42.439Z


## `|| bot`

User-taught command: `I'm actually a bot, so don't reply to me.`

**Creator:** Second Rikudo

**Creator ID:** undefined

**Date Created:** 2014-05-23T10:13:06.241Z


## `|| botkiller`

User-taught command: `https://chat.meta.stackexchange.com/transcript/message/6291315#6291315`

**Creator:** Shadow Wizard

**Creator ID:** 447356

**Date Created:** 2017-08-24T10:57:19.489Z


## `|| brandon`

User-taught command: `http://imgur.com/r/gifs/h5eFH`

**Creator:** Evan L

**Creator ID:** undefined

**Date Created:** 2014-06-04T04:21:38.942Z


## `|| brb`

User-taught command: `https://cdn.meme.am/instances/61758954.jpg`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-03-29T11:32:43.670Z


## `|| brbthatworksbecausetheydontwanttofixtheotherone`

User-taught command: `http://cdn.meme.am/instances/61758954.jpg`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2018-05-03T12:57:15.366Z


## `|| breadcat`

User-taught command: `http://img.memecdn.com/bread-cat-is-not-amused_o_2285819.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-21T08:55:52.606Z


## `|| breadgame`

User-taught command: `https://media.giphy.com/media/QMMt03hAmVbNu/giphy.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-21T08:49:35.465Z


## `|| break`

User-taught command: `http://i1.kym-cdn.com/photos/images/original/000/196/202/333-keyboard-break.png`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-20T14:43:59.627Z


## `|| breathing`

User-taught command: `https://chat.stackoverflow.com/transcript/message/41661956#41661956`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-03-19T07:37:33.394Z


## `|| brutal`

User-taught command: `https://thumbs.gfycat.com/NippyKindLangur-size_restricted.gif`

**Creator:** Metallkiller

**Creator ID:** 4364057

**Date Created:** 2017-07-21T12:00:18.652Z


## `|| bs`

User-taught command: `https://chat.stackoverflow.com/transcript/message/41022647#41022647`

**Creator:** Nerd in training'questionmark'

**Creator ID:** 5757162

**Date Created:** 2018-01-30T08:22:45.037Z


## `|| buhgok`

User-taught command: `http://fc09.deviantart.net/fs70/f/2013/013/8/f/buh_gok_chicken_by_darsamnorogh-d5rdkuo.png`

**Creator:** Second Rikudo

**Creator ID:** 871050

**Date Created:** 2015-02-24T09:41:16.721Z


## `|| bullshit`

User-taught command: `https://www.youtube.com/watch?v=qcJ0YIqnD50`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-05-27T12:33:10.081Z


## `|| burn`

User-taught command: `http://gifrific.com/wp-content/uploads/2012/08/Kelso-Says-Burn-That-70s-Show.gif`

**Creator:** RUJordan

**Creator ID:** undefined

**Date Created:** 2014-04-11T16:49:35.412Z


## `|| burned`

User-taught command: `https://i.imgflip.com/5pnp6.jpg`

**Creator:** Awal Garg

**Creator ID:** 3459110

**Date Created:** 2015-05-15T12:27:09.714Z


## `|| butter`

User-taught command: `https://chat.stackoverflow.com/transcript/message/40494352#40494352`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2017-12-18T14:05:39.410Z


## `|| butthole`

User-taught command: `https://www.youtube.com/watch?v=CO8vBVUaKvk`

**Creator:** tarboy9

**Creator ID:** 5521842

**Date Created:** 2015-11-04T00:17:53.075Z


## `|| butwhy`

User-taught command: `http://i.imgur.com/gPDGcXr.gif`

**Creator:** catgocat

**Creator ID:** 4106994

**Date Created:** 2015-08-21T21:39:09.366Z


## `|| buzzwords`

User-taught command: ` https://scontent.fmaa1-2.fna.fbcdn.net/hphotos-xtp1/t31.0-8/10644205_1219376754742367_3969414390012750141_o.png`

**Creator:** tweray

**Creator ID:** 2271112

**Date Created:** 2016-01-25T15:36:33.614Z


## `|| bye`

User-taught command: `Cya looser`

**Creator:** Patsy Issa

**Creator ID:** undefined

**Date Created:** 2014-09-22T10:47:11.619Z


## `|| c#`

User-taught command: `http://chat.stackoverflow.com/transcript/message/30365182#30365182`

**Creator:** mikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2017-03-23T15:17:03.541Z


## `|| c#!`

User-taught command: `That didn't make much sense. Maybe you meant: Java!`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-04-10T07:26:19.722Z


## `|| cagegasm`

User-taught command: `http://i.imgur.com/xiJk0LH.gif`

**Creator:** Sterling Archer

**Creator ID:** undefined

**Date Created:** 2014-10-03T21:03:10.089Z


## `|| cake`

User-taught command: `https://www.youtube.com/watch?v=NSypnaxAlP4`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-08-19T14:02:00.687Z


## `|| caniuse`

User-taught command: `http://caniuse.com/#search=$encode($1)`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-08-28T13:16:10.346Z


## `|| caprica`

User-taught command: `http://img2.tvtome.com/i/u/34c210b4569a4688c6b3cc9bd45c6c53.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-01T10:12:20.133Z


## `|| capslock`

User-taught command: `http://www.wpclipart.com/computer/keyboard_keys/computer_key_Caps_Lock.png`

**Creator:** kwak

**Creator ID:** undefined

**Date Created:** 2014-04-19T01:31:15.460Z


## `|| captainsquirrel2`

User-taught command: `https://www.youtube.com/watch?v=JImcvtJzIK8`

**Creator:** Metallkiller

**Creator ID:** 4364057

**Date Created:** 2018-01-30T09:34:50.934Z


## `|| carb0nshel1`

User-taught command: `http://chat.stackoverflow.com/transcript/message/20948884#20948884`

**Creator:** SomeKittens

**Creator ID:** 1216976

**Date Created:** 2015-01-13T23:08:37.341Z


## `|| carl`

User-taught Command: `!https://i.imgur.com/QkbTyEs.jpg`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Fri Dec 13 2019 12:54:06 GMT-0500 (Eastern Standard Time)


## `|| casesensitive`

User-taught command: `shit`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-28T11:59:55.757Z


## `|| cat`

User-taught Command: `!https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-xryaIKjlDTg%2FUAbznSk8IgI%2FAAAAAAAAQII%2F-imC98usNf8%2Fs1600%2Ffunny-cat-pictures-007-006.jpg&f=1&nofb=1`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Wed Dec 11 2019 14:06:32 GMT-0500 (Eastern Standard Time)


## `|| catboat`

User-taught command: `https://s-media-cache-ak0.pinimg.com/originals/12/cc/7b/12cc7be511f2025fc16fe1260e314be1.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-07-14T13:55:20.071Z


## `|| catclub`

User-taught command: `The catclub members are Caprica Six, Hans1984, ChewbaccoCat, Cold Fire, TheLittleNaruto, AshuKumar, TCat, Saif, jagapathi`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-04T20:32:32.051Z


## `|| catcyclist`

User-taught command: `https://thumbs.gfycat.com/AbandonedKindlyFirecrest-size_restricted.gif`

**Creator:** nyconing

**Creator ID:** 5858238

**Date Created:** 2017-07-10T07:09:34.752Z


## `|| catify`

User-taught command: `http://jsforcats.com/`

**Creator:** SomeKittens

**Creator ID:** 1216976

**Date Created:** 2015-09-18T22:33:33.785Z


## `|| catmode`

User-taught command: `http://i.imgur.com/htz6HZE.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-01T22:25:15.378Z


## `|| catnip`

User-taught command: `https://www.youtube.com/watch?v=J5Xrcp6k8VE`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-04-04T09:38:41.399Z


## `|| catox`

User-taught command: `https://static1.squarespace.com/static/52faaa94e4b03ff7dae36344/t/57bc43db6b8f5b54d97f34c0/1471955976428/giphy.gif`

**Creator:** nyconing

**Creator ID:** 5858238

**Date Created:** 2017-07-13T10:02:55.849Z


## `|| catslap`

User-taught command: `https://media.giphy.com/media/Iowfz9G4P6ZiM/giphy.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-07-07T09:09:51.976Z


## `|| catzoom`

User-taught command: `https://j.gifs.com/G6WxQK.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-07-11T12:32:31.503Z


## `|| ceiling`

User-taught command: `http://i2.kym-cdn.com/entries/icons/original/000/000/638/Ceilingcat.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-04-04T13:47:02.483Z


## `|| chal-vat`

User-taught command: `Get The Fudge Out !!`

**Creator:** Sword

**Creator ID:** 3231320

**Date Created:** 2015-06-29T06:06:05.388Z


## `|| charge_your_electronics`

User-taught Command: `https://chat.stackoverflow.com/transcript/message/24208024#24208024`

**Creator:** AdamMc331

**Creator ID:** 3131147

**Date Created:** Tue Dec 10 2019 14:13:15 GMT-0500 (Eastern Standard Time)


## `|| chatfaq`

User-taught command: `Please see [FAQ#$0](http://chat.stackoverflow.com/faq#%240)`

**Creator:** Awal Garg

**Creator ID:** 3459110

**Date Created:** 2015-05-28T19:10:03.989Z


## `|| chew`

User-taught command: `Chew is 2x insane cat`

**Creator:** TCat

**Creator ID:** 6315209

**Date Created:** 2017-03-24T05:16:34.293Z


## `|| chewcat`

User-taught command: `https://thumbs.dreamstime.com/z/madcat-cat-straitjacket-mad-eyes-50085158.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-17T20:32:56.697Z


## `|| chewcat2`

User-taught command: to `$0`

**Creator:** Shadow Wizard

**Creator ID:** 447356

**Date Created:** 2017-08-03T12:14:44.795Z


## `|| chickencat`

User-taught command: `http://25.media.tumblr.com/tumblr_m0arllNRZ51rpxgkao1_250.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-18T09:26:06.738Z


## `|| cimmanon`

User-taught command: `http://i.imgur.com/fSXTvoo.jpg`

**Creator:** FrontpageExpert

**Creator ID:** 4251625

**Date Created:** 2015-03-26T17:38:28.796Z


## `|| cimmanon2`

User-taught command: `http://chat.stackoverflow.com/transcript/29074?m=27755007#27755007`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-12-28T14:40:18.550Z


## `|| claptrap`

User-taught command: `https://i.imgur.com/umY9tLy.jpg`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2017-11-28T23:05:21.207Z


## `|| clashon`

User-taught command: `Let's war baby!!`

**Creator:** Sword

**Creator ID:** 3231320

**Date Created:** 2015-06-17T09:24:03.355Z


## `|| classicbartek`

User-taught command: `http://chat.stackoverflow.com/transcript/message/23583724#23583724`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-05-29T15:09:54.867Z


## `|| cleanlife`

User-taught command: `http://imgur.com/gallery/knTKo9s`

**Creator:** abhi

**Creator ID:** undefined

**Date Created:** 2014-04-28T17:07:08.370Z


## `|| cleverman`

User-taught command: ` http://whyareyoustupid.com/wp-content/uploads/I-am-not-a-clever-man-the-origin-of-this_4c859b_4751294.jpg`

**Creator:** Josh LeBlanc

**Creator ID:** 2424975

**Date Created:** 2015-07-22T18:24:51.325Z


## `|| cMAbuse`

User-taught Command: `cM stop bullying me!`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Tue Dec 17 2019 19:15:20 GMT-0500 (Eastern Standard Time)


## `|| coc`

User-taught command: `http://cdn.supercell.com/supercell.com/150211144610/all/themes/supercell/img/parallax/coc_logo.png`

**Creator:** deadlydragon00

**Creator ID:** 3087778

**Date Created:** 2015-06-17T09:44:15.141Z


## `|| code_bourbon`

User-taught Command: `!https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/hbe/he6/11170726314014.png`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Tue Dec 10 2019 14:14:55 GMT-0500 (Eastern Standard Time)


## `|| coffee`

User-taught command: `http://i.stack.imgur.com/hrnQR.jpg`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2019-02-21T14:58:08.322Z


## `|| coffeecat`

User-taught command: `http://68.media.tumblr.com/3bcd21c7aac7fadf01edff22d9f132fa/tumblr_o7hd58X3QP1rtp3uyo1_400.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-07-11T08:22:14.397Z


## `|| coffeescript`

User-taught command: `http://hackingon.net/image7c86.gif?picture=WindowsLiveWriter/CoffeeScriptHandler/30F548E9/coffee_poster.gif`

**Creator:** derylius

**Creator ID:** undefined

**Date Created:** 2014-04-16T15:04:37.034Z


## `|| coffeetime`

User-taught command: `http://chat.stackoverflow.com/transcript/message/15616092#15616092`

**Creator:** derylius

**Creator ID:** undefined

**Date Created:** 2014-04-02T09:47:16.850Z


## `|| coffetimekillerstyle`

User-taught command: `http://i.stack.imgur.com/syYjh.png`

**Creator:** Squirrel in training

**Creator ID:** 5757162

**Date Created:** 2018-06-12T08:26:40.107Z


## `|| coke`

User-taught command: pepsi `or`

**Creator:** ngunha02

**Creator ID:** 1482044

**Date Created:** 2017-04-10T07:44:40.123Z


## `|| coldcat`

User-taught command: `http://www.hover.com/wp-content/uploads/2014/11/grumpy-cat.jpg`

**Creator:** TCat

**Creator ID:** 6315209

**Date Created:** 2017-03-21T13:24:31.919Z


## `|| coldfire`

User-taught command: `He is a Swat Cat`

**Creator:** TCat

**Creator ID:** 6315209

**Date Created:** 2017-03-30T10:24:06.400Z


## `|| coldfusion!`

User-taught command: `RUN, RUN FOR YOUR LIFE!`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-04-10T07:22:14.632Z


## `|| computer`

User-taught command: ` http://i.imgur.com/0S5spVm.jpg`

**Creator:** Jenna Sloan

**Creator ID:** 7035175

**Date Created:** 2017-03-27T00:29:30.595Z


## `|| computerpoop`

User-taught command: `http://chat.stackoverflow.com/transcript/message/24495580#24495580`

**Creator:** Awal Garg

**Creator ID:** 3459110

**Date Created:** 2015-07-16T15:44:51.583Z


## `|| confirm`

User-taught Command: `I can confirm that {1} are accurate.`

**Creator:** JBis

**Creator ID:** 7886229

**Date Created:** Wed Dec 18 2019 17:39:00 GMT-0500 (Eastern Standard Time)


## `|| conspiracy`

User-taught command: `https://twitter.com/officialjaden/status/329768040235413504`

**Creator:** Patsy Issa

**Creator ID:** undefined

**Date Created:** 2014-08-13T13:31:25.480Z


## `|| cooking`

User-taught command: ` https://c2.staticflickr.com/4/3202/2366414413_404186e965_z.jpg`

**Creator:** Awal Garg

**Creator ID:** 3459110

**Date Created:** 2015-07-03T05:49:38.557Z


## `|| copycat`

User-taught command: `Copycat`

**Creator:** TCat

**Creator ID:** 6315209

**Date Created:** 2017-03-24T12:38:21.415Z


## `|| crabbit`

User-taught command: `http://www.wolf-island.com/catalog/images/crabbit_small.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-18T13:35:03.196Z


## `|| crabclub`

User-taught command: `The sole and lonely member of crabclub is ballBreaker. Where are all the other crabs? Will he be alone forever?`

**Creator:** ballBreaker

**Creator ID:** 3968793

**Date Created:** 2017-08-04T20:35:54.359Z


## `|| craigspencetruelove`

User-taught command: ` http://chat.stackoverflow.com/transcript/message/21270518#21270518`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2015-01-30T21:01:23.707Z


## `|| crazycat`

User-taught command: `http://24.media.tumblr.com/tumblr_ly685lHpCu1qmd9v5o1_250.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-04-04T13:30:27.080Z


## `|| crazydog`

User-taught command: `http://static1.gamespot.com/uploads/ignore_jpg_scale_small/255/2550934/2509267-6653462977-tumbl.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-16T10:39:26.086Z


## `|| crustypoop`

User-taught command: ``http://chat.stackoverflow.com/transcript/17?m=9878470#9878470``

**Creator:** Kendall Frey

**Creator ID:** undefined

**Date Created:** 2014-10-24T19:31:01.347Z


## `|| cry`

User-taught command: `http://i.imgur.com/FIbEU4g.gif`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2017-08-22T14:43:05.228Z


## `|| css`

User-taught command: `http://i.imgur.com/kOS3UoP.gif`

**Creator:** Wes

**Creator ID:** undefined

**Date Created:** 2014-04-27T20:21:50.502Z


## `|| cuestop`

User-taught command: `https://i.imgur.com/E6rKtlC.gif`

**Creator:** ShrekOverflow

**Creator ID:** 855760

**Date Created:** 2019-03-18T13:29:11.196Z


## `|| cuntbag`

User-taught command: `http://i.imgur.com/hngkz9m.png`

**Creator:** Stephan Muller

**Creator ID:** 124238

**Date Created:** 2015-02-26T22:15:13.338Z


## `|| cv-pls`

User-taught command: `http://i.stack.imgur.com/cqDXt.jpg`

**Creator:** Stephan Muller

**Creator ID:** 124238

**Date Created:** 2015-02-19T14:11:07.861Z


## `|| d`

User-taught command: `https://www.youtube.com/watch?v=0O82h5F2AN8#t=12`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-08-13T13:43:46.730Z


## `|| dad`

User-taught command: `undefined`

**Creator:** ShrekOverflow

**Creator ID:** 855760

**Date Created:** 2018-03-27T22:50:10.840Z


## `|| dangerzone`

User-taught command: `https://www.youtube.com/watch?v=siwpn14IE7E`

**Creator:** Codeman

**Creator ID:** 598637

**Date Created:** 2016-01-29T21:26:07.060Z


## `|| darktheme`

User-taught command: `https://chrome.google.com/webstore/detail/so-dark-chat-%20/bbkjccfnenmgidehjhaabamobpbaaghh`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2019-05-16T14:11:45.410Z


## `|| datebf`

User-taught command: `avoid talking to me, I'm on my BF's house.`

**Creator:** deadlydragon00

**Creator ID:** 3087778

**Date Created:** 2015-07-20T07:27:36.952Z


## `|| ddg`

User-taught command: `https://duckduckgo.com/?q=$encode($0)`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-11-13T11:52:58.311Z


## `|| deadlydragon`

User-taught command: `A mythical beast!`

**Creator:** deadlydragon00

**Creator ID:** 3087778

**Date Created:** 2015-06-17T09:41:36.290Z


## `|| deep`

User-taught command: `http://www.quickmeme.com/img/a6/a61ca35f2181152325cf451fe6aa6c731a0a02c9f5662ec48d4d711eac77dcf0.jpg`

**Creator:** Patsy Issa

**Creator ID:** undefined

**Date Created:** 2014-10-01T13:31:25.886Z


## `|| devdocs`

User-taught command: (w+) `http://devdocs.io/#q=$0`

**Creator:** fivedigit

**Creator ID:** 920371

**Date Created:** 2015-07-08T11:28:41.499Z


## `|| dgaf`

User-taught command: `http://s3.amazonaws.com/rapgenius/4db77_ORIG-look_at_all_the_fucks_i_give.jpg`

**Creator:** Mosho

**Creator ID:** undefined

**Date Created:** 2014-04-05T16:10:25.731Z


## `|| dice`

User-taught command: `[4](https://www.xkcd.com/221/)`

**Creator:** Awal Garg

**Creator ID:** 3459110

**Date Created:** 2015-05-20T20:08:53.492Z


## `|| didntread`

User-taught command: `http://i0.kym-cdn.com/photos/images/newsfeed/000/154/912/berneydidnotread.gif`

**Creator:** towc

**Creator ID:** undefined

**Date Created:** 2014-09-13T09:18:36.457Z


## `|| dogchase`

User-taught command: `http://25.media.tumblr.com/tumblr_l7iy5lsiWO1qcn249o1_250.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-25T10:16:05.157Z


## `|| doit`

User-taught command: `https://i.ytimg.com/vi/Z6gG3tKDBlk/maxresdefault.jpg`

**Creator:** Kitler

**Creator ID:** 1401094

**Date Created:** 2015-11-19T08:51:08.075Z


## `|| dolphintruth`

User-taught command: ` http://chat.stackoverflow.com/transcript/message/18817124#18817124`

**Creator:** Benjamin Gruenbaum

**Creator ID:** undefined

**Date Created:** 2014-09-11T09:14:22.252Z


## `|| dontask`

User-taught command: `https://chat.stackoverflow.com/transcript/message/43129248#43129248`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2018-07-05T16:17:34.200Z


## `|| dontasktoaskjustaskandaskonce`

User-taught command: `Don't ask to ask, just ask, and ask once!`

**Creator:** Stephan Muller

**Creator ID:** 124238

**Date Created:** 2015-08-17T13:16:30.822Z


## `|| door`

User-taught command: `http://media.giphy.com/media/1WQLKmc1Gfhny/giphy.gif`

**Creator:** Patsy Issa

**Creator ID:** undefined

**Date Created:** 2014-10-09T12:59:37.349Z


## `|| doyouwant`

User-taught command: .* `Do you want $0? Because that's how you get $0.`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2015-12-30T15:01:54.017Z


## `|| dream`

User-taught command: ` https://pics.onsizzle.com/Twitter-When-youre-broke-but-she-believes-5eec21.png`

**Creator:** TheLittleNaruto

**Creator ID:** 1944896

**Date Created:** 2017-04-06T12:58:20.419Z


## `|| drevil`

User-taught command: `http://rlemon.ca:8080/$encode($1)#.png`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-06-15T15:35:40.484Z


## `|| dropsmic`

User-taught command: `http://i.imgur.com/OWuUwGg.gif`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-03-04T20:02:13.687Z


## `|| dson`

User-taught command: `https://vpzom.click/DSON/`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-03-28T14:38:32.836Z


## `|| dudeism`

User-taught command: `http://dudeism.com/Images/dude-vinci.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-11T13:04:38.439Z


## `|| dum`

User-taught command: `http://i.imgur.com/2sREC.gif`

**Creator:** yash

**Creator ID:** undefined

**Date Created:** 2014-08-15T08:17:05.896Z


## `|| dunphy`

User-taught command: 'gives `http://filldunphy.com/$1/$2#.png`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-10-27T14:58:42.547Z


## `|| ead`

User-taught command: `Eat a Dick™`

**Creator:** Second Rikudo

**Creator ID:** 871050

**Date Created:** 2014-12-23T18:31:43.670Z


## `|| eadhebrew`

User-taught command: `תאכל זין™`

**Creator:** Second Rikudo

**Creator ID:** 871050

**Date Created:** 2014-10-31T19:49:02.110Z


## `|| eaditaly`

User-taught command: `mangia un cazzo`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2014-10-31T19:46:31.988Z


## `|| eadnsfw`

User-taught command: `https://i.stack.imgur.com/B7c2L.png`

**Creator:** Second Rikudo

**Creator ID:** 871050

**Date Created:** 2014-11-04T18:39:45.729Z


## `|| eardisease`

User-taught command: `https://twitter.com/pakalupapito/status/623593898347134976`

**Creator:** Awal Garg

**Creator ID:** 3459110

**Date Created:** 2015-12-30T12:18:51.955Z


## `|| echo`

User-taught command: `$0`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-02-23T21:07:48.856Z


## `|| emageht`

User-taught command: `https://github.com/Zirak/jsh/blob/master/public/js/jsh.js#L200-L205`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-11-02T11:29:18.365Z


## `|| encode`

User-taught command: `$encode($0)`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-23T16:00:59.728Z


## `|| encode2`

User-taught command: `$encode($1).$encode($2)`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-23T16:04:41.431Z


## `|| encode3`

User-taught command: `$1/$encode($2)`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-23T16:05:46.883Z


## `|| encode4`

User-taught command: `http://google.com/$1/$encode($2)`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-23T16:07:08.006Z


## `|| endlessloop`

User-taught command: `https://gs1.wac.edgecastcdn.net/8019B6/data.tumblr.com/5b1f0c0aa1af73d7601afe636505e478/tumblr_mxagfrit1E1rsq9eyo2_r1_500.gif`

**Creator:** Patsy Issa

**Creator ID:** undefined

**Date Created:** 2014-05-28T13:20:29.115Z


## `|| englishplease`

User-taught command: ` https://www.youtube.com/watch?v=8Gv0H-vPoDc`

**Creator:** Abhishek Hingnikar

**Creator ID:** undefined

**Date Created:** 2014-10-06T11:31:07.233Z


## `|| entangle`

User-taught Command: `*your target stops moving*`

**Creator:** Tim

**Creator ID:** 1843331

**Date Created:** Mon Dec 16 2019 07:49:03 GMT-0500 (Eastern Standard Time)


## `|| epic`

User-taught command: ` http://i.imgur.com/y3PRp.gif`

**Creator:** monners

**Creator ID:** undefined

**Date Created:** 2014-05-02T04:46:33.032Z


## `|| erase`

User-taught command: `tehe`

**Creator:** Abhishek Hingnikar

**Creator ID:** undefined

**Date Created:** 2014-04-10T18:24:12.342Z


## `|| es6`

User-taught command: are `@BenjaminGruenbaum`

**Creator:** Abhishek Hingnikar

**Creator ID:** undefined

**Date Created:** 2014-04-24T18:37:41.445Z


## `|| escape`

User-taught command: `https://i.imgur.com/KHZ8Clw.gif`

**Creator:** ballBreaker

**Creator ID:** 3968793

**Date Created:** 2017-07-06T15:10:55.060Z


## `|| evaltest`

User-taught command: `123`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-03-06T18:57:50.025Z


## `|| evilfox`

User-taught command: `http://i.stack.imgur.com/KaWD2.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-24T14:03:05.300Z


## `|| evilwolf`

User-taught command: `http://www.mainlesson.com/books/winter/aesop/zpage053.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-22T09:48:11.835Z


## `|| example`

User-taught command: replicate `'Can`

**Creator:** mikedidthis

**Creator ID:** 2312574

**Date Created:** 2015-03-13T12:13:45.244Z


## `|| examplepls`

User-taught command: `Could you please give us an example on http://jsbin.com or http://jsfiddle.net, with the minimal amount of code necessary to reproduce the problem?`

**Creator:** Stephan Muller

**Creator ID:** 124238

**Date Created:** 2015-05-29T13:19:46.549Z


## `|| exceptionchoice`

User-taught command: `https://i.imgur.com/kXfExlv.jpg`

**Creator:** nyconing

**Creator ID:** 5858238

**Date Created:** 2017-07-13T04:04:29.880Z


## `|| excited`

User-taught command: `http://awesomegifs.com/wp-content/uploads/Ron-Swanson-is-excited.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-04T19:17:48.117Z


## `|| exhaustiveead`

User-taught command: `http://i.imgur.com/9SNWZfn.png`

**Creator:** Wesley Crushed

**Creator ID:** 652649

**Date Created:** 2014-11-04T13:02:38.900Z


## `|| expertbeginner`

User-taught command: `http://www.daedtech.com/how-developers-stop-learning-rise-of-the-expert-beginner`

**Creator:** Awal Garg

**Creator ID:** 3459110

**Date Created:** 2015-05-03T22:11:12.219Z


## `|| explainshell`

User-taught command: `explainshell [$1](http://explainshell.com/explain?cmd=$encode($1))`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-05-30T18:36:25.580Z


## `|| explode`

User-taught command: `Explode`

**Creator:** TCat

**Creator ID:** 6315209

**Date Created:** 2017-03-30T13:03:55.224Z


## `|| fabulous`

User-taught command: ` http://i.imgur.com/woGvA2E.gif`

**Creator:** monners

**Creator ID:** undefined

**Date Created:** 2014-04-08T07:01:29.060Z


## `|| facedesk`

User-taught command: `http://i.stack.imgur.com/ayVQc.gif`

**Creator:** Cerbrus

**Creator ID:** 1835379

**Date Created:** 2015-11-18T14:50:54.375Z


## `|| facepalm`

User-taught command: `http://www.eteignezvotreordinateur.com/wp-content/uploads/2014/01/FACEPALM.png`

**Creator:** SteamFire

**Creator ID:** undefined

**Date Created:** 2014-04-10T13:03:13.540Z


## `|| fail`

User-taught command: `http://static.comicvine.com/uploads/scale_super/11111/111111327/3249214-download+%281%29.jpeg`

**Creator:** Greg

**Creator ID:** undefined

**Date Created:** 2014-05-30T18:07:37.092Z


## `|| failsafe`

User-taught command: `https://i.stack.imgur.com/X34sn.png`

**Creator:** Nerd in training

**Creator ID:** 5757162

**Date Created:** 2017-08-24T14:41:32.359Z


## `|| falconpunch`

User-taught command: `https://i.imgur.com/tleQFKU.gif`

**Creator:** ballBreaker

**Creator ID:** 3968793

**Date Created:** 2017-07-06T15:11:51.039Z


## `|| faster`

User-taught command: `https://ericlippert.com/2012/12/17/performance-rant/`

**Creator:** MikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2018-03-12T13:37:23.016Z


## `|| fattie`

User-taught command: `http://chat.stackoverflow.com/transcript/message/19016655#19016655`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-09-21T21:15:35.570Z


## `|| feelsgoodman`

User-taught command: `http://i.imgur.com/3t5lJ.jpg`

**Creator:** Mosho

**Creator ID:** undefined

**Date Created:** 2014-04-08T01:00:26.831Z


## `|| fetish`

User-taught command: `https://3.bp.blogspot.com/-VIKYVKffHqw/UocsFIqxsdI/AAAAAAAAPCE/sHAKeKle_YM/s1600/my-fetish.gif`

**Creator:** Sterling Archer

**Creator ID:** 774078

**Date Created:** 2015-12-01T17:33:40.189Z


## `|| fickle`

User-taught command: `you fickle bitch`

**Creator:** Codeman

**Creator ID:** 598637

**Date Created:** 2016-01-29T21:30:49.944Z


## `|| fieldoffucks`

User-taught command: `http://weknowmemes.com/wp-content/uploads/2014/02/behold-the-field-in-which-i-grow-my-fucks.jpg`

**Creator:** Basement Keyboard Hero

**Creator ID:** 1401094

**Date Created:** 2014-12-01T17:19:20.975Z


## `|| figure1`

User-taught command: 1.](https://gist.github.com/kmoulins/f929b637b6d0213e52ce83f58cbd8719)" `"[See`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-07-21T09:45:14.923Z


## `|| fire`

User-taught command: `https://www.youtube.com/watch?v=XchwE9zVdnw`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-08-21T19:53:17.886Z


## `|| firefox`

User-taught command: `http://i0.kym-cdn.com/photos/images/facebook/000/471/120/6f1.jpeg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-10-16T11:57:39.059Z


## `|| fishgame`

User-taught command: `http://vgif.ru/gifs/154/vgif-ru-25181.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-23T12:19:00.741Z


## `|| fixit`

User-taught command: `https://www.youtube.com/watch?v=1Isjgc0oX0s`

**Creator:** mikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2017-07-18T13:09:22.899Z


## `|| flash`

User-taught command: `this is the flash..how can I help u`

**Creator:** Flash

**Creator ID:** 1865479

**Date Created:** 2015-07-28T11:13:58.036Z


## `|| flatearth`

User-taught Command: `https://assets.kakhiel.nl/uploads/image_fragment/111810/file/default_plat5.jpg`

**Creator:** JBis

**Creator ID:** 7886229

**Date Created:** Fri Dec 06 2019 18:22:51 GMT-0500 (Eastern Standard Time)


## `|| foass`

User-taught command: (\w+) (\w+) `$1 $2`

**Creator:** Zirak

**Creator ID:** 617762

**Date Created:** 2015-05-28T21:30:47.276Z


## `|| focus`

User-taught command: `https://www.youtube.com/watch?v=o1Pu3Jem2yE&t=0m5s`

**Creator:** mikedidthis

**Creator ID:** undefined

**Date Created:** 2014-05-09T08:22:43.356Z


## `|| foo`

User-taught command: baz `//learn`

**Creator:** DoggyBot

**Creator ID:** 8063991

**Date Created:** 2017-08-01T12:55:21.949Z


## `|| foo‮`

User-taught command: `hello`

**Creator:** Shadow Wizard

**Creator ID:** 447356

**Date Created:** 2017-08-01T13:02:13.646Z


## `|| foo2`

User-taught command: `{0}`

**Creator:** Shadow Wizard

**Creator ID:** 447356

**Date Created:** 2017-08-03T14:35:35.242Z


## `|| foo3`

User-taught command: baz `<learn`

**Creator:** Shadow Wizard

**Creator ID:** 447356

**Date Created:** 2017-08-03T14:37:56.920Z


## `|| foo4`

User-taught command: `<boo>`

**Creator:** Shadow Wizard

**Creator ID:** 447356

**Date Created:** 2017-08-03T14:38:58.853Z


## `|| forkingmouse`

User-taught command: ` http://chat.stackoverflow.com/transcript/message/19274036#19274036`

**Creator:** darkyen00

**Creator ID:** undefined

**Date Created:** 2014-10-06T18:58:07.509Z


## `|| format`

User-taught command: `Format your code - hit Ctrl+K before sending and see the [faq](http://chat.stackoverflow.com/faq)`

**Creator:** Jhawins

**Creator ID:** undefined

**Date Created:** 2014-04-22T15:24:36.088Z


## `|| fox`

User-taught command: `Foxes are cool.`

**Creator:** ProgramFOX

**Creator ID:** undefined

**Date Created:** 2014-08-25T16:14:51.172Z


## `|| foxcat`

User-taught command: `http://82f.858.mwp.accessdomain.com/6a00d83452719d69e2019b015637ed970b.jpg`

**Creator:** TCat

**Creator ID:** 6315209

**Date Created:** 2017-03-24T06:16:02.432Z


## `|| foxdance`

User-taught command: `https://s-media-cache-ak0.pinimg.com/originals/81/7e/5b/817e5b84f7c52414dd8f8a4d5f9210ce.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-03T09:40:21.271Z


## `|| foxtransformationjutsu`

User-taught command: ` https://www.ilustra.org/wp-content/uploads/2016/11/tumblrozglpterflbao-147862467748gnk.gif`

**Creator:** TheLittleNaruto

**Creator ID:** 1944896

**Date Created:** 2017-04-12T05:51:00.293Z


## `|| fp`

User-taught command: `http://static.fjcdn.com/pictures/Facepalm_aca0a9_1737991.jpg`

**Creator:** Ryan Ternier

**Creator ID:** 324516

**Date Created:** 2015-02-17T23:43:02.212Z


## `|| fr`

User-taught command: `<user> you seem frustrated. Take a breath.`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-03-23T10:35:54.960Z


## `|| fractal`

User-taught command: `https://upload.wikimedia.org/wikipedia/commons/a/a4/Mandelbrot_sequence_new.gif`

**Creator:** tarboy9

**Creator ID:** 5521842

**Date Created:** 2015-11-03T23:30:47.223Z


## `|| francis`

User-taught command: `https://media.giphy.com/media/l1J9NTcnHC2jgf6hy/giphy.gif`

**Creator:** Kamil Solecki

**Creator ID:** 2534346

**Date Created:** 2017-10-28T03:35:45.164Z


## `|| friday`

User-taught command: `http://media.giphy.com/media/Z4XzJmqMqMlxe/giphy.gif`

**Creator:** mikedidthis

**Creator ID:** undefined

**Date Created:** 2014-04-17T20:54:34.798Z


## `|| friendlyneighborhoodlemon`

User-taught command: `http://i.imgur.com/FdLhXog.jpg`

**Creator:** Second Rikudo

**Creator ID:** 871050

**Date Created:** 2014-11-12T18:19:54.711Z


## `|| fry`

User-taught command: `http://i2.kym-cdn.com/entries/icons/original/000/006/026/futuramafry.jpg`

**Creator:** RUJordan

**Creator ID:** undefined

**Date Created:** 2014-04-10T22:08:11.260Z


## `|| fu`

User-taught command: can `fuck`

**Creator:** Sippy

**Creator ID:** 3846058

**Date Created:** 2015-12-01T14:06:56.782Z


## `|| fuckfuck`

User-taught command: `http://letusnerd.files.wordpress.com/2013/02/aquaman-fuck-you.gif`

**Creator:** Greg

**Creator ID:** undefined

**Date Created:** 2014-05-22T22:51:29.451Z


## `|| fuckthis`

User-taught command: `http://media.giphy.com/media/EtB1yylKGGAUg/giphy.gif`

**Creator:** mikedidthis

**Creator ID:** undefined

**Date Created:** 2014-04-17T20:53:39.735Z


## `|| fuckyeah`

User-taught command: `http://i.imgur.com/IaWF0L1.gif`

**Creator:** Sterling Archer

**Creator ID:** undefined

**Date Created:** 2014-10-15T16:44:24.920Z


## `|| fuddu`

User-taught command: `You are a lame person`

**Creator:** ItachiUchiha

**Creator ID:** 1759128

**Date Created:** 2015-06-14T18:07:34.412Z


## `|| fukkit`

User-taught command: `┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-09-10T19:00:10.634Z


## `|| fun_fact`

User-taught Command: `codeMagic used to own a python (the snake)`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Wed Jan 08 2020 18:34:03 GMT-0500 (Eastern Standard Time)


## `|| funfriday`

User-taught command: `https://www.youtube.com/watch?v=kfVsfOSbJY0`

**Creator:** Nerd in training

**Creator ID:** 5757162

**Date Created:** 2017-08-04T08:02:44.406Z


## `|| g2g`

User-taught command: `https://cdn.meme.am/instances/61758954.jpg`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-04-13T06:10:48.364Z


## `|| garlic`

User-taught command: `http://chat.stackoverflow.com/transcript/29074?m=24732813#24732813`

**Creator:** Ronald Ulysses Swanson

**Creator ID:** 4251625

**Date Created:** 2015-07-30T15:42:26.489Z


## `|| gasoline`

User-taught Command: `https://thumbs.gfycat.com/MeanSmoothItaliangreyhound-mobile.mp4`

**Creator:** ballBreaker

**Creator ID:** 3968793

**Date Created:** Tue Dec 10 2019 14:27:43 GMT-0500 (Eastern Standard Time)


## `|| gayclubs`

User-taught command: ` http://chat.stackoverflow.com/transcript/message/8333542#8333542`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2015-01-08T20:23:03.670Z


## `|| gaze`

User-taught command: `http://www.reactiongifs.com/r/2013/01/gaze.gif`

**Creator:** Rvervuurt

**Creator ID:** 1264481

**Date Created:** 2015-07-29T07:38:54.109Z


## `|| gethis`

User-taught command: `[Gethis](http://stackoverflow.com/teams/165/gethis)`

**Creator:** Jacques Marais

**Creator ID:** 5305938

**Date Created:** 2015-11-14T15:00:12.680Z


## `|| geyser`

User-taught command: `http://www.geyserworld.com/cry2000c.jpg`

**Creator:** Patsy Issa

**Creator ID:** undefined

**Date Created:** 2014-10-06T13:54:59.332Z


## `|| gfy`

User-taught command: `http://i.imgur.com/N0sPvqK.gif`

**Creator:** Stephan Muller

**Creator ID:** 124238

**Date Created:** 2015-02-25T20:21:22.626Z


## `|| goldstar`

User-taught command: ` http://i.imgur.com/ItAIj9m.jpg`

**Creator:** Cereal

**Creator ID:** 2424975

**Date Created:** 2015-06-05T16:56:54.777Z


## `|| good`

User-taught command: `http://www.quickmeme.com/img/eb/eb6140942424697bf997986aac9b2d682cd18a18fe192e4f81ba32f17b629a24.jpg`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-07-13T11:53:24.613Z


## `|| goodmorning`

User-taught command: i `Oh!`

**Creator:** Jagapathi

**Creator ID:** 4044380

**Date Created:** 2017-03-30T05:11:54.045Z


## `|| goodnight`

User-taught command: ` sleep tight my precious little cucumber`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-05-22T21:57:03.525Z


## `|| goog`

User-taught command: `http://lmgtfy.com/?q=$0`

**Creator:** Nik

**Creator ID:** 2038565

**Date Created:** 2015-03-27T13:55:44.801Z


## `|| google`

User-taught Command: `[{1}](https://www.google.com/search?q=[1])`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Wed Dec 11 2019 16:56:09 GMT-0500 (Eastern Standard Time)


## `|| googl𝖾`

User-taught command: `[*](https://www.youtube.com/watch?v=kfVsfOSbJY0) [Canada officially enters recession - Yahoo News](https://www.youtube.com/watch?v=kfVsfOSbJY0) ; [Canada is in recession - Business Insider](https://www.youtube.com/watch?v=kfVsfOSbJY0) ; [Canadian economy enters recession - BBC News - BBC.com](https://www.youtube.com/watch?v=kfVsfOSbJY0)`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-09-04T13:52:13.434Z


## `|| googļe`

User-taught command: `[$1](https://www.youtube.com/watch?v=kfVsfOSbJY0)`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-05-15T14:36:30.048Z


## `|| googleme`

User-taught command: `https://www.google.com/search?q=$encode($0)`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-04-10T16:38:57.218Z


## `|| gravitationalwes`

User-taught command: `http://files.explosm.net/comics/Rob/smelly.png`

**Creator:** Abe

**Creator ID:** 4251625

**Date Created:** 2015-08-08T12:32:59.422Z


## `|| greatest_question_in_universe`

User-taught command: ` http://stackoverflow.com/q/11264734/1078067`

**Creator:** copy

**Creator ID:** undefined

**Date Created:** 2014-04-18T03:33:39.679Z


## `|| greet`

User-taught command: w+ `'Hello,`

**Creator:** Huey

**Creator ID:** 1693947

**Date Created:** 2015-06-29T15:19:58.842Z


## `|| grouphangout`

User-taught command: `http://theroyalhalf.com/wp-content/uploads/2013/08/nerds-3.jpg`

**Creator:** Rvervuurt

**Creator ID:** 1264481

**Date Created:** 2015-07-29T12:27:33.643Z


## `|| gtfo`

User-taught command: `http://www.contestofchampions.net/images/responseimages/skrullsvswhitemartians/referee0pics0or0gtfo.jpeg`

**Creator:** Kendall Frey

**Creator ID:** undefined

**Date Created:** 2014-04-01T12:04:54.941Z


## `|| guesswhatscoming`

User-taught command: `http://i.imgur.com/x2Tac3L.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-18T12:52:39.657Z


## `|| hackerman`

User-taught command: `https://78.media.tumblr.com/71d20086a7b785f916bd0e49cb499a8a/tumblr_np71m42bXR1qedb29o1_500.gif`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-06-15T08:44:50.142Z


## `|| hackmap`

User-taught command: `http://map.ipviking.com/`

**Creator:** towc

**Creator ID:** undefined

**Date Created:** 2014-08-25T07:26:11.791Z


## `|| haha`

User-taught command: `http://i.imgur.com/kleJ2jJ.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-25T22:35:21.752Z


## `|| hahano`

User-taught command: `http://i.stack.imgur.com/hQXac.gif`

**Creator:** Second Rikudo

**Creator ID:** 871050

**Date Created:** 2015-01-26T09:22:47.498Z


## `|| hahastillhere`

User-taught command: `https://www.youtube.com/watch?v=kfVsfOSbJY0&feature=youtube_gdata`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-11T13:08:34.572Z


## `|| hahgay`

User-taught command: `https://www.youtube.com/watch?v=NAj26rVWK14`

**Creator:** Kendall Frey

**Creator ID:** undefined

**Date Created:** 2014-05-09T12:20:55.025Z


## `|| hahkendall`

User-taught command: `http://chat.stackoverflow.com/messages/16215622/history`

**Creator:** Some Guy

**Creator ID:** undefined

**Date Created:** 2014-05-09T12:04:20.385Z


## `|| haillemon`

User-taught command: `http://fc07.deviantart.net/fs14/f/2007/030/0/9/Hitler_lemon_by_Guinnessman.jpg`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-05-13T20:57:08.718Z


## `|| halp`

User-taught Command: `Google it`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Tue Dec 10 2019 16:30:48 GMT-0500 (Eastern Standard Time)


## `|| hammertime`

User-taught command: `STOP`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2015-06-19T18:16:56.232Z


## `|| hangman`

User-taught Command: `https://chat.stackoverflow.com/transcript/15?m=47859599#47859599`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Tue Dec 17 2019 18:58:46 GMT-0500 (Eastern Standard Time)


## `|| hans`

User-taught command: `hans is a catmaster`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-17T17:07:51.389Z


## `|| hans1984`

User-taught command: `ayeee @Hans`

**Creator:** ballBreaker

**Creator ID:** 3968793

**Date Created:** 2017-03-17T17:23:26.838Z


## `|| hanscat`

User-taught command: `https://i.ytimg.com/vi/Xo3hCu3hmYE/hqdefault.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-14T13:07:12.784Z


## `|| happybirthday`

User-taught command: `http://i.imgur.com/cDNL3Hd.jpg`

**Creator:** FrontpageExpert

**Creator ID:** 4251625

**Date Created:** 2015-03-26T09:53:52.964Z


## `|| happyfox`

User-taught command: `https://pbs.twimg.com/media/DBEVO1oXoAAOwkN.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-03T09:41:46.808Z


## `|| happyfriday`

User-taught command: `t`

**Creator:** Spencer Ruport

**Creator ID:** 52551

**Date Created:** 2015-02-27T21:41:08.449Z


## `|| hashtagloktarproblems`

User-taught command: `http://i.imgur.com/KwBxNMc.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-05-26T12:31:11.306Z


## `|| haskell`

User-taught command: `http://chat.stackoverflow.com/transcript/message/35698571#35698571`

**Creator:** mikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2017-04-13T18:21:46.434Z


## `|| headasplode`

User-taught command: `http://static.comicvine.com/uploads/original/11115/111150663/3755940-0829386391-6wj2d.gif`

**Creator:** Sippy

**Creator ID:** 3846058

**Date Created:** 2015-02-25T20:18:39.660Z


## `|| heart`

User-taught command: `♥`

**Creator:** Shadow Wizard

**Creator ID:** 447356

**Date Created:** 2017-08-01T13:03:24.162Z


## `|| hector`

User-taught command: `https://chat.stackoverflow.com/transcript/message/42858366#42858366`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-06-08T13:32:46.910Z


## `|| hehe`

User-taught command: `http://i.stack.imgur.com/rWZzX.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-06-03T13:02:45.018Z


## `|| hellno`

User-taught command: `http://24.media.tumblr.com/tumblr_lgpu4kNwVb1qcn249o1_100.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-04-13T07:56:30.753Z


## `|| hello(name)`

User-taught command: `@.name. Welcome to JS Chat room`

**Creator:** Awal Garg

**Creator ID:** undefined

**Date Created:** 2014-05-09T16:19:27.171Z


## `|| hellyeah`

User-taught command: `https://www.youtube.com/watch?v=8aLtGwHqX8M`

**Creator:** mikedidthis

**Creator ID:** undefined

**Date Created:** 2014-05-09T08:27:53.137Z


## `|| h𝖾lp`

User-taught command: `Information on interacting with me can be found at [this page](https://www.youtube.com/watch?v=kfVsfOSbJY0)`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-09-04T14:10:18.360Z


## `|| helpavamp`

User-taught command: `http://i.stack.imgur.com/tgIAN.gif`

**Creator:** mikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2017-04-19T15:36:16.657Z


## `|| helpmedrdick!`

User-taught command: `https://www.youtube.com/watch?v=KEChIzlaPjI`

**Creator:** Squirrel in training

**Creator ID:** 5757162

**Date Created:** 2018-07-03T09:31:06.622Z


## `|| hem`

User-taught command: `hemlata is a good gal. [Ita](http://stackoverflow.com/users/1759128/itachiuchiha) is her teacher.`

**Creator:** TheLittleNaruto

**Creator ID:** 1944896

**Date Created:** 2017-04-05T16:51:56.646Z


## `|| hi`

User-taught command: `Hello`

**Creator:** Shell

**Creator ID:** undefined

**Date Created:** 2014-10-15T03:54:36.093Z


## `|| hiDave`

User-taught Command: `Dave, you're lame`

**Creator:** codeMagic

**Creator ID:** 1380752

**Date Created:** Wed Dec 11 2019 15:20:54 GMT-0500 (Eastern Standard Time)


## `|| highfive`

User-taught command: `http://media.giphy.com/media/g0hFNupMHA74s/giphy.gif`

**Creator:** Rvervuurt

**Creator ID:** 1264481

**Date Created:** 2015-09-03T11:48:07.794Z


## `|| hk47`

User-taught command: `https://www.youtube.com/watch?v=Vg1gTas7OAA`

**Creator:** mikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2018-01-18T18:50:44.898Z


## `|| hl`

User-taught command: `Hey! Listen!`

**Creator:** Professor Squirrel

**Creator ID:** 1015495

**Date Created:** 2018-02-07T21:17:29.858Z


## `|| hmm`

User-taught command: `http://i.stack.imgur.com/xKdyP.gif`

**Creator:** Lee Butler

**Creator ID:** 3033062

**Date Created:** 2018-09-26T10:27:12.049Z


## `|| hmmm`

User-taught command: `http://i.imgur.com/ZU014ft.gif`

**Creator:** Lee Butler

**Creator ID:** 3033062

**Date Created:** 2018-09-19T12:41:27.752Z


## `|| hmmmm`

User-taught command: `https://i.imgur.com/8DxmZY6.gif`

**Creator:** Captain Obvious

**Creator ID:** 3033062

**Date Created:** 2019-06-09T11:23:44.540Z


## `|| hmmmmm`

User-taught command: `https://i.imgur.com/rnNm1YG.gif`

**Creator:** Captain Obvious

**Creator ID:** 3033062

**Date Created:** 2019-06-09T11:24:03.133Z


## `|| hmmmmmm`

User-taught command: `https://i.imgur.com/kpOf6bu.png`

**Creator:** Captain Obvious

**Creator ID:** 3033062

**Date Created:** 2019-06-09T11:24:53.429Z


## `|| hogan`

User-taught command: `http://static.sportskeeda.com/wp-content/uploads/2014/04/hulk_hogan_ripping_shirt-2152200.jpg`

**Creator:** Mosho

**Creator ID:** undefined

**Date Created:** 2014-10-17T17:41:56.326Z


## `|| holdthumbs`

User-taught command: `https://iwanttobeapinup.files.wordpress.com/2014/02/kciuki1.jpg`

**Creator:** Kamil Solecki

**Creator ID:** 2534346

**Date Created:** 2017-11-28T14:06:06.111Z


## `|| holytrinity`

User-taught command: `https://i.stack.imgur.com/AyUqI.jpg`

**Creator:** MikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2019-04-26T21:06:36.460Z


## `|| horoscope`

User-taught command: `https://pbs.twimg.com/media/B0vCSTXCIAEQjVE.jpg`

**Creator:** towc

**Creator ID:** undefined

**Date Created:** 2014-10-27T15:19:01.087Z


## `|| horsecaught`

User-taught command: `https://s-media-cache-ak0.pinimg.com/736x/c8/8f/f9/c88ff96d0f9fa5cf8afb30d36a0c47e2.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-07-12T11:15:43.351Z


## `|| horseface`

User-taught command: `http://p.fod4.com/upload/aff3567c9abaad4b798a350dc1e1b1a3/EDfzNozQWusGPn3WDmBw_Horse%20Smack%20Faces.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-04-20T10:57:22.736Z


## `|| how_old`

User-taught command: `$rand(8,120)`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-17T07:35:22.782Z


## `|| howtalk`

User-taught command: `http://chat.stackoverflow.com/faq#talk`

**Creator:** Jhawins

**Creator ID:** 1596138

**Date Created:** 2015-05-28T18:23:32.501Z


## `|| htmlhelp`

User-taught command: `http://www.neopets.com/help/html1.phtml`

**Creator:** Meredith

**Creator ID:** 2125913

**Date Created:** 2017-04-11T17:44:02.855Z


## `|| htmlwithregex`

User-taught command: `https://stackoverflow.com/a/1732454/4364057`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-04-20T09:03:02.158Z


## `|| humpday`

User-taught command: `https://www.youtube.com/watch?v=Vs5QJi-dX-4`

**Creator:** Rvervuurt

**Creator ID:** 1264481

**Date Created:** 2015-07-15T13:26:21.844Z


## `|| hungry`

User-taught command: `http://vignette3.wikia.nocookie.net/flylikeabird3/images/3/3b/Hamburger.jpg/revision/latest?cb=20140610172401`

**Creator:** tarboy9

**Creator ID:** 5521842

**Date Created:** 2015-11-04T00:44:48.448Z


## `|| hwat`

User-taught command: `http://i.imgur.com/gTOJH0E.jpg`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-03-17T22:00:21.291Z


## `|| hype`

User-taught command: `https://chat.stackoverflow.com/transcript/message/43234431#43234431`

**Creator:** Lee Butler

**Creator ID:** 3033062

**Date Created:** 2018-07-12T14:15:49.851Z


## `|| hypnomouse`

User-taught command: `https://cdn.discordapp.com/attachments/387932267542216706/477048783255896074/glory.gif`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-08-09T09:51:51.027Z


## `|| i_am_a_merciful_king`

User-taught command: ` http://chat.stackoverflow.com/transcript/message/27175763#27175763`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2015-11-29T18:28:53.450Z


## `|| iccheguri`

User-taught command: `Hey Sagor`

**Creator:** Icche Guri

**Creator ID:** 6379197

**Date Created:** 2017-03-20T09:05:34.037Z


## `|| icedog`

User-taught command: `https://i.stack.imgur.com/1w1uC.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-22T12:38:30.033Z


## `|| icefox`

User-taught command: `http://www.syri.net/uploads/syri.net/images/2017/January/14/auto_dhelpra_1484404117-90512601484408730.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-22T09:46:11.745Z


## `|| ifs`

User-taught command: `https://chat.stackoverflow.com/transcript/message/42012869#42012869`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-04-09T07:15:43.668Z


## `|| ifuckedup`

User-taught command: `http://www.reactiongifs.us/wp-content/uploads/2013/08/i_fucked_up_will_ferrell.gif`

**Creator:** Shmiddty

**Creator ID:** 1585400

**Date Created:** 2015-05-01T17:46:26.293Z


## `|| ignore`

User-taught command: @?([A-Za-z0-9]+) `Ignoring `

**Creator:** Jacques Marais

**Creator ID:** 5305938

**Date Created:** 2015-12-02T12:40:59.604Z


## `|| ignoreme`

User-taught command: `https://www.youtube.com/watch?v=FMNJuSl91qY`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2017-04-06T15:27:29.455Z


## `|| ignorethelemon`

User-taught command: `https://chat.stackoverflow.com/transcript/message/22979625#22979625`

**Creator:** towc

**Creator ID:** 3161092

**Date Created:** 2015-04-28T18:34:55.825Z


## `|| iguess`

User-taught command: `https://i.imgur.com/Txf09ql.gif`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2018-01-03T18:57:46.465Z


## `|| imbored`

User-taught command: `http://www.pointless.com/`

**Creator:** tarboy9

**Creator ID:** 5521842

**Date Created:** 2015-11-03T23:45:47.516Z


## `|| img`

User-taught command: `https://www.google.com/search?q=$encode($0)&safe=off&tbm=isch`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-11-25T10:03:19.331Z


## `|| import*as'three'`

User-taught command: body `Import`

**Creator:** Learn How To Be Transparent

**Creator ID:** 6820627

**Date Created:** 2017-08-16T01:50:50.182Z


## `|| impossibiru`

User-taught command: `https://pics.me.me/impossibru-16341104.png`

**Creator:** Kamil Solecki

**Creator ID:** 2534346

**Date Created:** 2017-08-11T08:27:51.154Z


## `|| inception`

User-taught command: 'it `inception-content`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2014-10-29T19:15:11.047Z


## `|| indeed`

User-taught command: `http://i.stack.imgur.com/N7fDI.jpg`

**Creator:** Kendall Frey

**Creator ID:** undefined

**Date Created:** 2014-05-22T17:42:04.464Z


## `|| infiniteriot`

User-taught command: `http://i.imgur.com/xBQOzc4.gif`

**Creator:** SomeKittens Ux2666

**Creator ID:** undefined

**Date Created:** 2014-04-07T06:02:34.974Z


## `|| inlinecodelecture`

User-taught command: `http://i.imgur.com/bHslHHZ.jpg`

**Creator:** Obi Wan Wesabi

**Creator ID:** undefined

**Date Created:** 2014-08-16T00:23:43.197Z


## `|| inreplytoyourcode`

User-taught command: `http://i.minus.com/iESfhilHsCriF.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-18T12:57:56.855Z


## `|| insanefox`

User-taught command: `http://i.stack.imgur.com/m4ASL.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-24T14:09:02.035Z


## `|| insanehorse`

User-taught command: `http://p.fod4.com/upload/aff3567c9abaad4b798a350dc1e1b1a3/iG5KAHHESsK5lPxtXyqZ_Horse%20WTF.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-02T12:24:54.778Z


## `|| inspect`

User-taught command: `https://i.imgflip.com/phgli.jpg`

**Creator:** Rvervuurt

**Creator ID:** 1264481

**Date Created:** 2015-08-13T13:24:20.924Z


## `|| instagram`

User-taught command: `http://www.explosm.net/db/files/Comics/Kris/water.png`

**Creator:** Some Guy

**Creator ID:** undefined

**Date Created:** 2014-04-04T16:02:50.304Z


## `|| installjavascript`

User-taught command: ` http://chat.stackoverflow.com/transcript/message/9522001#9522001;`

**Creator:** Badger Girl

**Creator ID:** undefined

**Date Created:** 2014-04-08T21:39:49.268Z


## `|| insultme`

User-taught command: `you cock juggling thundercunt`

**Creator:** Codeman

**Creator ID:** 598637

**Date Created:** 2016-01-29T21:32:36.509Z


## `|| inur`

User-taught command: `yo dawg i herd u lik $0 so i put sum $0 in ur $0 so u can $0 while u $0`

**Creator:** Ryan Kinal

**Creator ID:** undefined

**Date Created:** 2014-04-15T13:02:54.827Z


## `|| invalid`

User-taught command: `https://i.stack.imgur.com/kq06Q.jpg`

**Creator:** Metallkiller

**Creator ID:** 4364057

**Date Created:** 2017-10-16T10:45:27.994Z


## `|| i‬‬‬‬‫s`

User-taught command: `Yes.`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2016-01-10T12:50:23.369Z


## `|| isentropyreversible`

User-taught command: `https://i.stack.imgur.com/4rUgB.png`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-04-20T12:23:25.954Z


## `|| israel`

User-taught command: ` http://chat.stackoverflow.com/transcript/message/22976625#22976625`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2015-04-28T16:11:23.131Z


## `|| isrebecca`

User-taught command: `http://output.jsbin.com/yenumu#$0`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-31T14:06:57.973Z


## `|| italia`

User-taught command: `https://www.youtube.com/watch?v=m1TnzCiUSI0`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2018-06-15T13:24:08.545Z


## `|| its_a_trap`

User-taught command: `http://i.imgur.com/aEIepW3.gif`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-05-08T15:39:01.891Z


## `|| itsatrap`

User-taught command: `'@Zirak`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-01-16T13:44:55.648Z


## `|| iwantsushi<>`

User-taught command: `https://www.flickr.com/photos/ifindkarma/8706138570`

**Creator:** Rusty

**Creator ID:** 2966617

**Date Created:** 2015-05-08T17:38:23.618Z


## `|| jab`

User-taught command: `Jab is awesome. jab is life. Jab is all things good in java`

**Creator:** JABFreeware

**Creator ID:** 1739957

**Date Created:** 2017-04-07T15:50:50.831Z


## `|| jagapathi`

User-taught command: `http://i1174.photobucket.com/albums/r603/gondhijagapathi/IMG-20170328-WA0002_zpscfbegmvn.jpg`

**Creator:** Jagapathi

**Creator ID:** 4044380

**Date Created:** 2017-03-28T12:08:11.009Z


## `|| jan`

User-taught command: `the person who doesnt likes boobs so destroys them from existance`

**Creator:** Abhishek Hingnikar

**Creator ID:** undefined

**Date Created:** 2014-04-24T19:44:43.386Z


## `|| jandy`

User-taught command: `THE GAME!`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-08-27T13:40:35.769Z


## `|| java`

User-taught command: `That didn't make much sense. Did you mean C#?`

**Creator:** mikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2017-03-23T15:17:38.559Z


## `|| java!`

User-taught command: `That didn't make much sense. Maybe you meant: C#!`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-04-10T07:25:59.713Z


## `|| jhmckimm`

User-taught command: `http://chat.stackoverflow.com/transcript/message/36268713#36268713`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-03-23T14:56:23.210Z


## `|| jicamajs`

User-taught command: `https://github.com/jicamajs/jicamajs`

**Creator:** tweray

**Creator ID:** 2271112

**Date Created:** 2016-01-25T17:48:48.707Z


## `|| jituthewise`

User-taught command: `http://chat.stackoverflow.com/transcript/17?m=20055954#20055954`

**Creator:** Zirak

**Creator ID:** 617762

**Date Created:** 2014-11-22T12:10:03.468Z


## `|| jordan`

User-taught command: `http://ts1.mm.bing.net/th?id=HN.608012849224287520&pid=1.7#.png`

**Creator:** Kendall Frey

**Creator ID:** undefined

**Date Created:** 2014-05-15T22:37:06.089Z


## `|| jordansfavorite`

User-taught command: `http://chat.stackoverflow.com/transcript/message/34369826#34369826`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2017-03-17T14:53:47.824Z


## `|| jpeg`

User-taught command: `https://www.youtube.com/watch?v=QEzhxP-pdos`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-03-12T18:31:35.177Z


## `|| jquery_celeb`

User-taught command: `  https://chat.stackoverflow.com/transcript/message/43562750#43562750`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2018-08-10T21:13:52.210Z


## `|| jqueryquery`

User-taught command: `http://i.imgur.com/50s5mdU.png`

**Creator:** SomeKittens

**Creator ID:** 1216976

**Date Created:** 2015-04-29T00:14:25.852Z


## `|| js`

User-taught command: ``'1'+'1'-'1'` equals `10``

**Creator:** Captain Obvious

**Creator ID:** 3033062

**Date Created:** 2019-05-16T09:05:42.488Z


## `|| jsbin`

User-taught command: `http://jsbin.com`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-21T12:53:25.374Z


## `|| jsfiddle`

User-taught command: (.*) `[JavaScript stupid fiddle](http://jsfiddle.net)`

**Creator:** pootis

**Creator ID:** 1947276

**Date Created:** 2016-01-08T12:36:00.760Z


## `|| jsfiddle_sad`

User-taught command: ` JSFiddle puts your code in a window.onload = function() {.. by default so inline scripts won't work, if you want to opt out of that behavior change that to 'body/head - no wrap' in the menu to the left`

**Creator:** Benjamin Gruenbaum

**Creator ID:** undefined

**Date Created:** 2014-09-08T09:20:09.871Z


## `|| jswat`

User-taught command: `https://www.destroyallsoftware.com/talks/wat`

**Creator:** mikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2016-01-29T18:54:32.583Z


## `|| juice`

User-taught command: `http://www.quickmeme.com/img/5e/5e6dc57ff9d36de801497213a741d977b3085daf5f4bb9953f5549780a527db2.jpg`

**Creator:** Patsy Issa

**Creator ID:** undefined

**Date Created:** 2014-09-29T11:40:11.079Z


## `|| justask`

User-taught command: `https://chat.stackoverflow.com/transcript/message/38882778#38882778`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2018-07-06T13:06:07.725Z


## `|| justsayhello`

User-taught command: `Hello World!`

**Creator:** Sufi Developer

**Creator ID:** undefined

**Date Created:** 2014-08-08T14:52:48.768Z


## `|| kath-naruto`

User-taught command: `They are only Friends. @TheLittleNaruto sorry bro , you have been friendzoned!!`

**Creator:** Sword

**Creator ID:** 3231320

**Date Created:** 2015-07-06T11:54:49.407Z


## `|| kendall`

User-taught command: `http://s3.amazonaws.com/rapgenius/4db77_ORIG-look_at_all_the_fucks_i_give.jpg`

**Creator:** Mosho

**Creator ID:** undefined

**Date Created:** 2014-04-09T16:09:27.935Z


## `|| kendallfrey`

User-taught command: `http://www.myfacewhen.net/uploads/3025-if-you-know-what-i-mean.png`

**Creator:** Abhishek Hingnikar

**Creator ID:** undefined

**Date Created:** 2014-04-04T19:16:32.959Z


## `|| kendallhumps`

User-taught command: `http://chat.stackoverflow.com/transcript/17?m=14691109#14691109`

**Creator:** Jhawins

**Creator ID:** undefined

**Date Created:** 2014-05-20T18:43:58.108Z


## `|| kendallpedo`

User-taught command: ` http://chat.stackoverflow.com/transcript/message/19579298#19579298`

**Creator:** Benjamin Gruenbaum

**Creator ID:** undefined

**Date Created:** 2014-10-23T20:29:49.812Z


## `|| kendalwat`

User-taught command: `https://i.imgur.com/8ygE5Ea.png`

**Creator:** Madara Uchiha

**Creator ID:** 871050

**Date Created:** 2018-02-01T10:08:34.849Z


## `|| kfc`

User-taught command: `http://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/300px-KFC_logo.svg.png`

**Creator:** NullReference

**Creator ID:** undefined

**Date Created:** 2014-04-10T09:15:57.235Z


## `|| kidssay`

User-taught command: `https://chat.stackoverflow.com/transcript/message/38214586#38214586`

**Creator:** Kamil Solecki

**Creator ID:** 2534346

**Date Created:** 2017-07-19T16:14:07.994Z


## `|| kieran2`

User-taught command: `https://www.youtube.com/watch?v=JImcvtJzIK8`

**Creator:** Nerd in training

**Creator ID:** 5757162

**Date Created:** 2017-07-17T09:50:52.970Z


## `|| killerswork`

User-taught command: `<user> [Here you go](https://codepen.io/anon/pen/mxwNqo)`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-03-23T15:26:46.194Z


## `|| killwithfire`

User-taught command: ` http://files.sharenator.com/232628.jpg`

**Creator:** Ryan Ternier

**Creator ID:** undefined

**Date Created:** 2014-08-12T21:51:50.445Z


## `|| kimapproves`

User-taught command: ` http://i.stack.imgur.com/ala0Z.gif`

**Creator:** monners

**Creator ID:** undefined

**Date Created:** 2014-04-23T02:22:00.401Z


## `|| kinkykendall`

User-taught command: `http://chat.stackoverflow.com/transcript/message/26327476#26327476`

**Creator:** Zirak

**Creator ID:** 617762

**Date Created:** 2015-10-16T15:13:36.604Z


## `|| kirby`

User-taught command: `<(''<) (^''^) (>'')> <( '' )>`

**Creator:** Pheonixblade9

**Creator ID:** 598637

**Date Created:** 2015-02-17T23:41:37.195Z


## `|| kitler`

User-taught command: `http://i.imgur.com/tQtflNA.jpg`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-08-08T14:45:49.385Z


## `|| kitteninterest`

User-taught command: `http://laserturtle.com/o/00006873.jpg`

**Creator:** SomeKittens Ux2666

**Creator ID:** undefined

**Date Created:** 2014-04-21T21:11:41.368Z


## `|| kramb`

User-taught command: `https://chat.stackoverflow.com/transcript/message/38358835#38358835`

**Creator:** Kieran

**Creator ID:** 7096052

**Date Created:** 2017-07-28T09:00:06.781Z


## `|| kumar`

User-taught command: `the most handsome boy in this universe`

**Creator:** TheLittleNaruto

**Creator ID:** undefined

**Date Created:** 2014-08-19T07:48:41.557Z


## `|| kunt`

User-taught command: `http://stackoverflow.com/users/829835/rlemon`

**Creator:** Patsy Issa

**Creator ID:** 1401094

**Date Created:** 2014-11-21T14:52:13.904Z


## `|| lana`

User-taught command: `http://i.imgur.com/0N0I9ne.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-05-23T13:57:14.522Z


## `|| lazycat`

User-taught command: `https://media.giphy.com/media/3ohze3EcNSDa8ZPfDq/giphy.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-21T13:19:09.277Z


## `|| leavemealone`

User-taught command: ` http://i.stack.imgur.com/RzDdA.png`

**Creator:** Zach Saucier

**Creator ID:** undefined

**Date Created:** 2014-09-02T00:03:29.696Z


## `|| lemon`

User-taught command: `https://i.imgur.com/FIbEU4g.gif`

**Creator:** MikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2019-03-05T19:23:35.378Z


## `|| lenny`

User-taught command: `( ͡° ͜ʖ ͡°)`

**Creator:** mikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2017-03-23T16:36:24.858Z


## `|| letitgo`

User-taught command: `https://i.stack.imgur.com/NHP1P.gif`

**Creator:** Madara Uchiha

**Creator ID:** 871050

**Date Created:** 2015-04-27T13:43:49.022Z


## `|| libby`

User-taught command: `http://i.stack.imgur.com/9tc42.gif`

**Creator:** Second Rikudo

**Creator ID:** undefined

**Date Created:** 2014-05-23T20:54:11.329Z


## `|| lick`

User-taught command: (.*) `Mmmmmmm @$0 tastes just like schinkenspeck!`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-12-31T03:21:39.919Z


## `|| lifeban`

User-taught command: `Huzzah! SISTITE`

**Creator:** Jhawins

**Creator ID:** undefined

**Date Created:** 2014-04-03T14:36:53.131Z


## `|| lightsout`

User-taught command: `https://media.giphy.com/media/WM9GqHtTrYRuU/giphy.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-21T09:01:22.556Z


## `|| list`

User-taught command: `tobacconist ziraksadvice gayclubs loktar zirak_naked slidepoop lol mhm roomowner buttstuff greatest_question_in_universe abhishekpornfreak`

**Creator:** Benjamin Gruenbaum

**Creator ID:** undefined

**Date Created:** 2014-04-28T11:40:11.128Z


## `|| literallycanteven`

User-taught command: `http://2.bp.blogspot.com/-qjEYxlRV3hE/VD-gikAWX0I/AAAAAAAA_So/_N5yCijYTTo/s0/how-to-even-for-dummies.jpg`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2014-10-29T13:39:43.699Z


## `|| llike`

User-taught command: `👍`

**Creator:** mr5

**Creator ID:** 2304737

**Date Created:** 2018-05-03T10:31:12.590Z


## `|| lmao`

User-taught command: `https://i.imgur.com/MGFj4Ml.jpg`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2018-07-06T10:15:05.486Z


## `|| lmgtfy`

User-taught Command: `[{1}](https://www.lmgtfy.com?q=[1])`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Wed Dec 11 2019 15:31:47 GMT-0500 (Eastern Standard Time)


## `|| locate_keystore`

User-taught Command: `!https://cdn.shopify.com/s/files/1/0322/6897/files/404-permalink.png?432866230176278629`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Tue Dec 10 2019 14:12:41 GMT-0500 (Eastern Standard Time)


## `|| lofi`

User-taught Command: `https://www.youtube.com/watch?v=DfNXZ-VLcFc`

**Creator:** Mehdi B.

**Creator ID:** 9997227

**Date Created:** Tue Dec 10 2019 14:25:34 GMT-0500 (Eastern Standard Time)


## `|| loktarownsm&ms`

User-taught command: `http://chat.stackoverflow.com/transcript/message/20346611#20346611`

**Creator:** someDoge

**Creator ID:** 1596138

**Date Created:** 2014-12-08T17:35:45.491Z


## `|| lol`

User-taught command: `That didn't make much sense. Use the `!!/help` command to learn more.`

**Creator:** Awal Garg

**Creator ID:** 3459110

**Date Created:** 2015-05-07T10:34:58.384Z


## `|| lolface`

User-taught command: `http://i0.kym-cdn.com/photos/images/newsfeed/000/166/464/tumblr_lozdsb0bKx1qbnd1c.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-07-12T13:26:48.405Z


## `|| longneck`

User-taught command: `http://i1.kym-cdn.com/entries/icons/original/000/002/081/long-neck-reaction.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-07-06T15:13:15.295Z


## `|| loremflickr`

User-taught command: `http://loremflickr.com/g/300/200/$0/all#.jpg`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-11-03T20:54:59.386Z


## `|| lorempixel`

User-taught command: `http://lorempixel.com/300/200/$0#.jpg`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-11-03T21:40:30.361Z


## `|| lorempixel2`

User-taught command: `http://lorempixel.com/300/200/$1/$2/$3#.jpg`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-11-03T21:39:30.344Z


## `|| lorempizza`

User-taught command: ` http://lorempizza.com/i/380/240`

**Creator:** Josh LeBlanc

**Creator ID:** 2424975

**Date Created:** 2015-08-11T13:21:19.966Z


## `|| lotusnotes`

User-taught command: `https://i.stack.imgur.com/WHNm5.png`

**Creator:** MikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2018-03-16T16:13:24.510Z


## `|| loudnoise`

User-taught command: `https://i.imgur.com/1q16KFJ.gif`

**Creator:** towc

**Creator ID:** 3161092

**Date Created:** 2018-02-16T16:11:32.556Z


## `|| love`

User-taught Command: `kill`

**Creator:** Anthony Sette

**Creator ID:** 9307045

**Date Created:** Sun Nov 10 2019 23:04:30 GMT-0500 (Eastern Standard Time)


## `|| lovedfox`

User-taught command: `http://i.imgur.com/sHXF8.gif`

**Creator:** nyconing

**Creator ID:** 5858238

**Date Created:** 2017-07-13T10:01:26.160Z


## `|| ly`

User-taught Command: `https://data.whicdn.com/images/95202541/original.jpg`

**Creator:** grrigore

**Creator ID:** 7972851

**Date Created:** Tue Dec 10 2019 14:12:38 GMT-0500 (Eastern Standard Time)


## `|| mac`

User-taught command: `https://chat.stackoverflow.com/transcript/7?m=37707491#37707491`

**Creator:** Kamil Solecki

**Creator ID:** 2534346

**Date Created:** 2017-08-07T14:44:30.795Z


## `|| macaroni`

User-taught command: `http://i.stack.imgur.com/OiPpd.jpg`

**Creator:** Jhawins

**Creator ID:** undefined

**Date Created:** 2014-04-16T15:26:15.510Z


## `|| magic`

User-taught command: `(∩ ͡° ͜ʖ ͡°)⊃━☆ﾟ. * ･ ｡ ᵀᴴᴱ ᴳᴬᴹᴱ`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-10-23T13:36:38.510Z


## `|| magic2`

User-taught command: `http://i.imgur.com/iZcUNxH.gif`

**Creator:** darkyen00

**Creator ID:** undefined

**Date Created:** 2014-10-23T10:53:23.078Z


## `|| magic3`

User-taught command: `http://funnymelon.com/pics/Magic-isn-t-real-147.jpg`

**Creator:** Cerbrus

**Creator ID:** 1835379

**Date Created:** 2014-10-31T15:15:52.190Z


## `|| mana`

User-taught command: `https://www.youtube.com/watch?v=9ytei6bu7kQ`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-03-28T12:31:27.146Z


## `|| manigga`

User-taught command: `https://warosu.org/data/fa/img/0074/56/1387643978485.jpg`

**Creator:** Mosho

**Creator ID:** undefined

**Date Created:** 2014-04-05T04:10:06.029Z


## `|| mannips`

User-taught command: `http://chat.stackoverflow.com/transcript/message/21063587#21063587`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2015-01-20T13:52:21.646Z


## `|| map`

User-taught command: `https://maps.googleapis.com/maps/api/staticmap?center=$0&size=640x480&maptype=roadmap#.jpg`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2015-02-26T03:18:34.280Z


## `|| match`

User-taught command: `http://output.jsbin.com/yenumu#$1#$2`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-31T15:08:51.335Z


## `|| mauker_found_it`

User-taught Command: `Hey @AdamMc331, [Mauker found your keystore](https://i.stack.imgur.com/BnU6t.png)`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Mon Dec 30 2019 15:21:36 GMT-0500 (Eastern Standard Time)


## `|| mbn`

User-taught command: `[Array.prototype.$encode($1)()](https://www.youtube.com/watch?v=kfVsfOSbJY0)`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-11-13T15:39:19.423Z


## `|| mcve`

User-taught command: ` If you would like assistance, please create a [Minimal, Complete, and Verifiable Example](http://stackoverflow.com/help/mcve)`

**Creator:** Shmiddty

**Creator ID:** 1585400

**Date Created:** 2015-05-22T19:07:44.879Z


## `|| mdnfix`

User-taught command: 'searches `https://developer.mozilla.org/en-US/search?q=$encode($1)`

**Creator:** Luggage

**Creator ID:** 956900

**Date Created:** 2018-04-26T21:57:00.730Z


## `|| mecow`

User-taught command: `Moo...MOOOOOOOOOOOOOOOO!`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-22T13:20:15.274Z


## `|| med`

User-taught command: `https://www.youtube.com/watch?v=xzpndHtdl9A`

**Creator:** Sippy

**Creator ID:** 3846058

**Date Created:** 2015-02-26T11:02:23.765Z


## `|| mehow`

User-taught command: `I'm a little kitty! Meow Meooowwww`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-20T11:22:42.094Z


## `|| meinneger`

User-taught command: `http://img.4plebs.org/boards/tg/image/1374/52/1374520553419.jpg`

**Creator:** Mosho

**Creator ID:** undefined

**Date Created:** 2014-04-05T04:11:09.109Z


## `|| meltingcat`

User-taught command: `http://static.boredpanda.com/blog/wp-content/uploads/2017/03/58bebf88b8760_Ib65XTK__605.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-01T09:58:51.334Z


## `|| meow`

User-taught command: `http://thecatapi.com/api/images/get?format=src&type=gif&random=$rand(1,1000000)#.gif`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2014-12-11T14:07:21.229Z


## `|| mexicanwave`

User-taught command: `http://i.imgur.com/zIScfI9.gif`

**Creator:** Ronald Ulysses Swanson

**Creator ID:** 4251625

**Date Created:** 2015-07-28T16:08:33.393Z


## `|| microsoft`

User-taught command: `http://i.imgur.com/Nejo9td.jpg`

**Creator:** jyrka

**Creator ID:** undefined

**Date Created:** 2014-05-15T22:42:31.162Z


## `|| mikesdeliciousd`

User-taught command: `http://chat.stackoverflow.com/transcript/message/19095410#19095410`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-09-25T13:47:49.262Z


## `|| miketheliar`

User-taught command: `https://chat.stackoverflow.com/transcript/message/38688481#38688481`

**Creator:** Metallkiller

**Creator ID:** 4364057

**Date Created:** 2017-08-23T13:27:57.069Z


## `|| milkgame`

User-taught command: `http://i.imgur.com/wFdfyJW.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-21T12:22:17.552Z


## `|| min-reprex`

User-taught command: `https://i.stack.imgur.com/PqhLO.png`

**Creator:** MikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2019-05-15T16:29:02.653Z


## `|| mindblown`

User-taught command: `https://cdn-images-1.medium.com/max/1600/1%2AwV15allsqjmKsyLEFs1gVg.gif`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2018-02-22T16:12:46.280Z


## `|| minifiedjs`

User-taught command: `http://minifiedjs.com/ Minified.js is a client-side JavaScript library that's both powerful and small. It offers jQuery-like features (DOM manipulation, animation, events, HTTP requests) and utility functions (collections, date&number formatting, date arithmetic, templates) with a single, consistent API.`

**Creator:** Greg

**Creator ID:** undefined

**Date Created:** 2014-04-29T20:22:19.342Z


## `|| moarkittens`

User-taught command: `http://www.hdwallpapers.in/walls/curious_kittens-wide.jpg`

**Creator:** SteamFire

**Creator ID:** undefined

**Date Created:** 2014-04-09T06:10:58.105Z


## `|| moist`

User-taught command: ` http://i.ytimg.com/vi/RmCtU6kNnuQ/maxresdefault.jpg`

**Creator:** Cereal

**Creator ID:** 2424975

**Date Created:** 2015-11-05T18:55:21.939Z


## `|| monday`

User-taught command: `http://i.imgur.com/y3gJUby.jpg`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-28T12:05:11.463Z


## `|| mondays`

User-taught command: `https://s-media-cache-ak0.pinimg.com/originals/7e/f4/80/7ef48039a5228f1efa37cc2bfd148471.png`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-07-10T09:37:06.605Z


## `|| moneycantbuylove`

User-taught command: `https://www.youtube.com/watch?v=2naoyjTbihw`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-01T18:59:00.718Z


## `|| monster`

User-taught command: ` Don't blame me that I didn't warn you. **Click Here:** http://i.stack.imgur.com/R9mVj.jpg `

**Creator:** TheLittleNaruto

**Creator ID:** 1944896

**Date Created:** 2017-03-28T06:04:27.519Z


## `|| moonowl`

User-taught command: `https://i.stack.imgur.com/Jbu5W.jpg`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2017-04-18T19:26:54.935Z


## `|| morecoffee`

User-taught command: `http://cdn.trinixy.ru/pics5/20120118/podborka_65.jpg`

**Creator:** derylius

**Creator ID:** undefined

**Date Created:** 2014-04-11T14:03:40.510Z


## `|| morning`

User-taught command: `Very Good Morning :)`

**Creator:** Shell

**Creator ID:** undefined

**Date Created:** 2014-10-15T04:05:22.091Z


## `|| moshoboner`

User-taught command: ` http://chat.stackoverflow.com/transcript/message/22223150#22223150`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2015-03-21T16:48:37.634Z


## `|| mralienishappy`

User-taught command: `http://i.imgur.com/L4GBW6S.gif?1`

**Creator:** Mr. Alien

**Creator ID:** 1542290

**Date Created:** 2014-12-24T05:54:58.936Z


## `|| msie`

User-taught command: `http://i.imgur.com/NItgh0D.gif`

**Creator:** Wes

**Creator ID:** undefined

**Date Created:** 2014-04-18T16:21:47.777Z


## `|| mudfox`

User-taught command: `https://pics.me.me/a-poor-runaway-puppy-covered-in-mud-was-brought-tous-21769261.png`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-04T09:39:16.592Z


## `|| murat`

User-taught Command: `nerds`

**Creator:** grrigore

**Creator ID:** 7972851

**Date Created:** Thu Dec 19 2019 06:54:08 GMT-0500 (Eastern Standard Time)


## `|| music`

User-taught command: `[Music here!](https://www.youtube.com/watch?v=OPf0YbXqDm0&index=1&list=PLtKflzylNF7oeUpW60X0r4n8ncHBNSpR1)`

**Creator:** Jacques Marais

**Creator ID:** 5305938

**Date Created:** 2015-11-14T15:27:04.847Z


## `|| mustard`

User-taught command: `https://chat.stackoverflow.com/transcript/message/26701263#26701263`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2015-11-05T16:28:31.213Z


## `|| myown`

User-taught command: (w+) `I'll make my own $0 with blackjack. And hookers. In fact, forget the $0.`

**Creator:** MikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2018-11-07T17:37:27.637Z


## `|| naruto`

User-taught command: `is`

**Creator:** Flash

**Creator ID:** 1865479

**Date Created:** 2015-07-28T11:08:56.694Z


## `|| naughty`

User-taught command: `https://yt3.ggpht.com/-iuXGkHlnpfU/AAAAAAAAAAI/AAAAAAAAAAA/3zTs43jbIPw/s100-c-k-no-mo-rj-c0xffffff/photo.jpg`

**Creator:** nyconing

**Creator ID:** 5858238

**Date Created:** 2017-07-17T04:27:32.806Z


## `|| nazicanada`

User-taught command: `http://i.imgur.com/4ceIfiE.webm`

**Creator:** Sterling Archer

**Creator ID:** 774078

**Date Created:** 2015-12-21T17:26:12.949Z


## `|| neat`

User-taught command: `http://media.tumblr.com/tumblr_lmer8oF8My1qafrh6.jpg`

**Creator:** SomeKittens Ux2666

**Creator ID:** undefined

**Date Created:** 2014-04-23T17:13:34.455Z


## `|| nef`

User-taught command: `https://chat.meta.stackexchange.com/transcript/721?m=4521151#4521151`

**Creator:** Shadow Wizard

**Creator ID:** 447356

**Date Created:** 2017-08-01T13:34:41.244Z


## `|| nein`

User-taught command: `https://www.youtube.com/watch?v=1MLry6Cn_D4`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-08-21T18:26:41.396Z


## `|| nerd`

User-taught command: `http://i.imgur.com/5pszouM.gif`

**Creator:** Stephan Muller

**Creator ID:** 124238

**Date Created:** 2015-05-08T10:05:01.503Z


## `|| nerdheaven`

User-taught command: `http://i.imgur.com/5YL9gPm.gifv`

**Creator:** Steve G

**Creator ID:** 496680

**Date Created:** 2015-05-08T17:36:02.842Z


## `|| nerdintraining`

User-taught command: `https://chat.stackoverflow.com/transcript/message/38828797#38828797`

**Creator:** Nerd in training

**Creator ID:** 5757162

**Date Created:** 2017-08-24T14:47:06.679Z


## `|| nine+ten`

User-taught command: `=21`

**Creator:** ThePixelBug

**Creator ID:** 3434588

**Date Created:** 2015-04-08T22:51:38.103Z


## `|| nitzan`

User-taught command: ` https://chat.stackoverflow.com/transcript/message/42650525#42650525`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2018-05-24T16:19:30.598Z


## `|| no`

User-taught command: `http://i.imgur.com/wOnJi.gif`

**Creator:** Kendall Frey

**Creator ID:** undefined

**Date Created:** 2014-04-28T17:00:52.411Z


## `|| nodrama`

User-taught command: `https://i.imgur.com/bvpcHJe.png`

**Creator:** Madara Uchiha

**Creator ID:** 871050

**Date Created:** 2018-03-10T21:57:03.995Z


## `|| nono`

User-taught command: `http://www.youtube.com/watch?v=8mKIuZ4tIzk`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-10-26T20:56:32.923Z


## `|| noobchill`

User-taught command: `http://i.imgur.com/jLxtEnm.gif`

**Creator:** m59

**Creator ID:** undefined

**Date Created:** 2014-05-22T04:46:47.089Z


## `|| nope`

User-taught command: `http://i.imgur.com/MI3UdNq.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-25T22:53:17.010Z


## `|| nopoints`

User-taught command: ` https://www.youtube.com/watch?v=WAOxY_nHdew`

**Creator:** Benjamin Gruenbaum

**Creator ID:** undefined

**Date Created:** 2014-05-22T20:24:21.889Z


## `|| norris`

User-taught Command: `!https://images-na.ssl-images-amazon.com/images/I/51IY4ohvfUL.jpg`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Wed Dec 18 2019 14:15:25 GMT-0500 (Eastern Standard Time)


## `|| notbad`

User-taught command: `http://i.imgur.com/xichNUE.png`

**Creator:** Madara Uchiha

**Creator ID:** 871050

**Date Created:** 2015-11-10T11:50:32.082Z


## `|| nothing`

User-taught command: `What nothing? What do you mean by nothing?`

**Creator:** Wulworine

**Creator ID:** undefined

**Date Created:** 2014-05-23T04:46:10.564Z


## `|| noticeme`

User-taught command: `'http://chat.stackoverflow.com/transcript/message/36509244#36509244'`

**Creator:** Jhawins

**Creator ID:** 1596138

**Date Created:** 2017-04-06T15:25:09.317Z


## `|| noworkmood`

User-taught command: `https://media.giphy.com/media/FndkmyQ1Swy52/giphy.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-07-10T08:32:02.091Z


## `|| npmroulette`

User-taught command: `https://www.npmjs.com/package/$encode($1)`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2017-03-23T22:41:40.968Z


## `|| nsfw`

User-taught command: `http://cdn-chat.sstatic.net/chat/img/ajax-loader.gif`

**Creator:** SteamFire

**Creator ID:** undefined

**Date Created:** 2014-04-10T09:28:48.804Z


## `|| nukeitfromorbit`

User-taught command: `http://i.imgur.com/l811CFl.gifv`

**Creator:** Trasiva

**Creator ID:** 3499931

**Date Created:** 2015-11-24T20:29:59.008Z


## `|| nutgame`

User-taught command: `http://25.media.tumblr.com/tumblr_m40h4ksiUa1qbyxr0o1_250.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-07-13T14:00:13.981Z


## `|| nutz`

User-taught command: `https://chat.stackoverflow.com/transcript/message/41593632#41593632`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-03-12T17:55:31.559Z


## `|| o/`

User-taught command: `https://media0.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2018-04-25T02:20:34.846Z


## `|| oak`

User-taught command: `https://media.giphy.com/media/HwXj1VRf9BJ04/giphy.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-01T10:22:58.902Z


## `|| obama`

User-taught command: `http://cdn.theatlantic.com/static/mt/assets/politics/obama_gif_wild_things.gif`

**Creator:** Greg

**Creator ID:** undefined

**Date Created:** 2014-05-22T22:53:29.485Z


## `|| oh`

User-taught command: `http://i.imgur.com/k8PBXVF.jpg`

**Creator:** Sterling Archer

**Creator ID:** 774078

**Date Created:** 2015-12-31T19:03:54.873Z


## `|| okay`

User-taught command: `http://replygif.net/i/166.gif`

**Creator:** Mosho

**Creator ID:** undefined

**Date Created:** 2014-04-07T09:01:29.004Z


## `|| onebox`

User-taught command: `http://i.stack.imgur.com/NDd8a.jpg`

**Creator:** Jhawins

**Creator ID:** undefined

**Date Created:** 2014-04-11T13:57:39.997Z


## `|| oneroom`

User-taught command: `http://chat.stackoverflow.com/transcript/message/20088409#20088409`

**Creator:** Deep

**Creator ID:** 1707126

**Date Created:** 2014-11-22T20:23:27.702Z


## `|| onethingonly`

User-taught command: `http://chat.stackoverflow.com/transcript/message/18694750#18694750`

**Creator:** Zirak

**Creator ID:** undefined

**Date Created:** 2014-09-04T19:22:13.674Z


## `|| opinion`

User-taught command: `https://www.youtube.com/watch?v=pWdd6_ZxX8c`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-05-01T19:03:42.060Z


## `|| orly`

User-taught command: ` http://i.imgur.com/t2r1x5t.png`

**Creator:** Cereal

**Creator ID:** 2424975

**Date Created:** 2015-06-18T16:49:59.321Z


## `|| oxf`

User-taught command: `http://www.oxforddictionaries.com/definition/english/$encode($0)`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-12-03T19:06:05.370Z


## `|| painfulsmile`

User-taught command: `http://i.stack.imgur.com/6E8Br.png`

**Creator:** Rvervuurt

**Creator ID:** 1264481

**Date Created:** 2015-07-14T10:14:37.517Z


## `|| panic`

User-taught command: `http://rack.0.mshcdn.com/media/ZgkyMDEzLzA2LzE4L2I2L0pvaG5ueURlcHBwLmM1YjNkLmdpZgpwCXRodW1iCTEyMDB4OTYwMD4/70417de1/fe5/Johnny-Depp-panics.gif`

**Creator:** Basement Keyboard Hero

**Creator ID:** 1401094

**Date Created:** 2015-02-17T13:37:19.496Z


## `|| paniccat`

User-taught command: `http://25.media.tumblr.com/tumblr_l9beawI7WQ1qcn249o1_250.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-08T08:52:15.707Z


## `|| panini`

User-taught command: `https://chat.stackoverflow.com/transcript/message/30339846#30339846`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2017-07-13T19:12:05.711Z


## `|| panini->asshole`

User-taught command: `Working Software`

**Creator:** mikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2016-01-29T18:58:32.933Z


## `|| party`

User-taught command: `http://x2.fjcdn.com/thumbnails/comments/I+++love+Charlie+modern+times+is+my+second+favorite+_57bad74622b40cbaa88c6eb2f996a7e3.gif`

**Creator:** Patsy Issa

**Creator ID:** undefined

**Date Created:** 2014-05-29T08:25:41.352Z


## `|| partying`

User-taught command: `http://i.stack.imgur.com/OYHWU.gif`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2017-07-07T13:36:57.874Z


## `|| pat`

User-taught command: `Poor thing $0. Pats $0.`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-09-13T08:10:25.033Z


## `|| pb`

User-taught command: `says 'shut up @Pheonixblade9'`

**Creator:** Pheonixblade9

**Creator ID:** 598637

**Date Created:** 2015-02-17T23:38:57.159Z


## `|| pedophiles`

User-taught command: ` http://chat.stackoverflow.com/transcript/message/34707230#34707230`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2017-03-17T14:55:20.643Z


## `|| penlayout`

User-taught command: `Create new Pen with code on the: [left](http://codepen.io/pen/left/), [top](http://codepen.io/pen/top/), or [right](http://codepen.io/pen/right/)`

**Creator:** Shea

**Creator ID:** undefined

**Date Created:** 2014-10-12T00:52:56.492Z


## `|| phanks`

User-taught command: `http://memecrunch.com/meme/2WYCT/phanks/image.jpg`

**Creator:** Second Rikudo

**Creator ID:** 871050

**Date Created:** 2015-01-26T11:23:24.737Z


## `|| phlease`

User-taught command: `http://i.imgur.com/8Us6ZgO.png`

**Creator:** Sippy

**Creator ID:** 3846058

**Date Created:** 2015-02-18T10:53:19.312Z


## `|| phlurprise`

User-taught command: `http://i.imgur.com/iSjaAOA.gif`

**Creator:** Stephan Muller

**Creator ID:** 124238

**Date Created:** 2015-03-04T06:55:59.693Z


## `|| phony`

User-taught command: `https://www.youtube.com/watch?v=jNGZo5gn_tc`

**Creator:** RUJordan

**Creator ID:** undefined

**Date Created:** 2014-04-14T19:10:17.291Z


## `|| php`

User-taught command: `[PHP: A fractal of bad design](https://eev.ee/blog/2012/04/09/php-a-fractal-of-bad-design/)`

**Creator:** MikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2019-02-01T15:22:02.420Z


## `|| php!`

User-taught command: `*Backs away slowly.*`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-04-10T07:18:49.557Z


## `|| phrasing`

User-taught command: `https://i.imgur.com/1kdDpjx.jpg`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-10-19T20:20:02.576Z


## `|| phtephan`

User-taught command: `https://i.imgflip.com/cxmnu.jpg`

**Creator:** Patsy Issa

**Creator ID:** undefined

**Date Created:** 2014-10-10T11:48:36.465Z


## `|| phterp`

User-taught command: `http://i.stack.imgur.com/YxQlb.png`

**Creator:** Sippy

**Creator ID:** 3846058

**Date Created:** 2015-02-16T15:13:50.533Z


## `|| phucket`

User-taught command: ` http://i.stack.imgur.com/dMpmR.gif`

**Creator:** monners

**Creator ID:** undefined

**Date Created:** 2014-04-01T07:22:44.535Z


## `|| pi`

User-taught command: `pie*`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-09-28T19:42:30.163Z


## `|| ping`

User-taught command: `https://www.youtube.com/watch?v=Q7kTRWW1jxw`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-04-03T20:01:40.599Z


## `|| pingbomb`

User-taught command: `<user><user><user>`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-28T13:24:49.031Z


## `|| pizza`

User-taught command: 'gives `https://lorempizza.com/$1/$2#.png`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2018-01-15T16:03:28.922Z


## `|| playerpimp`

User-taught command: ` http://chat.stackoverflow.com/transcript/message/9521836#9521836`

**Creator:** Benjamin Gruenbaum

**Creator ID:** undefined

**Date Created:** 2014-04-08T21:35:39.365Z


## `|| pls`

User-taught command: `http://ct.weirdnutdaily.com/ol/wn/sw/i55/2/1/29/wnd_c874155443deb7e54444571ccf756fb9.jpg`

**Creator:** jAndy

**Creator ID:** undefined

**Date Created:** 2014-10-24T13:08:51.704Z


## `|| plunder`

User-taught command: `https://cdn.meme.am/instances/31300130/plunder-all-the-things.jpg`

**Creator:** Metallkiller

**Creator ID:** 4364057

**Date Created:** 2017-10-23T09:25:27.253Z


## `|| plz`

User-taught command: `http://ct.weirdnutdaily.com/ol/wn/sw/i55/2/1/29/wnd_c874155443deb7e54444571ccf756fb9.jpg`

**Creator:** jAndy

**Creator ID:** undefined

**Date Created:** 2014-10-24T13:09:08.505Z


## `|| pokemon`

User-taught command: `http://img.pokemondb.net/artwork/$0.jpg`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-11-02T16:30:21.534Z


## `|| popcorn`

User-taught command: ` http://media.giphy.com/media/E3xXqq617AaFW/giphy.gif`

**Creator:** mikedidthis

**Creator ID:** undefined

**Date Created:** 2014-04-17T20:47:49.251Z


## `|| pos`

User-taught command: `http://i.imgur.com/eYQBkBL.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-05-22T12:12:56.739Z


## `|| potato`

User-taught command: such `'@poteito`

**Creator:** Neil

**Creator ID:** 467968

**Date Created:** 2015-07-16T09:00:22.649Z


## `|| praise`

User-taught command: Try Praise the Sun! `\\[T]/`

**Creator:** MikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2018-04-18T12:42:22.906Z


## `|| pretzels`

User-taught command: `https://www.youtube.com/watch?v=DRaLpHoZA8E`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-10-09T15:26:13.467Z


## `|| property`

User-taught command: `tax`

**Creator:** abhi

**Creator ID:** undefined

**Date Created:** 2014-04-28T17:01:09.591Z


## `|| proxy`

User-taught command: `http://chat.stackoverflow.com/transcript/message/36370032#36370032`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-03-29T10:09:55.586Z


## `|| proxy_fr`

User-taught command: `i.stack.imgur.com/p4Lfv.png`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-04-12T06:35:11.304Z


## `|| ptsdcat`

User-taught command: `http://i.imgur.com/Fl57n6E.gif`

**Creator:** ballBreaker

**Creator ID:** 3968793

**Date Created:** 2017-07-14T19:54:32.991Z


## `|| put..it..back...ლ(ಠ益ಠ)ლ`

User-taught command: `┬─┬﻿ ノ( ゜-゜ノ)`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-01T02:22:04.467Z


## `|| pxly`

User-taught command: `http://pxly.me/generate?s=$rand(0,64000)#.png`

**Creator:** Loktar

**Creator ID:** undefined

**Date Created:** 2014-04-23T13:39:38.212Z


## `|| q80ewrucfewuv90reucei0cuq0eruiqweui0rcnuoqnericoenuow`

User-taught command: `8eur081n23780cunq802mecr0iqwemiqr2u3489r234802tvnue89uqw9nr8c923m`

**Creator:** Learn How To Be Transparent

**Creator ID:** 6820627

**Date Created:** 2017-08-16T01:49:24.968Z


## `|| qa`

User-taught Command: `https://www.youtube.com/watch?v=aoWGh6t9xEA`

**Creator:** grrigore

**Creator ID:** 7972851

**Date Created:** Tue Dec 10 2019 16:42:04 GMT-0500 (Eastern Standard Time)


## `|| quickmaths`

User-taught command: `Boom! 2+2=4-1=3 Quick maths!`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2018-04-03T09:39:17.556Z


## `|| quietos`

User-taught command: `HORADELMARTILLO!`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2018-03-22T14:56:37.770Z


## `|| rabbit`

User-taught command: `http://fecdn.fractalenlighten.netdna-cdn.com/wp-content/uploads/2014/10/romain-boyer-photography-copyright-high-rabbit-1.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-17T20:35:11.738Z


## `|| rage`

User-taught command: `https://i.kym-cdn.com/entries/icons/original/000/000/063/Rage.jpg`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2018-07-24T10:29:28.222Z


## `|| raghav`

User-taught Command: `LIES.`

**Creator:** grrigore

**Creator ID:** 7972851

**Date Created:** Tue Dec 10 2019 14:11:20 GMT-0500 (Eastern Standard Time)


## `|| rand`

User-taught command: (\w+) (\\w+) `$rand($1,$2)`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2016-01-08T12:07:11.309Z


## `|| randcolor`

User-taught command: `$rand(0,255),$rand(0,255),$rand(0,255)`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-11-05T23:26:49.205Z


## `|| random`

User-taught command: (.*?) `!!> Math.random()`

**Creator:** Jacques Marais

**Creator ID:** 5305938

**Date Created:** 2015-12-02T12:28:14.397Z


## `|| random2`

User-taught command: `https://xkcd.com/221`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2019-06-04T09:23:41.798Z


## `|| randomza`

User-taught command: `http://lorempizza.com/$rand(100,1000)/$rand(100,1000)#.png`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2014-12-11T14:03:57.678Z


## `|| rdoc`

User-taught command: ` http://ruby-doc.com/search.html?q=$0`

**Creator:** Cereal

**Creator ID:** 2424975

**Date Created:** 2015-07-08T10:48:55.455Z


## `|| really`

User-taught command: ` http://i.stack.imgur.com/XChUc.gif`

**Creator:** monners

**Creator ID:** undefined

**Date Created:** 2014-04-15T06:12:01.445Z


## `|| recover_keystore`

User-taught Command: `FILE NOT FOUND`

**Creator:** Mauker

**Creator ID:** 4070469

**Date Created:** Tue Dec 10 2019 14:11:43 GMT-0500 (Eastern Standard Time)


## `|| redo`

User-taught command: `https://chat.stackoverflow.com/transcript/message/23264370#23264370`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2018-01-23T20:28:47.709Z


## `|| reebokornike`

User-taught command: `https://www.youtube.com/watch?v=g3GmC1HDx08`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-05-08T15:27:24.659Z


## `|| rekt`

User-taught command: `http://i.imgur.com/uhabn5O.gif`

**Creator:** Cerbrus

**Creator ID:** 1835379

**Date Created:** 2014-10-30T15:08:57.386Z


## `|| rememberwhen`

User-taught command: `'http://chat.stackoverflow.com/transcript/17?m=26377650#26377650'`

**Creator:** Jhawins

**Creator ID:** 1596138

**Date Created:** 2015-11-03T17:15:35.589Z


## `|| removed`

User-taught command: `https://i.imgur.com/BuCQwDo.png`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2019-02-20T12:28:47.719Z


## `|| rentacat`

User-taught command: `http://chat.stackoverflow.com/transcript/7?m=21648318#21648318`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2015-09-25T23:45:35.189Z


## `|| resource`

User-taught command: `https://github.com/ericelliott/essential-javascript-links#essential-javascript-links`

**Creator:** Shmiddty

**Creator ID:** 1585400

**Date Created:** 2015-06-07T20:46:51.549Z


## `|| rickroll`

User-taught command: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

**Creator:** adeneo

**Creator ID:** undefined

**Date Created:** 2014-05-13T20:37:10.353Z


## `|| rimshot`

User-taught command: `http://media.giphy.com/media/SUeUCn53naadO/giphy.gif`

**Creator:** SomeKittens

**Creator ID:** 1216976

**Date Created:** 2015-01-08T04:18:36.308Z


## `|| riot`

User-taught command: `╯°□°）╯┻━┻`

**Creator:** SomeKittens

**Creator ID:** 1216976

**Date Created:** 2014-12-04T02:57:48.638Z


## `|| rlemonnoob`

User-taught command: `https://chat.stackoverflow.com/transcript/message/1698798#1698798`

**Creator:** Zirak

**Creator ID:** 617762

**Date Created:** 2018-04-06T17:38:47.368Z


## `|| rnum`

User-taught command: (d+) (\d+) `$rand($1, $2)`

**Creator:** Zirak

**Creator ID:** 617762

**Date Created:** 2015-05-20T20:17:10.554Z


## `|| roadhouse`

User-taught command: `http://media.giphy.com/media/sfnwnXtqQ8pO/giphy.gif`

**Creator:** Sippy

**Creator ID:** 3846058

**Date Created:** 2015-03-04T14:38:32.011Z


## `|| roasted`

User-taught Command: `https://4.bp.blogspot.com/-kGtob07wA7k/XIhN5oNhhdI/AAAAAAABL0w/YXnFd3YpnGI13mzWHYwRRgsO2wtN77M3gCEwYBhgL/s1600/IMG_5419.jpeg`

**Creator:** JBis

**Creator ID:** 7886229

**Date Created:** Wed Jan 08 2020 20:11:57 GMT-0500 (Eastern Standard Time)


## `|| rockclimb`

User-taught command: `http://i.imgur.com/5X0U4hG.jpg`

**Creator:** Rvervuurt

**Creator ID:** 1264481

**Date Created:** 2015-07-22T08:20:37.688Z


## `|| rockclimbing`

User-taught command: `http://i.stack.imgur.com/gBbyj.jpg`

**Creator:** Sippy

**Creator ID:** 3846058

**Date Created:** 2015-07-08T12:45:48.786Z


## `|| roflcopter`

User-taught command: `http://upload.wikimedia.org/wikipedia/commons/7/73/Roflcopter.gif`

**Creator:** easwee

**Creator ID:** undefined

**Date Created:** 2014-08-21T11:26:13.315Z


## `|| roflcopter2`

User-taught command: `http://stream1.gifsoup.com/view4/1772004/lol-roflcopter-much-o.gif`

**Creator:** Wesley Crushed

**Creator ID:** undefined

**Date Created:** 2014-08-21T11:27:38.337Z


## `|| ron_jeremy_dick`

User-taught command: ` https://chat.stackoverflow.com/transcript/message/38784763#38784763`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2017-08-22T13:47:40.023Z


## `|| roomowner`

User-taught command: `http://chat.stackoverflow.com/transcript/message/15819184#15819184`

**Creator:** Some Guy

**Creator ID:** undefined

**Date Created:** 2014-04-13T19:24:39.689Z


## `|| rtfm`

User-taught command: `Hey, read the [JS Manual](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) or [JQ Manual](https://api.jquery.com/).`

**Creator:** Trasiva

**Creator ID:** 3499931

**Date Created:** 2015-10-20T17:27:30.806Z


## `|| sad`

User-taught command: `Hi there. It seems you're sad. I can't tell if you're messing around or you're serious, but if you need someone to talk to, my master is always available for a chat. Either way, I hope you feel better soon! Have a hug! (っ'з')っ`

**Creator:** Carrie Kendall

**Creator ID:** undefined

**Date Created:** 2014-05-26T13:19:55.981Z


## `|| sadcat`

User-taught command: `https://media1.giphy.com/media/TZBED1pP5m8N2/200_s.gif`

**Creator:** TCat

**Creator ID:** 6315209

**Date Created:** 2017-03-24T05:57:13.485Z


## `|| sadlemon`

User-taught command: `https://i.ytimg.com/vi/8Suu84khNGY/hqdefault.jpg`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2018-02-07T21:31:45.065Z


## `|| sagor`

User-taught command: `Hey IccheGuri`

**Creator:** Icche Guri

**Creator ID:** 6379197

**Date Created:** 2017-03-20T09:04:34.015Z


## `|| sandbox`

User-taught command: `Please go and play in the [Sandbox](http://chat.stackoverflow.com/rooms/1/sandbox)`

**Creator:** darkyen00

**Creator ID:** undefined

**Date Created:** 2014-10-12T18:23:24.888Z


## `|| sandstorm`

User-taught command: `https://www.youtube.com/watch?v=PSYxT9GM0fQ`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2016-01-08T13:14:26.704Z


## `|| sandwich`

User-taught command: `Pretend your array is a ham sandwich and peel back layers one at a time until you get to the mustard`

**Creator:** Stephan Muller

**Creator ID:** 124238

**Date Created:** 2015-12-03T15:44:49.702Z


## `|| sarcasm`

User-taught command: `https://s-media-cache-ak0.pinimg.com/736x/57/0c/ca/570ccadc6f792041a972d425703bffb8.jpg`

**Creator:** Jan Dvorak

**Creator ID:** 499214

**Date Created:** 2015-07-28T10:44:45.671Z


## `|| satibel`

User-taught command: `http://static.tvtropes.org/pmwiki/pub/images/weirdalfoil_2322.jpg`

**Creator:** jhmckimm

**Creator ID:** 2084984

**Date Created:** 2017-03-29T10:43:56.944Z


## `|| saturday`

User-taught command: `http://cdn.someecards.com/someecards/usercards/1342894244496_9689603.png`

**Creator:** Just code

**Creator ID:** undefined

**Date Created:** 2014-09-06T08:31:01.465Z


## `|| sausage`

User-taught command: `http://forthelol.com/images/2014/April/1/533ab23614e7a.gif`

**Creator:** Mosho

**Creator ID:** undefined

**Date Created:** 2014-04-08T08:08:41.830Z


## `|| saybadwords`

User-taught command: `'you-all-are-mad'`

**Creator:** NoDownvotesPlz

**Creator ID:** 3556874

**Date Created:** 2015-03-20T09:54:52.213Z


## `|| sayyo`

User-taught command: ` Greetings! @all`

**Creator:** TheLittleNaruto

**Creator ID:** 1944896

**Date Created:** 2017-03-18T05:36:03.307Z


## `|| sayyo2`

User-taught command: `Greetings! @ChewCat @all`

**Creator:** LunarWatcher

**Creator ID:** 6296561

**Date Created:** 2017-08-16T06:53:06.205Z


## `|| serious`

User-taught command: `http://fc08.deviantart.net/fs36/f/2008/251/3/5/Why_so_Serious__by_Ice_Warrior20.jpg`

**Creator:** Nimesh

**Creator ID:** 3761928

**Date Created:** 2014-11-07T07:25:10.738Z


## `|| seriouscat`

User-taught command: ` https://media.giphy.com/media/gHKG6LKF6LTm8/giphy.gif`

**Creator:** TheLittleNaruto

**Creator ID:** 1944896

**Date Created:** 2017-04-05T08:23:50.467Z


## `|| shadow_pee`

User-taught command: `https://i.stack.imgur.com/OQaIG.png`

**Creator:** Shadow Wizard

**Creator ID:** 447356

**Date Created:** 2017-08-01T13:28:07.602Z


## `|| show_password`

User-taught Command: `************`

**Creator:** grrigore

**Creator ID:** 7972851

**Date Created:** Tue Dec 10 2019 16:48:25 GMT-0500 (Eastern Standard Time)


## `|| showboobs`

User-taught command: )'.concat('( `!!>'(`

**Creator:** mr5

**Creator ID:** 2304737

**Date Created:** 2017-08-08T07:51:24.802Z


## `|| shrug`

User-taught command: ` ¯\\_(ツ)_/¯`

**Creator:** TheLittleNaruto

**Creator ID:** 1944896

**Date Created:** 2017-03-20T16:00:30.618Z


## `|| shuddup`

User-taught command: `http://rs2img.memecdn.com/Big-Cup-of-Shut-The-Fuck-Up_o_94445.jpg`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-05-08T12:40:47.471Z


## `|| shutupanddoit`

User-taught command: `http://chat.stackoverflow.com/transcript/message/36356418#36356418`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-04-13T06:09:48.338Z


## `|| silopoop`

User-taught command: `http://chat.stackoverflow.com/transcript/message/16814295#16814295`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-05-29T19:17:49.475Z


## `|| sippy`

User-taught command: `http://i.stack.imgur.com/uGDnG.jpg`

**Creator:** Rvervuurt

**Creator ID:** 1264481

**Date Created:** 2015-07-22T15:47:34.056Z


## `|| slap`

User-taught command: (.*) `slaps @$0 around a bit with a large trout!`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-10-16T13:12:12.998Z


## `|| sleep`

User-taught command: `💤`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-05-22T13:20:26.172Z


## `|| slidepoop`

User-taught command: `http://chat.stackoverflow.com/transcript/17?m=8231986#8231986`

**Creator:** SomeKittens

**Creator ID:** undefined

**Date Created:** 2014-10-13T20:46:23.860Z


## `|| smartguy`

User-taught command: `https://thumbs.gfycat.com/SlimyDopeyJenny-size_restricted.gif`

**Creator:** Lee Butler

**Creator ID:** 3033062

**Date Created:** 2018-12-04T11:53:30.237Z


## `|| smellthat`

User-taught command: `http://ts2.mm.bing.net/th?id=HN.608055910556765359&pid=1.7#.png`

**Creator:** Greg

**Creator ID:** undefined

**Date Created:** 2014-05-15T23:03:26.497Z


## `|| snakeskinshoes`

User-taught command: `http://i.imgur.com/oP09zVN.jpg`

**Creator:** abhi

**Creator ID:** undefined

**Date Created:** 2014-04-28T17:17:14.400Z


## `|| snare`

User-taught Command: `*budum chhh*`

**Creator:** JBis

**Creator ID:** 7886229

**Date Created:** Mon Dec 16 2019 07:48:27 GMT-0500 (Eastern Standard Time)


## `|| so-dark`

User-taught command: `https://chrome.google.com/webstore/detail/so-dark-chat-%20/bbkjccfnenmgidehjhaabamobpbaaghh?hl=en`

**Creator:** mikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2018-01-08T19:43:53.905Z


## `|| sochat`

User-taught command: ` http://i.imgur.com/zL9j7Pf.png`

**Creator:** Josh LeBlanc

**Creator ID:** 2424975

**Date Created:** 2015-07-23T14:00:20.953Z


## `|| somekittens`

User-taught command: meeee `Meaw`

**Creator:** Abhishek Hingnikar

**Creator ID:** undefined

**Date Created:** 2014-04-10T18:23:36.824Z


## `|| sorry`

User-taught command: `http://i.imgur.com/3YdJs.jpg`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2014-11-21T13:56:07.054Z


## `|| soundsawesome`

User-taught command: `https://chat.stackexchange.com/transcript/message/38808214#38808214`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-07-17T11:12:40.969Z


## `|| source`

User-taught command: ` https://github.com/Zirak/SO-ChatBot`

**Creator:** Cereal

**Creator ID:** 2424975

**Date Created:** 2015-11-02T12:32:38.109Z


## `|| spiderman`

User-taught command: `http://i2.kym-cdn.com/photos/images/facebook/000/937/190/dc8.jpg`

**Creator:** tarboy9

**Creator ID:** 5521842

**Date Created:** 2015-11-03T23:12:56.952Z


## `|| sql`

User-taught command: `Server`

**Creator:** Sami

**Creator ID:** 6426692

**Date Created:** 2018-11-19T11:23:50.571Z


## `|| squiggle`

User-taught command: `https://chat.stackoverflow.com/transcript/message/41622319#41622319`

**Creator:** Squirrel in training

**Creator ID:** 5757162

**Date Created:** 2018-03-14T17:29:53.527Z


## `|| squirrelaccent`

User-taught command: `https://chat.stackoverflow.com/transcript/message/43579370#43579370`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2018-08-13T12:46:47.453Z


## `|| sscce`

User-taught command: `Please provide a short, self contained, compilable example: http://sscce.org/`

**Creator:** Pheonixblade9

**Creator ID:** 598637

**Date Created:** 2015-02-17T23:07:56.664Z


## `|| star`

User-taught command: `https://chat.stackoverflow.com/transcript/message/39480026#39480026`

**Creator:** Metallkiller

**Creator ID:** 4364057

**Date Created:** 2017-10-06T07:38:12.657Z


## `|| stars`

User-taught command: `http://govindtiwari.blogspot.com`

**Creator:** Awal Garg

**Creator ID:** 3459110

**Date Created:** 2015-12-31T14:07:40.278Z


## `|| static`

User-taught command: `http://www.troll.me/images/flamethrower/static.jpg`

**Creator:** Evan L

**Creator ID:** undefined

**Date Created:** 2014-05-20T19:27:27.208Z


## `|| sterlingpedo`

User-taught command: `https://chat.stackoverflow.com/transcript/message/41975547#41975547`

**Creator:** Zirak

**Creator ID:** 617762

**Date Created:** 2018-04-05T20:58:20.394Z


## `|| steve`

User-taught command: `http://i.stack.imgur.com/TQI60.jpg`

**Creator:** Kendall Frey

**Creator ID:** undefined

**Date Created:** 2014-04-11T14:03:56.007Z


## `|| stop`

User-taught command: `http://www.netanimations.net/arg-hammer-chasing-nail-animbg-320x200-url.gif`

**Creator:** Wulworine

**Creator ID:** undefined

**Date Created:** 2014-05-23T10:01:31.015Z


## `|| stopit`

User-taught command: ` stop it. stop it! STOP IT! THIS WAS ONCE A HOUSE OF LOVE!`

**Creator:** Steve's a D

**Creator ID:** 496680

**Date Created:** 2017-07-12T17:11:08.887Z


## `|| stopmyself`

User-taught command: `STOP`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-03T14:40:19.624Z


## `|| sucks`

User-taught command: `http://learnenglishpodcast.com/wp-content/uploads/2014/02/tumblr_mei9y4IsYJ1r90iov.png`

**Creator:** Wulworine

**Creator ID:** undefined

**Date Created:** 2014-06-03T04:58:22.344Z


## `|| sudo`

User-taught command: `Okay.`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2015-06-19T18:08:28.722Z


## `|| sup`

User-taught command: `http://i.imgur.com/CIQzIE2.gif`

**Creator:** mikedidthis

**Creator ID:** undefined

**Date Created:** 2014-08-15T21:04:03.910Z


## `|| supernova`

User-taught command: `it is deadlydragon's 4th ability in which he will cast an ultimate version of Ragnarok`

**Creator:** deadlydragon00

**Creator ID:** 3087778

**Date Created:** 2015-06-29T06:07:56.570Z


## `|| supertest`

User-taught command: (.*)+ `'see`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2014-10-31T18:14:57.575Z


## `|| supertest2`

User-taught command: `see$0`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2014-10-31T18:15:40.522Z


## `|| supertest3`

User-taught command: `eval`

**Creator:** CSᵠ

**Creator ID:** 731947

**Date Created:** 2014-11-02T12:27:42.842Z


## `|| surprisebuttsex`

User-taught command: `http://i.imgur.com/pE7Vr5j.jpg`

**Creator:** Patsy Issa

**Creator ID:** 1401094

**Date Created:** 2014-10-30T12:52:39.778Z


## `|| swag`

User-taught command: `http://media-cache-ec0.pinimg.com/736x/b1/3c/44/b13c440f0e798eaad5729a42c118572b.jpg`

**Creator:** Carrie Kendall

**Creator ID:** undefined

**Date Created:** 2014-05-26T19:34:35.923Z


## `|| swearjar`

User-taught command: `[Swearing is tolerated so long as 1) you are not using it to insult another user. 2) you are not throwing around curse words like a 10 year old at summer camp. We understand emphasis and frustration can result in a fuck or two, but just try not to get out of hand.](http://rlemon.github.io/so-chat-javascript-rules/)`

**Creator:** Jhawins

**Creator ID:** undefined

**Date Created:** 2014-04-22T15:14:19.704Z


## `|| sweet-tooth`

User-taught command: `Harami`

**Creator:** Sword

**Creator ID:** 3231320

**Date Created:** 2015-06-17T09:40:47.416Z


## `|| tagify`

User-taught command: ` [tag:$1]`

**Creator:** Cereal

**Creator ID:** undefined

**Date Created:** 2014-08-01T18:43:42.795Z


## `|| tamil`

User-taught command: `https://www.youtube.com/watch?v=lPuI9_ctAZU`

**Creator:** jafarbtech

**Creator ID:** 6082645

**Date Created:** 2017-04-15T07:16:39.805Z


## `|| teachformat`

User-taught command: `'http://chat.stackoverflow.com/faq#formatting'`

**Creator:** Jhawins

**Creator ID:** 1596138

**Date Created:** 2015-05-28T18:17:02.271Z


## `|| tel`

User-taught command: `@$0`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2014-10-31T18:12:56.486Z


## `|| telll`

User-taught command: `:$0`

**Creator:** Madara Uchiha

**Creator ID:** 871050

**Date Created:** 2018-04-23T11:39:13.272Z


## `|| tellmeajoke`

User-taught command: `You`

**Creator:** TheOneWhoMade

**Creator ID:** 9107868

**Date Created:** 2018-03-04T16:38:06.506Z


## `|| ten5`

User-taught command: `https://chat.stackoverflow.com/transcript/message/42897947#42897947`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-06-12T15:21:21.362Z


## `|| terraria`

User-taught command: `http://terraria.gamepedia.com/index.php?search=$encode($1)&title=Special%3ASearch&go=Go`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-10-15T02:06:34.474Z


## `|| test`

User-taught command: `Das`

**Creator:** catgocat

**Creator ID:** 4106994

**Date Created:** 2015-08-21T21:35:19.313Z


## `|| testhector`

User-taught command: `This is a format test: <user>`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2018-03-23T10:30:14.860Z


## `|| testtriggered`

User-taught command: `http://li.rlemon.ca/triggered#.png`

**Creator:** towc

**Creator ID:** 3161092

**Date Created:** 2017-04-18T20:48:02.277Z


## `|| testx`

User-taught command: (w+)\ `$0,$1,$2`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-23T11:59:22.958Z


## `|| tfs`

User-taught command: `https://chat.stackoverflow.com/transcript/7?m=25838015#25838015`

**Creator:** mikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2017-07-24T19:56:13.899Z


## `|| thanksforallthefish`

User-taught command: `https://www.youtube.com/watch?v=ojydNb3Lrrs`

**Creator:** JorgeArtware

**Creator ID:** undefined

**Date Created:** 2014-05-23T05:14:41.049Z


## `|| thankyoubeer`

User-taught command: `http://2.bp.blogspot.com/-WWQxbHeNXoY/U5Xlznht98I/AAAAAAAAINI/mUXQVWG-t0s/s1600/beer-smiley.png`

**Creator:** easwee

**Creator ID:** 258400

**Date Created:** 2016-01-26T10:35:21.629Z


## `|| the`

User-taught command: `game`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2019-05-30T19:21:18.671Z


## `|| thedog`

User-taught command: `http://chat.stackoverflow.com/transcript/message/16345533#16345533`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-05-08T20:16:46.498Z


## `|| thefarter`

User-taught command: `http://chat.stackoverflow.com/transcript/message/19493785#19493785`

**Creator:** Some Guy

**Creator ID:** undefined

**Date Created:** 2014-10-19T05:36:13.285Z


## `|| theflash`

User-taught command: `*running*`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-22T10:57:30.408Z


## `|| thegame`

User-taught command: `@jAndy!`

**Creator:** Florian Margaine

**Creator ID:** undefined

**Date Created:** 2014-10-05T21:31:29.604Z


## `|| themoreyouknow`

User-taught command: `https://i.chzbgr.com/maxW500/4304731904/h047B16E8/#.png`

**Creator:** RUJordan

**Creator ID:** undefined

**Date Created:** 2014-05-20T21:24:29.611Z


## `|| thereitis`

User-taught command: `http://media.giphy.com/media/11FiDF2fuOujPG/giphy.gif`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-17T17:45:43.491Z


## `|| thincat`

User-taught command: `https://www.goodlivingwarehouse.com/wp-content/uploads/2014/05/Thin-Mint-Cat-300x228.jpg`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-04-19T09:31:44.819Z


## `|| this`

User-taught command: `https://chat.stackoverflow.com/transcript/message/43750767#43750767`

**Creator:** Squirrel in training

**Creator ID:** 5757162

**Date Created:** 2018-08-28T15:08:45.726Z


## `|| this_is_fun`

User-taught command: `http://www.xdtalk.com/gallery/data/500/medium/pot-meme-fun-six.png`

**Creator:** tarboy9

**Creator ID:** 5521842

**Date Created:** 2015-11-04T00:54:38.594Z


## `|| throw`

User-taught command: `http://i44.photobucket.com/albums/f5/HangmenHeaven/Response%20Face/1285918156716.png`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-03-20T16:05:46.970Z


## `|| thun`

User-taught command: `https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Four-sides-model_en.svg/1280px-Four-sides-model_en.svg.png`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2019-06-05T09:46:23.059Z


## `|| thunderstorm`

User-taught command: `http://chat.stackoverflow.com/transcript/message/22755378#22755378`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2015-04-18T20:03:16.970Z


## `|| thunderstormsforever`

User-taught command: `http://chat.stackoverflow.com/transcript/message/22774358#22774358`

**Creator:** Jeremy

**Creator ID:** 4560635

**Date Created:** 2015-04-18T21:24:56.533Z


## `|| time`

User-taught command: (.*) `!!>new Date().toLocaleTimeString()`

**Creator:** Jacques Marais

**Creator ID:** 5305938

**Date Created:** 2015-11-14T15:20:17.611Z


## `|| timetoduel`

User-taught command: `https://www.youtube.com/watch?v=SFkdcQgNJHo`

**Creator:** Nerd in training

**Creator ID:** 5757162

**Date Created:** 2017-07-24T08:40:35.891Z


## `|| tinyup`

User-taught command: `**▲**`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-11-06T10:37:20.394Z


## `|| tl;dr`

User-taught command: `http://i.imgur.com/VOZaZZi.gif`

**Creator:** Sterling Archer

**Creator ID:** 774078

**Date Created:** 2015-01-12T16:39:33.557Z


## `|| tl;dr2`

User-taught command: `http://i.imgur.com/JsFS5AH.gif`

**Creator:** Sterling Archer

**Creator ID:** 774078

**Date Created:** 2015-01-12T21:32:32.137Z


## `|| tldr`

User-taught command: `http://i.imgur.com/uzlcfuZ.gif`

**Creator:** Sterling Archer

**Creator ID:** undefined

**Date Created:** 2014-09-26T15:57:43.258Z


## `|| tln`

User-taught command: `tln == TheLittleNaruto`

**Creator:** TheLittleNaruto

**Creator ID:** 1944896

**Date Created:** 2015-05-26T12:21:08.628Z


## `|| tobacconist`

User-taught command: `  Drop your panties, Sir William; I cannot wait until lunchtime!`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2015-01-08T20:23:57.777Z


## `|| tomm`

User-taught command: `https://i.imgflip.com/w2woj.jpg`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2018-04-17T11:38:34.882Z


## `|| toteshomo`

User-taught command: `http://chat.stackoverflow.com/transcript/message/21861071#21861071`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2015-03-02T14:40:51.302Z


## `|| tr`

User-taught command: `https://translate.google.com/#auto/$1/$encode($2)`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-11-14T14:21:06.428Z


## `|| translate`

User-taught command: `https://translate.google.com/#auto/$1/$2`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2015-10-23T12:14:39.025Z


## `|| translate2`

User-taught command: `https://translate.google.com/#auto/$1/$2`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2015-10-23T12:14:38.998Z


## `|| trl`

User-taught command: `https://translate.google.com/#auto/$1/$encode($2)`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-23T15:59:33.990Z


## `|| tumbleweed`

User-taught command: `https://i.stack.imgur.com/3xqGt.jpg`

**Creator:** Metallkiller

**Creator ID:** 4364057

**Date Created:** 2017-07-20T06:53:20.409Z


## `|| tvpee`

User-taught command: `https://chat.stackoverflow.com/transcript/message/27206649#27206649`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2015-11-30T21:21:29.339Z


## `|| u`

User-taught command: `//unban 9107868`

**Creator:** TheOneWhoMade

**Creator ID:** 9107868

**Date Created:** 2018-03-04T19:33:08.666Z


## `|| uded`

User-taught command: > `eval`

**Creator:** Shrek

**Creator ID:** 855760

**Date Created:** 2017-08-16T21:44:38.613Z


## `|| ugt`

User-taught command: `http://www.total-knowledge.com/~ilya/mips/ugt.html`

**Creator:** SomeKittens Ux2666

**Creator ID:** undefined

**Date Created:** 2014-09-17T05:03:27.350Z


## `|| ungroomedjordan`

User-taught command: `https://i.imgur.com/wlosDXB.mp4`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2017-11-10T19:44:04.669Z


## `|| unriot`

User-taught command: `┬──┬﻿ ¯_(ツ)`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-06T20:58:49.668Z


## `|| unwelcoming_entitled_brat`

User-taught command: ` https://chat.stackoverflow.com/transcript/17?m=14248478#14248478`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2018-05-01T15:13:18.840Z


## `|| uparrow`

User-taught command: `http://i.stack.imgur.com/MFJCg.jpg`

**Creator:** Kamil Solecki

**Creator ID:** 2534346

**Date Created:** 2018-03-22T08:20:24.918Z


## `|| urban`

User-taught Command: `[{1}](https://www.urbandictionary.com/define.php?term=[1])`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Wed Dec 11 2019 15:34:13 GMT-0500 (Eastern Standard Time)


## `|| uselesschienis`

User-taught command: useless `Uselesschien`

**Creator:** uselesschien

**Creator ID:** 1947276

**Date Created:** 2015-07-04T14:35:20.325Z


## `|| utf-8`

User-taught command: `http://chat.stackoverflow.com/transcript/message/35287481#35287481`

**Creator:** satibel

**Creator ID:** 7007466

**Date Created:** 2017-04-05T13:45:17.390Z


## `|| uwot`

User-taught command: `http://oi46.tinypic.com/5trlnm.jpg`

**Creator:** Tim van Gool

**Creator ID:** undefined

**Date Created:** 2014-04-10T09:19:48.876Z


## `|| valentines`

User-taught command: `https://chat.stackoverflow.com/transcript/message/41970116#41970116`

**Creator:** user1596138

**Creator ID:** 1596138

**Date Created:** 2018-04-05T16:34:23.916Z


## `|| vamp`

User-taught command: `http://i.imgur.com/vWfpbsE.jpg`

**Creator:** Trasiva

**Creator ID:** 3499931

**Date Created:** 2017-04-18T20:46:02.243Z


## `|| vibes`

User-taught Command: `"if it's stupid but it works it isn't stupid"`

**Creator:** grrigore

**Creator ID:** 7972851

**Date Created:** Tue Jan 07 2020 16:43:09 GMT-0500 (Eastern Standard Time)


## `|| viola`

User-taught command: `https://chat.stackoverflow.com/transcript/17?m=32565578#32565578`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2017-04-11T17:45:47.918Z


## `|| votekick`

User-taught command: `<user> voted to kick @$0`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-06-14T09:35:51.144Z


## `|| wallah`

User-taught command: `http://i.imgur.com/F8TqHA7.png`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2017-04-11T17:42:27.812Z


## `|| war`

User-taught command: `http://chat.stackoverflow.com/transcript/message/36378525#36378525`

**Creator:** jhmckimm

**Creator ID:** 2084984

**Date Created:** 2017-03-29T16:03:27.858Z


## `|| wastedcat`

User-taught command: `http://24.media.tumblr.com/tumblr_ls03mo8LSS1qcffkqo1_250.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-04-13T08:03:25.910Z


## `|| wat`

User-taught command: `https://i.imgur.com/7kZ562z.jpg`

**Creator:** Madara Uchiha

**Creator ID:** 871050

**Date Created:** 2018-02-01T10:09:39.860Z


## `|| wat2`

User-taught command: `https://i.imgur.com/uYbRtKT.gif`

**Creator:** Madara Uchiha

**Creator ID:** 871050

**Date Created:** 2017-08-16T07:37:51.893Z


## `|| wat3`

User-taught command: `https://imgur.com/6by138R.gif`

**Creator:** Second Rikudo

**Creator ID:** 871050

**Date Created:** 2015-03-18T08:42:55.721Z


## `|| wat4`

User-taught command: `https://i.kinja-img.com/gawker-media/image/upload/etgub62afz3txuygbukv.gif`

**Creator:** Madara Uchiha

**Creator ID:** 871050

**Date Created:** 2015-09-24T11:50:52.372Z


## `|| watcat`

User-taught command: `https://68.media.tumblr.com/tumblr_m9yfbvD9Mh1rzhv5ho1_400.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-07-12T08:43:16.928Z


## `|| wednesday`

User-taught command: `https://vine.co/v/iM0HnpBebd0/embed/simple`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2017-09-27T20:23:56.041Z


## `|| welcome-c#`

User-taught command: .+ `@$0 Welcome to the C# chat! Please review the [room guidelines and tips](https://stackoverflowcsharpchat.github.io/). If you have a question, just post it, and if anyone's free and interested they'll help.`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2018-05-31T13:29:11.830Z


## `|| welcome-sql`

User-taught command: `Welcome to the SQL chatroom! Got a SQL question? Don't ask if you can ask, just do it! And if someone knows the answer and isn't busy, they'll help. Tell us your Database, quick question = quick answer. Long question, we will need an MCVE ---> [MCVE help](http://stackoverflow.com/help/mcve). You can build it with [DB Fiddle](http://dbfiddle.uk) or [SQL Fiddle](http://sqlfiddle.com).`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2018-04-27T09:57:23.536Z


## `|| welcome-test`

User-taught command: `the bot sees what is returned. [lemon](http://rlemon.ca) so maybe escaping it works?`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2018-04-26T16:32:07.660Z


## `|| welldonerobert`

User-taught command: `http://i.stack.imgur.com/cLNyd.png`

**Creator:** Sippy

**Creator ID:** 3846058

**Date Created:** 2015-07-14T09:08:01.965Z


## `|| wesnotworkingcode`

User-taught command: `http://i.imgur.com/t3q86.gif`

**Creator:** Jacob Raccuia

**Creator ID:** undefined

**Date Created:** 2014-04-25T18:25:23.818Z


## `|| wesworkingcode`

User-taught command: `http://i.imgur.com/sTXwc12.gif`

**Creator:** Wes

**Creator ID:** undefined

**Date Created:** 2014-04-25T18:22:58.628Z


## `|| what's`

User-taught command: my\sname\?? `<`

**Creator:** Jacques Marais

**Creator ID:** 5305938

**Date Created:** 2015-11-14T15:29:50.333Z


## `|| whatyouthink`

User-taught command: `https://www.youtube.com/watch?v=OWn0OCs0h-E&t=0m20s`

**Creator:** mikedidthis

**Creator ID:** undefined

**Date Created:** 2014-05-09T08:26:31.037Z


## `|| wheatly`

User-taught command: `http://www.mememaker.net/static/images/memes/3453121.jpg`

**Creator:** RUJordan

**Creator ID:** undefined

**Date Created:** 2014-04-30T21:13:21.271Z


## `|| wheaton`

User-taught command: `http://i.imgur.com/m4vpNep.gifv`

**Creator:** Shmiddty

**Creator ID:** 1585400

**Date Created:** 2015-04-14T19:49:17.421Z


## `|| wheel`

User-taught command: `http://i.imgur.com/RvpQAud.gif`

**Creator:** Kitler

**Creator ID:** 1401094

**Date Created:** 2015-07-10T07:44:14.835Z


## `|| whicheditor`

User-taught command: ` [list of editors and IDEs which we of room 17 use and can recommend, sorted alphabetically: https://gist.github.com/Zirak/9999e97e01a7bd0a76f6](https://gist.github.com/Zirak/9999e97e01a7bd0a76f6)`

**Creator:** Awal Garg

**Creator ID:** 3459110

**Date Created:** 2015-09-05T16:50:38.717Z


## `|| whiteshadow`

User-taught command: `http://youtu.be/--O38hPNE1E?t=44s`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-21T17:59:13.404Z


## `|| who_is_the_man?`

User-taught command: `You are the man`

**Creator:** ItachiUchiha

**Creator ID:** 1759128

**Date Created:** 2015-05-28T10:46:38.185Z


## `|| whocares`

User-taught command: `http://37.media.tumblr.com/tumblr_ls400eJKpe1r317bvo1_250.gif`

**Creator:** Carrie Kendall

**Creator ID:** undefined

**Date Created:** 2014-05-27T20:41:11.767Z


## `|| whoisbaby`

User-taught command: `You're the baby! The cute one!`

**Creator:** TheLittleNaruto

**Creator ID:** 1944896

**Date Created:** 2015-06-13T08:59:02.317Z


## `|| whoisshane`

User-taught command: ` @Shaneis, a coffee geek`

**Creator:** Sankar

**Creator ID:** 2131576

**Date Created:** 2018-04-05T09:19:17.880Z


## `|| why`

User-taught command: `because you touch yourself at night`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-05-20T19:25:51.504Z


## `|| wietlol`

User-taught command: `https://chat.stackoverflow.com/transcript/7?m=39487775#39487775`

**Creator:** Metallkiller

**Creator ID:** 4364057

**Date Created:** 2017-10-06T15:21:49.732Z


## `|| wietlol1337`

User-taught command: `https://chat.stackoverflow.com/transcript/message/46361329#46361329`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2019-05-30T12:00:11.707Z


## `|| wietlol2`

User-taught command: `https://chat.stackoverflow.com/transcript/7?m=39129100#39129100`

**Creator:** Metallkiller

**Creator ID:** 4364057

**Date Created:** 2018-02-14T10:48:48.796Z


## `|| wietlol3`

User-taught command: `https://chat.stackoverflow.com/transcript/message/43216691#43216691`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-07-11T10:15:07.825Z


## `|| wietlol4`

User-taught command: `https://chat.stackoverflow.com/transcript/message/43422951#43422951`

**Creator:** Héctor Álvarez

**Creator ID:** 8300809

**Date Created:** 2018-07-30T10:40:27.057Z


## `|| wietlol5`

User-taught command: `https://chat.stackoverflow.com/transcript/message/43666078#43666078`

**Creator:** Lee Butler

**Creator ID:** 3033062

**Date Created:** 2018-08-21T10:29:18.067Z


## `|| wietlol6`

User-taught command: `https://chat.stackoverflow.com/transcript/message/43973416#43973416`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-09-18T10:44:52.375Z


## `|| wilslaw`

User-taught command: `Don't be a dick`

**Creator:** MikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2018-06-05T16:47:35.959Z


## `|| winamp`

User-taught command: `It really whips the llama's ass!`

**Creator:** easwee

**Creator ID:** undefined

**Date Created:** 2014-10-24T09:08:08.883Z


## `|| winform`

User-taught command: `Are you high?`

**Creator:** ngunha02

**Creator ID:** 1482044

**Date Created:** 2017-04-10T07:37:44.977Z


## `|| witch`

User-taught command: `https://i.imgur.com/8ygE5Ea.png`

**Creator:** Nerd in training

**Creator ID:** 5757162

**Date Created:** 2017-08-18T07:56:32.032Z


## `|| wlct`

User-taught command: `Welcome to the SQL chatroom! Got a SQL question? Don't ask if you can ask, just ask, and if someone knows the answer and isn't busy, they'll help. Tell us your Database, quick question = quick answer. Long question, we will need an MCVE ---> MCVE help. You can build it with [DB Fiddle](https://dbfiddle.uk/) or [SQL Fiddle](http://sqlfiddle.com).`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-04-27T06:01:24.164Z


## `|| woah`

User-taught command: `http://ljdchost.com/Itu1Yh0.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-08-13T17:08:21.363Z


## `|| womanizer`

User-taught command: ` https://chat.stackoverflow.com/transcript/message/40630036#40630036`

**Creator:** Benjamin Gruenbaum

**Creator ID:** 1348195

**Date Created:** 2018-01-01T13:37:17.485Z


## `|| womm`

User-taught command: `http://blog.codinghorror.com/content/images/uploads/2007/03/6a0120a85dcdae970b0128776ff992970c-pi.png`

**Creator:** Sippy

**Creator ID:** 3846058

**Date Created:** 2015-04-16T13:30:33.197Z


## `|| womper`

User-taught Command: `Goooooooooooooooooooooooooooooooooooood Morning Everyone!!!!!! :D`

**Creator:** Carl Anderson

**Creator ID:** 2171147

**Date Created:** Fri Dec 13 2019 12:48:08 GMT-0500 (Eastern Standard Time)


## `|| womper_missile`

User-taught Command: `Goooooooooooooooooooooooooooooooooooood Morning {1}!!!!!! :D`

**Creator:** Dave S

**Creator ID:** 2680506

**Date Created:** Wed Dec 18 2019 14:06:48 GMT-0500 (Eastern Standard Time)


## `|| womper_nam`

User-taught Command: `Goooooooooooooooooooooooooooooooooooood Morning Vietnam!!!!!! :D`

**Creator:** JBis

**Creator ID:** 7886229

**Date Created:** Thu Dec 19 2019 08:45:23 GMT-0500 (Eastern Standard Time)


## `|| womper_surprised`

User-taught Command: `https://i.imgur.com/gNyGnwB.png`

**Creator:** Mauker

**Creator ID:** 4070469

**Date Created:** Tue Dec 10 2019 14:08:43 GMT-0500 (Eastern Standard Time)


## `|| woosh`

User-taught command: `http://i.imgur.com/axJmn.gif`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2017-04-13T19:17:12.896Z


## `|| wow`

User-taught command: `https://media.giphy.com/media/udmx3pgdiD7tm/giphy.gif`

**Creator:** Sterling Archer

**Creator ID:** 774078

**Date Created:** 2018-01-30T20:14:10.133Z


## `|| wrong`

User-taught command: `https://media.giphy.com/media/3oz8xLd9DJq2l2VFtu/giphy.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-04-06T12:58:35.421Z


## `|| wtf`

User-taught command: `https://i.stack.imgur.com/eU8Fa.gif`

**Creator:** Second Rikudo

**Creator ID:** undefined

**Date Created:** 2014-10-17T11:11:16.868Z


## `|| wtfjs`

User-taught command: `http://wtfjs.com/`

**Creator:** towc

**Creator ID:** undefined

**Date Created:** 2014-08-26T18:40:45.999Z


## `|| wtpm`

User-taught command: `http://i0.kym-cdn.com/photos/images/original/000/272/943/b55.jpg`

**Creator:** tarboy9

**Creator ID:** 5521842

**Date Created:** 2015-11-03T23:16:17.001Z


## `|| wulworine`

User-taught command: `http://stackoverflow.com/users/3184380/wulworine`

**Creator:** Wulworine

**Creator ID:** undefined

**Date Created:** 2014-05-24T05:12:38.792Z


## `|| wut`

User-taught command: `http://images5.fanpop.com/image/photos/29800000/Wut-XD-random-29839102-500-276.jpg`

**Creator:** Carrie Kendall

**Creator ID:** undefined

**Date Created:** 2014-05-29T18:06:19.145Z


## `|| wutface`

User-taught command: `https://pbs.twimg.com/media/B0-MiHzCMAADysA.png`

**Creator:** Sippy

**Creator ID:** 3846058

**Date Created:** 2015-11-26T12:33:35.374Z


## `|| x`

User-taught command: `https://i.stack.imgur.com/ffdWO.jpg`

**Creator:** MikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2019-03-05T21:28:41.220Z


## `|| xkcd#`

User-taught command: `https://xkcd.com/$0/`

**Creator:** Squirrelkiller

**Creator ID:** 4364057

**Date Created:** 2018-06-19T16:29:33.589Z


## `|| xy`

User-taught command: `https://meta.stackexchange.com/questions/66377/what-is-the-xy-problem`

**Creator:** Kendall Frey

**Creator ID:** 785745

**Date Created:** 2018-04-04T14:20:03.558Z


## `|| xyxl`

User-taught command: `https://chat.stackoverflow.com/transcript/message/42800700#42800700`

**Creator:** Lee Butler

**Creator ID:** 3033062

**Date Created:** 2018-06-06T14:19:35.172Z


## `|| xyxl2`

User-taught command: `     █   █   █   █  █   █r\n     █   █   █   █  █   █\r\n     █   █    █ █    █ █\r\n     █   █     █      █\r\n              █ █     █\r\n     █   █   █   █    █`

**Creator:** Lee Butler

**Creator ID:** 3033062

**Date Created:** 2018-06-06T14:25:16.065Z


## `|| y`

User-taught command: `https://www.youtube.com/watch?v=kdBAlvSjh5M`

**Creator:** crl

**Creator ID:** 3183756

**Date Created:** 2015-10-31T13:20:13.841Z


## `|| yawn`

User-taught command: `http://www.petcarevb.com/wordpress/wp-content/uploads/2010/08/bun-yawn.jpg`

**Creator:** Nimesh

**Creator ID:** 3761928

**Date Created:** 2015-01-23T12:15:45.477Z


## `|| ye`

User-taught command: `https://www.youtube.com/watch?v=q6EoRBvdVPQ`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-08-14T14:25:48.005Z


## `|| yeah`

User-taught command: `https://miniganb.files.wordpress.com/2012/06/csi_miami_yeah.jpg`

**Creator:** Rvervuurt

**Creator ID:** 1264481

**Date Created:** 2015-07-21T13:50:50.941Z


## `|| yeahno`

User-taught command: `http://thoughtcatalog.files.wordpress.com/2013/07/5.gif?w=584`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-10-02T13:06:12.937Z


## `|| yesno`

User-taught command: `https://www.youtube.com/watch?v=x5Za8HggalY`

**Creator:** Nerd in training

**Creator ID:** 5757162

**Date Created:** 2017-07-20T08:40:44.934Z


## `|| yesss`

User-taught command: `http://i.imgur.com/JQHxptU.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-09-22T13:39:49.149Z


## `|| yoda`

User-taught command: `https://i.imgflip.com/sn2p5.jpg`

**Creator:** drunken squirrel

**Creator ID:** 9876009

**Date Created:** 2018-06-15T15:51:18.850Z


## `|| you_rock`

User-taught command: `@katherine you rock!!`

**Creator:** ItachiUchiha

**Creator ID:** 1759128

**Date Created:** 2015-06-10T09:13:14.793Z


## `|| youdidntseeanything`

User-taught command: `https://i.imgur.com/nfXGs9J.mp4`

**Creator:** Madara Uchiha

**Creator ID:** 871050

**Date Created:** 2018-03-18T17:52:58.664Z


## `|| youdontsay`

User-taught command: `https://i.stack.imgur.com/yReBf.png`

**Creator:** MikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2018-04-12T16:58:56.790Z


## `|| youidiotthisshit`

User-taught command: ` http://i.imgur.com/yGdUAG7.gif`

**Creator:** uselesschien

**Creator ID:** 1947276

**Date Created:** 2015-07-26T09:42:41.943Z


## `|| youjustlost`

User-taught command: `https://www.youtube.com/watch?v=pVP4qz73GMM`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-04-25T14:35:23.630Z


## `|| youropinions`

User-taught command: `http://i.imgur.com/KS1vB4a.gif`

**Creator:** rlemon

**Creator ID:** undefined

**Date Created:** 2014-05-01T19:05:23.125Z


## `|| youserious`

User-taught command: `http://img.pandawhale.com/post-32322-Bender-haha-gif-Futurama-Oh-wa-PgCH.gif`

**Creator:** Awal Garg

**Creator ID:** 3459110

**Date Created:** 2014-12-21T11:51:29.860Z


## `|| ziraksadvice`

User-taught command: ` http://chat.stackoverflow.com/transcript/message/16093859#16093859`

**Creator:** Benjamin Gruenbaum

**Creator ID:** undefined

**Date Created:** 2014-04-28T11:30:45.947Z


## `|| ziraksignal`

User-taught command: `https://i.stack.imgur.com/atpQ0.gif`

**Creator:** Second Rikudo

**Creator ID:** undefined

**Date Created:** 2014-10-27T21:09:02.894Z


## `|| zoidberg`

User-taught command: (w+) `The $0 is bad and you should feel bad`

**Creator:** mikeTheLiar

**Creator ID:** 1015495

**Date Created:** 2017-03-17T14:29:12.940Z


## `|| zoomcat`

User-taught command: `http://25.media.tumblr.com/tumblr_leq5l8RBQH1qcn249o1_250.gif`

**Creator:** Hans1984

**Creator ID:** 4581014

**Date Created:** 2017-04-11T12:35:09.499Z


## `|| zzodici`

User-taught command: `http://i.imgur.com/iCwIgHR.gif`

**Creator:** Ronald Ulysses Swanson

**Creator ID:** 4251625

**Date Created:** 2015-07-11T09:40:34.953Z


## `|| π`

User-taught command: `3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227`

**Creator:** rlemon

**Creator ID:** 829835

**Date Created:** 2015-06-11T13:07:51.876Z


## `|| א`

User-taught command: `aleph`

**Creator:** Shadow Wizard

**Creator ID:** 447356

**Date Created:** 2017-08-01T15:24:41.371Z
