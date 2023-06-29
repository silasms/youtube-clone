import { readdirSync } from "node:fs"

export async function getThumbs(request, response) {
    const files = readdirSync("./assets/thumbs/")
    response.write(JSON.stringify(files))
    response.end()
}