import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Loader2, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock,
  Server,
  Globe,
  Activity
} from "lucide-react";
import { useHealthCheck, useTestConnection } from "@/hooks/useApi";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ApiStatusProps {
  onBack?: () => void;
}

export function ApiStatus({ onBack }: ApiStatusProps) {
  const { data: healthData, isLoading, isError, error, refetch, dataUpdatedAt } = useHealthCheck();
  const testConnection = useTestConnection();

  const handleTestConnection = () => {
    testConnection.mutate();
  };

  const handleRefresh = () => {
    refetch();
  };

  const isOnline = !isError && healthData?.status === 'active';


  const formatLastUpdate = () => {
    if (!dataUpdatedAt) return "Nunca";
    return formatDistanceToNow(new Date(dataUpdatedAt), { 
      addSuffix: true, 
      locale: ptBR 
    });
  };

  return (
    <div className="p-4 space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Detalhes da Conexão</h3>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Endpoint:</span>
              </div>
              <code className="text-xs bg-muted mt-2 px-2 py-1 rounded">
                {import.meta.env.VITE_API_BASE_URL}/health
              </code>
            </div>

            <Separator />

            {healthData && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status da API:</span>
                  <div className="flex items-center gap-2">
                    {isOnline ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="font-medium">{healthData.status}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Timestamp:</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {new Date(healthData.timestamp).toLocaleString('pt-BR')}
                  </code>
                </div>
              </>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Última verificação:</span>
              </div>
              <span className="text-sm font-medium">{formatLastUpdate()}</span>
            </div>

            {isError && (
              <>
                <Separator />
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="font-medium text-red-700">Erro de Conexão</span>
                  </div>
                  <p className="text-sm text-red-600">
                    {(error as Error)?.message || 'Erro desconhecido ao conectar com a API'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-2">
        <Button 
          onClick={handleTestConnection}
          disabled={testConnection.isPending}
          className="flex items-center gap-2"
          variant={isOnline ? "outline" : "default"}
        >
          {testConnection.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Wifi className="h-4 w-4" />
          )}
          {testConnection.isPending ? "Testando..." : "Testar Conexão"}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar Status
        </Button>
      </div>

      {/* Status History */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Histórico de Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                {isOnline ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <div>
                  <p className="font-medium text-sm">
                    {isOnline ? "Conexão estabelecida" : "Falha na conexão"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date().toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
              <Badge variant={isOnline ? "default" : "destructive"}>
                {isOnline ? "Sucesso" : "Erro"}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
