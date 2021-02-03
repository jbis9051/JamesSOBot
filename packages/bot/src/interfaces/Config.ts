import { Permission } from "./Permission";

export interface Config {
  users_groups: Record<Permission, any[]>;
  plugin: { [key: string]: any }
  client: { [key: string]: any }
}
