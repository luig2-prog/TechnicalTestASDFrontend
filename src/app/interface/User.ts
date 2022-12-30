import { Area } from "./Area";
import { Role } from "./Role";

export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    documentType: string;
    state: number;
    document: number;
    area: Area;
    role: Role
}