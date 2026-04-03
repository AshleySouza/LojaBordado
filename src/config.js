// Configurações do EmailJS
// Para configurar o envio de emails, siga estes passos:
//
// 1. Acesse https://www.emailjs.com/
// 2. Crie uma conta gratuita
// 3. Adicione um serviço de email (Gmail, Outlook, etc.)
// 4. Crie um template de email
// 5. Substitua os valores abaixo pelas suas credenciais

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_ho2ulwa', // Encontre na aba "Email Services"
  TEMPLATE_ID: 'template_02d0u3g', // Encontre na aba "Email Templates"
  PUBLIC_KEY: '8mx3zn99EwOiQYE_7', // Encontre na aba "Account" > "General"
};

// Configuração do email de destino
export const EMAIL_CONFIG = {
  TO_EMAIL: 'ashleysouzaa2005@gmail.com', // 📧 ALTERE AQUI: Email para onde os orçamentos serão enviados
  FROM_NAME: 'ashley victoria', // 🏢 Nome da empresa que aparece no email
};

// Template de email sugerido:
// Subject: Novo orçamento de {{from_name}}
//
// Olá CL Uniformes,
//
// Você recebeu um novo pedido de orçamento:
//
// Nome: {{from_name}}
// Email: {{from_email}}
// Telefone: {{telefone}}
// Serviço: {{servico}}
// Mensagem: {{mensagem}}
//
// Atenciosamente,
// Sistema de Orçamentos