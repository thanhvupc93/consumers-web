import { RoleType } from "./role";

export type UserType = {
  id: number;
  fullName?: string;
  email?: string;
  phone?: string;
  userName: string;
  password: string;
  rePassword?: string;
  isActive: boolean;
  roles?: RoleType[]
  roleIds?: number[]
}