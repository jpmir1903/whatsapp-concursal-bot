export function recomendarProcedimiento(tipo: string, tieneBienes: boolean, bienesRelevantes: boolean, monto: number, tieneHerencias?: boolean, juicio?: boolean) {
  if (!tieneBienes) {
    return { procedimiento: 'Liquidación voluntaria', razon: 'No hay bienes, conviene liquidar la deuda por simplicidad y tiempos.' };
  }
  if (monto > 0 && bienesRelevantes) {
    return tipo === 'persona'
      ? { procedimiento: 'Renegociación', razon: 'Persona con bienes relevantes, conviene renegociar.' }
      : { procedimiento: 'Reorganización', razon: 'Empresa con activos relevantes, conviene reorganizar.' };
  }
  if (tieneHerencias && tipo === 'persona') {
    return { procedimiento: 'Renegociación', razon: 'Con herencias, se evita liquidar si es posible.' };
  }
  return { procedimiento: 'Liquidación voluntaria', razon: 'Regla general aplicada.' };
}
