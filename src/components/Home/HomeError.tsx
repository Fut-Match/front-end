export const HomeError = () => {
    return (
        <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Erro ao carregar dados do jogador</h2>
            <p className="text-muted-foreground">Por favor, tente novamente mais tarde.</p>
        </div>
    );
}