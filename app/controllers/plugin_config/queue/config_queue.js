exports.queue = {
    realQueue: [{mode: 'Host', type: 'Queue', subtype: 'Real'}, {mode: 'Tux', type: 'Que', subtype: 'Base'}],
    hisQueue: [{mode: 'Host', type: 'Queue', subtype: 'His'}, {mode: 'Tux', type: 'Que', subtype: 'Base'}],
    queueFields: ['Queue1', 'Queue2', 'Queue3', 'Queue4', 'Queue5', 'Queue6', 'Queue7'],
    queueLabels: ['队列1', '队列2', '队列3', '队列4', '队列5', '队列6', '队列7'],
    testFields: ['MAX', 'AVERAGE', 'MIN'],
    testLabels: ['最大时间', '平均时间', '最小时间'],

    anaTabColNames: ['服务', '队列', '队列配置', '队列深度(<5)', '队列深度(5-10)', '队列深度(10-20)',
        '队列深度(>20)', '总记录数', '使用情况', '最大使用'/*, '建议配置'*/],
    anaListTab: [{mode: 'Tux', type: 'Que', subtype: 'ListDAY'}],
    anaBaseTab: [{mode: 'Tux', type: 'Que', subtype: 'Base'}],
    hosts: ['134.32.28.36', '134.32.28.37', '134.32.28.38', '134.32.28.39', '134.32.28.118', '134.32.28.124',
        '134.32.28.139', '134.32.28.141', '134.32.28.145', '134.32.28.188', '134.32.28.197', '134.32.28.198',
        '134.32.28.44', '134.32.28.45', '134.32.28.40', '134.32.28.41', '134.32.28.117', '134.32.28.119',
        '134.32.28.120', '134.32.28.121', '134.32.28.122', '134.32.28.123', '134.32.28.152', '134.32.28.154']
}