import { ArrowLeft } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import type { Screen } from '../../App'
import CustomButton from '../../components/ui/customButton'

interface confirmEmailProps {
  onNavigate: (screen: Screen) => void
  onlogin: () => void
}

const ConfirmEmailScreen: React.FC<confirmEmailProps> = ({
  onNavigate,
  onlogin,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate confirmation and redirect to login
    onlogin()
  }

  const [code, setCode] = useState(Array(6).fill(''))

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // auto-foco para o próximo input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-center px-4 sm:px-6 py-8">
      <div className="flex items-center mb-6"></div>

      <div className="max-w-md mx-auto w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
          Confirmar Email
        </h2>
        <p className="text-center text-gray-600 mb-4 text-sm sm:text-base">
          Insira o código de confirmação enviado para o seu email.
        </p>

        {/* Confirmation Form */}
        <div className="flex space-x-2 justify-center mb-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2442E] focus:border-[#F2442E] outline-none"
            />
          ))}
        </div>

        {/* Resend Email Link */}
        <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
          Se você não recebeu o código,{' '}
          <button
            type="button"
            onClick={() => onNavigate('confirmEmail')}
            className="text-[#F2442E] font-semibold"
          >
            clique aqui para reenviar
          </button>
        </p>

        {/* Submit Button */}
        <div className="pt-2">
          <CustomButton
            onClick={handleSubmit}
            variant="gradient"
            size="lg"
            fullWidth
          >
            Confirmar
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default ConfirmEmailScreen
