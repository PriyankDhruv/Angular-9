export class Employee {
    EmployeeID: number;
    EmployeeName: string;
    Department: string;
    MailID: string;
    DOJ: Date;
    Salary: number;
    Age: number;
    Address: string;
    Phone: number;

    constructor(EmployeeID: number, EmployeeName: string, Department: string, MailID: string, DOJ: Date, 
        Salary: number, Age: number, Address: string, Phone: number) {
        this.EmployeeID = EmployeeID;
        this.EmployeeName = EmployeeName;
        this.Department = Department;
        this.MailID = MailID;
        this.DOJ = DOJ;
        this.Salary = Salary;
        this.Age = Age;
        this.Address = Address;
        this.Phone = Phone;
    }
}