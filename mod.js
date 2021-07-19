
export class Log {
	static default = new Log()

	enabled = true
	startTime = new Date().getTime()

	log(x) {
		if (this.enabled)
			Deno.writeAllSync(Deno.stdout, new TextEncoder().encode(x))
		return this
	}

	escape(x) { this.lastEscape = x; return this.log(`\x1b[${x}m`) }
	base(n) { return this.escape(n) }
	plus(n) { return this.escape(`38:5:${n}`) }
	rgb(r, g, b) { return this.escape(`38;2;${r};${g};${b}`) }
	hex(x) {
		let rgb = []
		if (x.length == 3) rgb = x.split('').map(x => x + '0')
		if (x.length == 6) rgb = [x.slice(0, 2), x.slice(2, 4), x.slice(4, 6)]
		// console.log('hex', x, rgb)
		rgb = rgb.map(x => parseInt('0x' + x))
		return this.rgb(...rgb)
	}

	get reset() { return this.base(0) }

	get bold() { return this.base(1) }
	get dark() { return this.base(2) }
	get italic() { return this.base(3) }
	get underline() { return this.base(4) }

	get black() { return this.base(30) }
	get red() { return this.base(31) }
	get green() { return this.base(32) }
	get yellow() { return this.base(33) }
	get blue() { return this.base(34) }
	get magenta() { return this.base(35) }
	get cyan() { return this.base(36) }

	// get silver() { return this.plus(7) }
	// get gray() { return this.plus(8) }
	get orange() { return this.plus(208) }
	get silver() { return this.plus(245) }
	get gray() { return this.plus(240) }

	get sky() { return this.hex('87cefa') }
	get violet() { return this.hex('aaf') }


	get tib() { return this.text('  ') }
	get tab() { return this.text('\t') }
	get back() { return this.text('\r') }
	get line() { this.lineCounter = 0; return this.text('\n') }
	get bar() { return this.text(' | ') }

	_counter = 0
	get counter() { return this.text(String(++this._counter).padStart(4, ' ')) }

	get date() { return this.text(new Date().toISOString().slice(0, 10)) }
	get time() { return this.text(new Date().toISOString().slice(11, 19)) }
	get totalTime() { return new Date().getTime() - this.startTime }
	get totalMillis() { return this.text(this.totalTime + 'ms') }
	get totalSeconds() { return this.text(Math.round(this.totalTime / 1000) + 's') }

	quote(x) {
		let last = this.lastEscape
		return this.gray.text('"').escape(last).text(x).gray.text('"').escape(last)
	}

	move(x) { return this.text(''.padEnd(x - this.lineCounter)) }

	text(...x) {
		let y = x.map(x => typeof x == 'object' ? JSON.stringify(x) : x).join(' ')
		this.lineCounter += y.length
		return this.log(y)
	}
	bool(x) { return (x ? this.green : this.red).text(x) }
	info(...x) { return this.reset.text(...x) }
	warn(...x) { return this.yellow.text(...x) }
	error(...x) { return this.red.text(...x) }

	get timeCounter() { return this.line.reset.gray.time.tib.silver.counter.tib }
}

export const log = new Log()


