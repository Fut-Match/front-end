# Design Pattern - MVVM (Model-View-ViewModel)

## Visão Geral

Este projeto utiliza o padrão **MVVM (Model-View-ViewModel)** para organizar a estrutura de componentes React, promovendo separação de responsabilidades, testabilidade e manutenibilidade do código.

## Estrutura do Padrão

### 1. **View** (Camada de Visualização)
- **Responsabilidade**: Renderização da interface do usuário
- **Características**:
  - Componente puramente visual
  - Recebe dados e funções via props
  - Não contém lógica de negócio
  - Foca apenas na apresentação

### 2. **ViewModel** (Camada de Lógica)
- **Responsabilidade**: Gerenciamento de estado e lógica de apresentação
- **Características**:
  - Gerencia estado local do componente
  - Manipula eventos e validações
  - Comunica-se com serviços/APIs
  - Prepara dados para a View
  - Implementa hooks e lógica de negócio

### 3. **Model** (Camada de Dados)
- **Responsabilidade**: Definição de entidades e schemas de validação
- **Características**:
  - Define interfaces e tipos TypeScript
  - Schemas de validação (Zod, Yup, etc.)
  - Representa estrutura de dados da aplicação

### 4. **Index** (Componente Principal)
- **Responsabilidade**: Orquestração entre View e ViewModel
- **Características**:
  - Conecta ViewModel à View
  - Componente de composição
  - Export default do módulo

## Exemplo Prático: Register

### Estrutura de Arquivos
```
src/pages/Register/
├── index.tsx              # Componente principal (orquestração)
├── RegisterView.tsx       # View (apresentação)
├── RegisterModel.ts       # ViewModel (lógica)
├── RegisterToast.ts       # Utilitários (notificações)
└── RegisterMessage.ts     # Constantes (mensagens)
```

### Implementação

#### 1. **index.tsx** - Orquestração
```tsx
import { RegisterModel } from "./RegisterModel";
import { RegisterView } from "./RegisterView";

export const Register = () => {
    const registerModelData = RegisterModel();
    return <RegisterView {...registerModelData} />;
};
```

#### 2. **RegisterModel.ts** - ViewModel
```tsx
export function RegisterModel() {
  // Estado local
  const [showPassword, setShowPassword] = useState(false);
  
  // Hooks de formulário
  const { control, handleSubmit, errors } = useForm();
  
  // Mutations/Queries
  const { mutateAsync: registerMutation } = useRegister();
  
  // Lógica de negócio
  const onSubmit = async (data) => {
    // Validação e processamento
  };
  
  // Retorna dados e funções para a View
  return {
    control,
    handleSubmit,
    errors,
    showPassword,
    toggleShowPassword,
    // ...outros
  };
}
```

#### 3. **RegisterView.tsx** - View
```tsx
type RegisterViewProps = ReturnType<typeof RegisterModel>;

export function RegisterView(props: RegisterViewProps) {
  const { control, handleSubmit, errors, showPassword } = props;
  
  return (
    <form onSubmit={handleSubmit}>
      {/* JSX puramente visual */}
    </form>
  );
}
```

## Vantagens do Padrão

✅ **Separação de Responsabilidades**: Cada camada tem sua função específica

✅ **Testabilidade**: ViewModel pode ser testado independentemente da View

✅ **Reutilização**: Views podem ser reutilizadas com diferentes ViewModels

✅ **Manutenibilidade**: Mudanças na lógica não afetam a apresentação e vice-versa

✅ **Legibilidade**: Código mais organizado e fácil de entender

✅ **Type Safety**: TypeScript garante tipagem forte entre camadas

## Convenções de Nomenclatura

- **View**: `[Nome]View.tsx` - Componente de apresentação
- **ViewModel**: `[Nome]Model.ts` - Lógica e estado
- **Index**: `index.tsx` - Componente de composição
- **Utilities**: `[Nome]Toast.ts`, `[Nome]Message.ts` - Funções auxiliares

## Quando Usar MVVM

✅ Componentes complexos com lógica de negócio significativa

✅ Formulários com validações e múltiplos estados

✅ Páginas que consomem APIs e gerenciam dados

✅ Componentes que precisam de alta testabilidade

❌ Componentes simples e puramente apresentacionais (use apenas função React)

❌ Componentes de UI reutilizáveis (Button, Input, etc.)

## Boas Práticas

1. **Mantenha a View pura**: Sem lógica de negócio, apenas renderização
2. **ViewModel retorna tudo que a View precisa**: Dados e funções
3. **Use TypeScript**: Type safety entre camadas é essencial
4. **Evite prop drilling**: ViewModel já agrupa tudo necessário
5. **Separe concerns**: Toasts, mensagens e validações em arquivos dedicados
6. **Nomeie consistentemente**: Siga o padrão de nomenclatura do projeto