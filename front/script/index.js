window.addEventListener("load", async (event) => {
  try {
    const response = await fetch("http://localhost:3000/get-videos")
    const videos = await response.json()
    const thumbs = document.querySelectorAll(".card")
    for (let i = 0; i < videos.length; i++) {
      const [ image, info ] = thumbs[i].children
      const [icon, texts] = info.children
      const [title, description] = texts.children
      const infos = [title, description]
      infos.forEach(element => element.style.backgroundColor = "transparent")
      title.textContent = videos[i]["title"]
      description.textContent = videos[i]["description"]
      image.src = `data:image/png;base64,${videos[i]["image"]}`
      icon.src = `data:image/png;base64,${videos[i]["channel"]}`
      image.onclick = () => document.location.href = `./video.html?id=${videos[i]["id"]}`
      const video = document.createElement("video")
      video.onclick = () => document.location.href = `./video.html?id=${videos[i]["id"]}`
      image.addEventListener("mouseover",() => {
        image.classList.add("hidden")
        video.classList.add("video-thumb")
        thumbs[i].appendChild(video)
        thumbs[i].insertBefore(video, image)
        video.src = `http://localhost:3000/get-video/${videos[i]["id"]}`
        const defaultVideo = [ "autoplay", "controls", "muted" ]
        defaultVideo.forEach(config => video[config] = true)
        video.play()
      })
      const removeVideo = [video, thumbs[i]]
      removeVideo.forEach(element =>
        element.addEventListener("mouseleave", () => resetVideoCard(image, video)))
    }
  } catch (error) {
    console.log(error.message)
  }
})

const resetVideoCard = (image, video) => {
  image.classList.remove("hidden")
  video.removeAttribute("src")
  video.load()
  video.remove()
}

function createThumbVideo(data) {
  const construct = `
    <div class="card">
      <div class="image"></div>
      <img src="" alt=""/>
      <div class="infos">
        <img class="icon"/>
        <div>
          <p class="title"></p>
          <p class="description"></p>
        </div>
      </div>
    </div>`
}

async function loadPage() {
}