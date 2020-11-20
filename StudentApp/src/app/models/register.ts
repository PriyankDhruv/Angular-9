export class Register {
    $key: string;
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;

    constructor($key: string, userName: string, email: string, password: string, phoneNumber: string) {
        this.$key = $key;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber; 
    }
}