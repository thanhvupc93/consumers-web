import { RoleType } from "./role";

export type TokenType = {
    userName: string;
    fullName: string;
    id: number;
    email: string;
    phone: string;
    exp: number;
    iat: number;
    roles: RoleType[];
}