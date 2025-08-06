# Fut-Match Front-end

Um projeto React moderno com Progressive Web App (PWA) para o sistema Fut-Match.

## 🚀 Tecnologias Utilizadas

### **Frontend Framework**
- **React 19** - Biblioteca JavaScript para construção de interfaces de usuário
- **TypeScript 5.7** - Superset do JavaScript que adiciona tipagem estática

### **Build & Development**
- **Vite 6** - Build tool moderna e rápida para desenvolvimento frontend
- **@vitejs/plugin-react** - Plugin oficial do Vite para React com suporte a Fast Refresh

### **Styling**
- **Tailwind CSS 4.1** - Framework CSS utility-first para estilização rápida
- **@tailwindcss/vite** - Plugin do Tailwind CSS para Vite

### **UI Components**
- **@radix-ui/react-slot** - Primitivos de UI acessíveis e não estilizados
- **class-variance-authority (CVA)** - Criação de variantes de componentes de forma type-safe
- **clsx** - Utilitário para construção de strings de className condicionais
- **tailwind-merge** - Merge inteligente de classes do Tailwind CSS

### **Progressive Web App (PWA)**
- **vite-plugin-pwa** - Plugin para transformar a aplicação em PWA
- **@vite-pwa/assets-generator** - Gerador automático de ícones para PWA
- **workbox-core & workbox-window** - Service workers e caching strategies

### **Code Quality & Linting**
- **ESLint 9** - Linter para identificar e corrigir problemas no código
- **typescript-eslint** - Regras do ESLint específicas para TypeScript
- **eslint-plugin-react-hooks** - Regras do ESLint para React Hooks
- **eslint-plugin-react-refresh** - Regras do ESLint para React Fast Refresh

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── ui/
│       ├── button.tsx           # Componente Button reutilizável
│       ├── button-variants.ts   # Variantes do componente Button
│       └── utils.ts            # Utilitários para merge de classes CSS
├── assets/
│   └── react.svg              # Assets da aplicação
├── App.tsx                    # Componente principal da aplicação
├── main.tsx                   # Ponto de entrada da aplicação
├── index.css                  # Estilos globais
├── PWABadge.tsx              # Componente do badge PWA
├── PWABadge.css              # Estilos do badge PWA
└── vite-env.d.ts             # Definições de tipos do Vite

public/
└── icon.svg                   # Ícone da aplicação

Arquivos de configuração:
├── package.json               # Dependências e scripts
├── vite.config.ts            # Configuração do Vite
├── tsconfig.json             # Configuração principal do TypeScript
├── tsconfig.app.json         # Configuração do TypeScript para a aplicação
├── tsconfig.node.json        # Configuração do TypeScript para Node.js
├── eslint.config.js          # Configuração do ESLint
└── pwa-assets.config.ts      # Configuração dos assets PWA
```

## 🛠️ Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes)

## 📦 Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd front-end/my-app-react
```

2. **Instale as dependências:**
```bash
npm install
```

## 🚀 Como Executar

### **Modo Desenvolvimento**
Executa a aplicação em modo de desenvolvimento com hot-reload:
```bash
npm run dev
```
A aplicação estará disponível em: `http://localhost:5173`

### **Build para Produção**
Compila a aplicação para produção:
```bash
npm run build
```
Os arquivos compilados estarão na pasta `dist/`

### **Preview da Build**
Visualiza a build de produção localmente:
```bash
npm run preview
```

### **Linting**
Executa o ESLint para verificar problemas no código:
```bash
npm run lint
```

## ⚙️ Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila a aplicação para produção |
| `npm run lint` | Executa o linter para verificar problemas no código |
| `npm run preview` | Visualiza a build de produção localmente |

## 🎨 Sistema de Design

O projeto utiliza um sistema de componentes reutilizáveis baseado em:

- **Tailwind CSS** para estilização utility-first
- **CVA (Class Variance Authority)** para variantes type-safe de componentes
- **Radix UI** como base para componentes acessíveis

### Exemplo de Uso do Componente Button:

```tsx
import { Button } from './components/ui/button';

// Botão padrão
<Button>Clique aqui</Button>

// Botão com variante destrutiva
<Button variant="destructive">Excluir</Button>

// Botão pequeno com variante outline
<Button variant="outline" size="sm">Cancelar</Button>
```

## 📱 Progressive Web App (PWA)

A aplicação está configurada como PWA com:

- **Service Worker** automático
- **Manifest** para instalação no dispositivo
- **Caching strategies** otimizadas
- **Ícones** gerados automaticamente para diferentes dispositivos

## 🔧 Configurações Importantes

### **TypeScript**
- Modo estrito habilitado
- Verificação de imports não utilizados
- Suporte a JSX via React

### **Vite**
- Hot Module Replacement (HMR)
- Build otimizada
- Suporte a ES modules

### **ESLint**
- Regras para React Hooks
- Verificação de dependências do useEffect
- Regras para TypeScript

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Notas de Desenvolvimento

- **Fast Refresh**: O projeto está configurado para React Fast Refresh, garantindo atualizações rápidas durante o desenvolvimento
- **Type Safety**: Todas as configurações priorizam type safety com TypeScript
- **Performance**: Build otimizada com code splitting automático via Vite
- **Acessibilidade**: Componentes baseados em Radix UI garantem acessibilidade

---

**Versão:** 0.0.2
**Licença:** Privada  
**Autor:** Fut-Match Team
