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
    hosts: ['10.161.2.107_tuxapp1', '10.161.2.107_tuxapp2',
        '10.161.2.108_tuxapp1', '10.161.2.108_tuxapp2',
        '10.161.2.109_tuxapp3', '10.161.2.109_tuxapp4',
        '10.161.2.110_tuxapp3', '10.161.2.110_tuxapp4',
        '10.161.2.231_tuxapp1', '10.161.2.231_tuxapp2',
        '10.161.2.232_tuxapp3', '10.161.2.232_tuxapp4',

        '10.161.2.112_tuxapp5', '10.161.2.112_tuxapp6',
        '10.161.2.113_tuxapp7', '10.161.2.113_tuxapp8',
        '10.161.2.233_tuxapp5', '10.161.2.233_tuxapp6',
        '10.161.2.234_tuxapp7', '10.161.2.234_tuxapp8']
}