import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Shield, Edit, Mail, MapPin } from "lucide-react";
import { SettingsModel } from "./SettingsModel";

type SettingsViewProps = ReturnType<typeof SettingsModel>;

export function SettingsView(props: SettingsViewProps) {
  const {
    handleEditProfile,
    handlePrivacyPolicy,
    handleTermsOfService,
    handleChangePassword,
  } = props;

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
                <p className="text-sm text-muted-foreground">
                  Nome, foto, informações pessoais
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleEditProfile}>
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">
                  Gerencie seu email
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleEditProfile}>
                <Mail className="h-4 w-4" />
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Apelido</p>
                <p className="text-sm text-muted-foreground">
                  Personalize seu apelido
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleEditProfile}>
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Preferences Section - Comentado conforme solicitado */}
      {/* <Card className="p-4">
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
          </div>
        </div>
      </Card> */}

      {/* Privacy & Security */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Privacidade & Segurança
            </h3>
          </div>

          <div className="space-y-3 pl-8">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleChangePassword}
            >
              Alterar Senha
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Excluir Conta
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handlePrivacyPolicy}
            >
              Política de Privacidade
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleTermsOfService}
            >
              Termos de Uso
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
