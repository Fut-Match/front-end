import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Lock, Eye, EyeOff, AtSign, Camera } from "lucide-react";
import { EditProfileModel } from "./EditProfileModel";

type EditProfileViewProps = ReturnType<typeof EditProfileModel>;

export function EditProfileView(props: EditProfileViewProps) {
  const {
    control,
    handleSubmit,
    handleCancel,
    errors,
    isLoading,
    isLoadingUser,
    showCurrentPassword,
    showPassword,
    showConfirmPassword,
    toggleShowCurrentPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    Controller,
  } = props;

  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-md mx-auto p-4 space-y-4">
          {/* Form Skeleton */}
          <Card className="p-4 space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </Card>
          <Card className="p-4 space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-background">
      <div className="max-w-md mx-auto p-4 space-y-4 pb-8">
        {/* Avatar/Foto de Perfil */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Foto de Perfil
          </h2>
          
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={field.value} alt="Foto de perfil" />
                  <AvatarFallback>
                    <User className="h-12 w-12 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div className="w-full space-y-2">
                  <Label htmlFor="image">URL da Foto</Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://exemplo.com/foto.jpg"
                    {...field}
                  />
                  {errors.image && (
                    <p className="text-sm text-red-500">{errors.image.message}</p>
                  )}
                </div>
              </div>
            )}
          />
        </Card>

        {/* Informações Pessoais */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Informações Pessoais
          </h2>

          <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">
              Nome <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="first_name"
                    placeholder="João"
                    className="pl-9"
                    {...field}
                  />
                </div>
              )}
            />
            {errors.first_name && (
              <p className="text-sm text-red-500">{errors.first_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name">
              Sobrenome <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="last_name"
                    placeholder="Silva"
                    className="pl-9"
                    {...field}
                  />
                </div>
              )}
            />
            {errors.last_name && (
              <p className="text-sm text-red-500">{errors.last_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="joao@email.com"
                    className="pl-9"
                    {...field}
                  />
                </div>
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname">Apelido</Label>
            <Controller
              name="nickname"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nickname"
                    placeholder="Jãozão"
                    className="pl-9"
                    {...field}
                  />
                </div>
              )}
            />
            {errors.nickname && (
              <p className="text-sm text-red-500">{errors.nickname.message}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Alterar Senha (Opcional) */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-foreground flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          Alterar Senha
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Deixe em branco para manter a senha atual
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current_password">Senha Atual</Label>
            <Controller
              name="current_password"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="current_password"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Sua senha atual"
                    className="pl-9 pr-9"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={toggleShowCurrentPassword}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              )}
            />
            {errors.current_password && (
              <p className="text-sm text-red-500">
                {errors.current_password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Nova Senha</Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nova senha (mín. 6 caracteres)"
                    className="pl-9 pr-9"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              )}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password_confirmation">Confirmar Nova Senha</Label>
            <Controller
              name="password_confirmation"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme a nova senha"
                    className="pl-9 pr-9"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              )}
            />
            {errors.password_confirmation && (
              <p className="text-sm text-red-500">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>
        </div>
      </Card>

        {/* Botões de ação */}
        <div className="space-y-2 pb-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
}
