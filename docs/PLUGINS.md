# Plugins

## Introduction

James provides an extremely flexible and expandable plugin API. Plugins can be
dynamically added to a bot instance at any time using the `bot.addPlugin`
method. Most plugins are added initially within platform specific `app` files
located in `platforms/*/src/app.ts`. This allows plugins to be platform specific
if need be. However, always strive to make your plugin platform agnostic.

This documentation is not comprehensive. It includes some common use cases and
most of the available plugin methods. For more information please look through
type declarations and source code.

## Create Your Own Plugin - Get Started

Create a new file in the `plugins` package with the name of your plugin. For
example, if your plugin is `test`, create a file at
`packages/plugins/src/plugins/test.ts`.

Add the following boilerplate to your file

```typescript
import { PluginFunction } from '@chatbot/bot';

export const test: PluginFunction = (bot) => {
  // plugin code
};
```

Open `packages/plugins/src/index.ts` and add your plugin:

```typescript
// ...
export * from './plugins/default/test';
// ...
```

Finally, open up the platform app file (`platforms/*/src/app.ts`) and add your
plugin to the `bot.addPlugin` list.

You've created your first plugin! But it doesn't do much. Look below for how to
do some common things.

## Adding a command

Use the `bot.addCommand` method within your PluginFunction to add a command.

The addCommand function accepts a `Command`. For options and descriptions takes
a look at
[`Command`](https://github.com/jbis9051/JamesSOBot/blob/master/packages/bot/src/interfaces/Command.ts).
