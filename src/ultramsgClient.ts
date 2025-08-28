import { cfg } from './config';

const base = 'https://api.ultramsg.com';

export async function sendWhatsApp(toChatId: string, body: string) {
  const url = `${base}/${cfg.ultramsg.instanceId}/messages/chat`;
  const form = new URLSearchParams();
  form.set('token', cfg.ultramsg.token);
  form.set('to', toChatId);
  form.set('body', body);

  const res = await fetch(url, { method: 'POST', body: form });
  if (!res.ok) {
    throw new Error(`UltraMsg error: ${res.status}`);
  }
  return res.json();
}
