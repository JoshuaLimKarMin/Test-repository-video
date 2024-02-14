import puppeteer from "puppeteer-core";
import { readdirSync, writeFileSync } from "fs";

const browser = await puppeteer.launch({
   executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
   headless: false
})

const page = await browser.newPage()

await page.goto('https://www.facebook.com/kvsaofficial')

await page.setViewport({ width: 720, height: 8112 })

const closeSignInElement = ".x92rtbv"
await page.waitForSelector(closeSignInElement)
await page.click(closeSignInElement)

await new Promise(res => setTimeout(() => {
   res()
}, 3000))

// OLD CODE -- Start


// const mainContentElement = ".x9f619.x19h7ccj"
// await page.waitForSelector(mainContentElement)
// const mainContentSelecorHandle = await(await page.$(mainContentElement)).$('div')
// const mainContent = await page.evaluate(element => element.innerHTML, mainContentSelecorHandle)

// await mainContentSelecorHandle.dispose()

// writeFileSync('./test.html', mainContent)


// OLD CODE -- End

const postsElementSelector = ".x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z"
const postMessageElementSelector = ".x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xo1l8bm.xzsf02u.x1yc453h"
const seeMoreButtonSelector = "[role=\"button\"].x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xt0b8zv.xzsf02u.x1s688f"
const postsHandler = await page.$$(postsElementSelector)
const seeMoreButtonsHandler = await page.$$(seeMoreButtonSelector)

console.log(seeMoreButtonsHandler.length)


for(const seeMoreButtonHandle of seeMoreButtonsHandler){
   const elementContent = await page.evaluate(element => element.innerHTML, seeMoreButtonHandle)
   if(elementContent !== 'See more')continue
   await page.evaluate(element => element.focus(), seeMoreButtonHandle)
   console.log(elementContent)
   await page.keyboard.press('Enter')
}

for(const postHandler of postsHandler){
   const postMessagesElementHandler = await postHandler.$(postMessageElementSelector)
   const post = await page.evaluate(element => element.innerHTML, postMessagesElementHandler)
   writeFileSync(`./html/post ${readdirSync('./html/').length}.html`, post)

}


await page.screenshot({ fullPage: true, path: `./screenshots/image ${readdirSync('./screenshots').length}.jpg` })

await browser.close()

process.exit()