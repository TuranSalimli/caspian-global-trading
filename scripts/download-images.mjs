// Run once on your computer:  npm run images
// Downloads the closure photos into public/img/ under the file names used by products.json.
import { writeFile, mkdir } from 'node:fs/promises'

const FILES = [
  ['clo-cork.jpg', 'https://static.tildacdn.com/tild3938-3264-4130-b161-393965383736/big_rscork_201804_30.jpg'],
  ['clo-synthetic-wine-stopper.png', 'https://static.tildacdn.com/tild3635-3339-4437-b039-373166366630/___-removebg-preview.png'],
  ['clo-flapcap.jpg', 'https://static.tildacdn.com/tild6264-3031-4433-b363-373066656535/view_FlapCap_.jpg'],
  ['clo-wax-granules.jpg', 'https://static.tildacdn.com/tild6233-6138-4331-a531-626337366433/DSC00108_.jpg'],
  ['clo-wax-equipment.png', 'https://thb.tildacdn.com/tild6464-3363-4062-a238-646232333431/-/resize/600x/Man-Using-Sealing-Wa.png'],
  ['clo-wax-medallions.png', 'https://thb.tildacdn.com/tild6536-3833-4664-a334-316136356334/-/resize/600x/_.png'],
  ['clo-tamper-strips.jpg', 'https://thb.tildacdn.com/tild6434-3833-4261-a230-333062323530/-/resize/600x/DSC09028.JPG'],
  ['clo-sealing-stamps.jpg', 'https://thb.tildacdn.com/tild6239-3935-4263-b065-623165323938/-/resize/600x/photo.jpg'],
  ['clo-gpi-kendo-tamper.png', 'https://static.tildacdn.com/stor3534-6235-4234-a363-393134336664/-/empty/12907757.png'],
  ['clo-gpi-kendo.png', 'https://static.tildacdn.com/stor3131-3939-4365-b662-633534386133/-/empty/30537510.png'],
  ['clo-champagne-plastic-stopper.jpg', 'https://static.tildacdn.com/tild3035-3366-4037-a331-346633376163/DSC027144.jpg'],
  ['clo-camus-stopper.jpg', 'https://static.tildacdn.com/stor3363-6566-4563-a364-343065643062/-/empty/11681638.jpg'],
  ['clo-aqua-boy.jpg', 'https://static.tildacdn.com/stor6264-6635-4262-b737-393634313865/-/empty/64287976.jpg'],
]

await mkdir('public/img', { recursive: true })
let ok = 0
for (const [name, url] of FILES) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('HTTP ' + res.status)
    await writeFile('public/img/' + name, Buffer.from(await res.arrayBuffer()))
    console.log('OK    ', name)
    ok++
  } catch (e) {
    console.log('FAILED', name, '-', e.message)
  }
}
console.log(`\nDone: ${ok}/${FILES.length} images saved to public/img/`)
