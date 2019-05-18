# StackExchange Chat API Documentation
*More in depth description coming soon*

Partly Based on: https://github.com/Zirak/SO-ChatBot/blob/master/master.js

Also thanks to @Zoe for providing some useful info on the `l` parameter as well as various other things.

**Note:** 

- siteURL is defined as `https://stackoverflow.com`
- chatURL is defined as `https://chat.stackoverflow.com`

The above can be changed depending the the chat room.

# Authentication

## Site Authentication

### Checking If Already Logged In

The chat, being a subdomain (`chat.`) of the main site, has access to the main site's cookies. 

The login form can be accessed directly at `siteURL + "/users/login"`. If the site detects you are already logged in, it will redirect you to the home page. This allows you to check if you are already logged in by checking the URL:
```javascript
await this.mainPage.goto(config.siteUrl + '/users/login'); /* load the login url like `https://stackoveflow.com/users/login`
if (!this.mainPage.url().includes("/users/login")) { /* if you are still on the page, and haven't been redicrected to the main site, `https://stackoveflow.com`, then you need to login */
    console.log("Already Logged in Yey!");
}      
```

**Note:** Although you are logged in, you may be provided with new cookies. If you are saving cookies, it is suggested that you save cookies after you are redirected.

### Logging In 
 
Once on the form page, the input with the id, `#email` , is used for email and `#password` for password.  The submit button has an id of `#submit-button`.

```javascript
await this.mainPage.focus('#email');
await this.mainPage.keyboard.type(config.email);
await this.mainPage.focus('#password');
await this.mainPage.keyboard.type(config.password);
await this.mainPage.click('#submit-button');
```

Once the submit button is clicked, you are redirected (It doesn't use AJAX to log you in).

If the login is successful, you are given the following cookies:

```json
[
  {"name":"rawr","value":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","domain":".stackoverflow.com","path":"/","expires":1566102128.309851,"size":68,"httpOnly":true,"secure":true,"session":false},
  {"name":"_ga","value":"GAxxxxxxxxxxxxxxxxxxxxxxx","domain":".stackoverflow.com","path":"/","expires":1621225333,"size":28,"httpOnly":false,"secure":false,"session":false},
  {"name":"_gid","value":"GAxxxxxxxxxxxxxxxxxxxxxxxxx","domain":".stackoverflow.com","path":"/","expires":1558239733,"size":31,"httpOnly":false,"secure":false,"session":false},
  {"name":"_gat","value":"x","domain":".stackoverflow.com","path":"/","expires":1558153393,"size":5,"httpOnly":false,"secure":false,"session":false},
  {"name":"prov","value":"xxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","domain":".stackoverflow.com","path":"/","expires":2682374400.519369,"size":40,"httpOnly":true,"secure":false,"session":false},
  {"name":"__qca","value":"xx-xxxxxxxxxx-xxxxxxxxxxxxx","domain":".stackoverflow.com","path":"/","expires":1592019936,"size":32,"httpOnly":false,"secure":false,"session":false},
  {"name":"acct","value":"t=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&s=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","domain":".stackoverflow.com","path":"/","expires":1574050786.045377,"size":81,"httpOnly":true,"secure":true,"session":false}
]

```

## Chat Authentication

First, a note on authentication. Apparently, the chat uses two things to
decide who you are. 


The first is, quite obviously, cookies (cookies shown above).
 
### `fkey`
The second is an elusive thing called the `fkey`.

The `fkey` is unique per user session (it changes on login and logout). The `fkey` is also used for users viewing the chat who are not logged in.

We aren't really sure what the `fkey` is exactly but it is required to view the chat and to send messages in the chat.

The `fkey` can be found in either of the following ways while on a chat page:

1. Getting the value of an input with the id `#fkey`. The input is the last element in the `<body>` and contains the fkey.

```html
<input id="fkey" name="fkey" type="hidden" value="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx">
```

2. Running the `fkey()` function

The `fkey()` function just does method 1 with the option for a custom argument.


```javascript
function fkey(e){
    return e||(e={}),e.fkey||(e.fkey=$("input[name='fkey']").attr("value")),e
}
```

`fkey()` will return a JavaScript object containing an `fkey` key and the actual `fkey` for its value:

```javascript
{fkey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
```

`fkey().fkey` returns the actual `fkey`

If you don't hate `fkey`s already, you will by the end :)

# Receiving Events (Messages + other stuff)

For receiving events you have 2 options: WebSockets or Long Polling

## WebSockets

### Authentication

Surprisingly the WebSocket does not require any `fkey` or cookies so its very easy to connect.

### Getting the WebSocket URL

The WebSocket URL is gotten by making a POST request to the `chatURL + '/ws-auth` with the following parameters:

- `roomid=[room number]`
- `fkey=[fkey obtained in previous steps]`

**Note:** A `content-type` header with a value of `application/x-www-form-urlencoded` MUST be sent or the POST data will not work and you will get a 404 error

The response is JSON containing a single url key with the websocket as it's value. The response looks like this:

```json
{"url":"wss://chat.sockets.stackexchange.com/events/1/..."}
```

Example code:

```javascript
const page = await this.browser.newPage();
await page.setRequestInterception(true);
page.on('request', interceptedRequest => {
    const data = {
        'headers': {
            'content-type': 'application/x-www-form-urlencoded',
         },
             'method': 'POST',
             'postData': `roomid=${this.roomNum}&fkey=${this.fkey}`,
         };
         interceptedRequest.continue(data);
    });
const response = await page.goto(config.chatURL + '/ws-auth');
const content = await response.text();
this.emit('main-site-login');
return JSON.parse(content).url;
```

### Connecting to the WebSocket


#### Obtaining the `l` param
The WebSocket requires an `l` parameter. We are not exactly sure what this is but it has to do with time, as omitting it results in a lot of history. Increasing it results in more recent messages. You can obtain the correct `l` time or just set it to a really high number.

1. Get the correct time - Credit to [@Zoe](https://chat.stackoverflow.com/users/6296561/zoe)

Generalized, you can get the time by sending a POST request to `<chat domain>/chats/<room id>/events`, and passing the fkey with it. In the URL, `<chat domain>` refers to the site you're on (i.e. `https://chat.stackoverflow.com`, but it can be any of the chat domains in the SE network), and `<room id>` is exactly as the name suggests - the ID if the room you're trying to join. Both of these parameters are without the brackets (`<>`) around them.

If the call succeeds, you'll get a JSON form in either a string format, or a JSON object variant, depending on your framework. From there, get/parse the value `time` key. 

Pseudo-code:
```
String time = post(CHAT_DOMAIN + "/chats/<room number>/events", cookies, PostData { "fkey": fkey }).getJsonObject("time").toString();
```

In JavaScript, it roughly looks like this

```
const page = await this.browser.newPage();
await page.setRequestInterception(true);
page.on('request', interceptedRequest => {
    const data = {
        'headers': {
            'content-type': 'application/x-www-form-urlencoded',
         },
         'method': 'POST',
         'postData': `fkey=${this.fkey}`,
     };
     interceptedRequest.continue(data);
});
const response = await page.goto(`${config.chatURL}/chats/${this.roomNum}/events`);
const content = await response.text();
return JSON.parse(content).time;
```

2. Just set it to `?l=99999999999`

This is what we do for the bot this repository contains, because it works, and it's one less request.

#### Actually Connecting (finally)

Using the URL and the `l` param obtained in the previous sections, connect to the WebSocket.

Cookies, nor `fkey` are required. However, **a `Origin` header with the value of the `chatURL` is required**. If the `Origin` header isn't provided the WebSocket will fail immediately fail with an `Error code 1006`.

If you are using [`ws`](https://github.com/websockets/ws), their documentation is awful and doesn't mention how to actually send headers so after trail and error/a couple Google Searches/looking through source code, we found this works:

```
const ws = new WebSocket(this.wsurl + "?l=99999999999",null,{
            headers: {
                "Origin": config.chatURL
            }
});
```
## Long Polling

`//TODO`

## Events

Once connected to the WebSocket or using Long Polling, you will receive events.  Events occur when just about anything happens, but also when nothing happens. You might still receive events even though the chat room has no traffic. 


### Basic Events

All messages are JSON objects starting with "

```json
{"r[room num]" : {
  /* content */
}}
```
For this documentation we will use room 1 for examples so:

```json
{"r1" : {
  /* content */
}}
```

The most simple one containing no events looks like this:
 
 ```{"r1" : {}}```
  
  
When there is no traffic there maybe an event like this:

```json
 {"r1" : {
        "t" : 23531002,
        "d" : 3
 }}
```

Currently what these values mean are unkown however Zorak speculates

> Again, I have no clue what these mean. I think `d` is short for `delta`, and
  maybe `t` is a form of internal timestamp or counter or...I don't know. However,
  remember this `t` value for when we discuss polling - it is used there. It does
  however seem to be related to how many messages were sent which are not in this
  room - so if you're listening to room 17, and someone posted a mesage on room 42
  then you'd get a `d` of 1, and the `t` value may be updated by 1. Or maybe not.
  The `t` values don't seem to be consistently increasing, or decreasing, or
  following any pattern I could recognise.

### Events We Care About

A standard message event looks like this:

```json
{"r1" : {
      "e" : [{
        "event_type" : 1,
        "time_stamp" : 1379405022,
        "content" : "test",
        "id" : 23531402,
        "user_id" : 617762,
        "user_name" : "Zirak",
        "room_id" : 1,
        "room_name" : "Sandbox",
        "message_id" : 11832153
      }],
      "t": 23531402,
      "d": 1
    }}
```

The event type is determined by the `event_type` property in the `e` property.

We don't know all event types but here are some of them. Please add as you find

| `event_type`  | Description   |
| ------------- | ------------- |
| 1  | New Message  |
| 2  | Edit  |
| 3  | User Join |
| 4  | User Leave  |
| 5  | Room name, description, or tag changes |
| 6  | Message starred or unstarred |
| 7  | Debug message. The signficance and usage of this is unknown. |
| 8  | Message directed at the user currently logged in. For example, `@JamesBot` |
| 9  | Message flagged as spam or offensive - possibly only receiveable by accounts with 10000 reputation |
| 10 | Message deleted |
| 11 | File added. A source says this is limited to one room - the Android SE testing app room |
| 12 | Moderator flag - like event 9, this is likely only receiveable by moderator accounts |
| 13 | User ignored or unignored |
| 14 | Global notification - notifications displayed as banners, excluding room invitations. Example: Room event |
| 15 | User access level changed. Access levels can be seen in `<chat domain>/rooms/info/<room id>/?tab=access` |
| 16 | User notification. The exact trigger is somewhat unclear, but it behaves the same way as event 14 in a browser |
| 17 | Room invitation |
| 18 | Triggered when someone replies to a message posted by the active account | 
| 19 | Message moved out of the room by a room owner or moderator |
| 20 | Message moved in to the room by a room owner or moderator | 
| 21 | Time break. Unclear usage in several sources |
| 22 | New items added to a feed ticker | 
| 29 | A user has been suspended |
| 30 | two accounts have been merged | 
| 34 | User name or avatar changed in chat |

#### User Join/Leave Event

// TODO

# Sending Events/Messages

## Sending Messages

Sending messages, for whatever, reason doesn't use the WebSocket, instead its a simple HTTP request with, you guessed it, the `fkey`.

To send, make a POST request to `chatURL + '/chats/[room num]/messages/new'` with the following parameters

- `text=[content]`
- `fkey=[fkey]`

Here's an example

```javascript
const page = await this.browser.newPage();
await page.setRequestInterception(true);
page.on('request', interceptedRequest => {
    const data = {
        'headers': {
            'content-type': 'application/x-www-form-urlencoded',
        },
        'method': 'POST',
        'postData': `text=${encodeURIComponent(msg)}&fkey=${this.fkey}`,
    };
    interceptedRequest.continue(data);
});
const response = await page.goto(`${config.chatURL}/chats/${this.roomNum}/messages/new`);
```

The Response will be one of the following:

| Response  | Description   |
| ------------- | ------------- |
| `{"id":11832651,"time":1379406464}` | Successful  |
| `You can perform this action again in X second(s)` | There's a throttle on how fast you can send message and you've reached it. Simply wait that amount of seconds and retry. We use the regex + code below for that. |
| `You need 20 reputation points...` | I don't know the exact wording but its something like that. It means you need....well....20 reputation points on the main site. Just answer a question and get upvoted. If you can't get 20 rep points on the main site than you probably shouldn't have a bot in the chat site.|

**Detect and Set Timeout for Throttle Sample Code**

```javascript
const text = await response.text();
await page.close();
const delay = text.match(/(?!You can perform this action again in )[0-9]+(?= second(s*)\.)/);
if(delay){
    setTimeout(()=>{
        this.send(msg);
    },(parseInt(delay)*1000) + 0.25);
}

``` 

## Editing Messages

Editing messages needs to be done within two minutes of the message being posted, due to SE restrictions. Editing can be achieved by posting to `<chat domain>/messages/<message id>`, and posting with the fkey parameter and a parameter called `text` containing the new content. `<chat domain>` is again the chat site you want to handle (i.e. `https://chat.stackoverflow.com`, and `<message id>` is the ID of the message you want to edit. Both of these are naturally without brackets. 

If the message isn't yours, or the edit window has elapsed, this will fail. 

Example POST data:

```json
{
    "fkey": "fkey here",
    "text": "This is where you add the new content of the message
}
```

// TODO

## Deleting messages

Deleting, like editing, needs to be done within two minutes of the message being posted, and the message needs to be yours. There are likely exceptions for moderator accounts. 

The endpoint used here is `<chat host>/messages/<message id>/delete`, again posting the fkey. 
