import { sendWhatsApp } from '../ultramsgClient';
import { recomendarProcedimiento } from '../tools/procedure';
import { calcularCotizacion } from '../tools/quote';
import { sendMail } from '../mailer';
import { prisma } from '../db';

export async function handleMessage(chatId: string, text: string) {
  if (/persona/i.test(text)) {
    const proc = recomendarProcedimiento('persona', false, false, 20_000_000);
    const cot = calcularCotizacion(20_000_000);

    const resumen = `✅ Recomendación: ${proc.procedimiento}
📌 ${proc.razon}

💵 Cotización: ${cot.total.toLocaleString()} CLP
• Pie: ${cot.pie.toLocaleString()}
• ${cot.cuotas} cuotas de ${cot.valorCuota.toLocaleString()}

Orientación inicial, confirmamos en evaluación formal.
📍 Nueva de Lyon 72, Of. 1802, Providencia`;

    await sendWhatsApp(chatId, resumen);
    await prisma.lead.create({ data: { waChatId: chatId, tipoCliente: 'persona', montoDeuda: 20000000, procedimientoSug: proc.procedimiento, cotizacion: resumen, estado: 'cotizado' } });
    await sendMail('leads@defensaimpuestos.cl', 'Nuevo lead WhatsApp', resumen);
  } else {
    await sendWhatsApp(chatId, '¿La consulta es como persona o por empresa?');
  }
}
