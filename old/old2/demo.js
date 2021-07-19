import log from './raw.js'

log.red.text('jo').green.text('dude').log

log.text('jo', [5, 10])
log.text('jo', { pad: [5, 10] })
log.text('jo', { l: 5 }, { r: 10 })
log.pad(10).text('jo').pad(5).log