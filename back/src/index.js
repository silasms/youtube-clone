import { createServer } from 'node:http'
import { getVideo } from './controller/get-video/index.js'
import { getVideos } from './controller/get-videos/index.js'
import { getThumbs } from './controller/get-photos/index.js'
import { getThumb } from './controller/get-photo/index.js'

const PORT = 3000

createServer(async (request, response) => {
  const url = request.url
  const headers = {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': "*",
  }
  
  if(request.method === 'OPTIONS') {
    response.writeHead(204, headers)
    response.end()
    return;
  }

  if (url.includes("/get-video/") && request.method === "GET") {
    getVideo(request, response)
  }

  else if(url.includes("/get-videos") && request.method === "GET") {
    getVideos(request, response)
  }
  
  else if(url.includes("/get-thumbs") && request.method === "GET") {
    getThumbs(request, response)
  }

  else if(url.includes("/get-thumb") && request.method === "GET") {
    getThumb(request, response)
  }
  
  else {
    response.end()
  }
})
.listen(PORT, () => console.log(`server is running at ${PORT}`))