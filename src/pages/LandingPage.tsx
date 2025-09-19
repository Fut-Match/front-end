import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Users, 
  Calendar, 
  BarChart3, 
  PlayCircle,
  Award,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const LandingPage = () => {
  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  const navigateToRegister = () => {
    window.location.href = '/register';
  };

  const navigateToApp = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                FutMatch
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={navigateToApp}
                className="text-gray-700 hover:text-red-600"
              >
                Ir para App
              </Button>
              <Button 
                variant="ghost" 
                onClick={navigateToLogin}
                className="text-gray-700 hover:text-red-600"
              >
                Entrar
              </Button>
              <Button 
                onClick={navigateToRegister}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-red-100 text-red-700 hover:bg-red-200">
            🎯 A plataforma definitiva para futebol
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Organize seus jogos de{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              futebol
            </span>{" "}
            como nunca antes
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Crie partidas, gerencie times, acompanhe estatísticas e conquiste rankings. 
            Tudo em uma plataforma moderna e intuitiva.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={navigateToRegister}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-6 text-lg"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Começar Agora
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={navigateToLogin}
              className="border-2 border-red-500 text-red-600 hover:bg-red-50 px-8 py-6 text-lg"
            >
              <Users className="w-5 h-5 mr-2" />
              Já tenho conta
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recursos que fazem a diferença
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra como o FutMatch pode revolucionar a forma como você organiza e acompanha suas partidas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Criação de Partidas</CardTitle>
              <CardDescription>
                Organize partidas facilmente com controle total sobre times, horários e locais
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Estatísticas Avançadas</CardTitle>
              <CardDescription>
                Acompanhe seu desempenho com estatísticas detalhadas e gráficos intuitivos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Sistema de Ranking</CardTitle>
              <CardDescription>
                Compete com outros jogadores e times em rankings dinâmicos e atualizados
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <PlayCircle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Partidas ao Vivo</CardTitle>
              <CardDescription>
                Acompanhe partidas em tempo real com placar e eventos ao vivo
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Conquistas</CardTitle>
              <CardDescription>
                Desbloqueie conquistas e badges baseadas no seu desempenho e participação
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Gestão de Times</CardTitle>
              <CardDescription>
                Forme e gerencie times com facilidade, convidando jogadores e definindo formações
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white/40 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-red-100 text-red-700">
                💡 Por que escolher o FutMatch?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                A experiência completa que você merece
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Interface Intuitiva</h3>
                    <p className="text-gray-600">Design moderno e fácil de usar, pensado para todos os níveis</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Dados em Tempo Real</h3>
                    <p className="text-gray-600">Estatísticas e placares atualizados instantaneamente</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Comunidade Ativa</h3>
                    <p className="text-gray-600">Conecte-se com outros jogadores e participe de torneios</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Gratuito para Começar</h3>
                    <p className="text-gray-600">Acesso completo às funcionalidades principais sem custo</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-red-500 to-pink-500 text-white">
                <CardHeader className="p-0 pb-6">
                  <CardTitle className="text-2xl text-white">Pronto para começar?</CardTitle>
                  <CardDescription className="text-red-100">
                    Junte-se a milhares de jogadores que já usam o FutMatch
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">1000+</div>
                      <div className="text-sm text-red-100">Jogadores Ativos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">500+</div>
                      <div className="text-sm text-red-100">Partidas Criadas</div>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    onClick={navigateToRegister}
                    className="w-full bg-white text-red-600 hover:bg-gray-100"
                  >
                    Criar Conta Grátis
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">FutMatch</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              A plataforma completa para organizar e acompanhar suas partidas de futebol.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Suporte
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-400 text-sm">
              © 2025 FutMatch. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
