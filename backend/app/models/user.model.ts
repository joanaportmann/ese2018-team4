import { Model, Table, Column, PrimaryKey } from "sequelize-typescript";
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

    @Column
    companyName!: string;

    @Column
    email!: string;

    @Column
    address!: string;

    @Column
    phoneNumber!: string;

    @Column
    homePage!: string;

    @Column
    numberOfEmployees!: string;

    @Column
    business!: String;



    /**
     * Take simple object and copy data into this object.
     * @param simplification 
     */
    fromSimplification(simplification: any): void {
        this.username = simplification['username'];
        this.passwordHash = simplification['password'];
        this.companyName = simplification['companyName'];
        this.email = simplification['email'];
        this.phoneNumber = simplification['phoneNumber'];
        this.address = simplification['address'];
        this.homePage = simplification['homepage'];
        this.numberOfEmployees = simplification['numberOfEmployees'];
        this.business = simplification['business'];
    }

    toSimplification(): any {
        return {
            'id': this.id,
            'username': this.username,
            'userType': this.userType,
            'enabled': this.enabled,
            'companyName': this.companyName,
            'email': this.email,
            'address': this.address,
            'phoneNumber': this.phoneNumber,
            'homepage': this.homePage,
            'numberOfEmployees': this.numberOfEmployees,
            'business': this.business
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