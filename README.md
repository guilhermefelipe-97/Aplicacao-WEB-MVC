# Sistema de Filmes e Diretores (MVC)

Aplicação web completa para cadastro de filmes e diretores, seguindo arquitetura MVC, com backend em Node.js/Express, banco de dados PostgreSQL, views EJS, testes automatizados (Jest/Supertest) e testes E2E (Cypress).

## Funcionalidades
- Cadastro e listagem de filmes
- Cadastro e listagem de diretores
- API RESTful (CRUD completo)
- Interface web moderna
- Testes automatizados de API e interface

## Estrutura de Pastas
```
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── views/
│   ├── public/
│   └── database/
├── tests/
│   └── integration/
├── cypress/
│   └── e2e/
├── app.js
├── package.json
├── README.md
```

## Pré-requisitos
- Node.js (v16+ recomendado)
- PostgreSQL (rodando localmente)

## Instalação
1. Clone o repositório ou baixe os arquivos.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o banco de dados PostgreSQL:
   - Crie um banco chamado `filmesdb` (ou altere o nome no arquivo `src/database/database.js`)
   - Ajuste usuário e senha no mesmo arquivo, se necessário

## Como executar o projeto
1. Inicie o servidor:
   ```bash
   npm start
   ```
2. Acesse no navegador:
   - [http://localhost:3000/movies](http://localhost:3000/movies) — Filmes
   - [http://localhost:3000/directors](http://localhost:3000/directors) — Diretores

## Como executar os testes
### Testes de Integração (API)
```bash
npm test
```
Ou apenas integração:
```bash
npm run test:integration
```

### Testes E2E (Cypress)
1. Inicie o servidor (`npm start`)
2. Em outro terminal, execute:
   ```bash
   npx cypress open
   ```
   ou
   ```bash
   npm run cypress:open
   ```
3. Execute os testes pelo app do Cypress

---
