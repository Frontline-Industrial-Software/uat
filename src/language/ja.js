export default {
  year: '年',
  week: '週',
  day: '日',
  month: '月',
  next: '次へ',
  navigator: {
    input_data: 'データ入力',
    baseline_summary: 'ベースラインの概要',
    optimized_summary: '最適化された概要',
    optimized_report: '最適化レポート',
  },
  inputData: {
    title: 'スケジュールをアップロードして最適化設定を入力する',
    oneData: [
      'スケジュール',
      'スケジュールをアップロードする（.xerまたは.xml）',
      'アップロード',
      'ファイルが選択されていません',
      'または',
      'デモプロジェクトを使用する',
    ],
    twoData: [
      '制約',
      '制約をアップロードする',
      '（テンプレートをダウンロードする）',
      'アップロード',
    ],
    threeData: [
      '最適化設定',
      '最適化結果をカスタマイズする',
      'プロジェクトの予定日を無視する',
      'はい',
      'いいえ',
      '学習率',
    ],
    fourData: ['最適化比率'],
    fiveData: ['最適化ステップ'],
    Next: ['次へ'],
  },
  types: {
    type: [
      'ベースライン',
      '平衡',
      '最速',
      '最小リソース',
      '均一化されたリソース',
    ],
    msg: [
      '他の設定の最良の組み合わせ',
      '最短のプロジェクト期間',
      '必要なリソースの最小量',
      '最適なリソースの分配',
    ],
  },
  baselineSummary: {
    title: ['ベースラインの概要', 'ステップ', '比率'],
    chartName: ['比較チャート'],

    Tsidebar: [
      'プロジェクト期間',
      '変更されたタスク vs 総タスク数',
      'クリティカルパス上のタスク',
      '総リソース数',
    ],
    Bsidebar: [
      '最適化プリセット',
      'これらの利用可能なプリセットは、個々の特定のユースケースに対して最高のパフォーマンスまたは品質を提供するように事前に設定されています。',
    ],
  },
  optimizedSummary: {
    title: ['概要', 'ステップ', '比率'],
    header: [
      'プロジェクト期間（日）',
      'タスク数',
      'クリティカルパス上のタスク数',
    ],
    chartName: [
      '比較チャート',
      '時間の経過によるすべてのタスクの概要',
      '労働リソース',
      '複数のリソースの時間の利用率の合計',
    ],
    btn: ['戻る', '詳細レポートを見る'],
  },
  optimizedReport: {
    title: ['詳細レポート', 'ステップ', '比率'],
    btn: ['戻る', 'レポートをエクスポートする'],
    tableName: [
      '変更されたタスク（概要）',
      'すべてのリソース',
      'タスク-リソース',
    ],
  },
  'How To Handle Tasks Without Resources?':
    'リソースがない場合のタスクの処理方法',
  'Method To Satisfy Resource Constraints': 'リソース制約を満たす方法',
  'Online editing': 'オンライン編集',
}
