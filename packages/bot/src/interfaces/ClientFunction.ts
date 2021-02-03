import { Client } from '../Client';

export type ClientFunction<T extends Client> = (client: T) => void;
