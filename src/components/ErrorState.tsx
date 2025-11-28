import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export function ErrorState({
  title = "Erro ao carregar dados",
  message = "Ocorreu um erro ao carregar as informações. Tente novamente mais tarde.",
  className = "",
}: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] text-center ${className}`}>
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md">{message}</p>
    </div>
  );
}
