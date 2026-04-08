# 🐾 Pet Adopt App

Aplicativo de adoção de pets com React Native, Expo Router e TypeScript.

## 🚀 Como executar

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o projeto
```bash
npx expo start
```

### 3. Abrir no dispositivo
- **Expo Go (celular):** escaneie o QR code
- **Android Emulator:** pressione `a`
- **iOS Simulator:** pressione `i`
- **Web:** pressione `w`

## 📁 Estrutura
```
rn_pet_adopt/
├── app/
│   ├── _layout.tsx       # Layout raiz com SessionProvider
│   ├── index.tsx         # Redireciona para /splash
│   ├── splash.tsx        # Tela inicial
│   ├── login.tsx         # Login
│   ├── signup.tsx        # Cadastro
│   ├── pets.tsx          # Lista de pets
│   └── +not-found.tsx    # 404
├── src/
│   └── contexts/
│       └── SessionContext.tsx  # Contexto de autenticação
├── app.json
├── package.json
└── tsconfig.json
```

## 🔐 Fluxo de navegação
```
Splash → Pets (sem login) → voltar para Splash
Splash → Login → autenticado → Pets
Splash → Signup → autenticado → Pets
```
