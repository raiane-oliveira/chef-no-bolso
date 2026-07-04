# Frontend

Aplicacao web do ChefNoBolso, desenvolvida com React, TanStack Start, TanStack Router, Tailwind CSS e Vite.

## Requisitos

- Node.js
- npm

## Rodar localmente

```bash
npm install
npm run dev
```

A aplicacao roda por padrao em `http://localhost:3000`.

## Variaveis de ambiente

Crie um arquivo `.env` a partir do exemplo:

```bash
copy .env.example .env
```

Configure a URL da API:

```env
VITE_API_URL=http://localhost:3333
```

## Scripts

```bash
npm run dev      # inicia o servidor de desenvolvimento
npm run build    # gera a build de producao
npm run preview  # executa preview da build
npm run test     # executa os testes
npm run lint     # executa o lint
npm run format   # formata o codigo
npm run check    # verifica formatacao
```
