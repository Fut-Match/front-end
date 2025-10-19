import { User } from "@/entities/user";

// Funções para gerenciar estado do usuário externamente
export const setAuthUser = (user: User | null) => {
  if (user) {
    localStorage.setItem("user_data", JSON.stringify(user));
    localStorage.setItem("email_verified", "true");
  } else {
    localStorage.removeItem("user_data");
    localStorage.removeItem("email_verified");
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
  }
  // Disparar evento customizado para notificar mudanças
  window.dispatchEvent(new CustomEvent("authUserChanged", { detail: user }));
};

export const clearAuthUser = () => {
  setAuthUser(null);
};

export const updateAuthUser = (userData: Partial<User>) => {
  const savedUser = localStorage.getItem("user_data");
  if (savedUser) {
    try {
      const currentUser = JSON.parse(savedUser);
      const updatedUser = { ...currentUser, ...userData };
      setAuthUser(updatedUser);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  }
};
