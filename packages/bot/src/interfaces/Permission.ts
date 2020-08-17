export enum PermissionType {
    ALL,
    OWNER,
}

export type Permission = PermissionType | string;
