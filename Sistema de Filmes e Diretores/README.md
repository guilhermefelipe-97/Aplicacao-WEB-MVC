# Sistema de Filmes e Diretores (MVC)

Aplicação web com arquitetura MVC para cadastro de filmes e diretores, com testes automatizados e persistência em banco de dados SQLite.

## Estrutura de Pastas

```
projeto-final/ 
├── src/ 
│   ├── controllers/ 
│   ├── models/ 
│   ├── routes/ 
│   ├── views/ 
│   ├── public/ 
│   └── database/          
├── tests/ 
│   ├── unit/ 
│   └── integration/ 
├── cypress/ 
│   └── e2e/ 
├── app.js 
├── package.json 
├── README.md 
```

## Comandos Principais

- `npm install` — Instala as dependências
- `npm start` — Inicia a aplicação
- `npm test` — Executa todos os testes
- `npm run test:unit` — Testes unitários
- `npm run test:integration` — Testes de integração
- `npm run cypress:open` — Abre o Cypress para testes E2E

## Tecnologias
- Node.js, Express, EJS, SQLite
- Jest, Supertest, Cypress

## Funcionalidades
- Cadastro de filmes
- Cadastro de diretores
- API RESTful (CRUD)
- Testes automatizados (unitários, integração e E2E) 