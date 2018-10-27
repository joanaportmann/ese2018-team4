import { Model, Table, Column, PrimaryKey } from "sequelize-typescript";
import crypto from 'crypto';

@Table
export class User extends Model<User> {

    @PrimaryKey
    @Column
    username!: String;

    @Column
    passwordHash!: String;

    static hashPassword(password: string): string {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
}
