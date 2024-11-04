Segue o markdown atualizado com o passo adicional:

# Bot SimpleFit

Este software foi desenvolvido como parte de um trabalho acadêmico na Universidade Paulista (UNIP). O objetivo deste projeto é ajudar os usuários a criar e gerenciar treinos de academia de forma personalizada, usando um bot de Inteligência Artificial (IA). O sistema vai sugerir treinos com base nas metas e no perfil de cada usuário, coletando informações como nível de condicionamento físico, quantos dias podem treinar, condições de saúde ou restrições, preferências pessoais e objetivos. Assim, conseguimos oferecer um suporte mais eficaz e adaptado às necessidades de cada um, melhorando os resultados e a satisfação dos usuários.

## Tabela de recursos

| Recursos                                                         | Implementado | Não implementado |
|------------------------------------------------------------------|--------------|------------------|
| Criação de múltiplos chats simultâneos                           | ✅           |                  |
| Registro de usuário                                              | ✅           |                  |
| Criação de treinos personalizados com base nas informações do usuário | ✅           |                  |
| Recomendações de dietas                                          |              | ❌               |
| Recomendações de suplementação                                   |              | ❌               |

# Demonstração

<div style="display: flex; gap: 10px;">
  <img src="./images/splash.jpg" alt="Tela inicial" width="200" />
  <img src="./images/chat_list.jpg" alt="Lista de chats" width="200" />
  <img src="./images/create_chat.jpg" alt="Criação de chat" width="200" />
  <img src="./images/mensage.jpg" alt="Tela de mensagem" width="200" />
  <img src="./images/update_chat.jpg" alt="Atualização de chat" width="200" />
</div>

## ⚙️ Tech Stack

- React Native
- ChatGPT
- Vercel AI
- PostgreSQL
- Expo
- Tamagui
- Next.js
- Jest
- Prisma

## Variáveis de ambiente do Servidor

Para rodar o projeto, você precisa configurar as seguintes variáveis de ambiente:

- `DATABASE_URL`: URL do banco de dados
- `AZURE_RESOURCE_NAME`: Nome do recurso Azure
- `AZURE_API_KEY`: Chave de API da Azure
- `AZURE_OPENAI_ENDPOINT`: Endpoint do OpenAI na Azure
- `OPENAI_API_KEY`: Chave de API do OpenAI

## Variáveis de ambiente do Mobile

Para rodar o projeto, você precisa configurar as seguintes variáveis de ambiente:

- `API_URL`: URL da API para conexão

## Como rodar o projeto

Siga os passos abaixo para rodar o projeto localmente tanto para o mobile (React Native com Expo) quanto para o servidor (NestJS):

### Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- NPM ou Yarn instalado
- Expo CLI instalado globalmente (`npm install -g expo-cli` ou `yarn global add expo-cli`)
- PostgreSQL instalado e rodando
- Git instalado
- **Docker e Docker Compose instalados**
- Contas no OpenAI e Azure para obter as chaves de API necessárias

### Clonando o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### Configurando o Servidor (Backend)

Navegue até a pasta do servidor:

```bash
cd server
```

Instale as dependências:

```bash
npm install
# ou
yarn install
```

Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz da pasta `server` com as seguintes variáveis:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
AZURE_RESOURCE_NAME=seu_nome_de_recurso_azure
AZURE_API_KEY=sua_chave_de_api_azure
AZURE_OPENAI_ENDPOINT=seu_endpoint_azure_openai
OPENAI_API_KEY=sua_chave_de_api_openai
```

**Importante**: Substitua os valores de acordo com as suas configurações e credenciais.

### Executando o Docker Compose

Navegue até a pasta `infra`:

```bash
cd ../infra
```

Execute o Docker Compose para iniciar os serviços necessários:

```bash
docker-compose up -d
```

Isso irá iniciar os contêineres definidos no `docker-compose.yml`, como o banco de dados PostgreSQL.

Volte para a pasta do servidor:

```bash
cd ../server
```

### Executando as Migrações do Banco de Dados

Execute as migrações do banco de dados (caso esteja usando o Prisma como ORM):

```bash
npx prisma migrate dev
```

### Iniciando o Servidor

Inicie o servidor:

```bash
npm run start:dev
# ou
yarn start:dev
```

O servidor estará rodando em `http://localhost:3000`.

### Configurando o Aplicativo Mobile (Frontend)

Navegue até a pasta do aplicativo mobile:

```bash
cd ../mobile
```

Instale as dependências:

```bash
npm install
# ou
yarn install
```

Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz da pasta `mobile` com a seguinte variável:

```env
API_URL=http://localhost:3000
```

**Nota**: Certifique-se de que o `API_URL` aponte para o endereço onde o servidor está rodando.

Inicie o aplicativo com o Expo:

```bash
expo start
```

Isso abrirá o Expo Developer Tools no seu navegador. Você pode:

- Escanear o QR Code com o aplicativo Expo Go no seu dispositivo móvel.
- Escolher rodar em um emulador iOS ou Android.
