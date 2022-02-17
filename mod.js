export { pretty, percent } from '../number/mod.js'

export class Log {
	static ERROR = 1
	static WARNING = 2
	static INFO = 3
	static DEBUG = 4

	static level = Log.DEBUG;

	constructor(p = '') {
		// try { this.prefix = new URL(p).toString().split('/').slice(-1)[0].slice(0,-3) }
		// catch { this.prefix = p }
		this.prefix = p
	}

	text(type, ...p) {
		if (Log.level < Log[type]) return
		let dur = Date.now() - p.slice(-1)[0]
		if (dur < 1_000_000) p = p.slice(0, -1)
		// console.log(getStackTrace().filter(x=>!x.startsWith('file:')))
		standardLog(this.prefix, getStackTrace().filter(x => !x.startsWith('file:'))[2], dur, ...p)
	}

	debug(...p) { this.text('DEBUG', '#999', ...p) }
	info(...p) { this.text('INFO', '#fff', ...p) } //, 'ⓘ'
	warning(...p) { this.text('WARNING', '#fa0', '⚠', ...p) }
	error(...p) { this.text('ERROR', '#f00', '✖', ...p) }
}


const wrap = (a, x, b) => x ? a + x + b : ''
export function standardLog(prefix, caller, duration, ...p) {
	let time = new Date().toISOString().slice(11, 19)
	colorLog(
		'#999', time,
		'#bbb', wrap('[', prefix, ']'),
		'#999', wrap('{', caller, '}'),
		...p,
		'#999', wrap('(in ', duration, 'ms)')
	)
}


export function colorLog(...p) {
	let text = p.map(x => x?.startsWith?.('#') ? '%c' : x).join(' ').replaceAll('%c ', '%c')
	let color = p.filter(x => x?.startsWith?.('#')).map(x => `color:${x}`)
	console.log(text, ...color)
}


export function getStackTrace() {
	// try { new URL() } catch (e) { var st = e.stack }
	try { a.b = 1 } catch (e) { var st = e.stack }
	st = st.split('\n')
		.map(x => x.slice(7).split('(')[0].trim())
		.slice(5)
	return st
}

