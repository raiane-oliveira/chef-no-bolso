# ChefNoBolso

Projeto de e-commerce gastronômico desenvolvido para a universidade.

---

## Funcionalidades da Aplicação

### Autenticação e Contas
- Sistema de login e registro de usuários
- Dois tipos de perfil: **Cliente** e **Administrador**
- Sessão persistente (mantém o login ao recarregar a página)
- Menu "Minha conta" com opções: Meus dados, Meus pedidos e Sair

### Catálogo de Produtos
- Listagem de produtos com imagens, preços e descrições
- Produtos organizados por categorias
- Produtos em destaque na página inicial
- Busca de produtos por nome

### Carrinho de Compras
- Adicionar produtos ao carrinho
- Quantidade de itens no carrinho
- Visualização do carrinho lateral (aside)
- Resumo do pedido com subtotal, taxa de entrega e total

### Pedidos
- Finalização do pedido com opção de entrega, retirada ou consumo no local
- Histórico de pedidos do cliente
- Visualização detalhada de cada pedido (itens, status, valores)
- **Filtro por data** para buscar pedidos em um período específico

### Cupons de Desconto
- Aplicação de cupons no carrinho
- Desconto aplicado ao total do pedido

### Painel de Gerenciamento (Admin)
- **Acesso exclusivo para administradores**
- Listagem de todos os produtos com opções de edição
- **Adicionar novos produtos** com nome, descrição, preço, imagem e categoria
- **Editar produtos** existentes
- **Excluir produtos** do catálogo
- **Busca por nome** na listagem de produtos
- Visualização de **todos os pedidos** de todos os clientes (não apenas os próprios)

### Permissões por Role

| Funcionalidade | Cliente | Admin |
|----------------|---------|-------|
| Visualizar produtos | ✅ | ✅ |
| Adicionar ao carrinho | ✅ | ✅ |
| Fazer pedidos | ✅ | ✅ |
| Ver próprio histórico | ✅ | ✅ |
| Gerenciar produtos | ❌ | ✅ |
| Ver todos os pedidos | ❌ | ✅ |

---

## Tutorial: Como Rodar o Projeto

### Pré-requisitos

Antes de tudo, instale os seguintes programas no seu computador:

1. **Node.js** - Baixe em: https://nodejs.org/
   - Escolha a versão LTS (recomendada)
   - Após instalar, rode no terminal: `node -v` (deve aparecer algo como `v20.x.x`)

2. **MongoDB** - Baixe em: https://www.mongodb.com/try/download/community
   - Instale o MongoDB Community Server
   - Após instalar, o serviço deve rodar automaticamente na porta `27017`

### Passo 1: Clonar o repositório

Abra o terminal e rode:

```bash
git clone <url-do-repositorio>
cd PROJETO_BRUNO
```

### Passo 2: Instalar e rodar o Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

O backend estará rodando em: `http://localhost:3333`

**IMPORTANTE:** Mantenha esse terminal aberto!

### Passo 3: Instalar e rodar o Frontend

Abra um **novo terminal** (separate) e rode:

```bash
cd frontend
npm install
npm run dev
```

O frontend estará rodando em: `http://localhost:3000`

### Passo 4: Acessar a aplicação

Abra o navegador em: `http://localhost:3000`

### Usuários de teste

Ao iniciar o backend, os seguintes usuários são criados automaticamente:

| Email | Senha | Perfil |
|-------|-------|--------|
| `cliente1@email.com` | `123456` | Cliente |
| `cliente2@email.com` | `123456` | Cliente |
| `admin@email.com` | `123456` | Administrador |

**Para testar como admin:**
1. Clique em "Login"
2. Use: `admin@email.com` / `123456`
3. Acesse "Minha conta" → "Gerenciar produtos"

**Para testar como cliente:**
1. Clique em "Login"
2. Use: `cliente1@email.com` / `123456`
3. Navegue pelos produtos e faça um pedido

---

## Estrutura do Projeto

```text
.
├── backend/
│   ├── src/
│   │   ├── controllers/    → Lógica das rotas
│   │   ├── database/       → Seed de dados
│   │   ├── middlewares/    → Autenticação
│   │   ├── models/         → Schemas MongoDB
│   │   ├── routes/         → Definição das rotas
│   │   ├── utils/          → Funções auxiliares
│   │   └── server.js       → Ponto de entrada
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── entities/       → Componentes de entidades
│   │   ├── features/       → Funcionalidades (auth, cart)
│   │   ├── routes/         → Páginas da aplicação
│   │   ├── shared/         → Componentes compartilhados
│   │   └── widgets/        → Header, Footer
│   └── package.json
│
└── README.md
```

---

## Tech Stack

### Backend
- Node.js + Express 5
- MongoDB + Mongoose
- JWT (autenticação)
- bcryptjs (senhas)

### Frontend
- React 19 + TypeScript
- Vite 8
- TanStack Start (SSR)
- TanStack Router + Query
- Tailwind CSS 4
- Radix UI
