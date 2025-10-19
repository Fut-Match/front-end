import { User } from "@/entities/user";

export interface IAuthContext {
  user: User | null;
  isLoading: boolean;
}
