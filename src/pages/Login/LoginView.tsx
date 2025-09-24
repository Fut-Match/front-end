import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { LoginModel } from "./LoginModel";

type LoginViewProps = ReturnType<typeof LoginModel>;

export const LoginView = (props: LoginViewProps) => {
  const {
    loginData,
    showPassword,
    isLoading,
    setLoginData,
    setShowPassword,
    handleLogin,
    navigateToRegister,
    navigateToForgotPassword,
  } = props;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card >
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-r  rounded-2xl flex items-center justify-center mx-auto mb-4">
              <img src='/lovable-uploads/91f1a561-6498-4bc6-80aa-bc621858f182.png' alt="Logo" className="w-22 h-22 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Bem-vindo de volta!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Entre na sua conta para continuar
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="pl-10 h-12 border-gray-200  focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="pl-10 pr-10 h-12 border-gray-200  focus:ring-green-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span className="text-gray-600">Lembrar de mim</span>
                </label>
                <button
                  type="button"
                  onClick={navigateToForgotPassword}
                  className="text-sm text-red-200 hover:text-red-700 font-medium"
                >
                  Esqueci minha senha
                </button>
              </div>

              <Button 
                type="submit" 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Não tem uma conta?{" "}
                <button
                  onClick={navigateToRegister}
                  className="text-red-200 hover:text-red-700 font-medium"
                >
                  Cadastre-se aqui
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="bg-white/40 backdrop-blur-sm border-t border-gray-200/50 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            © 2025 FutMatch. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LoginView;