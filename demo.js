import log from './raw.js';

// log.text('abc ').number(123.34)
// log.line.warning.text('abc ', { l: 10 }).dash.number(123.34, { l: 5, r: 5 }).end

log.lime.pad(10,10).text('yeah')


log.line.red.text('abc', { l: 10, r: 5 }).dash.number(123.1, { l: 7, r: 2 }).end

log.level(3)

log.line.success.pad(4).text(1).tab.pad(0, 20).text('test 123').tab.object({ a: 1, b: 2 }).tab.object([1, 2, 3]).end
log.line.error.pad(4).text(2).tab.pad(0, 20).text('test 123').tab.object({ a: 1, b: 2 }).tab.object([1, 2, 3]).end
log.line.pad(4).text(1).tab.pad(0, 20).text('test 123').tab.object({ a: 1, b: 2 }).tab.object([1, 2, 3]).end


log.warning.line.count('loop').tab.date.tab.time.tab.duration.pad(20,10).text('shit').end
log.warning.gray.line.count('loop').tab.date.tab.time.tab.duration.red.pad(20,10).text('shit').end
log.error.date
log.success.text('jo')
// log.line
// 	.info('23', { l: 5 }).tab
// 	.success('success').warning('warning').error('error')
// 	.object({ a: 1, b: 2 }).number(12.54).number('123')
// 	.end


// log.line.success.text().number().object().end
