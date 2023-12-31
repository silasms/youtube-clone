window.addEventListener("load", async () => {
  try {
    loadThumbPage()
    const response = await fetch("http://localhost:3000/get-videos")
    const videos = await response.json()
    const thumbs = document.querySelectorAll(".card")
    for (let i = 0; i < videos.length; i++) {
      const thumb = thumbs[i]
      const duration = document.createAttribute("duration")
      duration.value = videos[i]["duration"]
      thumb.setAttributeNode(duration)
      const {image, info, icon, _texts, title, description} = getInformation(thumb)
      const infos = [title, description]
      infos.forEach(element => element.style.backgroundColor = "transparent")
      title.textContent = videos[i]["title"]
      description.textContent = videos[i]["description"]
      image.src = `data:image/png;base64,${videos[i]["image"]}`
      icon.src = `data:image/png;base64,${videos[i]["channel"]}`
      const video = document.createElement("video")
      const videoClick = [ video, image ]
      videoClick.forEach( el => el.onclick = () => document.location.href = `./video.html?id=${videos[i]["id"]}`)
      const player = document.createElement("div")
      image.addEventListener("mouseover",async () => await videoShow({video, container: thumb, image, id: videos[i]["id"], player, info}))
    }
  } catch (error) {
    console.log(error.message)
  }
})

function getInformation(container) {
  const [ image, info ] = container.children
  const [icon, texts] = info.children
  const [title, description] = texts.children
  return {image, info, icon, texts, title, description}
}

async function videoShow ({video, container, image, id, player, info}) {
  image.classList.add("hidden")
  video.classList.add("video-thumb")
  container.appendChild(video)
  container.insertBefore(video, image)
  video.src = `http://localhost:3000/get-video/${id}`
  const defaultVideo = [ "autoplay", "muted" ]
  defaultVideo.forEach(config => video[config] = true)
  
  const duration = container.getAttribute("duration")
  player.classList.add("player")
  const play = document.createElement("div")
  play.classList.add("play")
  const bar = createBar(duration)
  player.appendChild(play)
  info.classList.add("view:player")
  player.appendChild(bar)
  container.insertBefore(bar, image)
  container.appendChild(player)

  video.addEventListener("timeupdate", () => {
    bar.value = video.currentTime
  })

  eventRemoveVideo({image, video, player, play, bar, info, container})
}

function eventRemoveVideo({image, video, player, play, bar, info, container}) {
  const removeItem = [video, container]
  removeItem.forEach(element => element.addEventListener("mouseleave", () => resetVideoCard({image, video, player, play, bar, info})))
}

const resetVideoCard = ({image, video, player, play, bar, info}) => {
  image.classList.remove("hidden")
  video.removeAttribute("src")
  video.load()
  video.remove()
  player.remove()
  play.remove()
  bar.remove()
  info.classList.remove("view:player")
}

function createBar(duration) {
  const bar = document.createElement("input")
  bar.value = 0
  bar.type = "range"
  bar.min = 0
  bar.max = duration
  bar.addEventListener("change", (event) => {
    video.currentTime = event.target.value
  })
  return bar
}

function createThumbVideo() {
  const construct = `
    <div class="card">
      <img class="image"/>
      <div class="infos">
        <img class="icon"/>
        <div>
          <p class="title"></p>
          <p class="description"></p>
        </div>
      </div>
    </div>`
  return construct
}

async function loadThumbPage() {
  const videos = document.getElementById("videos")
  const heightCard = 360
  const heightScreen = screen.height
  for (let i = 0; i < 100; i++) {
    const height = videos.offsetHeight
    const thumb = createThumbVideo()
    if (height > heightScreen + heightCard) {
      const lastCard = Array.from(videos.children).pop()
      lastCard.remove()
      break
    }
    videos.innerHTML += thumb
  }
}