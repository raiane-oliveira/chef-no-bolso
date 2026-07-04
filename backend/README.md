# Backend - ChefNoBolso

API REST desenvolvida com Node.js, Express, Mongoose e JWT.

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) rodando localmente

## Configuração

```bash
npm install
copy .env.example .env
```

## Variáveis de ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `PORT` | `3333` | Porta do servidor |
| `MONGODB_URI` | `mongodb://localhost:27017/chef-no-bolso` | URL de conexão com o MongoDB |
| `JWT_SECRET` | `change-me` | Segredo para assinatura dos tokens JWT |
| `JWT_EXPIRES_IN` | `7d` | Tempo de expiração do token |

## Rodar

```bash
npm run dev
```

## Usuários de teste

Ao iniciar, a API cria automaticamente dois usuários (se não existirem):

| Email | Senha | Role |
|-------|-------|------|
| `teste@email.com` | `123456` | CUSTOMER |
| `admin@email.com` | `123456` | ADMIN |

## Rotas

### Autenticação

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/auth/register` | Criar conta | Não |
| POST | `/auth/login` | Login | Não |
| GET | `/auth/me` | Dados do usuário logado | Sim |

### Produtos

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/products` | Listar produtos | Não |
| GET | `/products/:id` | Detalhes do produto | Não |
| POST | `/products` | Criar produto | ADMIN |
| PUT | `/products/:id` | Editar produto | ADMIN |
| DELETE | `/products/:id` | Excluir produto | ADMIN |

### Categorias

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/categories` | Listar categorias | Não |

### Pedidos

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/orders` | Listar pedidos do usuário | Sim |
| POST | `/orders` | Criar pedido | Sim |

### Cupons

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/coupons` | Listar cupons | Não |

## Exemphos de requisição

### Register

```bash
curl -X POST http://localhost:3333/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "123456"}'
```

### Login

```bash
curl -X POST http://localhost:3333/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@email.com", "password": "123456"}'
```

### Criar produto (ADMIN)

```bash
curl -X POST http://localhost:3333/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"name": "Dindin de Morango", "description": "Delicioso dindin", "price": 8, "imageUrl": "https://picsum.photos/400/400?random=1", "category": "<CATEGORY_ID>"}'
```
