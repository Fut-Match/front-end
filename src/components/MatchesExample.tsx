import type React from 'react'
import { useState } from 'react'
import type { LoginCredentials, RegisterData } from '../hooks/useApi'
import {
  useLogin,
  useLogout,
  useRegister,
  useVerifyAuth,
} from '../hooks/useApi'

const AuthPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [loginData, setLoginData] = useState<LoginCredentials>({
    email: '',
    password: '',
  })
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const loginMutation = useLogin()
  const registerMutation = useRegister()
  const logoutMutation = useLogout()
  const verifyAuthMutation = useVerifyAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!loginData.email || !loginData.password) {
      alert('Preencha todos os campos')
      return
    }

    try {
      await loginMutation.mutateAsync(loginData)
      alert('Login realizado com sucesso!')
      // Redirecionar para dashboard ou página principal
    } catch {
      alert('Erro no login. Verifique suas credenciais.')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!registerData.name || !registerData.email || !registerData.password) {
      alert('Preencha todos os campos')
      return
    }

    if (registerData.password !== registerData.confirmPassword) {
      alert('As senhas não coincidem')
      return
    }

    try {
      await registerMutation.mutateAsync(registerData)
      alert('Cadastro realizado com sucesso!')
      setIsLoginMode(true) // Voltar para tela de login
    } catch {
      alert('Erro no cadastro. Tente novamente.')
    }
  }

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      alert('Logout realizado com sucesso!')
    } catch {
      alert('Erro no logout.')
    }
  }

  const handleVerifyAuth = async () => {
    try {
      const result = await verifyAuthMutation.mutateAsync()
      alert(`Usuário autenticado: ${result.user.name}`)
    } catch {
      alert('Token inválido ou expirado. Faça login novamente.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Fut-Match</h1>
          <p className="text-gray-600 mt-2">
            {isLoginMode ? 'Entre na sua conta' : 'Crie sua conta'}
          </p>
        </div>

        {isLoginMode ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome Completo
              </label>
              <input
                id="name"
                type="text"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="register-email"
                type="email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <input
                id="register-password"
                type="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmar Senha
              </label>
              <input
                id="confirm-password"
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              {registerMutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>
        )}

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {isLoginMode ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
          </button>

          <div className="border-t pt-3 space-y-2">
            <button
              type="button"
              onClick={handleVerifyAuth}
              disabled={verifyAuthMutation.isPending}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 disabled:bg-gray-50 text-sm"
            >
              {verifyAuthMutation.isPending
                ? 'Verificando...'
                : 'Verificar Autenticação'}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-md hover:bg-red-200 disabled:bg-red-50 text-sm"
            >
              {logoutMutation.isPending ? 'Saindo...' : 'Logout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
