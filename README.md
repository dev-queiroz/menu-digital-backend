# API de Restaurante

Este projeto é uma API para gerenciar um sistema de restaurante, incluindo operações para cardápio, mesas, pedidos e garçons. A API é documentada usando Swagger e implementa autenticação baseada em JWT.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:
```bash
├── app.js
├── controllers
│ ├── cardapioController.js
│ ├── garcomController.js
│ ├── mesaController.js
│ └── pedidoController.js
├── middlewares
│ ├── auth.js
│ ├── cache.js
│ └── errorHandler.js
├── models
│ ├── cardapioModel.js
│ ├── garcomModel.js
│ ├── mesaModel.js
│ └── pedidoModel.js
├── routes
│ ├── cardapioRoutes.js
│ ├── garcomRoutes.js
│ ├── mesaRoutes.js
│ └── pedidoRoutes.js
├── services
│ ├── cardapioService.js
│ ├── garcomService.js
│ ├── mesaService.js
│ └── pedidoService.js
├── utils
│ └── cron.js
├── swagger.js
└── package.json
```


## Configuração e Execução

### Pré-requisitos

- Node.js instalado
- Banco de dados configurado (ex: Supabase)
- Variáveis de ambiente configuradas (`.env`)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```
   PORT=3000
   JWT_SECRET=sua_chave_secreta
   DATABASE_URL=sua_url_do_banco
   ```

### Execução

Para iniciar o servidor, execute:
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`.

## Documentação da API

A documentação da API é gerada automaticamente pelo Swagger e pode ser acessada em `http://localhost:3000/api-docs`.

### Exemplos de Rotas Documentadas

#### Cardápio

- **POST /cardapio**: Cria um novo item no cardápio.
- **GET /cardapio**: Retorna todos os itens do cardápio.
- **PUT /cardapio/{id}**: Atualiza um item do cardápio.
- **DELETE /cardapio/{id}**: Remove um item do cardápio.

#### Mesas

- **POST /mesas**: Cria uma nova mesa.
- **GET /mesas**: Retorna todas as mesas.

#### Pedidos

- **POST /pedidos**: Cria um novo pedido.
- **GET /pedidos**: Retorna todos os pedidos.

#### Garçons

- **POST /garcom**: Cria um novo garçom.
- **GET /garcom**: Retorna todos os garçons.

## Workflow

1. **Autenticação**: A API utiliza JWT para autenticação. Os tokens são verificados em cada rota protegida usando middlewares de autenticação.

2. **Middlewares**: 
   - `auth.js`: Verifica o token JWT e as permissões do usuário.
   - `cache.js`: Implementa cache para melhorar o desempenho.
   - `errorHandler.js`: Lida com erros globais na aplicação.

3. **Controllers**: Contêm a lógica de negócios e interagem com os serviços.

4. **Services**: Executam operações de lógica de negócios e interagem com os modelos.

5. **Models**: Interagem diretamente com o banco de dados.

6. **Rotas**: Definem os endpoints da API e aplicam os middlewares necessários.

7. **Swagger**: Documenta a API e fornece uma interface interativa para testar os endpoints.

## Detalhes dos Arquivos

### `app.js`

- Configura o servidor Express.
- Aplica middlewares globais como `helmet`, `cors` e `limiter`.
- Configura as rotas principais e a documentação Swagger.

### `controllers/`

- **`cardapioController.js`**: Lida com operações do cardápio.
- **`garcomController.js`**: Lida com operações de garçom.
- **`mesaController.js`**: Lida com operações de mesa.
- **`pedidoController.js`**: Lida com operações de pedido.

### `middlewares/`

- **`auth.js`**: Middleware de autenticação para verificar JWT.
- **`cache.js`**: Middleware para cache de respostas.
- **`errorHandler.js`**: Middleware para tratamento de erros.

### `routes/`

- **`cardapioRoutes.js`**: Define rotas para operações de cardápio.
- **`garcomRoutes.js`**: Define rotas para operações de garçom.
- **`mesaRoutes.js`**: Define rotas para operações de mesa.
- **`pedidoRoutes.js`**: Define rotas para operações de pedido.

### `services/`

- **`cardapioService.js`**: Lógica de negócios para cardápio.
- **`garcomService.js`**: Lógica de negócios para garçom.
- **`mesaService.js`**: Lógica de negócios para mesa.
- **`pedidoService.js`**: Lógica de negócios para pedido.

### `docs/swagger.js`

- Configura o Swagger para documentar a API.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.
