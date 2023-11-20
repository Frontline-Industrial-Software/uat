// es.js
export default {
  next: 'siguiente',
  navigator: {
    input_data: 'Datos de entrada',
    baseline_summary: 'Resumen de línea base',
    optimized_summary: 'Resumen optimizado',
    optimized_report: 'Informe optimizado',
  },
  inputData: {
    title: 'Subir horario e ingresar configuraciones de optimización',
    oneData: [
      'Horario',
      'Sube tu horario (.xer o .xml)',
      'subir',
      'Ningún archivo seleccionado',
      'o',
      'usa un proyecto de demostración',
    ],
    twoData: [
      'Restricciones',
      'Sube tus restricciones ',
      '(descargar plantilla)',
      'Subir',
    ],
    threeData: [
      'Configuraciones de optimización',
      'Personaliza los resultados de tu optimización',
      'Ignorar Inicio Real / Fin Real',
      'Sí',
      'No',
      'Tasa de aprendizaje',
    ],
    fourData: ['Relación de optimización'],
    fiveData: ['Pasos de optimización'],
    Next: ['Siguiente'],
  },
  types: {
    type: [
      'línea base',
      'Equilibrado',
      'Más rápido',
      'Mínimo de recursos',
      'Recursos nivelados',
    ],
    typeShow: [
      'línea base',
      'Equilibrado',
      'Más rápido',
      'Mínimo de recursos',
      'Recursos nivelados',
    ],
    msg: [
      'Mejor combinación de los demás',
      'Duración más corta del proyecto',
      'Menor cantidad de recursos requeridos',
      'Mejor distribución de recursos',
    ],
  },
  baselineSummary: {
    title: ['Resumen de línea base', 'pasos', 'relación'],
    chartName: ['Gráfico de comparación'],

    Tsidebar: [
      'Duración del proyecto',
      'Recursos máximos',
      'Tareas modificadas',
      'Tareas en la ruta crítica',
    ],
    Bsidebar: [
      'Preajustes de optimización',
      'Estos preajustes disponibles son configuraciones predefinidas diseñadas para ofrecer el mejor rendimiento o calidad para cada caso de uso específico.',
    ],
  },
  optimizedSummary: {
    title: ['Resumen optimizado', 'pasos', 'relación'],
    header: [
      'Duración del proyecto (días)',
      'Recursos máximos',
      'Tareas modificadas',
      'Tareas en la ruta crítica',
    ],
    chartName: [
      'Gráfico de comparación',
      'Visión general de todas las tareas a lo largo del tiempo',
      'Recursos',
      'Utilización total de múltiples recursos a lo largo del tiempo',
    ],
    btn: ['atrás', 'VER INFORME DETALLADO'],
  },
  optimizedReport: {
    title: ['Informe detallado', 'pasos', 'relación'],
    btn: ['atrás', 'Exportar informe'],
    tableName: [
      'Tareas modificadas (Visión general)',
      'Todos los recursos',
      'Tarea-Recursos',
    ],
  },
}
