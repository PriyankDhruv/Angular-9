export class Register {
    Username: string;
    Password: string;  
    Email: string;  
    ContactNo: string;  
    Address: string;
    Status: number;  
    IsApproved: number;

    constructor(Username: string, Password: string, Email: string, ContactNo: string, Address: string, Status: number, IsApproved: number) {
        this.Username = Username;
        this.Password = Password;
        this.Email = Email;
        this.ContactNo = ContactNo;
        this.Address = Address;
        this.Status = Status;
        this.IsApproved = IsApproved;
    }
}