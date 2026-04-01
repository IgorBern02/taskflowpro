# 🚀 TaskFlow Pro

Sistema full stack de gerenciamento de tarefas com autenticação JWT, separação de dados por usuário e no estilo **Kanban**, permitindo que usuários organizem projetos e acompanhem o progresso de atividades de forma visual e intuitiva.

---

## 🌐 Deploy

- 🔗 Frontend: [https://seu-projeto.vercel.app](https://taskflowpro-nine.vercel.app/)
- 🔗 Backend: [https://seu-backend.onrender.com](https://taskflowpro-dkp6.onrender.com)

---

## ✨ Funcionalidades

- 🔐 Autenticação com JWT
- 📁 Criação, edição e exclusão de projetos
- ✅ Gerenciamento completo de tarefas
- 📊 Organização em colunas:
  - To Do
  - Doing
  - Done
- 🔄 Atualização de status das tarefas
- 🧠 Cache e sincronização com React Query
- 💅 Interface moderna e responsiva

---

## 🛠️ Tecnologias

### Frontend
- React
- TypeScript
- TailwindCSS
- React Query
- Zustand

### Backend
- Node.js
- Express
- Supabase (Auth + Database)

### Deploy
- Vercel (Frontend)
- Render (Backend)

---

## 📂 Estrutura do Projeto

taskflowpro/
├── backend/
│ ├── src/
│ ├── routes/
│ ├── middleware/
│ └── ...
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ └── ...


---

## ⚙️ Como rodar o projeto

### 🔧 Backend

```bash
cd backend
npm install
npm run dev


Crie um .env:

SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
PORT=3001
```

💻 Frontend

```bash
cd frontend
npm install
npm run dev


Crie um .env:

VITE_API_URL=http://localhost:3001
```
---

🔐 Autenticação

A autenticação é feita via JWT utilizando o Supabase.
O token é armazenado no client e enviado no header:

Authorization: Bearer <token>

---

🧠 Aprendizados

Este projeto foi desenvolvido com foco em:

- Arquitetura full stack (frontend + backend)
- Autenticação segura
- Consumo e criação de APIs REST
- Gerenciamento de estado e cache
- Boas práticas com React e TypeScript
- Deploy em produção

---

👨‍💻 Autor

Desenvolvido por Igor

---

💼 Em busca de oportunidade como Desenvolvedor Front-End / Full Stack
📧 igudevfrontend@gmail.com
🔗 IgorBern02 [https://www.linkedin.com/in/igor-bernardess/]

---

⭐ Contribuição

Sinta-se livre para abrir issues ou contribuir com melhorias!
