import { Log, colorLog, standardLog } from './mod.js'
// Log.level = Log.INFO
// let log = new Log(import.meta.url)
let log = new Log('demo')
let t0 = Date.now()

function testFunc() {
	log.debug('debug')
	log.info('info')

}
function part2() {
	log.warning('warning', 'text', '#f0f', 'other', 'color')
	log.error('error')
	log.info('info', '#0af', 'duration', t0)

}
testFunc()
part2()

log.info('info base')

colorLog('#faa', 'hi', "i'm", '#afa', 'Max', '#aaf', 'and you?')
standardLog('prefix', 'caller', Date.now() - t0, 'hello', 'world')
