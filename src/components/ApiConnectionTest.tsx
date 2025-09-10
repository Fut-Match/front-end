import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { useHealthCheck, useTestConnection } from "@/hooks/useApi";

export function ApiConnectionTest() {
  const { data: healthData, isLoading, isError, error, refetch } = useHealthCheck();
  const testConnection = useTestConnection();

  const handleTestConnection = () => {
    testConnection.mutate();
  };

  const handleRefresh = () => {
    refetch();
  };

  const getStatusBadge = () => {
    if (isLoading) {
      return <Badge variant="secondary">Verificando...</Badge>;
    }
    if (isError) {
      return <Badge variant="destructive">Offline</Badge>;
    }
    if (healthData?.status === 'ok') {
      return <Badge className="bg-green-600">Online</Badge>;
    }
    return <Badge variant="outline">Desconhecido</Badge>;
  };

  const getStatusIcon = () => {
    if (isLoading) {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    }
    if (isError) {
      return <WifiOff className="h-4 w-4 text-red-500" />;
    }
    if (healthData?.status === 'ok') {
      return <Wifi className="h-4 w-4 text-green-500" />;
    }
    return <WifiOff className="h-4 w-4 text-gray-500" />;
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <h3 className="font-semibold">Status da API</h3>
          </div>
          {getStatusBadge()}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Endpoint:</span>
            <span className="font-mono text-xs break-all">
              {import.meta.env.VITE_API_BASE_URL}/health
            </span>
          </div>
          
          {healthData && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium">{healthData.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timestamp:</span>
                <span className="font-mono text-xs">{healthData.timestamp}</span>
              </div>
            </>
          )}

          {isError && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Erro:</span>
              <span className="text-red-500 text-xs break-all">
                {(error as Error)?.message || 'Erro de conexão'}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleTestConnection}
            disabled={testConnection.isPending}
          >
            {testConnection.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Wifi className="h-4 w-4 mr-2" />
            )}
            Testar Conexão
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>
    </Card>
  );
}
