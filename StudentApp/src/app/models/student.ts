export class Student {
    $key: string;
    firstName: string;
    lastName: string;
    enrollmentId: string;
    collegeName: string;
    branch: string;
    semester: string;

    constructor($key: string, firstName: string, lastName: string, enrollmentId: string, collegeName: string, branch: string, semester: string) {
        this.$key = $key;
        this.firstName = firstName;
        this.lastName = lastName;
        this.enrollmentId = enrollmentId;
        this.collegeName = collegeName;
        this.branch = branch;
        this.semester = semester;
    }
}