// en.js
export default {
  next: 'next',
  navigator: {
    input_data: 'Input Data',
    baseline_summary: 'Baseline Summary',
    optimized_summary: 'Optimized Summary',
    optimized_report: 'Optimized Report',
  },
  inputData: {
    title: 'Upload schedule and enter optimization settings',
    oneData: [
      'Schedule',
      'Upload your schedule (.xer or .xml)',
      'upload',
      'No file chosen',
      'or',
      'use a demo project',
    ],
    twoData: [
      'Constraints',
      'Upload your constraints ',
      '(download template)',
      'Upload',
    ],
    threeData: [
      'Optimization Settings',
      'Customize your optimization results',
      'Ignore Actual Start / Actual Finish',
      'Yes',
      'No',
      'Learning Rate',
    ],
    fourData: ['Optimization Ratio'],
    fiveData: ['Optimization Steps'],
    Next: ['Next'],
  },
  types: {
    type: [
      'baseline',
      'Balanced',
      'Fastest',
      'Minimum_Resources',
      'Levelled_Resources ',
    ],
    typeShow: [
      'baseline',
      'Balanced',
      'Fastest',
      'Minimum Resources',
      'Levelled Resources ',
    ],
    msg: [
      'Best combination of the others',
      'Shortest project duration',
      'Least amount of required resources',
      'Best resource distribution',
    ],
  },
  baselineSummary: {
    title: ['Baseline Summary', 'steps', 'ratio'],
    chartName: ['Comparison Chart'],

    Tsidebar: [
      'Project Duration',
      'Maximum Resources',
      'Changed Tasks',
      'Tasks on Critical Path',
    ],
    Bsidebar: [
      'Optimization Presets',
      'These available presets are pre-configured settings that are designed to deliver the best performance or quality for each individual specific use case.',
    ],
  },
  optimizedSummary: {
    title: ['Overview', 'steps', 'ratio'],
    header: [
      'Project Duration (days)',
      'Maximum Resources',
      'Changed Tasks',
      'Tasks on Critical Path',
    ],
    chartName: [
      'Comparison Chart',
      'Overview of all tasks over time',
      'Resources',
      'Total utilization of multiple resources over time',
    ],
    btn: ['back', 'VIEW DETAILED REPORT'],
  },
  optimizedReport: {
    title: ['Detailed Report', 'steps', 'ratio'],
    btn: ['back', 'Export Report'],
    tableName: ['Changed Tasks (Overview)', 'All Resources', 'Task-Resources'],
  },
  'How To Handle Tasks Without Resources?':
    'How To Handle Tasks Without Resources?',
  'Method To Satisfy Resource Constraints':
    'Method To Satisfy Resource Constraints',
  'Online editing': 'Online editing',
}
