# Menu Digital - Backend

Sistema de cardápio digital desenvolvido com Node.js e Supabase, oferecendo uma solução completa para restaurantes gerenciarem pedidos, mesas e cardápio através de QR Codes.

## Tecnologias Utilizadas

- Node.js com Express.js
- TypeScript
- Supabase (PostgreSQL)
- JWT para autenticação
- Supabase Realtime para atualizações em tempo real

## Funcionalidades

### Gerentes
- Gerenciamento de usuários (garçons)
- Gerenciamento do cardápio (criar, editar, remover itens)
- Gerenciamento de mesas e QR Codes
- Visualização de relatórios e estatísticas

### Garçons
- Visualização de pedidos em tempo real
- Atualização de status dos pedidos
- Gerenciamento de sessões das mesas
- Atendimento a solicitações de conta

### Clientes
- Acesso ao cardápio via QR Code
- Realização de pedidos
- Acompanhamento do status dos pedidos
- Solicitação de conta

## Estrutura do Projeto

```
src/
├── @types/         # Definições de tipos TypeScript
├── config/         # Configurações (Supabase, banco de dados)
├── controllers/    # Controladores da aplicação
├── middlewares/    # Middlewares (autenticação, validação)
├── routes/         # Rotas da API
└── utils/          # Funções utilitárias
```

## Configuração do Ambiente

1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd menu-digital-backend
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
PORT=3000
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_do_supabase
JWT_SECRET=seu_segredo_jwt
```

4. Configure o banco de dados
- Acesse o painel do Supabase
- Execute o script SQL em `src/config/init-db.sql`

5. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## API Endpoints

### Autenticação
- `POST /api/users/login` - Login de usuário
- `POST /api/users/register` - Registro de novo usuário (apenas gerentes)

### Usuários
- `GET /api/users` - Listar usuários (apenas gerentes)
- `DELETE /api/users/:id` - Remover usuário (apenas gerentes)

### Cardápio
- `GET /api/menu` - Listar itens do cardápio
- `POST /api/menu` - Criar item (apenas gerentes)
- `PUT /api/menu/:id` - Atualizar item (apenas gerentes)
- `DELETE /api/menu/:id` - Remover item (apenas gerentes)

### Mesas
- `GET /api/tables/verify/:token` - Verificar QR Code
- `GET /api/tables` - Listar mesas (gerentes e garçons)
- `POST /api/tables` - Criar mesa (apenas gerentes)
- `PATCH /api/tables/:id/status` - Alterar status (apenas gerentes)
- `POST /api/tables/:tableId/close-session` - Encerrar sessão (apenas garçons)

### Pedidos
- `POST /api/orders` - Criar pedido
- `GET /api/orders/session/:sessionId` - Listar pedidos por sessão
- `GET /api/orders/pending` - Listar pedidos pendentes (apenas garçons)
- `PATCH /api/orders/:orderId/status` - Atualizar status (apenas garçons)
- `POST /api/orders/session/:sessionId/bill` - Solicitar conta

## Segurança

O sistema implementa várias camadas de segurança:

- Autenticação JWT para rotas protegidas
- Row Level Security (RLS) no Supabase
- Validação de dados nas requisições
- Controle de acesso baseado em funções (RBAC)
- Proteção contra ataques comuns (CORS, Helmet)

## Deploy

O backend está configurado para deploy na Vercel:

1. Configure as variáveis de ambiente na Vercel
2. Conecte o repositório
3. Deploy automático a cada push na branch principal

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença ISC. 