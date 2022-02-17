import { Log } from './css.js';
import { FS } from 'https://jsv.max.pub/fs/2021/deno.js'


let log = new Log('test')
log.onText = x => FS.folder('log').create().file(new Date().toISOString().slice(0, 10) + '.txt').append.text = x

// log.gray.date.tib.silver.count().line
log.timeCounter.text('jo').line
log.timeCounter.green.text('hi').tib.seaGreen.text('max').tib.quote.text('the best').quote.move(70).bar.skyBlue.text('jo ').line
// log.text('abc ').number(123.34)
// log.line.warning.text('abc ', { l: 10 }).dash.number(123.34, { l: 5, r: 5 }).end

// log.lime.pad(10, 10).text('yeah')


// log.line.red.text('abc', { l: 10, r: 5 }).dash.number(123.1, { l: 7, r: 2 }).end

// log.level(3)

// log.line.success.pad(4).text(1).tab.pad(0, 20).text('test 123').tab.object({ a: 1, b: 2 }).tab.object([1, 2, 3]).end
// log.line.error.pad(4).text(2).tab.pad(0, 20).text('test 123').tab.object({ a: 1, b: 2 }).tab.object([1, 2, 3]).end
// log.line.pad(4).text(1).tab.pad(0, 20).text('test 123').tab.object({ a: 1, b: 2 }).tab.object([1, 2, 3]).end


// log.warning.line.count('loop').tab.date.tab.time.tab.duration.pad(20, 10).text('shit').end
// log.warning.gray.line.count('loop').tab.date.tab.time.tab.duration.red.pad(20, 10).text('shit').end
// log.line.warning.gray.date.silver.pad(10).time.white.pad(5, 3).count('more').text('omg').end
// log.error.date