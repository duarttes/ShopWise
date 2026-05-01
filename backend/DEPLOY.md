# Deploy

## Passos

```bash
# 1. Instalar dependências
npm install

# 2. Gerar o Prisma client
npm run prisma:generate

# 3. Rodar migrations
npm run prisma:deploy

# 4. Build
npm run build

# 5. Iniciar
npm run start
```

## Variáveis de ambiente necessárias

DATABASE_URL=postgresql://user:pass@host:5432/shopwise
JWT_SECRET=<secret forte>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://seudominio.com
GEOCODING_USER_AGENT=ShopWise/1.0 (contact: seuemail@email.com)