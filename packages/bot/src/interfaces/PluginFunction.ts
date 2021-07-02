import { Bot } from '../Bot';
import { Config } from './Config';

export type PluginFunction = (bot: Bot, config: Config) => void;
