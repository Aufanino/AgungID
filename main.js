const { WAConnection, Browsers } = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const fs = require("fs-extra")
const figlet = require('figlet')
const { uncache, nocache } = require('./lib/loader')
const setting = JSON.parse(fs.readFileSync('./setting.json'))
const welcome = require('./message/group')
baterai = 'unknown'
charging = 'unknown'

//nocache
require('./gng.js')
nocache('../gng.js', module => console.log(color('[WATCH]', 'cyan'), color(`'${module}'`, 'green'), 'File is updated!'))
require('./message/group.js')
nocache('../message/group.js', module => console.log(color('[WATCH]', 'cyan'), color(`'${module}'`, 'green'), 'File is updated!'))

const starts = async (gng = new WAConnection()) => {
	gng.logger.level = 'warn'
	console.log(color(figlet.textSync('GngBot', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'cyan'))
	console.log(color('[gng]', 'cyan'), color('Owner is online now!', 'green'))
	console.log(color('[gng]', 'cyan'), color('Welcome back, Owner! Hope you are doing well~', 'green'))
	gng.browserDescription = ["Gng - BOT", "Firefox", "3.0.0"];

	// Menunggu QR
	gng.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color('Please scan qr code'))
	})

	// Menghubungkan
	fs.existsSync(`./${setting.sessionName}.json`) && gng.loadAuthInfo(`./${setting.sessionName}.json`)
	gng.on('connecting', () => {
		console.log(color('[ SYSTEM ]', 'yellow'), color(' ⏳ Connecting...'));
	})

	//connect
	gng.on('open', () => {
		console.log(color('[ SYSTEM ]', 'yellow'), color('Bot is now online!'));
	})

	// session
	await gng.connect({
		timeoutMs: 30 * 1000
	})
	fs.writeFileSync(`./${setting.sessionName}.json`, JSON.stringify(gng.base64EncodedAuthInfo(), null, '\t'))

	// Baterai
	gng.on('CB:action,,battery', json => {
		global.batteryLevelStr = json[2][0][1].value
		global.batterylevel = parseInt(batteryLevelStr)
		baterai = batterylevel
		if (json[2][0][1].live == 'true') charging = true
		if (json[2][0][1].live == 'false') charging = false
		console.log(json[2][0][1])
		console.log('Baterai : ' + batterylevel + '%')
	})
	global.batrei = global.batrei ? global.batrei : []
	gng.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		global.batrei.push(batterylevel)
	})

	// welcome
	gng.on('group-participants-update', async (anu) => {
		await welcome(gng, anu)
	})

	gng.on('chat-update', async (message) => {
		require('./gng.js')(gng, message)
	})
}

starts()