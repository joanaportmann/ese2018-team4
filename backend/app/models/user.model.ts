import { Model, Table, Column, PrimaryKey } from "sequelize-typescript";
import crypto from 'crypto';
import { createSecureServer } from "http2";

@Table
export class User extends Model<User> {

    @PrimaryKey
    @Column
    username!: String;

    @Column
    passwordHash!: String;

    @Column
    role!: UserType;

    @Column
    userType!: UserType;

    @Column
    enabled!: boolean;


    static hashPassword(password: string): string {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
}

enum UserType{
    admin, 
    enterprise
}

