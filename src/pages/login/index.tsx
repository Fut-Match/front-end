import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import icon from '../../../public/icon.svg'
import CustomButton from '../../components/ui/customButton'

interface LoginScreenProps {
  onLogin: () => void
  onNavigateToRegister: () => void
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onNavigateToRegister,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login
    onLogin()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-center px-6">
      <div className="max-w-md mx-auto w-full">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src={icon} alt="FutMatch" className="h-24 w-24" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Bem-vindo ao FutMatch
          </h1>
          <p className="text-gray-600">
            Entre na sua conta e organize suas partidas
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2442E] focus:border-[#F2442E] outline-none transition-colors"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2442E] focus:border-[#F2442E] outline-none transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <CustomButton
              onClick={handleSubmit}
              variant="gradient"
              size="lg"
              fullWidth
            >
              Entrar
            </CustomButton>
          </div>
        </form>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Não tem uma conta?{' '}
            <button
              onClick={onNavigateToRegister}
              className="text-[#F2442E] hover:text-[#d63a2a] font-medium transition-colors "
            >
              Cadastrar-se
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500">
            Organize suas partidas de futebol com seus amigos
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
