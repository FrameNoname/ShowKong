import { readFile, mkdir, writeFile } from 'node:fs/promises'
const manifest = JSON.parse(await readFile(new URL('./figma-assets.json', import.meta.url), 'utf8'))
const output = new URL('../public/design/', import.meta.url)
await mkdir(output, { recursive: true })
for (let i = 0; i < manifest.length; i += 6) {
  await Promise.all(manifest.slice(i, i + 6).map(async ({ url, file }) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error(file + ': HTTP ' + response.status)
    await writeFile(new URL(file, output), Buffer.from(await response.arrayBuffer()))
  }))
}
console.log('Downloaded ' + manifest.length + ' original Figma assets.')
