import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface TermsOfServiceProps {
  onBack?: () => void;
  standalone?: boolean;
}

export function TermsOfService({ onBack, standalone = false }: TermsOfServiceProps) {
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
          <h1 className="text-2xl font-bold">Termos de Uso</h1>
          <p className="text-muted-foreground">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
      <Card className="p-6">
        <div className="prose prose-slate max-w-none dark:prose-invert space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Aceitação dos Termos</h2>
            <p className="text-muted-foreground">
              Ao usar o StreetBall Stats, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Descrição do Serviço</h2>
            <p className="text-muted-foreground mb-4">
              O StreetBall Stats é uma plataforma que permite:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Organizar e participar de partidas de futebol</li>
              <li>Acompanhar estatísticas e desempenho dos jogadores</li>
              <li>Criar rankings e competições</li>
              <li>Conectar jogadores da mesma região</li>
              <li>Gerenciar times e torneios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Responsabilidades do Usuário</h2>
            <p className="text-muted-foreground mb-4">
              Ao usar nosso serviço, você se compromete a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Fornecer informações verdadeiras e precisas</li>
              <li>Manter suas credenciais de login seguras</li>
              <li>Respeitar outros usuários e suas propriedades</li>
              <li>Não usar o serviço para atividades ilegais</li>
              <li>Seguir as regras de fair play durante as partidas</li>
              <li>Não criar múltiplas contas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Conduta Proibida</h2>
            <p className="text-muted-foreground mb-4">
              É estritamente proibido:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Assediar, intimidar ou ameaçar outros usuários</li>
              <li>Publicar conteúdo ofensivo, discriminatório ou inadequado</li>
              <li>Falsificar estatísticas ou resultados de partidas</li>
              <li>Usar bots ou scripts automatizados</li>
              <li>Violar direitos de propriedade intelectual</li>
              <li>Tentar hackear ou comprometer a segurança da plataforma</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Segurança e Responsabilidade</h2>
            <p className="text-muted-foreground">
              Embora facilitemos a organização de partidas, os usuários são totalmente responsáveis por sua segurança física durante as atividades. Recomendamos sempre usar equipamentos de proteção adequados e jogar em locais seguros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Propriedade Intelectual</h2>
            <p className="text-muted-foreground">
              Todo o conteúdo da plataforma, incluindo design, código, logos e textos, é propriedade do StreetBall Stats ou de seus licenciadores. Você mantém os direitos sobre o conteúdo que publica, mas nos concede licença para usá-lo na plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Suspensão e Encerramento</h2>
            <p className="text-muted-foreground">
              Reservamo-nos o direito de suspender ou encerrar contas que violem estes termos. Em casos de violações graves, a suspensão pode ser imediata e permanente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Limitação de Responsabilidade</h2>
            <p className="text-muted-foreground">
              O StreetBall Stats não se responsabiliza por danos diretos, indiretos ou consequenciais decorrentes do uso da plataforma, incluindo lesões durante partidas ou disputas entre usuários.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Modificações dos Termos</h2>
            <p className="text-muted-foreground">
              Podemos modificar estes termos a qualquer momento. Mudanças significativas serão comunicadas com antecedência de 30 dias. O uso continuado após as modificações constitui aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Lei Aplicável</h2>
            <p className="text-muted-foreground">
              Estes termos são regidos pelas leis do Brasil. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Contato</h2>
            <p className="text-muted-foreground">
              Para dúvidas sobre estes termos, entre em contato: suporte@streetballstats.com
            </p>
          </section>
        </div>
      </Card>
    </div>
  );
}
