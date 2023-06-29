import { readFileSync } from "node:fs"

export async function getThumb(request, response) {
    const id = request.url.split("/").pop()
    const { videos } = JSON.parse(readFileSync("./db.json"))
    const [ video ] = videos.filter(el => String(el.id) === id)
    response.write(readFileSync(video.thumb))
    response.end()
}