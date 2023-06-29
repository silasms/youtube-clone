window.addEventListener("load", async (event) => {
  const body = document.querySelector("body")
  const id = new URLSearchParams(document.location.search)
  console.log(id.get("id"))
  body.innerHTML = `<video src=http://localhost:3000/get-video/${id.get("id")} autoplay controls width=900px height=500px></video>`
})