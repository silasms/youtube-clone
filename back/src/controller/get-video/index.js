import { createReadStream, existsSync } from 'node:fs'
import { spawn } from 'node:child_process'

export function getVideo(request, response) {
  const id = request.url.split("/").pop()
  if (!existsSync(`./assets/videos/${id}.mp4`)) {
    response.writeHead(204)
    response.end()
    return
  }
  response.writeHead(200, {
    'Content-Type': 'video/mp4',
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': "*",
  })

  const ffmpegProcess = spawn('ffmpeg', [
    '-i', 'pipe:0',
    '-f', 'mp4',
    '-vcodec', 'h264',
    '-acodec', 'aac',
    '-movflags', 'frag_keyframe+empty_moov+default_base_moof',
    '-b:v', '1500k',
    '-maxrate', '1500k',
    '-bufsize', '1000k',
    '-f', 'mp4',
    'pipe:1'
  ], {
    stdio: ['pipe', 'pipe', 'pipe']
  })

  createReadStream(`./assets/videos/${id}.mp4`).pipe(ffmpegProcess.stdin)

  ffmpegProcess.stderr.on('data', msg => console.log(msg.toString()))

  ffmpegProcess.stdout.pipe(response)

  request.once('close', () => {
    ffmpegProcess.stdout.destroy()
    ffmpegProcess.stdin.destroy()
    console.log('disconnected!', ffmpegProcess.kill())
  })
}