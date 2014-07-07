exports.queue = {
    realQueue: [{mode: 'Host', type: 'Queue', subtype: 'Real'}],
    hisQueue: [{mode: 'Host', type: 'Queue', subtype: 'His'}],
    queueFields: ['Queue1', 'Queue2', 'Queue3', 'Queue4', 'Queue5', 'Queue6', 'Queue7'],
    queueLabels: ['队列1', '队列2', '队列3', '队列4', '队列5', '队列6', '队列7'],
    testFields: ['MAX', 'AVERAGE', 'MIN'],
    testLabels: ['最大时间', '平均时间', '最小时间'],

    anaTabColNames: ['服务', '队列', '队列配置', '队列深度(<5)', '队列深度(5-10)', '队列深度(10-20)',
        '队列深度(>20)', '总记录数', '使用情况', '最大使用'/*, '建议配置'*/],
    anaListTab: [{mode: 'Tux', type: 'Que', subtype: 'ListDAY'}],
    anaBaseTab: [{mode: 'Tux', type: 'Que', subtype: 'Base'}],
    hosts: ['192.168.11.79', '192.168.11.78', '192.168.11.77', '192.168.11.76']
}