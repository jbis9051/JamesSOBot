import {Bot} from "../Bot";
import {Config} from "./Config";

export type PluginFunction = (param: Bot, config: Config) => void
