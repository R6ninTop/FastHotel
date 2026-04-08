# 🚀 Guia de Deployment - FastHotel no Netlify & Backend

## PASSO 1: Preparar o Frontend (React)

### 1.1 Inicializar Git (se ainda não tiver)
```bash
cd c:\Users\joaob\Desktop\Trabalho Michel\Folder
git init
git add .
git commit -m "Initial commit"
```

### 1.2 Criar repositório no GitHub
- Acesse: https://github.com/new
- Crie um repositório chamado `fasthotel-app`
- Siga as instruções para fazer push do código local

### 1.3 Push para GitHub
```bash
git remote add origin https://github.com/SEU_USUARIO/fasthotel-app.git
git branch -M main
git push -u origin main
```

---

## PASSO 2: Fazer Deploy do Frontend na Netlify

### 2.1 Acesse Netlify
- Vá para: https://www.netlify.com/
- Clique em "Sign up" → "Sign up with GitHub"
- Autorize o Netlify a acessar seus repositórios

### 2.2 Criar novo site
- Clique em "Add new site" → "Import an existing project"
- Selecione seu repositório `fasthotel-app`
- Clique em "Deploy site"

**Configurações automáticas:**
- Build command: `yarn build`
- Publish directory: `build`
- (Já estão no netlify.toml)

### 2.3 Configurar variáveis de ambiente
No dashboard do Netlify:
1. Vá para: **Site settings** → **Build & deploy** → **Environment**
2. Adicione:
```
REACT_APP_API_URL = https://seu-backend-url.com/api
```

---

## PASSO 3: Fazer Deploy do Backend

### Opção A: Usar Render (Recomendado - Grátis)

**3A.1 Preparar Backend**
```bash
cd c:\Users\joaob\Desktop\Trabalho Michel\fasthotel-api
git init
git add .
git commit -m "Initial backend commit"
git remote add origin https://github.com/SEU_USUARIO/fasthotel-api.git
git push -u origin main
```

**3A.2 Deploy no Render**
1. Acesse: https://render.com/
2. Clique em "New +" → "Web Service"
3. Selecione seu repositório `fasthotel-api`
4. Configurações:
   - **Name**: fasthotel-api
   - **Runtime**: Node
   - **Build command**: `yarn install`
   - **Start command**: `node server.js`
5. Clique em "Create Web Service"

**3A.3 Configurar variáveis de ambiente no Render**
No dashboard do Render, vá para **Environment** e adicione:
```
JWT_SECRET=fasthotel_mock_secret_key_2026
PORT=5000
NODE_ENV=production
```

---

## PASSO 4: Atualizar URLs no Frontend

Após fazer deploy do backend, atualize no Netlify:
- **Site settings** → **Environment**
- Altere `REACT_APP_API_URL` para a URL do Render
- Exemplo: `https://fasthotel-api.onrender.com/api`

---

## PASSO 5: Testar

### Acessar Frontend
```
https://seu-site.netlify.app
```

### Testar Login
- Email: `qualquer@email.com`
- Senha: `qualquer_senha`

### Verificar Console
Abra DevTools (F12) → Console para ver se há erros de conexão

---

## 📋 Checklist Final

- [ ] Repositório GitHub criado para frontend
- [ ] Repositório GitHub criado para backend
- [ ] Frontend deployed na Netlify
- [ ] Backend deployed no Render
- [ ] Variáveis de ambiente configuradas
- [ ] URL do backend atualizada no frontend
- [ ] Teste de login funcionando
- [ ] APIs respondendo corretamente

---

## 🔧 Troubleshooting

**Erro: "Cannot find module 'pg'"**
- Normal! O postgres não é necessário (usando mock)
- Remova a dependência (já está mockada)

**Erro: "CORS error"**
- Adicione no backend (server.js):
```javascript
const cors = require('cors');
app.use(cors({
  origin: "https://seu-site.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
```

**Erro: "Token inválido"**
- Certifique-se que JWT_SECRET está configurado no backend

---

## 📊 Resumo de URLs

Após deployment:
- **Frontend**: `https://seu-site.netlify.app`
- **Backend**: `https://fasthotel-api.onrender.com`
- **API Base**: `https://fasthotel-api.onrender.com/api`

Boa sorte! 🎉
