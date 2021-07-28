import { log } from './ansi.js'
import { FS } from 'https://jsv.max.pub/fs/2021/deno.js'

log.onText = x => FS.folder('log').create().file(new Date().toISOString().slice(0, 10) + '.txt').append.text = x

log.timeCounter.green.text('hi').tib.red.text('max').tib.quote.text('the best').quote.move(50).bar.red.text('jo ').white.blink.text('mo')
log.timeCounter.violet.text('more text').move(50).bar.text('jo')
log.line.text('hallo').back.text('bonjour').tab.bool(1).tab.bool(0)
log.line.text('jooo')//.back
log.line.line.reset.green.text("hi").tib.red.text('jo').reset.tib.text('mo')
log.line.line.reset.text('total: ').totalMillis.line.line


// for (let i = 0; i < 255; i++) {
// 	log.reset.plus(i).text(i, 'test text').line
// }


// log.red.log('jo').dark.log('jo').line.counter.log('jj').line.counter

// log.log(`\x1b[38;2;0;200;0m ajskdlfja;sdk`)
// log.line.rgb(10, 200, 10).text('jaskl;jdfasd')

// log.line.gray.date.tab.orange.text('jasdfasdf')

// log.line.sky.text('sky').line.test3.text('test').line