export interface Department {
    id: number;
    name?: string
}

export interface Employees {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    department: Department;
}



