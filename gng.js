/* 
Pesan Dari Agung
Mau recode? ya terserah asal jangan ganti WaterMark
SC nya jangan dijual
*/
const {
    WAConnection,
	MessageType,
	Presence,
	MessageOptions,
	Mimetype,
	WALocationMessage,
	WA_MESSAGE_STUB_TYPES,
	WA_DEFAULT_EPHEMERAL,
	ReconnectMode,
	ProxyAgent,
	ChatModification,
	GroupSettingChange,
	waChatKey,
	mentionedJid,
	processTime,
	Browsers
} = require("@adiwajshing/baileys")
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta").locale("id");
const speed = require('performance-now')
const { spawn, exec, execSync } = require("child_process")
const ffmpeg = require('fluent-ffmpeg')
const twitterGetUrl = require("twitter-url-direct")
const _gis = require('g-i-s')
const fetch = require('node-fetch');
const request = require('request');
const yts = require( 'yt-search')
const ms = require('parse-ms')
const toMs = require('ms')
const axios = require("axios")
const fs = require("fs-extra")
const { promisify, util } = require('util')
const qrcodes = require('qrcode');
const googleIt = require('google-it')
const os = require('os');
const hx = require('hxz-api')

// stickwm
const Exif = require('./lib/exif');
const exif = new Exif();

const { getBuffer, getGroupAdmins, getRandom, runtime, pickRandom, clockString, sleep } = require('./lib/myfunc')
const { fetchJson, getBase64, kyun, createExif } = require('./lib/fetch')
const { color, bgcolor } = require('./lib/color')
const { mess } = require('./message/mess')
const { Toxic } = require('./lib/Toxic.js')
const { cmdadd } = require('./lib/totalcmd.js')
const { uptotele, uploadFile, RESTfulAPI, uploadImages } = require('./lib/uploadimage')
const { mediafireDl } = require('./lib/mediafire.js')
const { webp2gifFile, igDownloader, TiktokDownloader } = require("./lib/gif.js")
const { y2mateA, y2mateV } = require('./lib/y2mate')
const { jadibot, stopjadibot, listjadibot } = require('./lib/jadibot')
const truth = JSON.parse(fs.readFileSync('./database/truth.json'))
const dare = JSON.parse(fs.readFileSync('./database/dare.json'))
const pantekk = '```'
const premium = require("./lib/premium");
hit_today = []
banChats = true

let fakeimage = fs.readFileSync("./media/wpmobile.png")
let setting = JSON.parse(fs.readFileSync('./setting.json'))

prefix = setting.prefix
owner = setting.owner

// Database
let welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))
let _scommand = JSON.parse(fs.readFileSync('./database/scommand.json'))
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
let wame = JSON.parse(fs.readFileSync('./database/wame.json'))
// Sticker Cmd
const addCmd = (id, command) => {
    const obj = { id: id, chats: command }
    _scommand.push(obj)
    fs.writeFileSync('./database/scommand.json', JSON.stringify(_scommand))
}

const getCommandPosition = (id) => {
    let position = null
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

const getCmd = (id) => {
    let position = null
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return _scommand[position].chats
    }
}


const checkSCommand = (id) => {
    let status = false
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            status = true
        }
    })
    return status
}

        
module.exports = gng = async (gng, mek) => {
	try {
        if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		if (mek.key.id.startsWith('3EB0') && mek.key.id.length === 12) return
		global.blocked
		global.prefix
		mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
		const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
		const tanggal = moment.tz('Asia/Jakarta').format('dddd') + ', ' + moment.tz('Asia/Jakarta').format('LL')
		const waktu = moment.tz('Asia/Jakarta').format('a')
		const time = moment.tz('Asia/Jakarta').format('HH:mm:ss z')
		const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const type = Object.keys(mek.message)[0]        
        const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : (type == 'stickerMessage') && (getCmd(mek.message[type].fileSha256.toString('base64')) !== null && getCmd(mek.message[type].fileSha256.toString('base64')) !== undefined) ? getCmd(mek.message[type].fileSha256.toString('base64')) : ""
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
		const args = body.trim().split(/ +/).slice(1)
		hit_today.push(command)
		const arg = body.substring(body.indexOf(' ') + 1)
		const ar = args.map((v) => v.toLowerCase())
		const argz = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix) 
		if (isCmd) cmdadd()
		const totalhit = JSON.parse(fs.readFileSync('./database/totalcmd.json'))[0].totalcmd
        const q = args.join(' ')
       let _premium = JSON.parse(fs.readFileSync('./database/user/premium.json'));
        const botNumber = gng.user.jid
        const ownerNumber = setting.ownerNumber
		const ownerName = setting.ownerName
		const botName = setting.botName
		const isGroup = from.endsWith('@g.us')
		const sender = mek.key.fromMe ? gng.user.jid : mek.key.remoteJid.endsWith('@g.us') ? mek.participant : mek.key.remoteJid
		const totalchat = await gng.chats.all()
		const groupMetadata = isGroup ? await gng.groupMetadata(from) : ''
	   const isPremium = premium.checkPremiumUser(sender, _premium)
       const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
        const conts = mek.key.fromMe ? gng.user.jid : gng.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        const pushname = mek.key.fromMe ? gng.user.name : conts.notify || conts.vname || conts.name || '-'
        const mentionByTag = type == "extendedTextMessage" && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionByreply = type == "extendedTextMessage" && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.participant || "" : ""
        const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
        mention != undefined ? mention.push(mentionByreply) : []
        const mentionUser = mention != undefined ? mention.filter(n => n) : []
		
        const isOwner = ownerNumber.includes(sender)
        const isWelkom = isGroup ? welkom.includes(from) : false
        const isAntiLink = isGroup ? antilink.includes(from) : false
        
        const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        function monospace(string) {
            return '```' + string + '```'
        }   
        function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        const reply = (teks) => {
	      gng.sendMessage(from, teks, text, {quoted:mek, thumbnail: fakeimage})
        }
        const sendMess = (hehe, teks) => {
           gng.sendMessage(hehe, teks, text)
        }
        const mentions = (teks, memberr, id) => {
           (id == null || id == undefined || id == false) ? gng.sendMessage(from, {text: teks.trim(), jpegThumbnail: fs.readFileSync('./media/wpmobile.png')}, extendedText, { sendEphemeral: true, contextInfo: { "mentionedJid": memberr } }) : gng.sendMessage(from, {text: teks.trim(), jpegThumbnail: fs.readFileSync('./media/wpmobile.png')}, extendedText, { sendEphemeral: true, quoted: mek, contextInfo: { "mentionedJid": memberr } })
        }
        const sendText = (from, text) => {
           gng.sendMessage(from, text, MessageType.text)
        }
        const textImg = (teks) => {
           return gng.sendMessage(from, teks, text, {quoted: mek, thumbnail: fs.readFileSync('./media/wpmobile.png')})
        }
        const freply = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { "contactMessage": { "displayName": `${pushname}`, "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, "jpegThumbnail":fs.readFileSync('./media/Nakano.jpg')
        }}}
       const math = (teks) => {
           return Math.floor(teks)
       }
       const kick = function(from, orangnya){
	       for (let i of orangnya){
	       gng.groupRemove(from, [i])
        }
        }
       const kickMember = async(id, target = []) => {
           let group = await gng.groupMetadata(id)
           let owner = group.owner.replace("c.us", "s.whatsapp.net")
           let me = gng.user.jid
           for (i of target) {
           if (!i.includes(me) && !i.includes(owner)) {
           await gng.groupRemove(from, [i])
        } else {
           await gng.sendMessage(id, "Not Premited!", "conversation")
        }
    }
}
   
       const add = function(from, orangnya){
	       gng.groupAdd(from, orangnya)
}
      const sendBug = async(target, teks) => {
           if (!teks) teks = '.'
           await gng.relayWAMessage(gng.
           prepareMessageFromContent(target, gng.
           prepareDisappearingMessageSettingContent(0),
           {}),{waitForAck:true})
           gng.sendMessage(target, teks, 'conversation')
}
       const sendKontak = (from, nomor, nama, org = "") => {
	       const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + nama + '\n' + 'ORG:' + org + '\n' + 'TEL;type=CELL;type=VOICE;waid=' + nomor + ':+' + nomor + '\n' + 'END:VCARD'
	       gng.sendMessage(from, {displayname: nama, vcard: vcard}, MessageType.contact, {quoted: mek})
}
      const hideTag = async function(from, text){
	       let anu = await gng.groupMetadata(from)
	       let members = anu.participants
	       let ane = []
	       for (let i of members){
	       ane.push(i.jid)
}
	       gng.sendMessage(from, {text:text, jpegThumbnail:fs.readFileSync('media/Nakano.jpg')}, 'extendedTextMessage', {contextInfo: {"mentionedJid": ane}})
}  
       const sendMediaURL = async(to, url, text="", mids=[]) =>{
           if(mids.length > 0){
           text = normalizeMention(to, text, mids)
}
           const fn = Date.now() / 10000;
           const filename = fn.toString()
           let mime = ""
           var download = function (uri, filename, callback) {
           request.head(uri, function (err, res, body) {
           mime = res.headers['content-type']
           request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
           download(url, filename, async function () {
           console.log('done');
           let media = fs.readFileSync(filename)
           let type = mime.split("/")[0]+"Message"
           if(mime === "image/gif"){
           type = MessageType.video
           mime = Mimetype.gif
}
           if(mime.split("/")[0] === "audio"){
           mime = Mimetype.mp4Audio
}
           gng.sendMessage(to, media, type, {quoted: mek, mimetype: mime, caption: text, thumbnail: Buffer.alloc(0), contextInfo: {"mentionedJid": mids}})
                     
           fs.unlinkSync(filename)
});
}
      const sendFileFromUrl = async(link, type, options) => {
           hasil = await getBuffer(link)
	       gng.sendMessage(from, hasil, type, options).catch(e => {
	       fetch(link).then((hasil) => {
	       gng.sendMessage(from, hasil, type, options).catch(e => {
	       gng.sendMessage(from, { url : link }, type, options).catch(e => {
	       reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim Media_')
	       console.log(e)
})
})
})
})
}
          let authorname = gng.contacts[from] != undefined ? gng.contacts[from].vname || gng.contacts[from].notify : undefined	
          if (authorname != undefined) { } else { authorname = groupName }	
          function addMetadata(packname, author) {	
          if (!packname) packname = 'WABot'; if (!author) author = 'Bot';author = author.replace(/[^a-zA-Z0-9]/g, '');	
          let name = `${author}_${packname}`
          if (fs.existsSync(`./sticker/${name}.exif`)) return `./sticker/${name}.exif`
          const json = {	
         "sticker-pack-name": packname,
         "sticker-pack-publisher": author,
}
         const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
         const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	
         let len = JSON.stringify(json).length	
         let last	
         if (len > 256) {	
         len = len - 256	
         bytes.unshift(0x01)	
         } else {	
         bytes.unshift(0x00)	
}	
         if (len < 16) {	
         last = len.toString(16)	
         last = "0" + len	
         } else {	
         last = len.toString(16)	
}	
       const buf2 = Buffer.from(last, "hex")	
	   const buf3 = Buffer.from(bytes)	
	   const buf4 = Buffer.from(JSON.stringify(json))	
	   const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	
	   fs.writeFile(`./sticker/${name}.exif`, buffer, (err) => {	
	   return `./sticker/${name}.exif`	
})	
}
       function formatDate(n, locale = 'id') {
       let d = new Date(n)
       return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
    })
    }

        colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
		const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

      // Anti link
        if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (budy.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                gng.groupRemove(from, [sender])
            }
        }
        
              // Anti wame
        if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (budy.match(/(https:\/\/wa.me)/gi)) {
                reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                gng.groupRemove(from, [sender])
            }
        }

      // CMD
        if (isCmd && !isGroup)
            console.log(color('[ CMD ]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        
        if (isCmd && isGroup)
            console.log(color('[ CMD ]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
            
            if (!mek.key.fromMe && banChats === true) return
            switch(command){
           
           case 'owner':
           case 'creator':
               sendKontak(from, `${owner}`, `${ownerName}`, 'Sibukk!!')
               await sleep(1000)
               reply('𝙅𝙖𝙣𝙜𝙖𝙣 𝙇𝙪𝙥𝙖 𝙎𝙖𝙫𝙚 𝘽𝙖𝙘𝙠')
               //txtt =`Hai Kak ${pushname}\nItu Ownerku, Mau tau soal apa ya?`
               //buttons = [{buttonId: `${prefix}Mau Sewa Botz`,buttonText:{displayText: 'SEWA BOT'},type:1},{buttonId:`${prefix}Asu`,buttonText:{displayText:'ASU'},type:1}]
            //   buttonsMessage = { contentText: `${txtt}`, footerText: 'Jangan Sungkan Chat Ya Kak', buttons: buttons, headerType: 1 }
               prep = await gng.prepareMessageFromContent(from,{buttonsMessage},{})
               gng.relayWAMessage(prep)
               break      
           case 'menu':
           case 'help':
           const loli = fs.readFileSync('./media/broken.mp3')
            gng.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
               menu = `Hii Kak @${sender.split('@')[0]} 👋\n
sɪʟᴀʜᴋᴀɴ ᴘɪʟɪʜ ᴛᴀʙᴇʟ ᴅɪ ʙᴀᴡᴀʜ
ᴊɪᴋᴀ ᴛɪᴅᴀᴋ sᴜᴘᴘᴏʀᴛ ᴋᴇᴛɪᴋ ${prefix}ᴀʟʟᴍᴇɴᴜ

*Source Code*
https://github.com/Nino-chan02/SelfBotz`

            buttons = [{buttonId: `${prefix}all`,buttonText:{displayText: 'MENU'},type:1},{buttonId:`${prefix}owner`,buttonText:{displayText:'OWNER'},type:1},{buttonId:`${prefix}sewa`,buttonText:{displayText:'SEWA BOT'},type:1}]
            buttonsMessage = { contentText: `${menu}`, footerText: 'Note: Kalo mau pake wa lama atau mod ga keliatan', buttons: buttons, headerType: 1 }
            prep = await gng.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek, contextInfo: {mentionedJid: [sender] }})
            gng.relayWAMessage(prep)
            break
   case 'allmenu':
           case 'all': 
         const all = ` Hii Kak 
       
 Gagal itu makanan sehari-hari, Itu biasa, yang penting bagaimana kamu menyikapinya. Evaluasi dan terus bangkit. Jika gagal lagi? Bangkit lagi."
         
╔═════◓「 *ʟɪsᴛ ᴍᴇɴᴜ* 」◓═══►       
║▹
║▹${prefix}ᴅᴏᴡɴʟᴏᴀᴅᴍᴇɴᴜ
║▹${prefix}ᴡɪʙᴜᴍᴇɴᴜ
║▹${prefix}ɢʀᴏᴜᴘᴍᴇɴᴜ
║▹${prefix}sᴏᴜɴᴅᴍᴇɴᴜ
║▹${prefix}sᴛᴏʀᴇᴍᴇɴᴜ
║▹${prefix}sᴇsɪᴏɴᴍᴇɴᴜ
║▹${prefix}ᴘᴏʀɴᴏʟɪɴᴋᴍᴇɴᴜ
║▹${prefix}ᴄᴍᴅᴍᴇɴᴜ
║▹${prefix}ᴏᴡɴᴇʀᴍᴇɴᴜ
║▹${prefix}ᴀʙᴏᴜᴛ
║▹${prefix}ᴘʀᴇᴍɪᴜᴍᴍᴇɴᴜ
║▹${prefix}ɢᴀᴍᴇᴍᴇɴᴜ
║▹${prefix}ᴘᴏʀɴᴏᴠɪᴅᴇᴏᴍᴇɴᴜ
╚═════════════════════►`
          gng.sendMessage(from, all, text, {quoted:{key:{fromMe:false,participant:`0@s.whatsapp.net`, ...(from ? {remoteJid :"6289523258649-1604595598@g.us" }: {})},message:{"orderMessage":{"orderId":"174238614569481","thumbnail":fs.readFileSync(`media/Nakano.jpg`),"itemCount":0,"status":"INQUIRY","surface":"CATALOG","message":`Hai Kak `,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}},caption: all ,contextInfo: {"mentionedJid": [sender], "forwardingScore":999,"isForwarded":true}})			
               break
               case 'sewabot':
           case 'sewa': 
         const sewabot = ` Hii Kak
        
╭──「 *ᴏᴘᴇɴ ᴊᴀsᴀ sᴇᴡᴀ ʙᴏᴛ* 」
│
├ • *ᴘᴇʀʙᴜʟᴀɴ+ғɪᴛᴜʀ ᴘʀᴇᴍɪᴜᴍ*
│
│ ⤷ *ʜᴀʀɢᴀ : 15ᴋ*
│ ⤷ *ᴋʜᴜsᴜs ᴠɪᴀ ᴘᴜʟsᴀ : 20k*
│
├ • *ᴘᴇʀʙᴜʟᴀɴ ɴᴏ ᴘʀᴇᴍɪᴜᴍ*
│
│ ⤷ *ʜᴀʀɢᴀ : 10ᴋ*
│ ⤷ *ᴋʜᴜsᴜs ᴠɪᴀ ᴘᴜʟsᴀ : 15ᴋ*
│───────────────
├ • *ᴘᴇʀᴍᴀɴᴇɴ+ғɪᴛᴜʀ ᴘʀᴇᴍɪᴜᴍ*
│
│ ⤷ *ʜᴀʀɢᴀ : 25ᴋ*
│ ⤷ *ᴋʜᴜsᴜs ᴠɪᴀ ᴘᴜʟsᴀ : 30k*
│
├ • *ᴘᴇʀᴍᴀɴᴇɴ ɴᴏ ᴘʀᴇᴍɪᴜᴍ*
│
│ ⤷ *ʜᴀʀɢᴀ : 20ᴋ*
│ ⤷ *ᴋʜᴜsᴜs ᴠɪᴀ ᴘᴜʟsᴀ : 25ᴋ*
│───────────────
├ • *ғɪᴛᴜʀ ғɪᴛᴜʀ ʙᴏᴛ*
│ ⤷ *ᴀɴᴛɪ ʟɪɴᴋ*
│ ⤷ *ʙᴏᴛ ᴏɴ 24 ᴊᴀᴍ*
│ ⤷ *ʙᴜᴋᴀɴ ʙᴏᴛ ᴛᴇʀᴍᴜx*
│ ⤷ *ᴀɴᴛɪ ᴠɪʀᴛᴇx*
│ ⤷ *ᴡᴇʟᴄᴏᴍᴇ*
│ ⤷ *ɢᴀᴍᴇ ᴛɪᴄᴛᴀᴄᴛᴏᴇ*
│ ⤷ *sᴛɪᴄᴋᴇʀ*
│ ⤷ *ᴅᴀɴ 500++ ғɪᴛᴜʀ ʟᴀɪɴɴʏᴀ*
│──────────────
├ • *ᴘᴀʏᴍᴇɴᴛ*
│
│ ⤷ *GoPay ( Diutamakan )*
│ ⤷ *Dana*
│ ⤷ *Qris*
│ ⤷ *Ovo*
│ ⤷ *Pulsa*
│
├ • *ᴍɪɴᴀᴛ sᴇᴡᴀ ? ʜᴜʙᴜɴɢɪ :*
│   wa.me/6285215988509
│
│🅒ɪᴛsᴍᴇɢɴɢ
╰──「 *ᴍᴀᴛᴜʀsᴜᴡᴜɴ* 」`
          gng.sendMessage(from, sewabot, text, {quoted:{key:{fromMe:false,participant:`0@s.whatsapp.net`, ...(from ? {remoteJid :"6289523258649-1604595598@g.us" }: {})},message:{"orderMessage":{"orderId":"174238614569481","thumbnail":fs.readFileSync(`media/Nakano.jpg`),"itemCount":0,"status":"INQUIRY","surface":"CATALOG","message":`Hai Kak `,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}},caption: sewabot ,contextInfo: {"mentionedJid": [sender], "forwardingScore":999,"isForwarded":true}})			
               break
               case 'about':
               const bot =`╔═════◓「 *ᴀʙᴏᴜᴛ* 」◓═══► 
 ║▹${prefix}runtime
 ║▹${prefix}speed
 ╚═════════════════════►`
gng.sendMessage(from, bot, text, {quoted:{key:{fromMe:false,participant:`0@s.whatsapp.net`, ...(from ? {remoteJid :"6289523258649-1604595598@g.us" }: {})},message:{"orderMessage":{"orderId":"174238614569481","thumbnail":fs.readFileSync(`media/Nakano.jpg`),"itemCount":0,"status":"INQUIRY","surface":"CATALOG","message":`Hai Kak `,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}},caption: bot ,contextInfo: {"mentionedJid": [sender], "forwardingScore":999,"isForwarded":true}})			
               break
               case 'premiummenu':
               const mengprem=` ╔═════◓「 *ᴘʀᴇᴍɪᴜᴍ ᴍᴇɴᴜ* 」◓═══► 
 ║▹${prefix}porno1
 ║▹${prefix}porno2
 ║▹${prefix}porno3
 ║▹${prefix}porno4
 ║▹${prefix}porno5
 ║▹${prefix}porno6
 ║▹${prefix}porno7
 ║▹${prefix}porno8
 ║▹${prefix}porno9
 ║▹${prefix}porno10
 ╚═════════════════════►`
gng.sendMessage(from, mengprem, text, {quoted:{key:{fromMe:false,participant:`0@s.whatsapp.net`, ...(from ? {remoteJid :"6289523258649-1604595598@g.us" }: {})},message:{"orderMessage":{"orderId":"174238614569481","thumbnail":fs.readFileSync(`media/Nakano.jpg`),"itemCount":0,"status":"INQUIRY","surface":"CATALOG","message":`Hai Kak `,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}},caption: mengprem,contextInfo: {"mentionedJid": [sender], "forwardingScore":999,"isForwarded":true}})			
               break
//------------------< Sticker Cmd >-------------------
           case 'addcmd': 
           case 'setcmd':
              if (isQuotedSticker) {
              if (!q) return reply(`Penggunaan : ${command} cmdnya dan tag stickernya`)
              var kodenya = mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
              addCmd(kodenya, q)
              textImg("Done!")
              } else {
              reply('tag stickenya')
}
              break
       case 'delcmd':
              if (!isQuotedSticker) return reply(`Penggunaan : ${command} tagsticker`)
              var kodenya = mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
             _scommand.splice(getCommandPosition(kodenya), 1)
              fs.writeFileSync('./database/scommand.json', JSON.stringify(_scommand))
              textImg("Done!")
              break
              case 'cmdmenu':
              const be = ` ╔═════◓「 *ᴄᴍᴅ ᴍᴇɴᴜ* 」◓═══► 
 ║▹${prefix}setcmd
 ║▹${prefix}delcmd
 ║▹${prefix}listcmd
 ╚═════════════════════►`
          gng.sendMessage(from, be, text, {quoted:{key:{fromMe:false,participant:`0@s.whatsapp.net`, ...(from ? {remoteJid :"6289523258649-1604595598@g.us" }: {})},message:{"orderMessage":{"orderId":"174238614569481","thumbnail":fs.readFileSync(`media/Nakano.jpg`),"itemCount":0,"status":"INQUIRY","surface":"CATALOG","message":`Hai Kak `,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}},caption: be ,contextInfo: {"mentionedJid": [sender], "forwardingScore":999,"isForwarded":true}})			
               break
                case 'groupmenu':
           case 'grup': `╔═════◓「 *ɢʀᴏᴜᴘ ᴍᴇɴᴜ 」◓═══► 
║▹  ${prefix}kick
║▹  ${prefix}add
║▹  ${prefix}culik
║▹  ${prefix}kickall
║▹  ${prefix}leaveall
║▹  ${prefix}hidetag
║▹  ${prefix}welcome
╚═════════════════════►`
        gng.sendMessage(from, grup, text, {quoted:{key:{fromMe:false,participant:`0@s.whatsapp.net`, ...(from ? {remoteJid :"6289523258649-1604595598@g.us" }: {})},message:{"orderMessage":{"orderId":"174238614569481","thumbnail":fs.readFileSync(`media/Nakano.jpg`),"itemCount":0,"status":"INQUIRY","surface":"CATALOG","message":`Hai Kak `,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}},caption: grup ,contextInfo: {"mentionedJid": [sender], "forwardingScore":999,"isForwarded":true}})			
               break
       case 'listcmd':
              let teksnyee = `\`\`\`「 LIST STICKER CMD 」\`\`\``
              let cemde = [];
              for (let i of _scommand) {
              cemde.push(i.id)
              teksnyee += `\n\n➸ *ID :* ${i.id}\n➸ *Cmd* : ${i.chats}`
}
              mentions(teksnyee, cemde, true)
              break
//------------------< Public/Self >-------------------
        case 'public':
        	  if (!mek.key.fromMe) return 
              if (banChats === false) return 
              banChats = false
              textImg(`Success Activated Mode Public`)
              break
	      case 'self':
              if (!mek.key.fromMe) return 
              if (banChats === true) return
        	  uptime = process.uptime()
        	  banChats = true
              textImg(`Success Activated Mode Self`)
              break
//------------------< Downloader/Search/Anime >-------------------
case 'downloadmenu':
           case 'downloadmenu': 
         const down= ` ╔═════◓「 *ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ* 」◓═══► 
 ║▹${prefix}nhdl
 ║▹${prefix}play
 ║▹${prefix}igdl
 ║▹${prefix}igstory
 ║▹ ${prefix}tiktokdl
 ║▹${prefix}mediafire
 ╚═════════════════════►`
          gng.sendMessage(from, down, text, {quoted:{key:{fromMe:false,participant:`0@s.whatsapp.net`, ...(from ? {remoteJid :"6289523258649-1604595598@g.us" }: {})},message:{"orderMessage":{"orderId":"174238614569481","thumbnail":fs.readFileSync(`media/Nakano.jpg`),"itemCount":0,"status":"INQUIRY","surface":"CATALOG","message":`Hai Kak `,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}},caption: down ,contextInfo: {"mentionedJid": [sender], "forwardingScore":999,"isForwarded":true}})			
               break
               case 'pornovideomenu'
               const bokep= ` ╔═════◓「 *ᴘᴏʀɴᴏ ᴠɪᴅᴇᴏ* 」◓═══► 
 ║▹${prefix}bokep1
 ║▹${prefix}bokep2
 ║▹${prefix}bokep3
 ║▹${prefix}bokep4
 ║▹ ${prefix}bokep5
 ║▹${prefix}bokep6
 ╚═════════════════════►`
 gng.sendMessage(from, bokep, text, {quoted:{key:{fromMe:false,participant:`0@s.whatsapp.net`, ...(from ? {remoteJid :"6289523258649-1604595598@g.us" }: {})},message:{"orderMessage":{"orderId":"174238614569481","thumbnail":fs.readFileSync(`media/Nakano.jpg`),"itemCount":0,"status":"INQUIRY","surface":"CATALOG","message":`Hai Kak `,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}},caption: bokep ,contextInfo: {"mentionedJid": [sender], "forwardingScore":999,"isForwarded":true}})			
               break
               case 'bokep1':
               if (!isPremium) return reply('Fitur ini khusus premium')		
               getvi = body.slice(10)
               buffer = fs.readFileSync(`./media/${getvi}bokep1.mp4`)
			gng.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })
          break
          case 'bokep2':
               if (!isPremium) return reply('Fitur ini khusus premium')		
               getvi = body.slice(10)
               buffer = fs.readFileSync(`./media/${getvi}bokep2.mp4`)
			gng.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })
          break
          case 'bokep3':
               if (!isPremium) return reply('Fitur ini khusus premium')		
               getvi = body.slice(10)
               buffer = fs.readFileSync(`./media/${getvi}bokep3.mp4`)
			gng.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })
          break
          case 'bokep4':
               if (!isPremium) return reply('Fitur ini khusus premium')		
               getvi = body.slice(10)
               buffer = fs.readFileSync(`./media/${getvi}bokep4.mp4`)
			gng.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })
          break
          case 'bokep5':
               if (!isPremium) return reply('Fitur ini khusus premium')		
               getvi = body.slice(10)
               buffer = fs.readFileSync(`./media/${getvi}bokep5.mp4`)
			gng.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })
          break
          case 'bokep6':
               if (!isPremium) return reply('Fitur ini khusus premium')		
               getvi = body.slice(10)
               buffer = fs.readFileSync(`./media/${getvi}bokep6.mp4`)
			gng.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })
          break
          case 'igdl':
          case 'instagram':
              try {
              if (!isUrl(q)) return reply('Linknya?')
              res = await axios.get(`https://api.lolhuman.xyz/api/instagram2?apikey=${setting.lolkey}&url=${args[0]}`)
              data = res.data.result
              for (let i = 0; i < data.media.length; i++) {
              sendMediaURL(from, data.media[i], data.caption, {thumbnail: Buffer.alloc(0)})
}
              } catch (e) {
              console.log(e)
              reply(String(e))
}
              break
case 'premium': 
              if (!isOwner) return reply('Khusus Owner')
              if (args[0] === 'add') {
              if (mek.message.extendedTextMessage != undefined) {
              mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid

              premium.addPremiumUser(mentioned[0], args[2], _premium)
              reply(`*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${mentioned[0]}\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`)
                        
              } else {
                            
              premium.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], _premium)
              reply(`*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${args[1]}@s.whatsapp.net\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`)
}
              } else if (args[0] === 'del') {
              if (mek.message.extendedTextMessage != undefined) {
              mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
            _premium.splice(premium.getPremiumPosition(mentioned[0], _premium), 1)
              fs.writeFileSync('./database/user/premium.json', JSON.stringify(_premium))
              reply(mess.success)
              } else {
            _premium.splice(premium.getPremiumPosition(args[1] + '@s.whatsapp.net', _premium), 1)
              fs.writeFileSync('./database/user/premium.json', JSON.stringify(_premium))
              reply(mess.success)
}
              } else {
              reply('format salah')
}
              break
       case 'premiumcheck':
       case 'cekpremium': 
              if (!isPremium) return reply('Anda Bukan User Premium')
              const cekExp = ms(await premium.getPremiumExpired(sender, _premium) - Date.now())
              reply(`*「 PREMIUM EXPIRE 」*\n\n➸ *ID*: ${sender}\n➸ *Premium left*: ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)`)
              break
       case 'listprem':
       case 'listpremium':          
              let txt = `「 *PREMIUM USER LIST* 」\n\n`
              let men = [];
              for (let i of _premium){
              men.push(i.id)
              const checkExp = ms(i.expired - Date.now())
              txt += `➸ *ID :* @${i.id.split("@")[0]}\n➸ *Expired*: ${checkExp.days} day(s) ${checkExp.hours} hour(s) ${checkExp.minutes} minute(s)\n\n`
}
              mentions(txt, men, true)
              break
          case 'igstory': 
              if(!q) return reply('Usernamenya?')
              hx.igstory(q)
             .then(async result => {
              for(let i of result.medias){
              if(i.url.includes('mp4')){
              let link = await getBuffer(i.url)
              gng.sendMessage(from,link,video,{quoted: mek,caption: `Type : ${i.type}`})
              } else {
              let link = await getBuffer(i.url)
              gng.sendMessage(from,link,image,{quoted: mek,caption: `Type : ${i.type}`})                  
}
}
});
              break
          case 'ghsearch': 
          case 'githubsearch': 
          case 'searchgithub':
              if (!q) return reply('Cari apa?')
              res = await fetch('https://api.github.com/search/repositories?q='+q)
              json = await res.json()
              if (res.status !== 200) throw json
              str = json.items.map((repo, index) => {
              return `
${1 + index}. *${repo.full_name}*${repo.fork ? ' (fork)' : ''}
_${repo.html_url}_
_Dibuat pada *${formatDate(repo.created_at)}*_
_Terakhir update pada *${formatDate(repo.updated_at)}*_
👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count}
${repo.open_issues} Issue${repo.description ? `
*Deskripsi:*\n${repo.description}` : ''}
*Clone:* \`\`\`$ git clone ${repo.clone_url}\`\`\`
`.trim()
}).join('\n\n')
              reply(str)
              break
          case 'image':
          case 'gimage':
          case 'googleimage':
              if (args.length < 1) return reply('Apa Yang Mau Dicari?')
              reply(mess.wait)
              teks = args.join(' ')
              res = await _gis(teks, google)
              function google(error, result){
              if (error){ return reply('_[ ! ] Error Terjari Kesalahan Atau Hasil Tidak Ditemukan_')}
              else {
              gugIm = result
              random =  gugIm[Math.floor(Math.random() * gugIm.length)].url
              sendFileFromUrl(random, image, {quoted: mek, caption: `*Hasil Pencarian Dari :* ${teks}`})
}
}
              break
          case 'youtubedl':
          case 'ytdl':
              if (args.length < 1) return reply('Link Nya Mana?')
              if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
              teks = args.join(' ')
              res = await y2mateA(teks).catch(e => {
              reply('_[ ! ] Error Gagal Dalam Memasuki Web Y2mate_')
})
              result = `*Youtube Downloader*
             
📜 Title : ${res[0].judul}
🎁 Type : mp3/mp4
🚀 Durasi : ${res[0].size}`
              buttons = [{buttonId: `${prefix}buttons2 ${q}`,buttonText:{displayText: `▶️ Video`},type:1},{buttonId:`${prefix}buttons1 ${q}`,buttonText:{displayText:'🎵 Audio'},type:1}]
              fs.writeFileSync(`./ytmp.jpeg`, await getBuffer(res[0].thumb))
              imageMsg = ( await gng.prepareMessage(from, fs.readFileSync(`./ytmp.jpeg`), 'imageMessage', {thumbnail: Buffer.alloc(0)})).message.imageMessage
              buttonsMessage = {footerText:'Pilih satu format di bawah ini', imageMessage: imageMsg,
              contentText:`${result}`,buttons,headerType:4}
              prep = await gng.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
              gng.relayWAMessage(prep)
              fs.unlinkSync(`./ytmp.jpeg`)
              break
           case 'gamemenu':
           const game=`╔═════◓「 *ɢᴀᴍᴇ ᴍᴇɴᴜ* 」◓═══► 
 ║▹${prefix}suit
 ║▹${prefix}family100
 ╚═════════════════════►`
gng.sendMessage(from, game, text, {quoted:{key:{fromMe:false,participant:`0@s.whatsapp.net`, ...(from ? {remoteJid :"6289523258649-1604595598@g.us" }: {})},message:{"orderMessage":{"orderId":"174238614569481","thumbnail":fs.readFileSync(`media/Nakano.jpg`),"itemCount":0,"status":"INQUIRY","surface":"CATALOG","message":`Hai Kak `,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}},caption: game ,contextInfo: {"mentionedJid": [sender], "forwardingScore":999,"isForwarded":true}})			
               break
          case 'tiktokdl':
          case 'tiktok':
              if (!q) return reply('Linknya?')
              if (!q.includes('tiktok')) return reply(mess.error.Iv)
              data = await fetchJson(`https://api.lolhuman.xyz/api/tiktok?apikey=${setting.lolkey}&url=${q}`)
              result = `⚜️ *Nickname*: ${data.result.author.nickname}\n❤️ *Like*: ${data.result.statistic.diggCount}\n💬 *Komentar*: ${data.result.statistic.commentCount}\n🔁 *Share*: ${data.result.statistic.shareCount}\n🎞️ *Views*: ${data.result.statistic.playCount}\n📑 *Desc*: ${data.result.title}`
              buttons = [{buttonId: `${prefix}buttons3 ${q}`,buttonText:{displayText: `▶️ Video`},type:1},{buttonId:`${prefix}buttons4 ${q}`,buttonText:{displayText:'🎵 Audio'},type:1}]
              fs.writeFileSync(`./${sender}.jpeg`, await getBuffer(data.result.thumbnail))
              imageMsg = ( await gng.prepareMessage(from, fs.readFileSync(`./${sender}.jpeg`), 'imageMessage', {thumbnail: Buffer.alloc(0)})).message.imageMessage
              buttonsMessage = {footerText:'Pilih satu format di bawah ini', imageMessage: imageMsg,
              contentText:`${result}`,buttons,headerType:4}
              prep = await gng.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
              gng.relayWAMessage(prep)
              fs.unlinkSync(`./${sender}.jpeg`)
              break
                    
          case 'nhentaipdf':
          case 'nhdl':
              if (!q) return reply('kodenya?')
              reply('Please wait, data is being processed')
              get_result = await fetchJson(`https://api.lolhuman.xyz/api/nhentai/${q}?apikey=${setting.lolkey}`)
              ini_image = await getBuffer(get_result.result.image[0])
              data = await fetchJson(`https://api.lolhuman.xyz/api/nhentaipdf/${q}?apikey=${setting.lolkey}`)
              pdf = await getBuffer(data.result)
              gng.sendMessage(from, pdf, document, { quoted: mek, mimetype: Mimetype.pdf, filename: `${get_result.result.title_romaji}.pdf`, thumbnail: ini_image })
              break
          case 'buttons1':
              await axios.get(`https://api.zeks.xyz/api/ytplaymp3/2?apikey=Nyarlathotep&q=${q}`)
		     .then(res => {
			  gng.sendMessage(from, { url: res.data.result.link }, 'audioMessage', { mimetype: 'audio/mp4', quoted: mek, contextInfo: { externalAdReply: { title: res.data.result.title, mediaType: 2, thumbnailUrl: res.data.result.thumb, mediaUrl: res.data.result.source }}})
})
              break
          case 'buttons2':
              if (args.length < 1) return reply('Link Nya Mana?')
              if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
              teks = args.join(' ')
              res = await y2mateV(teks)
              sendFileFromUrl(res[0].link, video, {quoted: mek, mimetype: 'video/mp4', filename: res[0].output})
              break
              case 'wibumenu':
              const wibu= ` ╔═════◓「 *ᴡɪʙᴜ ᴍᴇɴᴜ* 」◓═══► 
 ║▹${prefix}waifu
 ║▹${prefix}loli
 ║▹${prefix}husbu
 ║▹${prefix}milf
 ║▹${prefix}cosplay
 ║▹${prefix}wallml
 ║▹${prefix}hentai
 ╚═════════════════════►`
          gng.sendMessage(from, wibu, text, {quoted:{key:{fromMe:false,participant:`0@s.whatsapp.net`, ...(from ? {remoteJid :"6289523258649-1604595598@g.us" }: {})},message:{"orderMessage":{"orderId":"174238614569481","thumbnail":fs.readFileSync(`media/Nakano.jpg`),"itemCount":0,"status":"INQUIRY","surface":"CATALOG","message":`Hai Kak `,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}},caption: wibu ,contextInfo: {"mentionedJid": [sender], "forwardingScore":999,"isForwarded":true}})			
               break
               
          case 'buttons3': 
              if (!q) return reply('Linknya?')
              if (!q.includes('tiktok')) return reply(mess.error.Iv)
              data = await fetchJson(`https://api.lolhuman.xyz/api/tiktok?apikey=${setting.lolkey}&url=${q}`)
              ini_video = await getBuffer(data.result.link)
              gng.sendMessage(from, ini_video, video, { quoted: mek })
              break
              case 'soundmenu': 
         const soundmenu= ` ╔═════◓「 *sᴏᴜɴᴅ ᴍᴇɴᴜ* 」◓═══► 
 ║▹${prefix}sound1
 ║▹${prefix}sound2
 ║▹${prefix}sound3
 ║▹${prefix}sound4
 ║▹${prefix}sound5
 ║▹${prefix}sound6
 ║▹${prefix}sound7
 ║▹${prefix}sound8
 ║▹${prefix}sound9
 ║▹${prefix}sound10
 ╚═════════════════════►`
 gng.sendMessage(from, soundmenu, text, {quoted: mek, contextInfo: {mentionedJid: [sender], externalAdReply: { title: 'Nino Bot', thumbnailUrl: 'https://telegra.ph/file/ad408bff29a90b6627e6f.jpg', sourceUrl: 'https://github.com/itsmegng/AgungID' }}})
               break
          case 'buttons4': 
              if (!q) return reply('Linknya?')
              if (!q.includes('tiktok')) return reply(mess.error.Iv)
              data = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=${setting.lolkey}&url=${args[0]}`)
              gng.sendMessage(from, data, audio, { quoted: mek })
              break
          case 'buttons5':
              const mathdare = dare[Math.floor(Math.random() * (dare.length))]
              result = `${mathdare}`
              buttons = [{buttonId: `${prefix}buttons6`,buttonText:{displayText: 'Truth'},type:1},{buttonId:`${prefix}buttons5`,buttonText:{displayText:'Dare'},type:1},{buttonId:`${prefix}tod`,buttonText:{displayText:'Tod'},type:1}]
              buttonsMessage = { contentText: `${result}`, footerText: 'Kebenaran atau tantangan?', buttons: buttons, headerType: 1 }
              prep = await gng.prepareMessageFromContent(from,{buttonsMessage},{})
              gng.relayWAMessage(prep)
              break
             
          gng.sendMessage(from, soundmenu, text, {quoted: mek, contextInfo: {mentionedJid: [sender], externalAdReply: { title: 'Nino Bot', thumbnailUrl: 'https://telegra.ph/file/ad408bff29a90b6627e6f.jpg', sourceUrl: 'https://github.com/itsmegng/AgungID' }}})
               break
                case 'sound2':
					dua = fs.readFileSync('./media/music/sound2.mp3');
					gng.sendMessage(from, dua, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound3':
					tiga = fs.readFileSync('./media/music/sound3.mp3');
					gng.sendMessage(from, tiga, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound4':
					
					empat = fs.readFileSync('./media/music/sound4.mp3');
					gng.sendMessage(from, empat, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound5':
					
					lima = fs.readFileSync('./media/music/sound5.mp3');
					gng.sendMessage(from, lima, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound6':
					
					enam = fs.readFileSync('./media/music/sound6.mp3');
					gng.sendMessage(from, menu,enam, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound7':
					
					tujuh = fs.readFileSync('./media/music/sound7.mp3');
					gng.sendMessage(from, tujuh, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
					break
				case 'sound8':
					
					lapan = fs.readFileSync('./media/music/sound8.mp3');
					gng.sendMessage(from, lapan, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
					break
				case 'sound9':
					
					tujuh = fs.readFileSync('./media/music/sound9.mp3');
					gng.sendMessage(from, tujuh, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
					break
				case 'sound10':
					
					tujuh = fs.readFileSync('./media/music/sound10.mp3');
					gng.sendMessage(from, tujuh, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
					break
				case 'sound11':
					
					tujuh = fs.readFileSync('./media/music/sound11.mp3');
					gng.sendMessage(from, tujuh, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
					break
				case 'sound12':
					
					tujuh = fs.readFileSync('./media/music/sound12.mp3');
					gng.sendMessage(from, tujuh, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
					break
				case 'sound13':
					
					tujuh = fs.readFileSync('./media/music/sound13.mp3');
					gng.sendMessage(from, tujuh, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
					break
			 case 'sound14':
					
					tujuh = fs.readFileSync('./media/music/sound14.mp3');
					gng.sendMessage(from, tujuh, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
					break
					case 'ownermenu':
					const ow = `╔═════◓「 *ᴏᴡɴᴇʀ ᴍᴇɴᴜ* 」◓═══► 
 ║▹${prefix}bc
 ║▹${prefix}join
 ║▹${prefix}setexif
 ║▹${prefix}term
 ║▹${prefix}shutdown
 ║▹${prefix}culik
 ║▹${prefix}leave
 ║▹${prefix}setprefix
 ║▹${prefix}premium add @⁨tag waktu
 ║▹${prefix}Sendbug
 ╚═════════════════════►`
 gng.sendMessage(from, ow, text, {quoted: mek, contextInfo: {mentionedJid: [sender], externalAdReply: { title: 'Nino Bot', thumbnailUrl: 'https://telegra.ph/file/ad408bff29a90b6627e6f.jpg', sourceUrl: 'https://github.com/itsmegng/AgungID' }}})
               break
          case 'buttons6':
              const randomtruth = truth[Math.floor(Math.random() * truth.length)]
              result = `${randomtruth}`
              buttons = [{buttonId: `${prefix}buttons6`,buttonText:{displayText: 'Truth'},type:1},{buttonId:`${prefix}buttons5`,buttonText:{displayText:'Dare'},type:1},{buttonId:`${prefix}tod`,buttonText:{displayText:'Tod'},type:1}]
              buttonsMessage = { contentText: `${result}`, footerText: 'Kebenaran atau tantangan?', buttons: buttons, headerType: 1 }
              prep = await gng.prepareMessageFromContent(from,{buttonsMessage},{})
              gng.relayWAMessage(prep)
              break
              case 'pornolinkmenu': 
         const sange = ` ╔═════◓「 * ᴘᴏʀɴᴏ ᴍᴇɴᴜ* 」◓═══► 
 ║▹${prefix}porno1
 ║▹${prefix}porno2
 ║▹${prefix}porno3
 ║▹${prefix}porno4
 ║▹${prefix}porno5
 ║▹${prefix}porno6
 ║▹${prefix}porno7
 ║▹${prefix}porno8
 ║▹${prefix}porno9
 ║▹${prefix}porno10
 ╚═════════════════════►`
 gng.sendMessage(from, sange, text, {quoted: mek, contextInfo: {mentionedJid: [sender], externalAdReply: { title: 'Nino Bot', thumbnailUrl: 'https://telegra.ph/file/ad408bff29a90b6627e6f.jpg', sourceUrl: 'https://github.com/itsmegng/AgungID' }}})
               break
              
                            case 'suit': //nyolong dari zenz
              if (!q) return reply(`Kirim perintah ${prefix}suit gunting / batu / kertas`)
              const userspilih = q
              if (!userspilih.match(/batu|gunting|kertas/)) return reply(`Pilih batu, kertas, gunting`)
              var computer = Math.random();
              if (computer < 0.34 ) {
              computer = 'batu';
              } else if( computer >= 0.34 && computer < 0.67) {
              computer = 'gunting';
              } else {
              computer = 'kertas';
}
              if ( userspilih == computer ) {
              reply(`Pertandingan Seri!`)
              } else if ( userspilih == 'batu' ) {
              if( computer == 'gunting' ) {
              reply(`Kamu memilih Batu dan bot Gunting\nKamu menang!`)
              } else {
              reply(`Kamu memilih Batu dan bot memilih Kertas\nKamu kalah!`)
}
              } else if ( userspilih == 'gunting' ) {
              if( computer == 'batu' ) {
              reply(`Kamu memilih Gunting dan bot memilih Batu\nKamu kalah!`)
              } else {
              reply(`Kamu memilih Gunting dan bot Kertas\nKamu menang!`)
}
              } else if ( userspilih == 'kertas' ) {
              if( computer == 'batu' ) {
              reply(`Kamu memilih Kertas dan bot Batu\nKamu menang!`)
              } else {
              reply(`Kamu memilih Kertas dan bot memilih Gunting\nKamu kalah`)
}
}
              break
              case 'family100':
              if (game.isfam(from, family100)) return reply(`Masih ada soal yang belum di selesaikan`)
              anu = await axios.get(`http://api.lolhuman.xyz/api/tebak/family100?apikey=${setting.lolkey}`)
              reply(`*JAWABLAH SOAL BERIKUT*\n\n*Soal :* ${anu.data.result.question}\n*Total Jawaban :* ${anu.data.result.aswer.length}\n\nWaktu : ${gamewaktu}s`)
              let anoh = anu.data.result.aswer
              let rgfds = []
              for (let i of anoh){
              let fefs = i.split('/') ? i.split('/')[0] : i
              let iuhbb = fefs.startsWith(' ') ? fefs.replace(' ','') : fefs
              let axsf = iuhbb.endsWith(' ') ? iuhbb.replace(iuhbb.slice(-1), '') : iuhbb
              rgfds.push(axsf.toLowerCase())
}
              game.addfam(from, rgfds, gamewaktu, family100)
              gameAdd(sender, glimit)
              break
              
          
          case 'tod':
              result =`*Truth Or Dare*\nPemain diberi pilihan antara menjawab pertanyaan dengan jujur, atau melakukan tantangan yang diberikan`
              buttons = [{buttonId: `${prefix}buttons6`,buttonText:{displayText: 'Truth'},type:1},{buttonId:`${prefix}buttons5`,buttonText:{displayText:'Dare'},type:1},{buttonId:`${prefix}tod`,buttonText:{displayText:'Tod'},type:1}]
              buttonsMessage = { contentText: `${result}`, footerText: 'Kebenaran atau tantangan?', buttons: buttons, headerType: 1 }
              prep = await gng.prepareMessageFromContent(from,{buttonsMessage},{})
              gng.relayWAMessage(prep)
              break
              
              case 'storemenu':
           case 'tokomenu': 
         const storemenu= ` ╔═════◓「 *sᴛᴏʀᴇ ᴍᴇɴᴜ* 」◓═══► 
 ║▹${prefix}dm1
 ║▹${prefix}dm2
 ║▹${prefix}dm3
 ║▹${prefix}dm4
 ║▹${prefix}dm4
 ║▹${prefix}closestore
 ║▹${prefix}openstore
 ╚═════════════════════►`
          gng.sendMessage(from, storemenu, text, {quoted: mek, contextInfo: {mentionedJid: [sender], externalAdReply: { title: 'Nino Bot', thumbnailUrl: 'https://telegra.ph/file/ad408bff29a90b6627e6f.jpg', sourceUrl: 'https://github.com/itsmegng/AgungID' }}})
               break
                   case 'dm1':
           case 'gng1': 
         const gng1= ` ╔═════◓「 *ᴘʀɪᴄᴇ ʟɪsᴛ ᴅᴍ* 」◓═══► 
 ║▹
 ║▹
 ║▹
 ║▹
 ╚═════════════════════►`
          gng.sendMessage(from, gng1, text, {quoted: mek, contextInfo: {mentionedJid: [sender], externalAdReply: { title: 'Nino Bot', thumbnailUrl: 'https://telegra.ph/file/ad408bff29a90b6627e6f.jpg', sourceUrl: 'https://github.com/itsmegng/AgungID/' }}})
               break
                   case 'dm2':
           case 'gng2': 
         const gng2 = ` ╔═════◓「 *ᴘʀɪᴄᴇ ʟɪsᴛ ᴅᴍ* 」◓═══► 
 ║▹
 ║▹
 ║▹
 ║▹
 ╚═════════════════════►`
          gng.sendMessage(from, gng2, text, {quoted: mek, contextInfo: {mentionedJid: [sender], externalAdReply: { title: 'Nino Bot', thumbnailUrl: 'https://telegra.ph/file/ad408bff29a90b6627e6f.jpg', sourceUrl: 'https://github.com/itsmegng/AgungID/' }}})
               break
                   case 'dm3':
           case 'gng3': 
         const gng3 = ` ╔═════◓「 *ᴘʀɪᴄᴇ ʟɪsᴛ ᴅᴍ* 」◓═══► 
 ║▹
 ║▹
 ║▹
 ║▹
 ╚═════════════════════►`
          gng.sendMessage(from, gng3, text, {quoted: mek, contextInfo: {mentionedJid: [sender], externalAdReply: { title: 'Nino Bot', thumbnailUrl: 'https://telegra.ph/file/ad408bff29a90b6627e6f.jpg', sourceUrl: 'https://github.com/itsmegng/AgungID/' }}})
               break    
            case 'dm4':
           case 'gng4': 
         const gng4 = ` ╔═════◓「 *ᴘʀɪᴄᴇ ʟɪsᴛ ᴅᴍ* 」◓═══► 
 ║▹
 ║▹
 ║▹
 ║▹
 ╚═════════════════════►`
          gng.sendMessage(from, gng4, text, {quoted: mek, contextInfo: {mentionedJid: [sender], externalAdReply: { title: 'Nino Bot', thumbnailUrl: 'https://telegra.ph/file/ad408bff29a90b6627e6f.jpg', sourceUrl: 'https://github.com/itsmegng/AgungID' }}})
               break    
           case 'dm5':
           case 'gng5': 
         const gng5 = ` ╔═════◓「 *ᴘʀɪᴄᴇ ʟɪsᴛ ᴅᴍ* 」◓═══► 
 ║▹
 ║▹
 ║▹
 ║▹
 ╚═════════════════════►`
          gng.sendMessage(from, gng5, text, {quoted: mek, contextInfo: {mentionedJid: [sender], externalAdReply: { title: 'Nino Bot', thumbnailUrl: 'https://telegra.ph/file/ad408bff29a90b6627e6f.jpg', sourceUrl: 'https://github.com/itsmegng/AgungID' }}})
               break
               case 'openstore':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                gng.groupSettingChange(from, "announcement", false)
                reply('OPEN ALL TRX SLURR MAU POST AKUN,GOBER,DLL\nPM ADMIN SLURR')
                //.then((res) => reply(jsonformat(res)))
                //.catch((err) => reply(jsonformat(err)))
                break
            case 'closestore':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                gng.groupSettingChange(from, "announcement", true)
                reply('STORE DI TUTUP DULU YAK KAK LANJUT BESOK PAGI\nJANGAN SPAM ADMIN YAK DI SAAT SEDANG TIDUR')
                //.then((res) => reply(jsonformat(res)))
              //.catch((err) => reply(jsonformat(err)))
                break
               case 'sesionmenu':
               const sesi = ` ╔═════◓「 *sᴇsɪᴏɴ ᴍᴇɴᴜ* 」◓═══► 
 ║▹${prefix}jadibot
 ║▹${prefix}stopjadibot
 ║▹${prefix}listjadibot
 ╚════════════════════►`
          gng.sendMessage(from, sesi, text, {quoted: mek, contextInfo: {mentionedJid: [sender], externalAdReply: { title: 'Nino Bot', thumbnailUrl: 'https://telegra.ph/file/ad408bff29a90b6627e6f.jpg', sourceUrl: 'https://github.com/itsmegng/AgungID' }}})
               break
      case 'google':
              if (!q) return reply(mess.wrongFormat)
              ss = await getBuffer(`https://api.apiflash.com/v1/urltoimage?access_key=f307ca1dc9824ae89caa976435c03178&url=http://www.google.com/search?q=${q}&oq={q}&aqs=chrome..69i57j0i433i512l2j0i512l2.858j0j4&client=ms-android-oppo&sourceid=chrome-mobile&ie=UTF-8`)
              if(q == undefined || q == ' ') return reply(`*Hasil Pencarian : ${q}* tidak ditemukan`)
              googleIt({ 'query': q }).then(results => {
              vars = `_*Hasil Pencarian : ${q}*_\n`
              for (let i = 0; i < results.length; i++) {
              vars +=  `\n═════════════════\n\n*Judul:* ${results[i].title}\n\n*Deskripsi:* ${results[i].snippet}\n\n*Link:* ${results[i].link}\n\n`
}
              gng.sendMessage(from, ss, image, {caption: vars, quoted : mek, thumbnail: Buffer.alloc(0) })
              }).catch(e => {
              console.log(e)
              reply(`${e}`)
})
              break
          case 'mediafire':
              if (args.length < 1) return reply('Link Nya Mana? ')
              if(!isUrl(args[0]) && !args[0].includes('mediafire')) return reply(mess.error.Iv)
              teks = args.join(' ')
              res = await mediafireDl(teks)
              result = `*MediaFire Downloader*
               
📜 Nama : ${res[0].nama}
🚀 Ukuran : ${res[0].size}
🖇️ Link : ${res[0].link}

_*Tunggu Proses Upload Media......*_`
              reply(result)
              sendFileFromUrl(res[0].link, document, {mimetype: res[0].mime, filename: res[0].nama, quoted: mek})
              break
          case 'fb':
          case 'facebook':
              if (!q) return reply('Link Nya?')
              reply(mess.wait)
              data = await fetchJson(`https://api.lolhuman.xyz/api/facebook?apikey=${setting.lolkey}&url=${args[0]}`)
              ini_video = await getBuffer(data.result)
              gng.sendMessage(from, ini_video, video, { quoted: mek })
              break
          case 'twitter':
              if (!isUrl(args[0]) && !args[0].includes('twitter.com')) return reply(mess.Iv)
              if (!q) return reply('Linknya?')
              ten = args[0]
              var res = await twitterGetUrl(`${ten}`)
             .then(g => {
              ren = `${g.download[2].url}`
              sendMediaURL(from,ren,'Done')
})
              break
          case 'waifu':
          case 'loli':
          case 'husbu':
          case 'milf':
          case 'cosplay':
          case 'wallml':
              let wipu = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/${command}.json`)).data
              let wipi = wipu[Math.floor(Math.random() * (wipu.length))]
              fs.writeFileSync(`./${sender}.jpeg`, await getBuffer(wipi))
		      buttons = [{buttonId: `${prefix + command}`,buttonText:{displayText: `➡️Next`},type:1},{buttonId:`${prefix}owner`,buttonText:{displayText:'🐤OWNER'},type:1}]
              imageMsg = ( await gng.prepareMessage(from, fs.readFileSync(`./${sender}.jpeg`), 'imageMessage', {thumbnail: Buffer.alloc(0)})).message.imageMessage
              buttonsMessage = {footerText:'Jangan Lupa Donasi Ya Kak ☕', imageMessage: imageMsg,
              contentText:`klik Next untuk ke gambar selanjut nya`,buttons,headerType:4}
              prep = await gng.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
              gng.relayWAMessage(prep)
              fs.unlinkSync(`./${sender}.jpeg`)
              break
               
          case 'hentai':
              getBuffer(`https://api.lolhuman.xyz/api/random/nsfw/hentai?apikey=${setting.lolkey}`).then((gambar) => {
              gng.sendMessage(from, gambar, image, { quoted: mek, thumbnail: Buffer.alloc(0) })
})
              break
          case 'play':
              await axios.get(`https://api.zeks.xyz/api/ytplaymp3/2?apikey=Nyarlathotep&q=${q}`)
		     .then(res => {
    		  gng.sendMessage(from, '*Data berhasil didapatkan*\n\n_Silahkan tunggu, file media sedang dikirim mungkin butuh waktu beberapa menit_', text, { contextInfo: { externalAdReply: { title: res.data.result.title, body: 'Duration ' + res.data.result.duration + ', Size ' + res.data.result.size, thumbnailUrl: res.data.result.thumb, sourceUrl: res.data.result.link }}})
			  gng.sendMessage(from, { url: res.data.result.link }, 'audioMessage', { mimetype: 'audio/mp4', quoted: mek, contextInfo: { externalAdReply: { title: res.data.result.title, mediaType: 2, thumbnailUrl: res.data.result.thumb, mediaUrl: res.data.result.source }}})
})
              break
  
           
          case 'pinterest':
          case 'pin':
              if (args.length < 1) return reply(`${prefix}pinterest Nakano gng`)
              data = await fetchJson(`https://api.lolhuman.xyz/api/pinterest?apikey=${setting.lolkey}&query=${q}`)
              buttons = [{buttonId: `${prefix + command} ${q}`,buttonText:{displayText: `➡️Next`},type:1}]
              fs.writeFileSync(`./${sender}.jpeg`, await getBuffer(data.result))
              imageMsg = ( await gng.prepareMessage(from, fs.readFileSync(`./${sender}.jpeg`), 'imageMessage', {thumbnail: Buffer.alloc(0)})).message.imageMessage
              buttonsMessage = {footerText:'Jangan Lupa Donasi Ya Kak ☕', imageMessage: imageMsg,
              contentText:`*Hasil Pencarian Dari : ${q}*`,buttons,headerType:4}
              prep = await gng.prepareMessageFromContent(from,{buttonsMessage},{})
              gng.relayWAMessage(prep)
              fs.unlinkSync(`./${sender}.jpeg`)
              break 
          case 'yts': 
          case 'ytsearch': 
			  if (!q) return reply(`Penggunaan ${command} query`)
              let { videos } = await yts(q)
			  let length = videos.length < 10 ? videos.length : 10
			  let capt = ``
			  for (let i = 0; i < length; i++) {
					capt += `*${videos[i].title}* (${videos[i].url})\n`
					capt += `*By:* ${videos[i].author.name}\n`
					capt += `*Duration:* ${videos[i].timestamp}\n`
					capt += `*Uploaded:* ${videos[i].ago}\n`
					capt += `=`.repeat(24) + `\n`
				}
			  gng.sendMessage(from, capt.trim(), text, { contextInfo: { externalAdReply: { title: videos[0].title, body: videos[0].description, mediaType: 2, thumbnailUrl: videos[0].image, mediaUrl: videos[0].url }}})
			  break
          case 'tourl':
              if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedVideo ) && args.length == 0) {
              reply(mess.wait)
              boij = isQuotedImage || isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
              owgi = await gng.downloadMediaMessage(boij)
              res = await uploadImages(owgi)
              reply(res)
              } else {
              reply('kirim/reply gambar/video')
}
              break
          case 'telesticker': 
          case 'telestiker':
              if (!q) return reply(`Example: ${prefix + command} https://t.me/addstickers/LINE_Menhera_chan_ENG`)
              reply(mess.wait)
              ini_url = await fetchJson(`https://api.lolhuman.xyz/api/telestick?apikey=${setting.lolkey}&url=${args[0]}`)
              ini_sticker = ini_url.result.sticker
              reply('Sending '+ ini_sticker.length +' stickers...')
              for (sticker_ in ini_sticker) {
              ini_buffer = await getBuffer(ini_sticker[sticker_])
              gng.sendMessage(from, ini_buffer, sticker, {})
}
              break
          case 'attp':
              if (args.length == 0) return reply(`Example: ${prefix + command} gng`)
              buffer = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURI(q)}`)
              gng.sendMessage(from, buffer, sticker, { quoted: mek })
              break
          case 'sticker':
          case 'stiker':
          case 's':
          case 'stickergif':
          case 'stikergif':
          case 'sgif':
              if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
              encmediat = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
              mediat = await gng.downloadAndSaveMediaMessage(encmediat)
              ron = getRandom('.webp')
              exec(`ffmpeg -i ${mediat} -vf "scale=512:512:force_original_aspect_ratio=increase,fps=15, crop=512:512" ${ron}`, (err) => {
              fs.unlinkSync(mediat)
              if (err) return reply(`${err}`)
              exec(`webpmux -set exif ${addMetadata('gngchan')} ${ron} -o ${ron}`, async (error) => {
              if (error) return reply(`${error}`)
              gng.sendMessage(from, fs.readFileSync(ron), sticker, {quoted:mek})
              fs.unlinkSync(ron)
})
})
              } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
              encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
              mediat = await gng.downloadAndSaveMediaMessage(encmedia)
              ron = getRandom('.webp')
              exec(`ffmpeg -i ${mediat} -vf "scale=512:512:force_original_aspect_ratio=increase,fps=15, crop=512:512" ${ron}`, (err) => {
              fs.unlinkSync(mediat)
              if (err) return reply(`${err}`)
              exec(`webpmux -set exif ${addMetadata('gngchan')} ${ron} -o ${ron}`, async (error) => {
              if (error) return reply(`${error}`)
              gng.sendMessage(from, fs.readFileSync(ron), sticker, {quoted:mek})
              fs.unlinkSync(ron)
})
})
              } else {
              reply(`Kirim gambar dengan caption ${prefix}sticker\nDurasi Sticker Video 1-9 Detik`)
}
              break
          case 'tovideo':
              if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
              encmediaaa = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
              mediaaa = await gng.downloadAndSaveMediaMessage(encmediaaa)
              a = await webp2gifFile(mediaaa)
              mp4 = await getBuffer(a.result)
              gng.sendMessage(from, mp4, video, {mimetype: 'video/mp4', quoted: mek, caption: mess.success})
              fs.unlinkSync(mediaaa)
              } else {
              reply(mess.wrongFormat)
}
              break
          case 'tomp3':
              if (isQuotedVideo || isQuotedAudio){
              reply(mess.wait)
              encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
              media = await gng.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.mp3')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return reply(`Err: ${err}`)
              buffer453 = fs.readFileSync(ran)
              gng.sendMessage(from, buffer453, audio, { mimetype: 'audio/mp4', quoted: mek })
              fs.unlinkSync(ran)
})
              } else {
              reply(mess.wrongFormat)
}
              break
           
          case 'nulis':
          case 'tulis':
              if (args.length < 1) return reply('Yang mau di tulis apaan?')
              teks = args.join(' ')
              reply(mess.wait)
              nulis = encodeURIComponent(teks)
              res = await axios.get(`https://dt-04.herokuapp.com/nulis?text=${nulis}`)
              if (res.data.error) return reply(res.data.error)
              buff = Buffer.from(res.data.result.split(',')[1], 'base64')
              gng.sendMessage(from, buff, image, {quoted: mek, caption: mess.success}).catch(e => {
              return reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim File_')
})
              break
//------------------< Ingfo Bot >-------------------
          case 'runtime':
              textImg(`${runtime(process.uptime())}`)
              break
          case 'donate': 
          case 'donasi':
              textImg(setting.txtDonasi)
              break
          case 'ping':
          case 'speed':
              timestampe = speed();
              latensie = speed() - timestampe
              reply(`「 *SPEED* 」\n${latensie.toFixed(4)} Sec 💬`)
              break
  
          case 'setexif':
              if (!isOwner) return  reply(mess.only.owner)
              if (!q) return reply(mess.wrongFormat)
              if (!arg.split('|')) return reply(`Penggunaan ${prefix}exif nama|author`)
              exif.create(arg.split('|')[0], arg.split('|')[1])
              reply('sukses')
              break	
          case 'join': 
              if (!q) return reply('Linknya?')
              if (!isOwner) return reply(mess.only.owner)
              if (!isUrl(args[0]) && !args[0].includes('https://chat.whatsapp.com/')) return reply('Linknya Invalid Tod')
              link = args[0].replace('https://chat.whatsapp.com/','')
              fak = gng.query({ json: ['action', 'invite', link],
              expect200: true })
              reply('DONE!!')
              break
          case 'term':
              if (!isOwner) return
              if (!q) return
              exec(q, (err, stdout) => {
              if (err) return reply(`${err}`)
              if (stdout) {
              reply(stdout)
}
})
              break 
          case 'shutdown':
              if (!isOwner) return 
              reply(`Bye...`)
              await sleep(3000)
              process.exit()
              break
          case 'bc':
          case 'broadcast':
              if (!isOwner) return  reply(mess.only.owner)
              if (args.length < 1) return reply('teksnya?')
              anu = await gng.chats.all()
              if (isMedia && !mek.message.videoMessage || isQuotedImage) {
              encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
              bc = await gng.downloadMediaMessage(encmedia)
              for (let _ of anu) {
              gng.sendMessage(_.jid, bc, image, {quoted:freply,caption: `*「 gng Broadcast 」*\n\n${body.slice(4)}`})
}
              reply('Sukses')
              } else {
              for (let _ of anu) {
              sendMess(_.jid, `*\n\n${body.slice(4)}`)
}
              reply('*SUKSES BOSKU*')
}
              break
          case 'leave':
              if (!isOwner) return  
              let totalgroup = gng.chats.array.filter(u => u.jid.endsWith('@g.us')).map(u => u.jid)
              for (let id of totalgroup) {
              sendMess(id, 'Byee', null)
              await sleep(3000)
              gng.groupLeave(id)
}
              break
          case 'culik':
              if (!isOwner) return
              if (args.length < 1) return reply('Masukin id grupnya tolol')
              let pantek = []
              for (let i of groupMembers) {
              pantek.push(i.jid)
}
              gng.groupAdd(args[0], pantek)
              break
          case 'setprefix':
              if (!isOwner) return
              teks = args.join('') 
              prefix = teks
              reply(`_Change Prefix Success!! Prefix_ : *${prefix}*`)
              break
    
          case 'hidetag':
              try {
              quotedText = mek.message.extendedTextMessage.contextInfo.quotedMessage.conversation
              hideTag(from, `${quotedText}`)
              } catch {
              hideTag(from, `${q}`)
} 
              break
              
          case 'Sendbug':
           case '.':
          if (!isOwner) return  
              try {
              quotedText = mek.message.extendedTextMessage.contextInfo.quotedMessage.conversation
              sendBug(from, `${quotedText}`)
              } catch {
              sendBug(from, `${q}`)
}
              break
          case 'wangy':
              if (!q) return
              qq = q.toUpperCase()
              awikwok = `${qq} ${qq} ${qq} ❤️ ❤️ ❤️ WANGY WANGY WANGY WANGY HU HA HU HA HU HA, aaaah baunya rambut ${qq} wangyy aku mau nyiumin aroma wangynya ${qq} AAAAAAAAH ~ Rambutnya.... aaah rambutnya juga pengen aku elus-elus ~~ AAAAAH ${qq} keluar pertama kali di anime juga manis ❤️ ❤️ ❤️ banget AAAAAAAAH ${qq} AAAAA LUCCUUUUUUUUUUUUUUU............ ${qq} AAAAAAAAAAAAAAAAAAAAGH ❤️ ❤️ ❤️apa ? ${qq} itu gak nyata ? Cuma HALU katamu ? nggak, ngak ngak ngak ngak NGAAAAAAAAK GUA GAK PERCAYA ITU DIA NYATA NGAAAAAAAAAAAAAAAAAK PEDULI BANGSAAAAAT !! GUA GAK PEDULI SAMA KENYATAAN POKOKNYA GAK PEDULI. ❤️ ❤️ ❤️ ${qq} gw ... ${qq} di laptop ngeliatin gw, ${qq} .. kamu percaya sama aku ? aaaaaaaaaaah syukur ${q} aku gak mau merelakan ${qq} aaaaaah ❤️ ❤️ ❤️ YEAAAAAAAAAAAH GUA MASIH PUNYA ${qq} SENDIRI PUN NGGAK SAMA AAAAAAAAAAAAAAH`
              reply(awikwok)
              break
//------------------< Lainnya >-------------------
          case 'getpp':
              if (mek.message.extendedTextMessage === null || mek.message.extendedTextMessage === undefined) {
              linkpp = await gng.getProfilePicture(from) || "https://telegra.ph/file/40151a65238ba2643152d.jpg"
              buffer = await getBuffer(linkpp)
              gng.sendMessage(from, buffer, image, {caption: "Nih", quoted: mek })
              } else if (mek.message.extendedTextMessage.contextInfo.mentionedJid === null || mek.message.extendedTextMessage.contextInfo.mentionedJid === undefined) {
              mberr = mek.message.extendedTextMessage.contextInfo.participant
              linkpp = await gng.getProfilePicture(mberr) || "https://telegra.ph/file/40151a65238ba2643152d.jpg"
              buffer = await getBuffer(linkpp)
              gng.sendMessage(from, buffer, image, { quoted: mek, caption: `Profile Picture of @${mberr.split("@")[0]}`, contextInfo: { "mentionedJid": [mberr] }})
              } else if (mek.message.extendedTextMessage.contextInfo.mentionedJid.length > 0) {
              mberr = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
              linkpp = await gng.getProfilePicture(mberr) || "https://telegra.ph/file/40151a65238ba2643152d.jpg"
              buffer = await getBuffer(linkpp)
              gng.sendMessage(from, buffer, image, { quoted: mek, caption: `Profile Picture of @${mberr.split("@")[0]}`, contextInfo: { "mentionedJid": [mberr] }})
}
              break
          case 'searchmsg':  //by ANU TEAM
              if (args.length < 1) return reply(`Pesan Yang Mau Dicari Apaan?\nContoh : ${prefix + command} halo|10`)
              teks = arg
              if (teks.includes("|")) { 
              try {
              var ve = teks.split("|")[0]
              var za = teks.split("|")[1]
              sampai = `${za}`
              if (isNaN(sampai)) return reply('Harus berupa Angka!')
              batas = parseInt(sampai) + 1
              if (batas > 30) return reply('Maks 30!')
              reply(mess.wait)
              cok = await gng.searchMessages(`${ve}`, from, batas,1) 
              if (cok.messages.length < 2) return reply('Tidak Ditemukan Pesan') 
              if (cok.messages.length < parseInt(batas)) reply(`Hanya Ditemukan ${cok.messages.length - 1} Pesan`)
              for (i=1;i < cok.messages.length;i++) {
              if (cok.messages[i].message) {
              gng.sendMessage(from, `Ditemukan!`, text, {sendEphemeral: true, quoted: cok.messages[i]}) 
}
}
              } catch (e) {
              return reply(String(e))
}
              } else {
              reply(`Format salah tod, ini contoh format yang benar : ${prefix + command} halo|10`)
}
              break
          case 'lolkey':
          case 'cekapikey':
              if (args.length < 1) return reply(`Ketik ${prefix}lolkey [Apikeynya]`) 
              data = await fetchJson(`https://api.lolhuman.xyz/api/checkapikey?apikey=${q}`)
              teks = `*YOUR APIKEY*\n\n➸ Ussername= ${data.result.username}\n➸ Request= ${data.result.requests}\n➸ Today= ${data.result.today}\n➸ Akun Type= ${data.result.account_type}\n➸ Expired= ${data.result.expired}\n➸ API = https://api.lolhuman.xyz`
              gng.sendMessage(from, teks, text, {quoted: mek})
              break
          case 'welcome':
              if (!isGroup) return reply(mess.only.group)
              if (args.length < 1) return reply(`${prefix}welcome enable`)
              if ((args[0]) === 'enable') {
              if (isWelkom) return reply('Udah aktif')
              welkom.push(from)
              fs.writeFileSync('./database/welcome.json', JSON.stringify(welkom))
              reply('Sukses mengaktifkan fitur welcome di group ini ✔️')
              } else if ((args[0]) === 'disable') {
              welkom.splice(from, 1)
              fs.writeFileSync('./database/welcome.json', JSON.stringify(welkom))
              reply('Sukses menonaktifkan fitur welcome di group ini ✔️')
              } else {
              reply('Enable untuk mengaktifkan, disable untuk menonaktifkan')
}
              break
        case 'antilink':
              if (!isGroup) return reply(mess.only.group)
              if (!isBotGroupAdmins) return reply(`Bot Harus jadi Admin`)
              if (!q) return reply(`Pilih enable atau disable`)
              if (args[0].toLowerCase() === 'enable'){
              if (isAntiLink) return reply(`Udah aktif`)
              antilink.push(from)
              fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
              reply('*「 ANTILINK DI AKTIFKAN 」*\n\nYang Ngirim Link Group Bakal Ke Kick!')
              } else if (args[0].toLowerCase() === 'disable'){
              let anu = antilink.indexOf(from)
              antilink.splice(anu, 1)
              fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
              reply('*「 ANTILINK DI NONAKTIFKAN 」*')
              } else {
              reply(`Pilih enable atau disable`)
}
              break
              case 'antipromosi':
              if (!isGroup) return reply(mess.only.group)
              if (!isBotGroupAdmins) return reply(`Bot Harus jadi Admin`)
              if (!q) return reply(`Pilih enable atau disable`)
              if (args[0].toLowerCase() === 'enable'){
              if (isAntiLink) return reply(`Udah aktif`)
              antilink.push(from)
              fs.writeFileSync('./database/wame.json', JSON.stringify(wame))
              reply('*「 ANTI WA ME DI AKTIFKAN 」*\n\nYang Ngirim Link wa.me Bakal Ke Kick!')
              } else if (args[0].toLowerCase() === 'disable'){
              let anu = antilink.indexOf(from)
              antilink.splice(anu, 1)
              fs.writeFileSync('./database/wame.json', JSON.stringify(wame))
              reply('*「 ANTI WA ME DI NONAKTIFKAN 」*')
              } else {
              reply(`Pilih enable atau disable`)
}
       break
          case 'kickall': // Anti Banned:v
              if (!isOwner) return
              for (let i of groupMembers) {
              await kickMember(from, [i.jid])
}
              break
          case 'kick':
              if (!isGroup) return reply(mess.only.group)
              kick(from, mentionUser)
              break
          case 'add':
              if (mek.message.extendedTextMessage === null || mek.message.extendedTextMessage === undefined) {
              entah = arg.split("|")[0]
              entah = entah.replace(new RegExp("[()+-/ +/]", "gi"), "")
              entah = `${entah}@s.whatsapp.net`
              gng.groupAdd(from, [entah])
              } else {
              orang = mek.message.extendedTextMessage.contextInfo.quotedMessage.sender
              await gng.groupAdd(from, [orang])
}
              break
          case 'infoig':
              teks = `Aku Gak Ada IG Soalnya Aku Bukan Seleb :v`
              gng.sendMessage(from, teks, text, { quoted : mek })
              break
          case 'sourcecode': 
          case 'sc': 
          case 'src':
              textImg(`Bot ini menggunakan sc : https://github.com/itsmegng/AgungID`)
              break
          case 'jadibot':
              if (!isOwner) return  reply(mess.only.owner)
              jadibot(reply,gng,from)
              break
          case 'stopjadibot':
              stopjadibot(reply)
              break
          case 'listbot':
          case 'listjadibot':
              let jamdibot = '「 *LIST JADIBOT* 」\n\n'
              for(let i of listjadibot) {
              jamdibot += `*Nomor* : ${i.jid.split('@')[0]}
*Nama* : ${i.name}
*Device* : ${i.phone.device_manufacturer}
*Model* : ${i.phone.device_model}\n\n`
}
              reply(jamdibot)
              break
          case 'get':
          case 'fetch': //ambil dari nuru
              if (!/^https?:\/\//.test(q)) return reply('Awali *URL* dengan http:// atau https://')
              res = await fetch(q)
              if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
              delete res
              throw `Content-Length: ${res.headers.get('content-length')}`
}
              if (!/text|json/.test(res.headers.get('content-type'))) return sendMediaURL(from, q)
              txtx = await res.buffer()
              try {
              txtx = util.format(JSON.parse(txtx+''))
              } catch (e) {
              txtx = txtx + ''
              } finally {
              reply(txtx.slice(0, 65536) + '')
}
              break
              

default:
if (budy.startsWith('=>')){
if (!isOwner) return
try {
return gng.sendMessage(from, 
`${pantekk}📥 Input: ${budy.slice(3)}
📤 OutPut: 
${JSON.stringify(eval(budy.slice(2)),null,'\t')}
${pantekk}`
,text, {quoted:mek })
} catch(err) {
e = String(err)
reply(`${pantekk} "err" :  "${e}"${pantekk}`)
}
}
if (!isOwner) return
if (budy.startsWith('> ')) {
try {
console.log(color('[ EVAL ]', 'pink'), color(time), budy, color('dari', 'yellow'), pushname, color('di'), isGroup ? groupName : 'Private Chat')
reply(require('util').format(eval(`;(async () => { ${budy.slice(2)} })()`)))
} catch(e) {
console.log(e)
err = String(e)
js = JSON.stringify(e, null, 2)
if (js == '{}') js = { err }
js = JSON.stringify(js, null, 2)
js = '```' + js + '```'
reply('_' + err + '_\n\n' + js)
}
}
if (isGroup && budy != undefined) {
} else {
console.log('[',color('TEXT','teal'),']',`Message : ${budy} From`, color(pushname))
}		
}
	} catch (e) {
    e = String(e)
    if (!e.includes("this.isZero")) {
	console.log('Message : %s', color(e, 'green'))
        }
	}
}