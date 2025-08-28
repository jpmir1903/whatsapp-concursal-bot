export function calcularCotizacion(monto: number) {
  let pct = monto < 10_000_000 ? 0.08 : 0.06;
  let total = monto * pct;

  if (monto > 100_000_000 && total > 7_000_000) {
    total = 7_000_000;
  }

  const pie = Math.round(total * 0.3);
  const cuota = Math.round((total - pie) / 6);

  return { total, pie, cuotas: 6, valorCuota: cuota };
}
