import { readFileSync } from "node:fs"

export async function getVideos(request, response) {
    const { videos } = JSON.parse(readFileSync("./db.json"))
    response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': "*"
    });
    const arrVid = videos.map(video => {
        video.image = readFileSync(`./assets/thumbs/${video.thumb}`, {encoding: 'base64'})
        video.channel = readFileSync(`./assets/icon/${video.icon}`, {encoding: 'base64'})
        return video
    })
    
    response.end(JSON.stringify(arrVid))
}