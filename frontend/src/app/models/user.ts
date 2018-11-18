export interface User {
    username: string;
    userType: UserType;
    enabled: boolean;
}

export enum UserType {
    admin,
    enterprise
}
