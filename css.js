// %s → Formats the value as a string
// %i or %d → Formats the value as an integer
// %f → Formats the value as a floating point value
// %o → Formats the value as an expandable DOM element. As seen in the Elements panel
// %O → Formats the value as an expandable JavaScript object
// %c → Applies CSS style rules to the output string as specified by the second parameter

export class Log {
	static default = new Log()

	static ERROR = 1;
	static WARNING = 2;
	static SUCCESS = 3;
	static INFO = 4;
	static DEBUG = 5;

	_counter = {};

	_level = Log.INFO;
	_start = new Date().getTime()

	// _autoFlush = true;
	constructor(name = '') {
		this.name = name
		this.clearAll()
	}


	// autoFlush(p = true) { this._autoFlush = p; return this; }
	// get line() { return this.autoFlush(false) }
	// get end() { return this.autoFlush(true).flush() }


	level(p = Log.INFO) { this._level = p; return this; }

	string(s) { if (this._mode > this._level) return this; this._string.push(s); return this; }
	get tib() { return this.string('  ') }
	get tab() { return this.string('\t') }
	get line() { return this.flush() }
	get colon() { return this.string(': ') }
	get dash() { return this.string(' - ') }
	get dot() { return this.string('.') }
	get bar() { return this.string(' | ') }
	get quote() { return this.string('"') }


	format(f) { if (this._mode > this._level) return this; this._format.push(f); return this; }


	// color(c) { this._color = c; return this; }
	color(c) { return this.string('%c').format(`color:${c};`) }
	get lime() { return this.color('lime') }
	get red() { return this.color('red') }
	get green() { return this.color('green') }
	get blue() { return this.color('blue') }
	get skyBlue() { return this.color('skyblue') }
	get seaGreen() { return this.color('seagreen') }
	get orange() { return this.color('orange') }
	get cyan() { return this.color('cyan') }
	get silver() { return this.color('silver') }
	get gray() { return this.color('gray') }
	get white() { return this.color('white') }
	get reset() { return this.color('default') }


	mode(m) { this._mode = m; return this; }
	get info() { return this.mode(Log.info).reset }
	get success() { return this.mode(Log.SUCCESS).lime }
	get warning() { return this.mode(Log.WARNING).orange }
	get error() { return this.mode(Log.ERROR).red }

	move(x) { return this.text(''.padEnd(x - this._string.join('').length)) }

	done() {
		if (this._autoFlush) this.flush()
		return this;
	}
	pad(left, right) {
		this._pad = { left, right }
		return this;
	}
	text(text, options = {}) {
		text = String(text)
		// if (options.r) text = text.padEnd(options.r, ' ')
		// if (options.l) text = text.padStart(options.l, ' ')
		text = text
			.padEnd(this._pad?.right ?? 0, ' ')
			.padStart(this._pad?.left ?? 0, ' ')
		this._pad = null
		return this.string(text).done()
	}

	number(n, options = {}) {
		n = Number.parseFloat(n)
		n = n.toFixed(this._pad?.right ?? 0)
		n = String(n).padStart(this._pad?.left ?? 0, ' ')
		return this.string(n).done()
		// return this.string('%f').format(n).done()
	}
	bool(b) {
		if (b) return this.green.text(b)
		else return this.red.text(b)
	}
	object(o) {
		return this.color('auto').string('%o').format(o).done()
	}

	get date() {
		return this.text(new Date().toISOString().slice(0, 10))
	}
	get time() {
		return this.text(new Date().toISOString().slice(11, 19))
	}
	get duration() {
		return this.pad(8, 3).number((new Date() - this._start) / 1000)
	}


	count(counter = '') {
		if (!this._counter[counter])
			this._counter[counter] = 0
		return this.text(String(++this._counter[counter]).padStart(4));
	}
	clearAll() {
		this._string = [];
		this._format = [];
		// this._color = 'auto';
		this._mode = Log.INFO;
		return this;
	}

	flush() {
		if (this._string.length) {
			this.onText?.(this._string.join('').replace(/\%c/g, '') + '\n')
			if (this.name) {
				let name = `[${this.name}]`.padEnd(10)
				this._string.unshift(`%c` + name)
				this._format.unshift('color:gray;')
			}
			console.log(this._string.join(''), ...this._format)
		}
		return this.clearAll();
	}

	get timeCounter() { return this.gray.time.tib.silver.count().tib.gray.bar.tib.reset }

}


// export default new Log()
// export function log(name) { return new Log(name) }