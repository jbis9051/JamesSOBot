export enum PermissionType {
    ALL,
    OWNER, // room owner
}

export type Permission = PermissionType | string;
