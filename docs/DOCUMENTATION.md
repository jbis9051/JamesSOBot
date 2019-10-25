# so-chatbot-boilerplate *1.0.0*



### src/Client.js


#### new Client() 







##### Properties

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |



##### Returns


- `Void`




### src/bot.js


#### log(str) 

Logs messages




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| str | `String`  |  | &nbsp; |




##### Returns


- `Void`



#### error(str) 

Logs Errors




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| str | `String`  |  | &nbsp; |




##### Returns


- `Void`



#### addCommand(cmd) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| cmd | `Object`  | - Command to add | &nbsp; |
| cmd.name | `String`  | - The name of the command. NOT used to identify a command is being called from a Message (If the name is "test", that doesn't mean that a message calling the command"test" will actually activate this command. If you wan't "test" to call this command, add it to the `shortcuts` array.) | &nbsp; |
| cmd.args | `Array`  | - A description of the args this command accepts. Only used for descriptive purposes. | &nbsp; |
| cmd.shortcuts | `Array`  | - Keywords that activate this command. If the Message's commandCall matches any of these shortcuts, this command will be activated. | &nbsp; |
| cmd.ignore | `Boolean`  | - Should this command be hidden from the help menu? | &nbsp; |
| cmd.permissions | `Array`  | - Array of groups allowed to use this command. Each entry should line up to group in `config.json["users_groups"]`. | &nbsp; |
| cmd.func | `CommandFunction`  | - The function to call when the command is activated | &nbsp; |




##### Returns


- `Void`



#### getCommand(cmdShortcut) 

Searches for a command based on command shortcuts




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| cmdShortcut |  | - shortcut of the command to search for | &nbsp; |




##### Returns


- `boolean` `Object`  - the command found, or false if none was found



#### getCommandFromName(cmdName) 

Searches for a command based on command name




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| cmdName |  | - Name of the command to search for | &nbsp; |




##### Returns


- `boolean` `Object`  - the command found, or false if none was found



#### commandExists(cmdName) 

Returns whether a command under a name exists




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| cmdName |  | - command name to search for | &nbsp; |




##### Returns


- `boolean`  - if the command exists



#### shutdown(msg) 

Shuts down the command after attempting to call shutdown scripts




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| msg | `Message`  |  | &nbsp; |




##### Returns


- `Void`



#### isCommand(str) 

Returns whether a space delimited string contains a command prefix




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| str | `String`  | - string to check | &nbsp; |




##### Returns


- `Boolean`  



#### isCommandPrefix(str) 

Returns whether a string is a command prefix defined in `lang.json.prefix` array




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| str | `String`  | - string to check | &nbsp; |




##### Returns


- `Boolean`  



#### isCommandMsg(msg) 

Returns whether a message contains a command prefix




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| msg | `Message`  | - Message to check | &nbsp; |




##### Returns


- `Boolean`  



#### permissionCheck(command, msg) 

Returns whether a Message object's sender has sufficient privileges to activate the `command`




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| command |  |  | &nbsp; |
| msg | `Message`  |  | &nbsp; |




##### Returns


- `boolean`  



#### format(msg) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| msg |  |  | &nbsp; |




##### Returns


- `[object Object]`  



#### isMyEvent(msg) 

Checks whether a Event object author is the bot




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| msg | `Message`  | - Message to check | &nbsp; |




##### Returns


- `boolean`  



#### validatorScriptRunner(msg) 

Runs validator scripts and returns true if all return true, other wise false




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| msg | `Message`  | - Message to pass to validation scripts | &nbsp; |




##### Returns


- `boolean`  - If the Message is valid



#### ListenerCheck(msg) 

Checks if listeners need to be ran and runs them if so




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| msg | `Message`  | - Message to pass to listeners | &nbsp; |




##### Returns


- `Void`



#### RegisterListener(listener) 

Register a msg listener. This bypasses the command checks and allows direct access to the `new-message` event. The only check ran are the validator scripts. This means it is your job to make sure the message is not from the bot itself.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| listener | `Object`  |  | &nbsp; |
| listener.func | `shouldRun`  |  | &nbsp; |
| listener.callback | `listenerFunction`  |  | &nbsp; |




##### Returns


- `Void`



#### RegisterClientListener() 

Gives direct access to StackExchangeClient events. This is very low-level and is not needed in most cases.






##### Returns


- `Void`



#### addValidatorScript(name, func) 

Adds a validator script to check




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `String`  | - Name of your validator script for logging purposes | &nbsp; |
| func | `validatorCallback`  |  | &nbsp; |




##### Returns


- `Void`



#### addShutdownScript(script) 

Adds a script to be ran when the bot is shutdown




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| script | `shutdownScript`  | - script to run | &nbsp; |




##### Returns


- `Void`



#### json_request(url, callback) 

Retrieve JSON data from `url` and passes it to the `callback`




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url | `String`  | - URL to request | &nbsp; |
| callback | `RequestCallback`  | - callback to pass | &nbsp; |




##### Returns


- `Promise.&lt;undefined&gt;`  



#### standard_request(url, callback) 

Retrieves data from URL and passes it to the `callback`. If you need JSON than use the `json_request` function




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url | `String`  | - URL to request | &nbsp; |
| callback | `RequestCallback`  |  | &nbsp; |




##### Returns


- `Promise.&lt;undefined&gt;`  



#### google_search(query[, site, selector], selectorMatch, callback) 

Allows you to retrieve data from Google Search




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| query | `String`  | - Google Search Query | &nbsp; |
| site | `String`  | - domain (`example.com`) of site you would like to limit Google Search to | *Optional* |
| selector | `SelectorFunction`  |  | *Optional* |
| selectorMatch | `RegExp`  | - Sometimes limiting to a site using Google Search Hacks, so we provide a way to check if the selected content matches what you really want. This is most useful for URL checking. | &nbsp; |
| callback | `GoogleCallback`  |  | &nbsp; |




##### Returns


- `Promise.&lt;undefined&gt;`  




### src/Message.js


#### new Message() 







##### Properties

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |



##### Returns


- `Void`



#### Message.constructor(data) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `Object`  | - raw message data | &nbsp; |




##### Returns


- `Void`



#### Message.replyDirect(content) 

Reply's to `this` message with `content`




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| content | `String`  |  | &nbsp; |




##### Returns


- `Void`



#### Message.getStaticUserUID() 

Returns a unique identifier for the user that sent this message. Usually a numerical string.






##### Returns


- `String`  - The unique identifier



#### Message.getVariableUsername() 

Returns a possibly variable friendly username. This may change so DO NOT rely on it for authorization/authentication.






##### Returns


- `String`  - The friendly username



#### Message.getContent() 

Returns the message's content






##### Returns


- `String`  - message content



#### Message.link(text, url) 

Receives a url and text to display, returns a recognizable link




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| text | `String`  |  | &nbsp; |
| url | `String`  |  | &nbsp; |




##### Returns


- `Void`



#### Message.escape(content) 

Escape characters meaningful to the chat, such as parentheses full list of escaped characters: `*_()[]




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| content | `String`  | - content to escape | &nbsp; |




##### Returns


- `String`  - the escaped string




### src/plugins/applesupport.js


#### aps(query) 

Searches for query on Apple Support




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| query | `String`  |  | &nbsp; |




##### Returns


- `String`  - An Apple Support article based on your `query`




### src/plugins/help.js


#### help() 

Lists commands






##### Returns


- `String`  - List of commands




### src/plugins/funfact.js


#### funfact() 

Sends a fun fact






##### Returns


- `String`  - A fun fact from the `http://randomuselessfact.appspot.com/random.json?language=en`




### src/plugins/joke.js


#### joke() 

Sends a joke






##### Returns


- `String`  - A joke from the `https://official-joke-api.appspot.com/jokes/programming/random`




### src/plugins/life.js


#### disable() 

Disables the bot. Won't respond to messages until `|| enable` is ran by admin.






##### Returns


- `Void`



#### enable() 

Enables the bot. Will start listening for messages again.






##### Returns


- `Void`




### src/plugins/mdn.js


#### mdn(query) 

Searches for query on MDN




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| query | `String`  |  | &nbsp; |




##### Returns


- `String`  - An MDN article based on your `query`




### src/plugins/random.js


#### random(min, max) 

Generates Random number in range of [min,max] (both inclusive)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| min | `int`  |  | &nbsp; |
| max | `int`  |  | &nbsp; |




##### Returns


- `String`  - A random number between min and max (inclusive)




### src/plugins/rules.js


#### laws() 

Lists the laws

Alias:

- `rules`






##### Returns


- `String`  - The laws




### src/plugins/selfDestruct.js


#### die() 

Ends the bot's node process.

Alias:

- `sudo kill self`

**Requires:** `sudo`






##### Returns


- `Void`




### src/plugins/status.js


#### status() 

Used to check if the bot is alive.






##### Returns


- `String`  - describes status




### src/plugins/timer.js


#### remind(user, message, time) 

Sets a timer to remind a user a message at a specific time relative to the current time

Alias:

- `timer`




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| user | `String`  | - username of the person to remind, or "me" if you want the bot to remind you | &nbsp; |
| message | `String`  | - the message to be reminded about | &nbsp; |
| time | `String`  | - in how much time, relative to the current time, would you like the remind to occur. Must be in the following format: `int [suffix]` or `int[one letter suffix]` <br>Example:<br>`|| remind @JBis Hello. 5 seconds`<br>`|| remind @JBis Hello. 5s`<br>Suffixes:<br>| Unit | Suffixes |<br>|------|----------|<br>| Seconds | <ul><li>`seconds`</li><li>`sec`</li><li>`s`</li></ul> |<br>| Minutes | <ul><li>`minutes`</li><li>`min`</li><li>`m`</li></ul> |<br>| Hours | <ul><li>`hours`</li><li>`h`</li></ul> | | &nbsp; |




##### Returns


- `Void`




### src/plugins/welcome.js


#### welcome(user) 

Welcomes a new user to the room with a message




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| user | `String`  | - user to welcome | &nbsp; |




##### Returns


- `Void`




### src/plugins/wiki.js


#### wiki(query) 

Searches for query on Wikipedia




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| query | `String`  |  | &nbsp; |




##### Returns


- `String`  - A Wikipedia article based on your `query`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
