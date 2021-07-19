// console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');

// foreground background
// black        30         40
// red          31         41
// green        32         42
// yellow       33         43
// blue         34         44
// magenta      35         45
// cyan         36         46
// white        37         47

// reset             0  (everything back to normal)
// bold/bright       1  (often a brighter shade of the same colour)
// underline         4
// inverse           7  (swap foreground and background colours)
// bold/bright off  21
// underline off    24
// inverse off      27

// 256 = plus
// ESC[ 38:5:⟨n⟩ m Select foreground color
// ESC[ 48:5:⟨n⟩ m Select background color

// rgb
// ESC[ 38;2;⟨r⟩;⟨g⟩;⟨b⟩ m Select RGB foreground color
// ESC[ 48;2;⟨r⟩;⟨g⟩;⟨b⟩ m Select RGB background color



// https://en.wikipedia.org/wiki/ANSI_escape_code