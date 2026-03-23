# 🐦 Mini-Twitter

Uma aplicação full-stack simplificada inspirada no Twitter, focada em performance e uma experiência de usuário fluida. Este repositório contém tanto o **Frontend** quanto as definições de integração com o **Backend**.

---

## 🚀 Tecnologias Core

O projeto utiliza o que há de mais moderno no ecossistema React para garantir tipagem forte e estado eficiente:

- **Framework:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Gerenciamento de Estado:** [Zustand](https://github.com/pmndrs/zustand) (com persistência)
- **Formulários & Validação:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Requisições:** [Axios](https://axios-http.com/)

---

## 📦 Estrutura do Projeto

A arquitetura foi pensada para ser escalável e de fácil manutenção:

```bash
frontend/src/
├── api/          # Serviços de conexão (Auth, Posts, Instância Axios)
├── components/   # Componentes de UI e Lógica de Negócio (PostCard, Navbar, etc.)
├── lib/          # Utilitários e helpers (Tratamento de erros)
├── pages/        # Telas da aplicação (Timeline, Auth)
├── routes/       # Configuração do React Router
└── store/        # Gerenciamento de estado global com Zustand
```

---

## 🛠️ Como Executar

### 1. Clonar e Instalar

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install
```

### 2. Configuração de Ambiente

Crie um arquivo `.env` na raiz da pasta `frontend` (baseado no `.env.example`) e configure a URL do seu backend:

```env
VITE_API_URL=http://localhost:3000
```

### 3. Rodar o Desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:5173`

---

## 🔌 Integração com API (Endpoints)

A aplicação consome os seguintes recursos do backend:

| Método | Endpoint         | Descrição                                  |
| :----- | :--------------- | :----------------------------------------- |
| `POST` | `/auth/register` | Criação de nova conta                      |
| `POST` | `/auth/login`    | Autenticação (Retorna JWT + User)          |
| `GET`  | `/posts`         | Listagem paginada de posts                 |
| `POST` | `/posts`         | Criação de post (Suporta imagem em Base64) |

---

## 🛡️ Funcionalidades Implementadas

- **Autenticação Persistente:** O login do usuário é mantido mesmo após atualizar a página via Zustand Middleware.
- **Validação de Dados:** Todos os inputs de formulário são validados no client-side com Zod.
- **Feedback ao Usuário:** Sistema de Toast para notificações de sucesso ou erro nas ações.
- **Layout Responsivo:** Interface totalmente adaptável para dispositivos móveis e desktop usando Tailwind.
