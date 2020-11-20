export class Employee {
    _id: object;
    name: string;
    email: string;
    brand: string;
    designation: string;
    doj: Date;
    phoneNumber: Number;

    constructor(_id: object, name: string, email: string, brand: string, designation: string, doj: Date, phoneNumber: Number) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.brand = brand;
        this.designation = designation;
        this.doj = doj;
        this.phoneNumber = phoneNumber;
    }
}