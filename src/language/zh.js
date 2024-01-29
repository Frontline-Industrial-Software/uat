export default {
  next: '下一步',
  navigator: {
    input_data: '输入数据',
    baseline_summary: '基线摘要',
    optimized_summary: '优化摘要',
    optimized_report: '优化报告',
  },
  inputData: {
    title: '上传计划并输入优化设置',
    oneData: [
      '计划',
      '上传您的计划 (.xer 或 .xml)',
      '上传',
      '未选择文件',
      '或',
      '使用演示项目',
    ],
    twoData: ['约束', '上传您的约束', '(下载模板)', '上传'],
    threeData: [
      '优化设置',
      '自定义优化结果',
      '忽略项目计划日期',
      '是',
      '否',
      '学习率',
    ],
    fourData: ['优化比率'],
    fiveData: ['优化步骤'],
    Next: ['下一步'],
  },
  types: {
    type: ['基线', '平衡', '最快', '最小资源', '平均资源'],
    msg: [
      '其他设置的最佳组合',
      '最短项目持续时间',
      '所需资源最少',
      '最佳资源分配',
    ],
  },
  baselineSummary: {
    title: ['基线摘要', '步骤', '比率'],
    chartName: ['比较图'],

    Tsidebar: [
      '项目持续时间',
      '已更改任务 vs 总任务数量',
      '关键路径上的任务',
      '总资源',
    ],
    Bsidebar: [
      '优化预设',
      '这些利用预设是预先配置的设置，旨在为每个特定用例提供最佳性能或质量。',
    ],
  },
  optimizedSummary: {
    title: ['概览', '步骤', '比率'],
    header: ['项目持续时间（天）', '任务数', '关键路径上的任务数'],
    chartName: [
      '比较图',
      '时间的所有任务概览',
      '劳动资源',
      '多个资源的时间总利用率',
    ],
    btn: ['返回', '查看详细报告'],
  },
  optimizedReport: {
    title: ['详细报告', '步骤', '比率'],
    btn: ['返回', '导出报告'],
    tableName: ['已更改的任务（概览）', '所有资源', '任务-资源'],
  },
  'How To Handle Tasks Without Resources?': '如何处理没有资源的任务',
  'Method To Satisfy Resource Constraints': '满足资源约束的方法',
  'Online editing': '在线编辑',
}
