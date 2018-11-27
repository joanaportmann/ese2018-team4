export interface Person {
    username: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    homepage: string;
    address: string;
    numberOfEmployees: string;
    business: string;
}

export interface User extends Person {
    userType: UserType;
    enabled: boolean;
}

export enum UserType {
    admin = 'admin',
    enterprise = 'enterprise'
}
