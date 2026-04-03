# CL Uniformes e Bordados

Este é um site moderno e responsivo para a empresa CL Uniformes e Bordados, especializada em uniformes personalizados e bordados de alta qualidade, desenvolvido com React e Vite.

## 🎯 Funcionalidades

- **Navbar Responsivo**: Navegação fixa com links para todas as seções
- **Ícones Sociais**: Links diretos para WhatsApp e Instagram
- **Seção Sobre Nós**: Apresentação da empresa com recursos destacados
- **Galeria Interativa**: Cards expansíveis dos serviços oferecidos
- **Formulário de Orçamento**: Formulário profissional com múltiplos campos
- **Design Moderno**: Interface elegante com gradientes, animações e efeitos visuais
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações Suaves**: Transições e hover effects para melhor experiência
- **Performance Otimizada**: Carregamento rápido com Vite

## 🛠️ Tecnologias Utilizadas

- **React 18**: Framework JavaScript para interfaces
- **Vite**: Build tool ultra-rápido
- **CSS3**: Estilos modernos com animações
- **Google Fonts**: Tipografia Inter para design profissional

## 📁 Estrutura do Projeto

```
react-app/
├── public/           # Arquivos estáticos
├── src/
│   ├── App.jsx      # Componente principal
│   ├── index.css    # Estilos globais
│   └── main.jsx     # Ponto de entrada
├── package.json     # Dependências
└── vite.config.js   # Configuração Vite
```

## 🚀 Como Executar

1. **Instalar dependências:**
   ```bash
   cd react-app
   npm install
   ```

2. **Executar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Abrir no navegador:**
   - Acesse http://localhost:5173

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `src/index.css`:
- Dourado principal: `#D4AF37`
- Preto: `#1a1a1a`
- Cinza claro: `#f9fafb`, `#f3f4f6`, `#e5e7eb`
- Branco: `#ffffff`

### Conteúdo
Para alterar textos e conteúdo, edite o arquivo `src/App.jsx`.

### Adicionar Imagens
Coloque suas imagens na pasta `public/images/` e atualize as referências no código.

### Personalizar Links Sociais
Para alterar os links do WhatsApp e Instagram, edite o arquivo `src/App.jsx`:

```jsx
// WhatsApp - substitua pelo seu número
<a href="https://wa.me/SEU_NUMERO_AQUI" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">

// Instagram - substitua pelo seu perfil
<a href="https://instagram.com/SEU_PERFIL" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
```

**Nota**: Para o WhatsApp, use o formato internacional sem espaços ou caracteres especiais (ex: 5511999999999 para Brasil).

### Personalizar Informações de Contato
Para alterar endereço, telefone, email e localização, edite a seção "contact-info" no arquivo `src/App.jsx`:

```jsx
// Endereço
<p>Rua das Flores, 123<br />Centro - São Paulo/SP<br />CEP: 01234-567</p>

// Telefone
<p>(11) 99999-9999<br />(11) 8888-8888</p>

// Email
<p>contato@bordados.com.br<br />orcamentos@bordados.com.br</p>

// Mapa - substitua o src do iframe pelo seu local
<iframe src="SUA_URL_DO_GOOGLE_MAPS_EMBED" ...>
```

## ⚙️ Configuração do EmailJS

Para que os formulários de orçamento cheguem no seu email, siga estes passos:

### 1. Criar conta no EmailJS
- Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
- Crie uma conta gratuita

### 2. Configurar serviço de email
- Vá para "Email Services" → "Add New Service"
- Escolha seu provedor (Gmail, Outlook, etc.)
- Conecte sua conta de email

### 3. Criar template de email
- Vá para "Email Templates" → "Create New Template"
- Use este modelo:

```
Subject: Novo orçamento de {{from_name}}

Olá CL Uniformes,

Você recebeu um novo pedido de orçamento:

Nome: {{from_name}}
Email: {{from_email}}
Telefone: {{telefone}}
Serviço: {{servico}}
Mensagem: {{mensagem}}

Atenciosamente,
Sistema de Orçamentos
```

### 4. Configurar credenciais e email de destino
- Abra `src/config.js`
- Substitua os valores pelas suas credenciais:
  - `SERVICE_ID`: ID do seu serviço de email
  - `TEMPLATE_ID`: ID do template criado
  - `PUBLIC_KEY`: Sua chave pública
  - `TO_EMAIL`: **📧 SEU EMAIL** (onde os orçamentos chegarão)
  - `FROM_NAME`: Nome da sua empresa

**Exemplo:**
```javascript
export const EMAIL_CONFIG = {
  TO_EMAIL: 'seuemail@gmail.com', // ← ALTERE PARA SEU EMAIL
  FROM_NAME: 'CL Uniformes e Bordados',
};
```

### 🎯 Funcionalidades do Formulário

- **✅ Limpeza Automática**: Após envio bem-sucedido, o formulário é limpo automaticamente após 3 segundos
- **✅ Feedback Visual**: Mensagens de sucesso/erro com cores distintas
- **✅ Validação**: Todos os campos obrigatórios são validados
- **✅ Loading State**: Botão mostra "Enviando..." durante o processo
- **✅ Prevenção de Spam**: Formulário é desabilitado durante o envio

## 📱 Seções do Site

1. **Header**: Navegação fixa com logo, menu responsivo e ícones sociais
2. **Hero**: Seção principal com título e call-to-actions
3. **Sobre Nós**: Apresentação da empresa com recursos e imagem
4. **Galeria**: Cards interativos dos serviços oferecidos
5. **Orçamento**: Formulário profissional para solicitação de orçamento
6. **Informações de Contato**: Endereço, telefone, email, horário e mapa da localização
7. **Footer**: Informações de copyright

## 🔧 Próximas Melhorias

- [ ] Integração com backend para formulários
- [ ] Galeria de imagens reais
- [ ] Sistema de agendamento
- [ ] Painel administrativo
- [ ] Integração com WhatsApp

## 📄 Licença

Este projeto é para fins educacionais e comerciais.

---

**Desenvolvido com ❤️ para o mundo dos bordados personalizados**