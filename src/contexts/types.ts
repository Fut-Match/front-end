// Tipos dos contextos da aplicação
import { User } from "@/entities/user";

export interface IAuthContext {
  user: User | null;
  isLoading: boolean;
}

export interface IAppContext {
  theme: "light" | "dark";
  toggleTheme: () => void;
  isOnline: boolean;
}
