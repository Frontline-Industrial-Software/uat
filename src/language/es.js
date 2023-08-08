export default {
    next: "siguiente",
    navigator: {
      input_data: "Datos de entrada",
      baseline_summary: "Resumen de línea de base",
      optimized_summary: "Resumen optimizado",
      optimized_report: "Informe optimizado",
    },
    inputData: {
      title: "Cargar el cronograma e ingresar la configuración de optimización",
      oneData: [
        "Cronograma",
        "Cargar su cronograma (.xer o .xml)",
        "subir",
        "Ningún archivo seleccionado",
        'o',
        "usar un proyecto de demostración",
      ],
      twoData: [
        "Restricciones",
        "Cargar sus restricciones",
        '(descargar plantilla)',
        "Cargar",
      ],
      threeData: [
        "Configuración de optimización",
        "Personalice los resultados de la optimización",
        "Ignorar fechas programadas del proyecto",
        "sí",
        "no",
        "Tasa de aprendizaje",
      ],
      fourData: ["Relación de optimización"],
      fiveData: ["Pasos de optimización"],
      Next: ["Siguiente"],
    },
    types: {
      type: [
        "Línea de base",
        "Equilibrado",
        "Más rápido",
        "Recursos mínimos",
        "Recursos nivelados",
      ],
      msg: [
        "La mejor combinación de los demás",
        "Duración más corta del proyecto",
        "La menor cantidad de recursos requeridos",
        "La mejor distribución de recursos",
      ],
    },
    baselineSummary: {
      title: ["Resumen de línea de base", "pasos", "relación"],
      chartName: ["Gráfico comparativo"],
  
      Tsidebar: [
        "Duración del proyecto",
        "Tareas cambiadas vs total de tareas",
        "Tareas en el camino crítico",
        "Recursos totales",
      ],
      Bsidebar: [
        "Preajustes de optimización",
        "Estos preajustes disponibles son configuraciones predefinidas diseñadas para ofrecer el mejor rendimiento o calidad para cada caso de uso específico individual.",
      ],
    },
    optimizedSummary: {
      title: ["Descripción general", "pasos", "relación"],
      header: [
        "Duración del proyecto (días)",
        "Tareas",
        "Tareas en el camino crítico",
      ],
      chartName: [
        "Gráfico comparativo",
        "Resumen de todas las tareas a lo largo del tiempo",
        "Rec",
        "Recursos de trabajo",
      "Utilización total de múltiples recursos a lo largo del tiempo",
    ],
    btn: ["regresar", "VER INFORME DETALLADO"],
  },
  optimizedReport: {
    title: ["Informe detallado", "pasos", "relación"],
    btn: ["regresar", "Exportar informe"],
    tableName: ["Tareas cambiadas (Resumen)", "Todos los recursos", "Tarea-Recursos"],
  },
};
