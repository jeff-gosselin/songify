const apiURL = `http://localhost:3000/api/v1/`;

async function fetchSongs() {
  const request = await fetch(`${apiURL}songs`);
  const songs = await request.json();
  return songs
}

document.addEventListener('DOMContentLoaded', () => {
  console.log(fetchSongs())
})
