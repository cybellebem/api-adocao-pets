# api-adocao-pets

## Descrição do projeto

API REST desenvolvida em Node.js para gerenciamento de adoção de pets.

O sistema permite:

- Cadastro e autenticação de usuários utilizando JWT.
- Cadastro, consulta, atualização e remoção de pets.
- Registro de adoções.
- Controle de acesso baseado em perfis de usuário (`admin` e `adopter`).
- Proteção de rotas através de autenticação e autorização.

### Regras de negócio

- Usuários podem se cadastrar e realizar login.
- Apenas administradores podem gerenciar pets.
- Apenas administradores podem listar todos os usuários.
- Usuários podem visualizar e atualizar apenas seus próprios dados.
- Apenas usuários com perfil `adopter` podem realizar adoções.
- Apenas pets com status `available` podem ser adotados.
- Pets adotados têm seu status alterado automaticamente para `adopted`.

---

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- JWT (JSON Web Token)
- Bcrypt
- Dotenv
- Cors
- Helmet
- ESLint
- Prettier
- Nodemon

---

## Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
cd api-adocao-pets
```

Instale as dependências:

```bash
npm install
```

---

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=123
DB_NAME=pets_db

JWT_SECRET=sua_chave_secreta
```

---

## Execução

Modo desenvolvimento:

```bash
npm run dev
```

Modo produção:

```bash
npm start
```

A API ficará disponível em:

```text
http://localhost:3000
```

---

## Estrutura do banco de dados

O sistema utiliza um banco de dados MySQL chamado `pets_db`, composto por três tabelas principais: `users`, `pets` e `adoptions`.

### Tabela `users`

Armazena os usuários do sistema.

| Campo    | Tipo         | Restrições         |
| -------- | ------------ | ------------------ |
| id       | INT          | PK, AUTO_INCREMENT |
| name     | VARCHAR(100) | NOT NULL           |
| email    | VARCHAR(100) | NOT NULL, UNIQUE   |
| password | VARCHAR(255) | NOT NULL           |
| phone    | VARCHAR(20)  |                    |
| role     | VARCHAR(20)  | NOT NULL           |

---

### Tabela `pets`

Armazena os pets cadastrados para adoção.

| Campo       | Tipo         | Restrições         |
| ----------- | ------------ | ------------------ |
| id          | INT          | PK, AUTO_INCREMENT |
| name        | VARCHAR(100) | NOT NULL           |
| age         | INT          | NOT NULL           |
| species     | VARCHAR(50)  | NOT NULL           |
| size        | VARCHAR(20)  | NOT NULL           |
| status      | VARCHAR(20)  | NOT NULL           |
| description | TEXT         |                    |

---

### Tabela `adoptions`

Armazena os registros de adoção realizados pelos usuários.

| Campo         | Tipo | Restrições               |
| ------------- | ---- | ------------------------ |
| id            | INT  | PK, AUTO_INCREMENT       |
| user_id       | INT  | FK → users(id), NOT NULL |
| pet_id        | INT  | FK → pets(id), NOT NULL  |
| adoption_date | DATE | NOT NULL                 |

---

## Autenticação

A API utiliza JWT para proteger rotas privadas.

Após realizar login, utilize o token retornado no cabeçalho das requisições:

```http
Authorization: Bearer <token>
```

---

## Perfis de acesso

### Admin

- Listar usuários
- Buscar usuários
- Atualizar usuários
- Excluir usuários
- Gerenciar pets
- Listar adoções

### Adopter

- Consultar próprios dados
- Atualizar próprios dados
- Adotar pets disponíveis
