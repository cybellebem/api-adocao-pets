# api-adocao-pets

API RESTful para gerenciamento de adoção de animais de estimação, desenvolvida com Node.js, Express, MySQL, JWT e bcrypt.

---

## Rotas

### Rotas Públicas

Não requerem autenticação.

| Método | Rota              | Descrição                                   |
| ------ | ----------------- | ------------------------------------------- |
| GET    | `/pets/available` | Lista todos os pets disponíveis para adoção |
| POST   | `/users`          | Cadastra um novo usuário                    |
| POST   | `/login`          | Realiza login e retorna um token JWT        |

---

### Rotas Protegidas

Requerem token JWT no header:

```http
Authorization: Bearer <token>
```

---

## Usuários

| Método | Rota         | Descrição                 | Acesso                   |
| ------ | ------------ | ------------------------- | ------------------------ |
| GET    | `/users`     | Lista todos os usuários   | Admin                    |
| GET    | `/users/:id` | Busca usuário por ID      | Admin ou próprio usuário |
| PUT    | `/users/:id` | Atualiza dados do usuário | Admin ou próprio usuário |
| DELETE | `/users/:id` | Remove um usuário         | Admin                    |

---

## Pets

| Método | Rota        | Descrição                                                 | Acesso |
| ------ | ----------- | --------------------------------------------------------- | ------ |
| GET    | `/pets`     | Lista todos os pets, incluindo os adotados                | Admin  |
| GET    | `/pets/:id` | Busca um pet por ID                                       | Admin  |
| POST   | `/pets`     | Cadastra um novo pet                                      | Admin  |
| PUT    | `/pets/:id` | Atualiza os dados de um pet                               | Admin  |
| DELETE | `/pets/:id` | Remove um pet (somente se estiver disponível para adoção) | Admin  |

---

## Adoções

| Método | Rota         | Descrição                             | Acesso  |
| ------ | ------------ | ------------------------------------- | ------- |
| GET    | `/adoptions` | Lista todas as adoções realizadas     | Admin   |
| POST   | `/adoptions` | Realiza a adoção de um pet disponível | Adopter |

---

## Regras de Negócio

### Usuários

- O papel padrão ao cadastrar um usuário é `adopter`.
- Apenas administradores podem visualizar todos os usuários.
- Senhas são armazenadas utilizando criptografia bcrypt.
- O próprio usuário pode consultar e atualizar seus dados.

### Pets

- Apenas administradores podem cadastrar, editar ou remover pets.
- Todo pet é criado com status `available`.
- Pets adotados não podem ser adotados novamente.
- Pets com status `adopted` não podem ser removidos.

### Adoções

- Apenas usuários com perfil `adopter` podem adotar pets.
- Um pet só pode ser adotado se estiver disponível.
- Após a adoção, o status do pet passa para `adopted`.
- Um usuário não pode adotar o mesmo pet mais de uma vez.

### Segurança

- A autenticação é realizada com JWT.
- O token contém `userId` e `role`.
- O token possui tempo de expiração.
- Senhas nunca são retornadas nas respostas da API.

Routes
↓
Controllers
↓
Services (regras de negócio)
↓
Models (SQL)
