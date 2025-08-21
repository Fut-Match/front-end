import {
  Activity,
  AlertTriangle,
  Home,
  LogOut,
  Menu,
  Play,
  Users,
  X,
} from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import type { Screen } from '../App'
import CustomButton from './ui/customButton'

interface HeaderProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
  onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onLogout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  //intens para adicionar mais tarde
  // { screen: 'teams' as Screen, label: 'Times', description: 'Organize grupos de jogadores', icon: Users },
  // { screen: 'ranking' as Screen, label: 'Ranking', description: 'Classificação dos jogadores', icon: Trophy },
  // { screen: 'feed' as Screen, label: 'Feed Social', description: 'Atividades dos amigos', icon: MessageSquare },
  // { screen: 'history' as Screen, label: 'Histórico', description: 'Resultados e análises', icon: BarChart3 },
  // { screen: 'challenges' as Screen, label: 'Desafios', description: 'Conquistas e objetivos', icon: Star },

  const menuItems = [
    {
      screen: 'home' as Screen,
      label: 'Home',
      description: 'Seu perfil e estatísticas',
      icon: Home,
    },
    {
      screen: 'myMatches' as Screen,
      label: 'Partida Atual',
      description: 'Gerenciar partida em andamento',
      icon: Play,
    },
    {
      screen: 'profile' as Screen,
      label: 'Meu Perfil',
      description: 'Suas estatísticas detalhadas',
      icon: Users,
    },
    {
      screen: 'status' as Screen,
      label: 'Status da API',
      description: 'Verificar status do back-end',
      icon: Activity,
    },
  ]

  const handleMenuClick = (screen: Screen) => {
    onNavigate(screen)
    setIsMenuOpen(false)
  }

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    setShowLogoutModal(false)
    setIsMenuOpen(false)
    onLogout()
  }

  const cancelLogout = () => {
    setShowLogoutModal(false)
  }

  const getPageName = (screen: Screen): string => {
    switch (screen) {
      case 'home':
        return 'Home'
      case 'myMatches':
        return 'Partida Atual'
      case 'profile':
        return 'Meu Perfil'
      case 'status':
        return 'Status da API'
      default:
        return ''
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex gap-2 p-2 hover:bg-gray-100 rounded-lg text-lg font-medium  text-gray-700  transition-colors  "
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            <p>{getPageName(currentScreen)}</p>
          </button>

          {/* Empty center space */}
          <div></div>
        </div>
      </header>

      {/* Menu Dropdown - Sidebar Style */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40">
          {/* Invisible overlay for closing */}
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setIsMenuOpen(false)}
          ></button>

          <button
            type="button"
            className="fixed top-0 left-0 w-full sm:w-80 h-full bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-[#F2442E] to-orange-500 p-6 text-white relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-2 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              ></button>

              <div className="top-0 flex items-center space-x-2 mb-1 justify-center">
                <img src="/icon.svg" alt="FutMatch" className="h-10 w-10" />
                <div>
                  <h3 className="text-xl font-semibold">FUTMATCH</h3>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4">
              <div className="space-y-1">
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon
                  const isActive = currentScreen === item.screen

                  return (
                    <button
                      type="button"
                      key={`${item.screen}-${index}`}
                      onClick={() => handleMenuClick(item.screen)}
                      className={`w-full flex items-center p-4 rounded-lg transition-colors relative ${
                        isActive
                          ? 'bg-red-50 text-[#F2442E] border-l-4 border-[#F2442E]'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg mr-4 ${
                          isActive
                            ? 'bg-[#F2442E] text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <IconComponent size={18} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500">
                          {item.description}
                        </div>
                      </div>
                    </button>
                  )
                })}

                {/* Separator */}
                <div className="my-4 border-t border-gray-200"></div>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="w-full flex items-center p-4 rounded-lg transition-colors hover:bg-red-50 text-gray-700 hover:text-red-600"
                >
                  <div className="p-2 rounded-lg mr-4 bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors">
                    <LogOut size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">Sair</div>
                    <div className="text-xs text-gray-500">
                      Desconectar da conta
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Confirmar Saída
              </h3>
              <p className="text-gray-600">
                Tem certeza que deseja sair do FutMatch? Você precisará fazer
                login novamente para acessar sua conta.
              </p>
            </div>

            <div className="flex space-x-3">
              <CustomButton
                onClick={cancelLogout}
                variant="outline"
                size="md"
                fullWidth
              >
                Cancelar
              </CustomButton>
              <CustomButton
                onClick={confirmLogout}
                variant="primary"
                size="md"
                fullWidth
                className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
