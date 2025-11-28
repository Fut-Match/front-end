# Clean Architecture

## O que é?

**Clean Architecture** é uma **arquitetura de software** que organiza o projeto inteiro em camadas independentes e testáveis.

> **Diferença importante:** Clean Architecture organiza o **projeto inteiro**, enquanto Design Patterns (como MVVM) organizam **componentes específicos**.

## Regra Principal

**Dependências sempre apontam de fora para dentro** - camadas externas dependem de camadas internas, nunca o contrário.

```
Apresentação → Aplicação → Domínio ← Infraestrutura
   (UI)         (Hooks)    (Core)     (Adaptadores)
```


## 4 Camadas do Projeto

### 🎯 1. Domain (Domínio) - O Coração
**Pasta:** `src/entities/` e `src/contracts/`

**O que é:** Regras de negócio puras, sem dependências externas

**Contém:**
- Entidades e validações (Zod schemas)
- Interfaces de repositórios
- Tipos TypeScript

```typescript
// entities/auth.ts
export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// contracts/i-auth-repository.ts
export interface IAuthRepository {
  signIn(request: LoginRequest): Promise<LoginResponse>;
}
```

---

### 🔌 2. Infrastructure (Infraestrutura) - Conexões
**Pasta:** `src/externals/`

**O que é:** Implementações concretas que se conectam ao mundo externo

**Contém:**
- Implementações de repositórios (REST API)
- Adaptadores HTTP (Axios)
- Dependency Container (injeção de dependências)

```typescript
// externals/repositories/auth-repository-rest.ts
export class AuthRepositoryRest implements IAuthRepository {
  constructor(private httpClient: IHttpClient) {}
  
  async signIn(request: LoginRequest): Promise<LoginResponse> {
    return this.httpClient.post("/api/login", request);
  }
}

// externals/dependency-container/index.ts
export const DC = {
  repositories: {
    authRepository: () => new AuthRepositoryRest(httpClient),
  },
};
```

---

### 🎮 3. Application (Aplicação) - Casos de Uso
**Pasta:** `src/hooks/` e `src/services/`

**O que é:** Orquestra o fluxo de dados entre UI e repositórios

**Contém:**
- Hooks customizados (mutations, queries)
- Lógica de cache (React Query)
- Serviços auxiliares

```typescript
// hooks/mutations/useAuthMutations.ts
export const useLogin = () => {
  const authRepository = DC.repositories.authRepository("public");
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) =>
      authRepository.signIn(credentials),
  });
};
```

---

### 🎨 4. Presentation (Apresentação) - Interface
**Pasta:** `src/pages/` e `src/components/`

**O que é:** Tudo que o usuário vê e interage

**Contém:**
- Páginas (usando MVVM pattern)
- Componentes React
- Views e ViewModels

```typescript
// pages/Login/LoginModel.ts
export function LoginModel() {
  const { mutateAsync: loginMutation } = useLogin(); // Usa Application Layer
  
  const onSubmit = async (data) => {
    await loginMutation(data);
  };
  
  return { handleSubmit };
}
```


## Fluxo: Como Funciona na Prática

**Exemplo: Usuário faz login**

```
1. Usuário clica em "Entrar" (LoginView.tsx)
                ↓
2. ViewModel chama função (LoginModel.ts)
                ↓
3. Hook executa mutation (useLogin)
                ↓
4. Repository faz requisição (AuthRepositoryRest)
                ↓
5. HTTP Client envia para API (AxiosAdapter)
                ↓
6. Resposta volta pelo mesmo caminho
```

---

## Dependency Injection (Injeção de Dependências)

**Problema:** Como evitar código acoplado?

❌ **Ruim** (acoplamento direto):
```typescript
import { AxiosAdapter } from '@/externals/http-client';

function useLogin() {
  const httpClient = new AxiosAdapter(); // Difícil de testar e trocar
}
```

✅ **Bom** (usando interface):
```typescript
import { DC } from '@/externals/dependency-container';

function useLogin() {
  const authRepository = DC.repositories.authRepository("public");
  // Não sabemos se é REST, GraphQL, Mock - não importa!
}
```

**Vantagem:** Podemos trocar a implementação sem alterar o código que usa.

---

## Estrutura de Pastas

```
src/
├── entities/              # Domain - Schemas e tipos
├── contracts/             # Domain - Interfaces
├── externals/             # Infrastructure
│   ├── repositories/      # Implementações REST
│   ├── http-client/       # Axios adapter
│   └── dependency-container/  # Injeção de dependências
├── hooks/                 # Application
│   ├── mutations/         # useLogin, useRegister
│   └── queries/           # useCurrentUser
├── services/              # Application - Validações, storage
├── pages/                 # Presentation - MVVM pages
└── components/            # Presentation - UI components
```

---

## Vantagens

✅ **Testável** - Cada camada pode ser testada isoladamente

✅ **Flexível** - Trocar REST por GraphQL? Só muda `externals/`

✅ **Organizado** - Cada coisa no seu lugar

✅ **Escalável** - Fácil adicionar novas features

✅ **Independente** - UI não depende de API específica

---

## Boas Práticas

### ✅ Faça

1. Use interfaces (contracts) para definir contratos
2. Injete dependências pelo DC (Dependency Container)
3. Mantenha entities sem lógica de framework
4. Valide dados com Zod na camada de domínio
5. Use hooks para casos de uso

### ❌ Evite

1. Importar implementações concretas diretamente
2. Colocar lógica de negócio em componentes React
3. Fazer chamadas HTTP diretas em pages/components
4. Misturar responsabilidades entre camadas
5. Ignorar a regra de dependência

---

## Clean Architecture vs Design Pattern

| Aspecto | Clean Architecture | Design Pattern (MVVM) |
|---------|-------------------|----------------------|
| **Escopo** | Projeto inteiro | Componente específico |
| **Objetivo** | Organizar camadas | Organizar um componente |
| **Onde aplica** | `src/` toda estrutura | `src/pages/Register/` |
| **Exemplo** | entities → hooks → pages | Model, View, index |

**Analogia:**
- **Clean Architecture** = Planta da casa (divisão de andares e áreas)
- **MVVM Pattern** = Como organizar um cômodo (quarto, sala)

**No projeto:**
- Clean Architecture organiza: entities, contracts, externals, hooks, pages
- MVVM organiza cada página: RegisterView, RegisterModel, index

---

## Exemplo Completo: Login

### 1. Domain
```typescript
// entities/auth.ts
export type LoginRequest = { email: string; password: string };

// contracts/i-auth-repository.ts
export interface IAuthRepository {
  signIn(request: LoginRequest): Promise<LoginResponse>;
}
```

### 2. Infrastructure
```typescript
// externals/repositories/auth-repository-rest.ts
export class AuthRepositoryRest implements IAuthRepository {
  async signIn(request: LoginRequest): Promise<LoginResponse> {
    return this.httpClient.post("/api/login", request);
  }
}
```

### 3. Application
```typescript
// hooks/mutations/useAuthMutations.ts
export const useLogin = () => {
  const authRepository = DC.repositories.authRepository("public");
  return useMutation({ mutationFn: authRepository.signIn });
};
```

### 4. Presentation
```typescript
// pages/Login/LoginModel.ts
export function LoginModel() {
  const { mutateAsync } = useLogin();
  const onSubmit = (data) => mutateAsync(data);
  return { handleSubmit };
}

// pages/Login/LoginView.tsx
export function LoginView({ handleSubmit }) {
  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## Exemplo Completo: Atualização de Usuário

Demonstra o fluxo completo com query (GET) e mutation (POST) integrados:

### 1. Domain
```typescript
// entities/user.ts - Usa schema de player.ts
import { playerSchema } from "./player";

export const userWithPlayerSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  player: playerSchema.nullable(),
});

export const updateUserRequestSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  nickname: z.string().optional(),
  image: z.string().url().optional(),
  password: z.string().min(6).optional(),
});

// contracts/i-user-repository.ts
export interface IUserRepository {
  getMe(): Promise<GetCurrentUserResponse>;
  updateMe(request: UpdateUserRequest): Promise<UpdateUserResponse>;
}
```

### 2. Infrastructure
```typescript
// externals/repositories/user-repository-rest.ts
export class UserRepositoryRest implements IUserRepository {
  constructor(private httpClient: IHttpClient) {}

  async getMe(): Promise<GetCurrentUserResponse> {
    return this.httpClient.get("/api/users/me");
  }

  async updateMe(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    return this.httpClient.post("/api/users/me", request);
  }
}
```

### 3. Application
```typescript
// hooks/queries/useUserQueries.ts - Query (GET)
export const useGetCurrentUser = () => {
  const userRepository = DC.repositories.userRepository("auth");
  return useQuery({
    queryKey: queryKeys.user.me,
    queryFn: () => userRepository.getMe(),
  });
};

// hooks/mutations/useUserMutations.ts - Mutation (POST)
export const useUpdateUser = () => {
  const userRepository = DC.repositories.userRepository("auth");
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData) => userRepository.updateMe(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
    },
  });
};
```

### 4. Presentation
```typescript
// pages/EditProfile/EditProfileModel.ts
export function EditProfileModel() {
  const { data: currentUserData, isLoading } = useGetCurrentUser();
  const { mutateAsync: updateUser } = useUpdateUser();

  // Carrega dados do usuário do endpoint
  useEffect(() => {
    if (currentUserData?.data) {
      reset({
        first_name: currentUserData.data.first_name,
        email: currentUserData.data.email,
        nickname: currentUserData.data.player?.nickname || "",
      });
    }
  }, [currentUserData, reset]);

  const onSubmit = async (data) => {
    await updateUser(data);
    navigate("/settings");
  };

  return { handleSubmit, isLoading, /* ... */ };
}

// pages/EditProfile/EditProfileView.tsx
export function EditProfileView({ handleSubmit, isLoading }) {
  if (isLoading) return <Skeleton />;
  return <form onSubmit={handleSubmit}>...</form>;
}
```

**Benefícios:**
- Sem localStorage: dados sempre atualizados via API
- Reutilização de schemas (playerSchema de player.ts)
- Cache automático com React Query
- Invalidação de cache após mutation
- Loading states gerenciados automaticamente

---

## Referências

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)