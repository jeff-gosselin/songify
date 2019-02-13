const apiURL = `http://localhost:3000/api/v1/`;
const container = document.querySelector("container")

async function fetchSongs() {
  const request = await fetch(`${apiURL}songs`);
  const songs = await request.json();
  return songs;
}

async function fetchSections() {
  const request = await fetch(`${apiURL}sections`)
  const sections = await request.json();
  return sections;
}

async function fetchSnippets() {
  const request = await fetch(`${apiURL}snippets`)
}

async function makeSongCard() {
  const songs = await fetchSongs();
  const sections = await fetchSections();
  const snippets = await fetchSnippets();

  const songCard = document.createElement("div");
  songCard.className = "song-card";

};



document.addEventListener('click', (e) => {
  console.log(e.target)
})
