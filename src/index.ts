import express from 'express';
import { handleMessage } from './agent/agent';
import { cfg } from './config';

const app = express();
app.use(express.json());

app.post('/webhooks/ultramsg', async (req, res) => {
  try {
    const body = req.body;
    if (body?.event_type === 'message_received' && body.data?.type === 'chat') {
      const from = body.data.from;
      const text = body.data.body;
      await handleMessage(from, text);
    }
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(cfg.port, () => console.log(`Server running on port ${cfg.port}`));
