import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PrivacyPolicyProps {
  onBack?: () => void;
  standalone?: boolean;
}

export function PrivacyPolicy({ onBack, standalone = false }: PrivacyPolicyProps) {
  const handleBack = () => {
    if (standalone) {
      window.history.back();
    } else {
      onBack?.();
    }
  };

  return (
    <div className={`p-4 space-y-6 max-w-4xl mx-auto ${standalone ? 'min-h-screen bg-background' : ''}`}>
      {/* Header */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Política de Privacidade</h1>
          <p className="text-muted-foreground">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
      <Card className="p-6">
        <div className="prose prose-slate max-w-none dark:prose-invert space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Informações que Coletamos</h2>
            <p className="text-muted-foreground mb-4">
              Coletamos informações que você nos fornece diretamente, como:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Nome completo e informações de contato</li>
              <li>Informações de perfil do jogador (posição, estatísticas)</li>
              <li>Dados de participação em partidas</li>
              <li>Fotos e imagens que você escolhe compartilhar</li>
              <li>Localização para encontrar partidas próximas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Como Usamos suas Informações</h2>
            <p className="text-muted-foreground mb-4">
              Utilizamos suas informações para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Facilitar a organização e participação em partidas</li>
              <li>Criar rankings e estatísticas personalizadas</li>
              <li>Conectar você com outros jogadores</li>
              <li>Enviar notificações sobre partidas e atividades</li>
              <li>Melhorar nossos serviços e experiência do usuário</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Compartilhamento de Informações</h2>
            <p className="text-muted-foreground mb-4">
              Não vendemos ou alugamos suas informações pessoais para terceiros. Podemos compartilhar informações apenas:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Com outros jogadores durante partidas organizadas</li>
              <li>Quando exigido por lei ou processo legal</li>
              <li>Para proteger nossos direitos ou segurança</li>
              <li>Com seu consentimento explícito</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Segurança dos Dados</h2>
            <p className="text-muted-foreground">
              Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Seus Direitos</h2>
            <p className="text-muted-foreground mb-4">
              Você tem o direito de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir informações imprecisas</li>
              <li>Solicitar a exclusão de suas informações</li>
              <li>Retirar seu consentimento a qualquer momento</li>
              <li>Portabilidade de dados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Cookies e Tecnologias Similares</h2>
            <p className="text-muted-foreground">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso do aplicativo e personalizar conteúdo. Você pode gerenciar suas preferências de cookies nas configurações do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Alterações nesta Política</h2>
            <p className="text-muted-foreground">
              Podemos atualizar esta política periodicamente. Notificaremos você sobre mudanças significativas através do aplicativo ou email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Contato</h2>
            <p className="text-muted-foreground">
              Se você tiver dúvidas sobre esta política de privacidade, entre em contato conosco através do email: privacidade@streetballstats.com
            </p>
          </section>
        </div>
      </Card>
    </div>
  );
}
