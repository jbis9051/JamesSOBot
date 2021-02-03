# StackExchange Chat API Documentation

Partly Based on: https://github.com/Zirak/SO-ChatBot/blob/master/master.js

Also thanks to @Zoe for providing some useful info on the `l` parameter as well as various other things.

**Note:**

- `siteURL` is defined as `https://stackoverflow.com`
- `chatURL` is defined as `https://chat.stackoverflow.com`

The above can be changed depending the the chat room.

# Authentication

## Site Authentication

### Checking If Already Logged In

The chat, being a subdomain (`chat.`) of the main site, has access to the main site's cookies.

The login form can be accessed directly at `siteURL + "/users/login"`. If the site detects you are already logged in, it
will redirect you to the home page. This allows you to check if you are already logged in by checking the URL:

```javascript
const resp = await request({
  method: 'GET',
  uri: this.siteURL + '/users/login',
  jar: this.cookieJar,
  resolveWithFullResponse: true,
});
if (resp.request.path === '/') {
  // if we are redirected to the homepage (https://stackoverflow.com) the path will be "/"
  console.log('Already Logged in Yey!');
  return;
}
```

**Note:** Although you are logged in, you may be provided with new cookies. If you are saving cookies, it is suggested
that you save cookies after you are redirected.

### Logging In

Once on the form page, the input with the id, `#email` , is used for email and
`#password` for password. The submit button has an id of `#submit-button`.

```javascript
await this.mainPage.focus('#email');
await this.mainPage.keyboard.type(config.email);
await this.mainPage.focus('#password');
await this.mainPage.keyboard.type(config.password);
await this.mainPage.click('#submit-button');
```

Instead you can make a `POST` request to `/users/login`. If you are using this method you MUST submit the fkey (CSRF
token). This is located in a hidden input field with the `name` as `fkey`.

```javascript
const resp = /* request to /users/login */;
const $ = cheerio.load(resp.body);
const fkey = $('input[name="fkey"]').val();
const body = await request({
  method: 'POST',
  uri: this.siteURL + '/users/login',
  jar: this.cookieJar,
  followAllRedirects: true,
    form: {
        fkey: fkey,
        email: config.email,
        password: config.password
    }
});
```

Once the submit button is clicked, you are redirected (It doesn't use AJAX to log you in).

If the login is successful, you are given the following cookies:

```json
[
  {
    "name": "rawr",
    "value": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "domain": ".stackoverflow.com",
    "path": "/",
    "expires": 1566102128.309851,
    "size": 68,
    "httpOnly": true,
    "secure": true,
    "session": false
  },
  {
    "name": "_ga",
    "value": "GAxxxxxxxxxxxxxxxxxxxxxxx",
    "domain": ".stackoverflow.com",
    "path": "/",
    "expires": 1621225333,
    "size": 28,
    "httpOnly": false,
    "secure": false,
    "session": false
  },
  {
    "name": "_gid",
    "value": "GAxxxxxxxxxxxxxxxxxxxxxxxxx",
    "domain": ".stackoverflow.com",
    "path": "/",
    "expires": 1558239733,
    "size": 31,
    "httpOnly": false,
    "secure": false,
    "session": false
  },
  {
    "name": "_gat",
    "value": "x",
    "domain": ".stackoverflow.com",
    "path": "/",
    "expires": 1558153393,
    "size": 5,
    "httpOnly": false,
    "secure": false,
    "session": false
  },
  {
    "name": "prov",
    "value": "xxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "domain": ".stackoverflow.com",
    "path": "/",
    "expires": 2682374400.519369,
    "size": 40,
    "httpOnly": true,
    "secure": false,
    "session": false
  },
  {
    "name": "__qca",
    "value": "xx-xxxxxxxxxx-xxxxxxxxxxxxx",
    "domain": ".stackoverflow.com",
    "path": "/",
    "expires": 1592019936,
    "size": 32,
    "httpOnly": false,
    "secure": false,
    "session": false
  },
  {
    "name": "acct",
    "value": "t=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&s=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "domain": ".stackoverflow.com",
    "path": "/",
    "expires": 1574050786.045377,
    "size": 81,
    "httpOnly": true,
    "secure": true,
    "session": false
  }
]
```

## Chat Authentication

First, a note on authentication. Apparently, the chat uses two things to decide who you are.

The first is, quite obviously, cookies (cookies shown above).

### `fkey`

The second is an elusive thing called the `fkey`.

The `fkey` is unique per user session (it changes on login and logout). The
`fkey` is also used for users viewing the chat who are not logged in.

The `fkey` is basically a CSRF token and it is required to view the chat and to send messages in the chat.

The `fkey` can be found in either of the following ways while on a chat page:

1. Getting the value of an input with the id `#fkey`. The input is the last element in the `<body>` and contains the
   fkey.

```html
<input
  id="fkey"
  name="fkey"
  type="hidden"
  value="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
/>
```

2. Running the `fkey()` function

The `fkey()` function just does method 1 with the option for a custom argument.

```javascript
function fkey(e) {
  return (
    e || (e = {}), e.fkey || (e.fkey = $("input[name='fkey']").attr('value')), e
  );
}
```

`fkey()` will return a JavaScript object containing an `fkey` key and the actual
`fkey` for its value:

```javascript
{
  fkey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
}
```

`fkey().fkey` returns the actual `fkey`

If you don't hate `fkey`s already, you will by the end :)

# Receiving Events (Messages + other stuff)

For receiving events you have 2 options: WebSockets or Long Polling.

## WebSockets

### Authentication

Surprisingly the WebSocket does not require any `fkey` or cookies so its very easy to connect.

### Getting the WebSocket URL

The WebSocket URL is gotten by making a POST request, **with the login cookies**, to the `chatURL + '/ws-auth` with the
following parameters:

- `roomid=[room number]`
- `fkey=[fkey obtained in previous steps]`

**Note:** A `content-type` header with a value of
`application/x-www-form-urlencoded` MUST be sent or the POST data will not work and you will get a 404 error.

The response is JSON containing a single url key with the websocket as it's value. The response looks like this:

```json
{ "url": "wss://chat.sockets.stackexchange.com/events/1/..." }
```

Example code:

```javascript
const json = await request({
  method: 'POST',
  uri: this.chatURL + '/ws-auth',
  jar: this.cookieJar,
  form: {
    roomid: roomNum,
    fkey: this.fkey,
  },
});
return JSON.parse(json).url;
```

### Connecting to the WebSocket

#### Obtaining the `l` param

The WebSocket requires an `l` parameter. We are not exactly sure what this is but it has to do with time, as omitting it
results in a lot of history. Increasing it results in more recent messages. You can obtain the correct `l`
time or just set it to a really high number.

1. Get the correct time - Credit to
   [@Zoe](https://chat.stackoverflow.com/users/6296561/zoe)

Generalized, you can get the time by sending a POST request to
`<chat domain>/chats/<room id>/events`, and passing the fkey with it. In the URL, `<chat domain>` refers to the site
you're on (i.e.
`https://chat.stackoverflow.com`, but it can be any of the chat domains in the SE network), and `<room id>` is exactly
as the name suggests - the ID if the room you're trying to join. Both of these parameters are without the brackets
(`<>`) around them.

If the call succeeds, you'll get a JSON form in either a string format, or a JSON object variant, depending on your
framework. From there, get/parse the value `time` key.

Pseudo-code:

```
String time = post(CHAT_DOMAIN + "/chats/<room number>/events", cookies, PostData { "fkey": fkey }).getJsonObject("time").toString();
```

In JavaScript, it roughly looks like this

```
const json = await request({
    method: 'POST',
    uri: this.chatURL + `/chats/${this.roomNum}/events`,
    jar: this.cookieJar,
    form: {
        fkey: this.fkey,
    },
});
return JSON.parse(json).time;
```

2. Just set it to `?l=99999999999`

This is what we do for the bot this repository contains, because it works, and it's one less request.

#### Actually Connecting (finally)

Using the URL and the `l` param obtained in the previous sections, connect to the WebSocket.

Cookies, nor `fkey` are required. However, **a `Origin` header with the value of the `chatURL` is required**. If
the `Origin` header isn't provided the WebSocket will fail immediately fail with an `Error code 1006`.

If you are using [`ws`](https://github.com/websockets/ws), their documentation is awful and doesn't mention how to
actually send headers so after trail and error/a couple Google Searches/looking through source code, we found this
works:

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

Once connected to the WebSocket or using Long Polling, you will receive events. Events occur when just about anything
happens, but also when nothing happens. You might still receive events even though the chat room has no traffic.

### Basic Events

All messages are JSON objects starting with "

```json
{
  "r[room num]": {
    /* content */
  }
}
```

For this documentation we will use room 1 for examples so:

```json
{
  "r1": {
    /* content */
  }
}
```

The most simple one containing no events looks like this:

`{"r1" : {}}`

When there is no traffic there maybe an event like this:

```json
{
  "r1": {
    "t": 23531002,
    "d": 3
  }
}
```

Currently what these values mean are unkown however Zorak speculates

> Again, I have no clue what these mean. I think `d` is short for `delta`, and
> maybe `t` is a form of internal timestamp or counter or...I don't know.
> However, remember this `t` value for when we discuss polling - it is used
> there. It does however seem to be related to how many messages were sent which
> are not in this room - so if you're listening to room 17, and someone posted a
> mesage on room 42 then you'd get a `d` of 1, and the `t` value may be updated
> by 1. Or maybe not. The `t` values don't seem to be consistently increasing,
> or decreasing, or following any pattern I could recognise.

### Events We Care About

A standard message event looks like this:

```json
{
  "r1": {
    "e": [
      {
        "event_type": 1,
        "time_stamp": 1379405022,
        "content": "test",
        "id": 23531402,
        "user_id": 617762,
        "user_name": "Zirak",
        "room_id": 1,
        "room_name": "Sandbox",
        "message_id": 11832153
      }
    ],
    "t": 23531402,
    "d": 1
  }
}
```

A standard message with image upload looks like this:

```json
{
  "r1": {
    "e": [
      {
        "event_type": 1,
        "time_stamp": 1558448296,
        "content": "\u003cdiv class=\"onebox ob-image\"\u003e\u003ca rel=\"nofollow noopener noreferrer\" href=\"//i.stack.imgur.com/6x6tw.png\"\u003e\u003cimg src=\"//i.stack.imgur.com/6x6tw.png\" class=\"user-image\" alt=\"user image\" /\u003e\u003c/a\u003e\u003c/div\u003e",
        "id": 94420223,
        "user_id": 7886229,
        "user_name": "JBis",
        "room_id": 1,
        "room_name": "Sandbox",
        "message_id": 46278793
      }
    ],
    "t": 94420223,
    "d": 1
  }
}
```

// TODO explain multiple room

The event type is determined by the `event_type` property in the `e` property.

We don't know all event types but here are some of them. Please add as you find

| `event_type` | Description                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------------------- |
| 1            | New Message                                                                                                    |
| 2            | Edit                                                                                                           |
| 3            | User Join                                                                                                      |
| 4            | User Leave                                                                                                     |
| 5            | Room name, description, or tag changes                                                                         |
| 6            | Message starred or unstarred                                                                                   |
| 7            | Debug message. The significance and usage of this is unknown.                                                  |
| 8            | Message directed at the user currently logged in. For example, `@JamesBot`                                     |
| 9            | Message flagged as spam or offensive - possibly only receivable by accounts with 10000 reputation              |
| 10           | Message deleted                                                                                                |
| 11           | File added. A source says this is limited to one room - the Android SE testing app room                        |
| 12           | Moderator flag - like event 9, this is likely only receivable by moderator accounts                            |
| 13           | User ignored or unignored                                                                                      |
| 14           | Global notification - notifications displayed as banners, excluding room invitations. Example: Room event      |
| 15           | User access level changed. Access levels can be seen in `<chat domain>/rooms/info/<room id>/?tab=access`       |
| 16           | User notification. The exact trigger is somewhat unclear, but it behaves the same way as event 14 in a browser |
| 17           | Room invitation                                                                                                |
| 18           | Triggered when someone replies to a message posted by the active account                                       |
| 19           | Message moved out of the room by a room owner or moderator                                                     |
| 20           | Message moved in to the room by a room owner or moderator                                                      |
| 21           | Time break. Unclear usage in several sources                                                                   |
| 22           | New items added to a feed ticker                                                                               |
| 29           | A user has been suspended                                                                                      |
| 30           | Two accounts have been merged                                                                                  |
| 34           | User name or avatar changed in chat                                                                            |

## Image Event

When an image is sent the event looks like:

```javascript
{ event_type: 1,
  time_stamp: 1559178320,
  content: '<div class="onebox ob-image"><a rel="nofollow noopener noreferrer" href="//i.stack.imgur.com/dPoSj.png"><img src="//i.stack.imgur.com/dPoSj.png" class="user-image" alt="user image" /></a></div>',
  id: 94579899,
  user_id: 7886229,
  user_name: 'JBis',
  room_id: 193540,
  room_name: 'Test My Bot',
  message_id: 46357134 }
```

#### User Join/Leave Event

## User Join Event

Example:

Room 23:

```json
{
  "r23": {
    "e": [
      {
        "event_type": 3,
        "time_stamp": 1558447963,
        "id": 94420093,
        "user_id": 7886229,
        "target_user_id": 7886229,
        "user_name": "JBis",
        "room_id": 23,
        "room_name": "F#"
      }
    ],
    "t": 94420094,
    "d": 2
  }
}
```

# Sending Events/Messages

## Sending Messages

Sending messages, for whatever, reason doesn't use the WebSocket, instead its a simple HTTP request with, you guessed
it, the `fkey`.

To send, make a POST request to `chatURL + '/chats/[room num]/messages/new'`
with the following parameters

- `text=[content]`
- `fkey=[fkey]`

Here's an example

```javascript
const body = await request({
  method: 'POST',
  uri: `${this.chatURL}/chats/${roomNum}/messages/new`,
  jar: this.cookieJar,
  form: {
    text: 'Hello',
    fkey: this.fkey,
  },
});
```

The Response will be one of the following:

| Response                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{"id":11832651,"time":1379406464}`                      | Successful                                                                                                                                                                                                                                                                                                                                                                                                            |
| `{"id":null,"time":null}`                                | If you send to many of the same messages consecutively, it won't send and you will get this message.                                                                                                                                                                                                                                                                                                                  |
| `You can perform this action again in X second(s)`       | There's a throttle on how fast you can send message and you've reached it. Simply wait that amount of seconds and retry. We use the regex + code below for that.                                                                                                                                                                                                                                                      |
| `You need 20 reputation points...`                       | I don't know the exact wording but its something like that. It means you need....well....20 reputation points on the main site. Just answer a question and get upvoted. If you can't get 20 rep points on the main site than you probably shouldn't have a bot in the chat site.                                                                                                                                      |
| `The room has been frozen; new messages cannot be added` | After a certain amount of days of inactivity, a room will turn frozen. It can only be unfrozen by a moderator of the parent site. A room is frozen if there were at least 15 messages by at least two users, but was otherwise inactive for 14 days. If the minimum users and messages criteria are not met, the room is deleted instead, after only 7 days. [Source](https://meta.stackexchange.com/a/208589/388758) |
| `The room does not exist, or you do not have permission` | Contrary to what the message says this will only show up if you do not have permission. If the room does not exist you will receive and HTML error page                                                                                                                                                                                                                                                               |

**Detect and Set Timeout for Throttle Sample Code**

```javascript
const body = await request([...]).catch(error => { //request same as above, but catch errors
    this.bot.error(error.error);
    const delay = error.error.match(/(?!You can perform this action again in )[0-9]+(?= second(s*)\.)/);
    if (delay) {
        setTimeout(async () => {
            await this.send(msg, roomNum);
        }, (parseInt(delay) * 1000) + 0.25);
    }
});
```

## Editing Messages

Editing messages needs to be done within two minutes of the message being posted, due to SE restrictions. Editing can be
achieved by posting to
`<chat domain>/messages/<message id>`, and posting with the fkey parameter and a parameter called `text` containing the
new content. `<chat domain>` is again the chat site you want to handle (i.e. `https://chat.stackoverflow.com`, and
`<message id>` is the ID of the message you want to edit. Both of these are naturally without brackets.

You most also include a `Referer` header with the room number:

```json
{
  "Referer": "https://chat.stackoverflow.com/rooms/<room num>"
}
```

If the message isn't yours, or the edit window has elapsed, this will fail.

Example POST data:

```json
{
  "fkey": "fkey here",
  "text": "This is where you add the new content of the message"
}
```

```javascript
request({
  method: 'POST',
  uri: `${this.chatURL}/messages/${id}`,
  jar: this.cookieJar,
  headers: {
    referer: `${this.chatURL}/rooms/${roomNum}`,
  },
  form: {
    text: 'This is where you add the new content of the message',
    fkey: this.fkey,
  },
});
```

The Response will be one of the following:

| Response                                                 | Description                                                                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `"ok"`                                                   | Successful                                                                                                               |
| `"You can only edit your own messages"`                  | You tried to edit a message that wasn't yours. Check your message id.                                                    |
| `"It is too late to edit this message"`                  | Message was too old to be edited. There's a 2 min limit.                                                                 |
| `302 Found: /error?aspxerrorpath=/messages/<meesage id>` | Some other error occurred you are redirected via http code 302 to an html error page.                                    |
| `"You cannot write or edit messages in this room"`       | You probably forgot the referer with the correct room.                                                                   |
| `You can perform this action again in X second(s)`       | There's a throttle on how fast you can edit message and you've reached it. Simply wait that amount of seconds and retry. |

## Deleting messages

Deleting, like editing, needs to be done within two minutes of the message being posted, and the message needs to be
yours. There are likely exceptions for moderator accounts.

The endpoint used here is `<chat host>/messages/<message id>/delete`, again posting the fkey.

## Moving messages

In order to move a message, the user must be a room owner.

To move a message make a POST request to
`/admin/movePosts/<room message is from>'` with the following parameters

- fkey
- to - Room id where you want to move the message to,
- ids - message id(s) to move. If multiple, separated by a comma with no trailing spaces

```javascript
const body = await request({
  method: 'POST',
  uri: `${this.chatURL}/admin/movePosts/${msg.getContext()}`,
  jar: this.cookieJar,
  form: {
    fkey: fkey,
    to: 23262, // trash can https://chat.stackoverflow.com/rooms/23262/trash-can
    ids: msg.id,
  },
});
```

# User Information

## Username to id

There is no easy way to go from Username to id because different accounts can have very similar or the same username.
The method below isn't always reliable because of this. This alternate way only works if they are pingable. All users
who are currently in the room or have been in the room in the last couple
(//TODO name amount of days) are pingable.

Make a `GET` request to `chatURL + '/rooms/pingable/ + roomNum`, with your login cookies. If you do not provide login
cookies, you will receive an empty array
(`[]`) response.

```javascript
const body = await request({
  method: 'GET',
  uri: `${config.chatURL}/rooms/pingable/${this.roomNum}`,
  jar: this.cookieJar,
});
const array = JSON.parse(body).filter((a) => a[1] === username);
if (array.length === 0) {
  return false;
}
const id = array[0][0];
```

An example response looks like this:

```json
[
  [6296561, "Zoe", 1558822652, 1558800697],
  [13379, "Michael", 1558906481, 1558904598],
  [5757162, "Squirrel in training", 1558965412, 1558680106],
  [2450403, "Simmant", 1559047768, 1533014425],
  [8708364, "U9-Forward", 1559094174, 1559093204],
  [263525, "Denys Séguret", 1559105899, 1436283747],
  [1983854, "fedorqui", 1559125795, 1521635746],
  [4581014, "Hans1984", 1559132212, 1559129497],
  [11555333, "FunBot", 1559166271, 1559164314],
  [9717184, "connectyourcharger", 1559167898, 1559165454],
  [1440565, "Code-Apprentice", 1559171438, 1505930734],
  [10618540, "Paritosh Singh", 1559225674, 1559202201],
  [2326753, "C4d", 1559228511, 1559226579],
  [1114, "User", 1559235942, 1527790955]
]
```

## Searching For A Username

Searching for a user by name is pretty simple.

Simply make a GET request to

```
https://chat.stackoverflow.com/users/search?q=[search query]
```

You will receive a response with JavaScript objects, up to 50, of users matching your search query.

Example:

Request

```
https://chat.stackoverflow.com/users/search?q=JBis
```

Response

```javascript
{"id":7886229,"dn":"JBis","hash":"!https://i.stack.imgur.com/8kBbg.png?s=128&amp;g=1"}
{"id":1128805,"dn":"jbisa","hash":"05d61e48bb8383dd08a6f369a6286b9f"}
{"id":4826991,"dn":"Jbisgood9999999","hash":"!https://lh3.googleusercontent.com/-zK7AwNMh0g4/AAAAAAAAAAI/AAAAAAAAACs/06VTJLu-JEE/photo.jpg?sz=128"}
{"id":4559760,"dn":"JBiss","hash":"4a83dea33d0674a4e5389095509cc84c"}
{"id":8854949,"dn":"Manoj Bisarahalli","hash":"69965e456e56fbf3e33eb32de7ddcff3"}
{"id":2422621,"dn":"Manoj Bisht","hash":"!https://i.stack.imgur.com/M5Qtn.jpg"}
{"id":1734727,"dn":"Manoj Bisht","hash":"!https://cdn-chat.sstatic.net/chat/img/anon.png"}
{"id":6237079,"dn":"Manoj Bist","hash":"5d2c7cfe748eb9dd10f9118511c36beb"}
{"id":5936764,"dn":"neeraj bisht","hash":"!https://lh3.googleusercontent.com/-dc2Cgab4tD0/AAAAAAAAAAI/AAAAAAAAAC8/BxfsC9c8QKM/photo.jpg?sz=128"}
{"id":4823794,"dn":"Pankaj Bisaria","hash":"!https://cdn-chat.sstatic.net/chat/img/anon.png"}
{"id":2848655,"dn":"Pankaj Bishnoi","hash":"!https://www.gravatar.com/avatar/?s=128&amp;d=identicon&amp;r=PG&amp;f=1"}
{"id":3611958,"dn":"Pankaj Bisht","hash":"!https://i.stack.imgur.com/ISFs9.jpg?s=128&amp;g=1"}
{"id":6326785,"dn":"Raj Bisht","hash":"!https://cdn-chat.sstatic.net/chat/img/anon.png"}
{"id":5306656,"dn":"Ritej Bisaria","hash":"!https://cdn-chat.sstatic.net/chat/img/anon.png"}
{"id":7215546,"dn":"Ruturaj Bisure","hash":"fc70455d139cfac29f058fa91023541f"}
{"id":3057266,"dn":"Taj Bista","hash":"c8dca7011b91fa5cabbdbdbc2858e67d"}
```

Each JavaScript object contains an `id` key with the users id, a `dn` key with the users Username, and a `hash` key
containing a hash or URL for the users profile image. More information on the profile image in the _id to information_
section below.

### `limit` parameter

There is also an optional `limit=[limit num]` parameter to limit the number of results.

If `limit < 0` you will receive and HTML page with an error.

If `limit === 0` you will receive and empty response.

If `0 < limit <= 100` you will receive a response containing a maximum of
`limit` users

If `limit > 100` you will receive a response containing a maximum of 100 users

tl;dr The limit parameter is optional with a maximum of 100. If it is above 100, you will still only receive and maximum
of 100 users.

Example:

Request:

```
https://chat.stackoverflow.com/users/search?q=JBis&limit=2
```

Response:

```javascript
{"id":7886229,"dn":"JBis","hash":"!https://i.stack.imgur.com/8kBbg.png?s=128&amp;g=1"}
{"id":1128805,"dn":"jbisa","hash":"05d61e48bb8383dd08a6f369a6286b9f"}
```

## id to information

**For general user information we do not suggest using the method below. Instead,
use [the official StackExchange API](https://api.stackexchange.com/)**

User information is cached by the chat site and takes a couple hours to sync with the main site. So things like
reputation may not be entirely accurate (use the official API for that), but things like last seen and last post are
accurate.

To get user information make a POST request `chatURL + "/user/info"` with the following parameters. Cookies are NOT
required.

```json
{
  "ids": "[user id]",
  "roomID": "[room id]"
}
```

The roomID is required as it is needed for some of the information in the response.

Here is a sample request and response

Request:

```javascript
const body = await request({
  method: 'POST',
  uri: `${this.chatURL}/user/info`,
  form: {
    ids: id,
    roomId: roomNum,
  },
});
return JSON.parse(body);
```

Response

```json
{
  "users": [
    {
      "id": 7886229,
      "name": "JBis",
      "email_hash": "!https://i.stack.imgur.com/8kBbg.png?s=128\u0026g=1",
      "reputation": 324,
      "is_moderator": false,
      "is_owner": null,
      "last_post": 1558232577,
      "last_seen": 1558239940
    }
  ]
}
```

`is_moderator` is for the parent site of the chat. `is_owner` is for the room specified in roomId. `last_post` is the
last time the user chatted in any room.
`last_seen` is that last time the person interacted with the chat (sent message/joined a room/leaved a room, etc.)
. `email_hash` is a bit odd. Although it is labeled "email_hash" it will sometimes contain a URL to the users image with
an `!` prepended in front of it. Other times, it will contain a hash. This hash seems to either be
a [gravatar](https://gravatar.com) hash or not.

// TODO specify all actions that affect the `last_seen` value and the email_hash more depth.

## Room Information / Detect New User / User's Total Messages

Unfortunately there's no API to find this information. Instead we have to do some HTML parsing.

Make a request to

```
chatURL` + `/users/[user ID]`
```

You will receive and HTML response with a `<div>` element with an id of
`#user-roomcards-container`. This div contains all the rooms the user is currently in. Each room card will have an id
of `room-[room number]`. An example card for `#room-1` looks like the following. I have excluded unhelpful HTML:

```html
<div id="room-1" class="roomcard">
  <div class="room-header">
    [...]
    <h3>
      <span class="room-name" title="Sandbox"
        ><a rel="noreferrer noopener" href="/rooms/1/sandbox">Sandbox</a></span
      >
    </h3>
    [...]
    <div
      class="room-description"
      title="Where you can play with regular chat features (except flagging) without upsetting anyone"
    >
      Where you can play with regular chat features (except flagging) wit…
    </div>
    [...]
  </div>
  <div class="room-details">
    [...]
    <div class="last-activity">
      1h ago – <a href="/users/11518920/jamesbot" title="JamesBot">JamesBot</a>
    </div>
  </div>
  <div class="room-users" title="9 users present">
    <!-- 
                    --><a
      class="user-gravatar32"
      href="/users/11518920/jamesbot"
      ><img
        height="32"
        width="32"
        alt="JamesBot: 1h ago, 18 posts (0%)"
        title="JamesBot: 1h ago, 18 posts (0%)"
        src="https://i.stack.imgur.com/DHbov.png?s=32&amp;g=1"
        style="opacity:0.15;-moz-opacity:0.15;filter:alpha(opacity=15);" /></a
    ><!--
                    --><a class="user-gravatar32" href="/users/7886229/jbis"
      ><img
        height="32"
        width="32"
        alt="JBis: 2d ago, 159 posts (0%)"
        title="JBis: 2d ago, 159 posts (0%)"
        src="https://i.stack.imgur.com/8kBbg.png?s=32&amp;g=1"
        style="opacity:0.15;-moz-opacity:0.15;filter:alpha(opacity=15);" /></a
    ><!--
                    --><a class="user-gravatar32" href="/users/5858238/nyconing"
      ><img
        height="32"
        width="32"
        alt="nyconing: 3d ago, 68 posts (0%)"
        title="nyconing: 3d ago, 68 posts (0%)"
        src="https://i.stack.imgur.com/E1Dug.jpg?s=32&amp;g=1"
        style="opacity:0.15;-moz-opacity:0.15;filter:alpha(opacity=15);" /></a
    ><!--
                    -->[..rest of the users...]
  </div>

  <div class="room-message-count" title="159 all time messages (by JBis)">
    <a href="/transcript/1">159</a>
  </div>
  <div class="room-info-link">
    <a href="/rooms/info/1/sandbox">info</a>
    [...]
  </div>
</div>
```

As you can see there's a lot of info there. What we care about is:

```html
<div class="room-message-count" title="159 all time messages (by JBis)"></div>
```

To check total messages, get the `title` attribute for the `.room-message-count`
element:

```text
159 all time messages (by JBis)
```

You can use `^\d+` regex to parse the number:

```text
159
```

If this number is 0, the user has not chatted yet.

## Room Name and Description

To get the room name and description simply make a request to
`chatURL + '/rooms/thumbs/[room num]`.

You will get a JSON response like this:

```json
{
  "id": 17,
  "name": "JavaScript",
  "description": "Topic: JavaScript, ECMAScript. Read this: <a href=\"http://javascriptroom.github.io/rules\" rel=\"nofollow noopener noreferrer\">javascriptroom.github.io/rules</a>. Before asking inform yourself on the XY problem <a href=\"http://goo.gl/taIqf\" rel=\"nofollow noopener noreferrer\">goo.gl/taIqf</a> | <a href=\"https://devdocs.io\" rel=\"nofollow noopener noreferrer\">devdocs.io</a> Documentation™ Helps. Room meta discussions: <a href=\"https://github.com/JavaScriptRoom/culture\" rel=\"nofollow noopener noreferrer\">github.com/JavaScriptRoom/culture</a>. How to format code in chat: <a href=\"https://sopython.com/wiki/An_Illustrated_Guide_To_Formatting_Code_In_Chat\" rel=\"nofollow noopener noreferrer\">sopython.com/wiki/&hellip;</a>",
  "isFavorite": true,
  "usage": null,
  "tags": "<a rel=\"noopener noreferrer\" class=\"tag\" href=\"http://stackoverflow.com/tags/ecmascript/info\">ecmascript</a> <a rel=\"noopener noreferrer\" class=\"tag\" href=\"http://stackoverflow.com/tags/ecmascript-6/info\">ecmascript-6</a> <a rel=\"noopener noreferrer\" class=\"tag\" href=\"http://stackoverflow.com/tags/javascript/info\">javascript</a> <a rel=\"noopener noreferrer\" class=\"tag\" href=\"http://stackoverflow.com/tags/nodejs/info\">nodejs</a> <a rel=\"noopener noreferrer\" class=\"tag\" href=\"http://stackoverflow.com/tags/typescript/info\">typescript</a>"
}
```

isFavorite

**Note:** Description and tags will be in HTML.

```js
const body = await request({
  method: 'GET',
  uri: `${this.chatURL}/rooms/thumbs/${roomNum}`,
});
return JSON.parse(body);
```

# Chat Rooms

## Room Types

| Type    | Description                                                                                | Icon |
| ------- | ------------------------------------------------------------------------------------------ | ---- |
| Public  | anyone may enter and talk                                                                  | N/A  |
| Gallery | anyone may enter, but only approved users can talk                                         |      |
| Private | only approved users may enter this room (this should only be used for moderation purposes) |      |

## Gallery

Gallery rooms, such as the
[Android room](https://chat.stackoverflow.com/rooms/15/android) require users to
"request" access before they can talk.

A request access `request` will look like:

```javascript
const body = await request({
  method: 'POST',
  uri: `${this.chatURL}/rooms/requestaccess`,
  form: {
    roomId: this.roomNum,
    fkey: this.fkey,
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Origin: this.chatURL,
  },
});
return JSON.parse(body);
```

**Note**: Cookies are required (obviously)

## Access

// TODO
