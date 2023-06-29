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
    }
  } catch (error) {
    console.log(error.message)
  }
})

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