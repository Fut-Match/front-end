import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Moon, Edit, Mail, MapPin, Activity, Server } from "lucide-react";

interface SettingsProps {
  onEditProfile?: () => void;
  onPrivacyPolicy?: () => void;
  onTermsOfService?: () => void;
}

interface SettingsProps {
  onEditProfile?: () => void;
}

export function Settings({ onEditProfile }: SettingsProps) {
  const handlePrivacyPolicy = () => {
    window.open('/privacy-policy', '_blank');
  };

  const handleTermsOfService = () => {
    window.open('/terms-of-service', '_blank');
  };
  return (
    <div className="p-4 space-y-6">
      {/* Profile Section */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Perfil</h3>
          </div>
          
          <div className="space-y-3 pl-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Editar Perfil</p>
                <p className="text-sm text-muted-foreground">Nome, foto, informações pessoais</p>
              </div>
              <Button variant="outline" size="sm" onClick={onEditProfile}>
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">joao@email.com</p>
              </div>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Localização</p>
                <p className="text-sm text-muted-foreground">São Paulo, SP</p>
              </div>
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Preferences Section */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Preferências</h3>
          </div>
          
          <div className="space-y-4 pl-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Modo Escuro</p>
                <p className="text-sm text-muted-foreground">Alterna entre tema claro e escuro</p>
              </div>
              <Switch />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Notificações Push</p>
                <p className="text-sm text-muted-foreground">Receber alertas de partidas</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Notificações de Email</p>
                <p className="text-sm text-muted-foreground">Resumos semanais e convites</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Perfil Público</p>
                <p className="text-sm text-muted-foreground">Permitir que outros vejam seu perfil</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </Card>

      {/* API Status */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Sistema</h3>
          </div>
          
          <div className="space-y-3 pl-8">
            <Button variant="outline" className="w-full justify-start"  >
              <Server className="h-4 w-4 mr-2" />
              Status da API
            </Button>
          </div>
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Privacidade & Segurança</h3>
          </div>
          
          <div className="space-y-3 pl-8">
            <Button variant="outline" className="w-full justify-start">
              Alterar Senha
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Excluir Conta
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handlePrivacyPolicy}>
              Política de Privacidade
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleTermsOfService}>
              Termos de Uso
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}