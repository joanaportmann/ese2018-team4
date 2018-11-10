import { Model, Table, Column, PrimaryKey } from "sequelize-typescript";
import { createSecureServer } from "http2";
import crypto from 'crypto';

@Table
export class User extends Model<User> {

    @PrimaryKey
    @Column
    username!: String;

    @Column
    passwordHash!: String;

    @Column
    userType!: UserType;

    @Column
    enabled!: boolean;

    /**
     * Take simple object and copy data into this object.
     * @param simplification 
     */
    fromSimplification(simplification: any): void {
        this.username = simplification['username'];
        this.passwordHash = simplification['password'];
    }

    toSimplification(): any {
        return {
            'id': this.id,
            'username': this.username,
            'userType': this.userType,
            'enabled': this.enabled
        }
    }

    static hashPassword(password: string): string {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
}

enum UserType {
    admin,
    enterprise
}