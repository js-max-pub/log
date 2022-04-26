// export { pretty, percent } from '../number/mod.js'

export class Log {
	static ERROR = 1
	static WARNING = 2
	static INFO = 3
	static DEBUG = 4

	static level = Log.DEBUG;
	static callback = null

	constructor(p = '') {
		// try { this.prefix = new URL(p).toString().split('/').slice(-1)[0].slice(0,-3) }
		// catch { this.prefix = p }
		this.prefix = p
	}

	text(type, ...p) {
		// console.log('level',Log.level,Log[type])
		if (Log.level < Log[type]) return
		// console.log("DUR",p)
		let dur = Date.now() - p.slice(-1)[0]
		if (dur < 1_000_000) p = p.slice(0, -1)
		// console.log("DUR",dur)
		// console.log(getStackTrace().filter(x=>!x.startsWith('file:')))
		let func = getStackTrace().filter(x => !x.startsWith('file:'))[0]?.replace('Module.', '')?.replace('Object.','')?.replace('[as function]','')?.trim()
		let v = standardLog(this.prefix, func, dur, ...p)
		Log.callback?.(v.filter(x => !x?.startsWith?.('#')).join(' '))
	}

	debug(...p) { this.text('DEBUG', '#999', ...p) }
	info(...p) { this.text('INFO', '#fff', ...p) } //, 'ⓘ'
	warning(...p) { this.text('WARNING', '#fa0', '⚠', ...p) }
	error(...p) { this.text('ERROR', '#f00', '✖', ...p) }
}



const wrap = (a, x, b) => x ? a + x + b : ''
export function standardLog(prefix, caller, duration, ...p) {
	let time = new Date().toISOString().slice(11, 19)
	return colorLog(
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
	return p
}


export function getStackTrace() {
	// try { new URL() } catch (e) { var st = e.stack }
	try { a.b = 1 } catch (e) { var st = e.stack }
	// console.log(st.split('\n').map(x => x.slice(7).split('(')[0].trim()))
	st = st.split('\n')
		.map(x => x.slice(7).split('(')[0].trim())
		.slice(4) // or 5?
	return st
}

