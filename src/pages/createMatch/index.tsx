import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Copy,
  MapPin,
  Share2,
  Target,
  Upload,
} from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import type { Screen } from '../../App'
import CustomButton from '../../components/ui/customButton'

interface CreateMatchScreenProps {
  onNavigate: (screen: Screen) => void
}

const CreateMatchScreen: React.FC<CreateMatchScreenProps> = ({
  onNavigate,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    playersPerTeam: '5',
    endCriteria: [] as string[],
    gameTime: '10',
    customTime: '',
    goalsToWin: '3',
    location: '',
    date: '',
    time: '',
    matchType: 'normal' as 'normal' | 'race_to_5',
  })
  const [matchImage, setMatchImage] = useState<string | null>(null)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteToken] = useState('ABC123XYZ') // Mock token
  const [inviteLink] = useState(`https://futmatch.app/join/${inviteToken}`)
  const [copied, setCopied] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCriteriaChange = (criteria: string) => {
    setFormData((prev) => ({
      ...prev,
      endCriteria: prev.endCriteria.includes(criteria)
        ? prev.endCriteria.filter((c) => c !== criteria)
        : [...prev.endCriteria, criteria],
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setMatchImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate match creation
    setShowInviteModal(true)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const shareInvite = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Convite para Partida - FutMatch',
          text: `Você foi convidado para a partida "${formData.name}"!`,
          url: inviteLink,
        })
      } catch (err) {
        console.error('Error sharing: ', err)
      }
    } else {
      copyToClipboard(inviteLink)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="flex items-center mb-6">
        <button
          onClick={() => onNavigate('myMatches')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-3"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>
      {/* Discrete Page Title */}
      <div className="mb-6">
        <h1 className="text-lg font-medium text-gray-700 text-center">
          ⚽ Criar Partida
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Match Name */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Partida
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2442E] focus:border-[#F2442E] outline-none"
            placeholder="Ex: Pelada do Sábado"
            required
          />
        </div>

        {/* Players per Team */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jogadores por Time
          </label>
          <select
            value={formData.playersPerTeam}
            onChange={(e) =>
              handleInputChange('playersPerTeam', e.target.value)
            }
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2442E] focus:border-[#F2442E] outline-none"
          >
            <option value="3">3v3</option>
            <option value="4">4v4</option>
            <option value="5">5v5</option>
          </select>
        </div>

        {/* End Criteria */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Critérios de Fim da Partida
          </label>
          <div className="space-y-3">
            {[
              {
                value: 'tempo',
                label: 'Tempo',
                description: 'Partida termina quando o tempo acabar',
              },
              {
                value: 'gols',
                label: 'Gols',
                description: 'Partida termina quando um time atingir X gols',
              },
              {
                value: 'ambos',
                label: 'Ambos',
                description:
                  'Termina por tempo OU por gols (primeiro que acontecer)',
              },
            ].map((criteria) => (
              <label
                key={criteria.value}
                className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={formData.endCriteria.includes(criteria.value)}
                  onChange={() => handleCriteriaChange(criteria.value)}
                  className="h-4 w-4 text-[#F2442E] focus:ring-[#F2442E] border-gray-300 rounded mt-1"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">
                    {criteria.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {criteria.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Goals to Win - Show when goals criteria is selected */}
        {(formData.endCriteria.includes('gols') ||
          formData.endCriteria.includes('ambos')) && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-[#F2442E]" />
                <span>Gols para Vencer</span>
              </div>
            </label>
            <input
              type="number"
              value={formData.goalsToWin}
              onChange={(e) => handleInputChange('goalsToWin', e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2442E] focus:border-[#F2442E] outline-none"
              placeholder="Ex: 5 gols"
              min="1"
              max="20"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Partida termina quando um time atingir{' '}
              {formData.goalsToWin || 'X'} gols
            </p>
          </div>
        )}

        {/* Game Time - Show when time criteria is selected */}
        {(formData.endCriteria.includes('tempo') ||
          formData.endCriteria.includes('ambos')) && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tempo de Jogo
            </label>
            <select
              value={formData.gameTime}
              onChange={(e) => handleInputChange('gameTime', e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2442E] focus:border-[#F2442E] outline-none mb-3"
            >
              <option value="7">7 minutos</option>
              <option value="10">10 minutos</option>
              <option value="15">15 minutos</option>
              <option value="20">20 minutos</option>
              <option value="outro">Outro</option>
            </select>

            {formData.gameTime === 'outro' && (
              <input
                type="number"
                value={formData.customTime}
                onChange={(e) =>
                  handleInputChange('customTime', e.target.value)
                }
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2442E] focus:border-[#F2442E] outline-none"
                placeholder="Tempo em minutos"
                min="1"
                max="90"
                required
              />
            )}
          </div>
        )}

        {/* Location */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Local
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2442E] focus:border-[#F2442E] outline-none"
              placeholder="Ex: Campo do Parque Central"
              required
            />
          </div>
        </div>

        {/* Date and Time */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data do Jogo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2442E] focus:border-[#F2442E] outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2442E] focus:border-[#F2442E] outline-none"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagem da Partida (opcional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#F2442E] transition-colors">
            {matchImage ? (
              <div className="space-y-3">
                <img
                  src={matchImage}
                  alt="Match preview"
                  className="max-h-32 mx-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setMatchImage(null)}
                  className="text-sm text-gray-600 hover:text-[#F2442E]"
                >
                  Remover imagem
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                <div className="text-sm text-gray-600">
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById('image-upload')?.click()
                    }
                    className="text-[#F2442E] hover:text-[#d63a2a]"
                  >
                    Clique para enviar
                  </button>{' '}
                  ou arraste uma imagem
                </div>
              </div>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Submit Button */}
        <CustomButton
          onClick={handleSubmit}
          variant="gradient"
          size="lg"
          fullWidth
        >
          Criar Partida
        </CustomButton>
      </form>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Partida Criada!
              </h3>
              <p className="text-gray-600">
                Compartilhe o convite com seus amigos
              </p>
            </div>

            <div className="space-y-4">
              {/* Token */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Token
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inviteToken}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                  <button
                    onClick={() => copyToClipboard(inviteToken)}
                    className="px-3 py-2 text-[#F2442E] border border-[#F2442E] rounded-lg hover:bg-[#F2442E] hover:text-white transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inviteLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(inviteLink)}
                    className="px-3 py-2 text-[#F2442E] border border-[#F2442E] rounded-lg hover:bg-[#F2442E] hover:text-white transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {copied && (
                <div className="text-center text-sm text-green-600">
                  Copiado para a área de transferência!
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <CustomButton
                  onClick={shareInvite}
                  variant="primary"
                  size="md"
                  fullWidth
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar Convite
                </CustomButton>

                <CustomButton
                  onClick={() => {
                    setShowInviteModal(false)
                    onNavigate('myMatches')
                  }}
                  variant="outline"
                  size="md"
                  fullWidth
                >
                  Ir para Minhas Partidas
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateMatchScreen
