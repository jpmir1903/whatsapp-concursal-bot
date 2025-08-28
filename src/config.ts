import 'dotenv/config';

export const cfg = {
  port: process.env.PORT || 3000,
  ultramsg: {
    instanceId: process.env.ULTRAMSG_INSTANCE_ID!,
    token: process.env.ULTRAMSG_TOKEN!
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini'
  },
  smtp: {
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!
  }
};
