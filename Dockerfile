# Use a imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Gere o cliente Prisma
RUN npx prisma generate --schema=./prisma/schema.prisma

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
