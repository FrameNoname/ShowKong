import { mkdir, writeFile } from 'node:fs/promises'
const dir = new URL('../public/fonts/', import.meta.url)
await mkdir(dir, {recursive:true})
const sources = [
  ['Anuphan-400.ttf','https://fonts.gstatic.com/s/anuphan/v6/2sDBZGxYgY7LkLT0s2Yrm5UhuLoIZCkY9Q4k.ttf'],
  ['Anuphan-500.ttf','https://fonts.gstatic.com/s/anuphan/v6/2sDBZGxYgY7LkLT0s2Yrm5UhuLoIZCkq9Q4k.ttf'],
  ['Anuphan-600.ttf','https://fonts.gstatic.com/s/anuphan/v6/2sDBZGxYgY7LkLT0s2Yrm5UhuLoIZCnG8g4k.ttf'],
  ['Anuphan-700.ttf','https://fonts.gstatic.com/s/anuphan/v6/2sDBZGxYgY7LkLT0s2Yrm5UhuLoIZCn_8g4k.ttf'],
  ['OFL.txt','https://raw.githubusercontent.com/google/fonts/main/ofl/anuphan/OFL.txt'],
]
await Promise.all(sources.map(async ([name,url])=>{
  const response=await fetch(url)
  if(!response.ok)throw new Error(name+': HTTP '+response.status)
  await writeFile(new URL(name,dir),Buffer.from(await response.arrayBuffer()))
}))
console.log('Downloaded Anuphan font weights and SIL Open Font License.')
