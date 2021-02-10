// %s → Formats the value as a string
// %i or %d → Formats the value as an integer
// %f → Formats the value as a floating point value
// %o → Formats the value as an expandable DOM element. As seen in the Elements panel
// %O → Formats the value as an expandable JavaScript object
// %c → Applies CSS style rules to the output string as specified by the second parameter

export class Log {
	static ERROR = 1;
	static WARNING = 2;
	static SUCCESS = 3;
	static INFO = 4;
	static DEBUG = 5;
	_counter = {};
	_level = Log.INFO;
	_start = new Date().getTime()

	_autoFlush = true;
	constructor() { this.reset() }


	autoFlush(p = true) { this._autoFlush = p; return this; }
	get line() { return this.autoFlush(false) }
	get end() { return this.autoFlush(true).flush() }


	level(p = Log.INFO) { this._level = p; return this; }

	string(s) { if (this._mode > this._level) return this; this._string.push(s); return this; }
	get tab() { return this.string('\t') }
	get break() { return this.string('\n') }
	get dash() { return this.string('-') }
	get dot() { return this.string('.') }


	format(f) { if (this._mode > this._level) return this; this._format.push(f); return this; }


	// color(c) { this._color = c; return this; }
	color(c) { return this.string('%c').format(`color:${c};`) }
	get lime() { return this.color('lime') }
	get red() { return this.color('red') }
	get orange() { return this.color('orange') }
	get silver() { return this.color('silver') }
	get gray() { return this.color('gray') }


	mode(m) { this._mode = m; return this; }
	get success() { return this.mode(Log.SUCCESS).lime }
	get warning() { return this.mode(Log.WARNING).orange }
	get error() { return this.mode(Log.ERROR).red }


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
		return this.pad(8,3).number((new Date() - this._start)/1000)
	}
	count(counter = '') {
		if (!this._counter[counter])
			this._counter[counter] = 0
		return this.text(++this._counter[counter]);
	}
	reset() {
		this._string = [];
		this._format = [];
		// this._color = 'auto';
		this._mode = Log.INFO;
		return this;
	}

	flush() {
		if (this._string.length)
			console.log(this._string.join(''), ...this._format)
		return this.reset();
	}
}


export default new Log()

