import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";
import { RegisterModel } from "./RegisterModel";

type RegisterViewProps = ReturnType<typeof RegisterModel>;

export function RegisterView(props: RegisterViewProps) {
  const {
    control,
    handleSubmit,
    errors,
    watch,
    showPassword,
    showConfirmPassword,
    showSuccessMessage,
    isLoading,
    toggleShowPassword,
    toggleShowConfirmPassword,
    navigateToLogin,
    Controller,
  } = props;

  if (showSuccessMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md p-6 text-center space-y-4">
          <CheckCircle className="h-16 w-16 mx-auto text-accent" />
          <h2 className="text-2xl font-bold text-foreground">Cadastro Realizado!</h2>
          <p className="text-muted-foreground">
            Enviamos um e-mail de confirmação para <strong>{watch("email")}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Verifique sua caixa de entrada e clique no link de confirmação para ativar sua conta.
          </p>
          <Button 
            onClick={navigateToLogin}
            className="w-full"
          >
            Voltar ao Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Criar Conta</h1>
          <p className="text-muted-foreground">Junte-se ao SoccerApp</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nome</Label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      placeholder="João"
                      className="pl-9"
                      {...field}
                    />
                  </div>
                )}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Sobrenome</Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      placeholder="Silva"
                      className="pl-9"
                      {...field}
                    />
                  </div>
                )}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-9"
                      {...field}
                    />
                  </div>
                )}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-password">Senha</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      className="pl-9 pr-9"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                )}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Senha</Label>
              <Controller
                name="password_confirmation"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirme sua senha"
                      className="pl-9 pr-9"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={toggleShowConfirmPassword}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                )}
              />
              {errors.password_confirmation && (
                <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>
              )}
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Criar Conta"}
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              onClick={navigateToLogin}
              className="w-full flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Login
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Ao criar uma conta, você concorda com nossos{" "}
              <a 
                href="/terms-of-service" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary cursor-pointer hover:underline"
              >
                Termos de Uso
              </a> e{" "}
              <a 
                href="/privacy-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary cursor-pointer hover:underline"
              >
                Política de Privacidade
              </a>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}