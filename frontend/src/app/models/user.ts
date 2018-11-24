export interface Person {
    username: string;
    companyName: string;
  }

export interface User extends Person {
   userType: UserType;
    enabled: boolean; 
}

export enum UserType {
    admin,
    enterprise
}
