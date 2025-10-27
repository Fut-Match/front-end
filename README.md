# ⚽ FutMatch - Frontend

Aplicação web moderna para gerenciamento de partidas de futebol, ranking de jogadores e estatísticas em tempo real.

## 🚀 Tecnologias

Este projeto foi construído com as seguintes tecnologias:

- **[React 18](https://react.dev/)** - Biblioteca para construção de interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Vite](https://vitejs.dev/)** - Build tool moderna e rápida
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes reutilizáveis e acessíveis
- **[React Query](https://tanstack.com/query)** - Gerenciamento de estado assíncrono
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[React Router](https://reactrouter.com/)** - Roteamento da aplicação
- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificações toast elegantes

## 📋 Pré-requisitos

- **Node.js** 18+ e **npm** (recomendado instalar via [nvm](https://github.com/nvm-sh/nvm))
- **Git** para controle de versão

## 🔧 Instalação e Configuração

```bash
# Clone o repositório
git clone https://github.com/Fut-Match/front-end.git

# Entre no diretório
cd front-end

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🏗️ Arquitetura do Projeto

Este projeto segue os princípios de **Clean Architecture** e utiliza o padrão **MVVM** para organização de componentes.

### Estrutura de Pastas

```
src/
├── entities/              # Entidades e schemas de validação
├── contracts/             # Interfaces e contratos
├── externals/             # Implementações externas e adapters
│   ├── repositories/      # Repositórios REST
│   ├── http-client/       # Cliente HTTP (Axios)
│   └── dependency-container/  # Injeção de dependências
├── hooks/                 # Hooks customizados
│   ├── mutations/         # React Query mutations
│   └── queries/           # React Query queries
├── pages/                 # Páginas da aplicação (MVVM)
├── components/            # Componentes reutilizáveis
├── routes/                # Configuração de rotas
├── services/              # Serviços auxiliares
└── utils/                 # Funções utilitárias
```

### Documentação Técnica

Para entender melhor a arquitetura e padrões utilizados, consulte:

- 📐 **[Clean Architecture](docs/CLEAN_ARCHITECTURE.md)** - Organização em camadas do projeto
- 🎨 **[Design Pattern MVVM](docs/DESIGN_PATTERN.md)** - Padrão aplicado nos componentes

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Preview da build de produção

# Qualidade de Código
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
```

## 🌟 Funcionalidades Principais

- [x] Autenticação de usuários (login, registro, recuperação de senha)
- [x] Gerenciamento de perfil de jogador
- [x] Criação e gerenciamento de partidas
- [x] Sistema de ranking de jogadores
- [x] Estatísticas em tempo real
- [x] Notificações e alertas
- [x] Design responsivo e moderno
- [x] Tema dark/light mode

## 🔐 Variáveis de Ambiente

Configure as seguintes variáveis no arquivo `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Minha nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Convenção de Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação de código
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Time

Desenvolvido pela equipe **Fut-Match**

---

⚽ **FutMatch** - Gerencie suas partidas com inteligência!
