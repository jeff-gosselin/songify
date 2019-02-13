document.addEventListener("DOMContentLoaded", () =>{
  const apiURL = `http://localhost:3000/api/v1/`;
  const container = document.querySelector(".container");
  const sideBar = document.querySelector(".menu")

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

  async function viewCompletedSongs() {
    const songs = await fetchSongs();
    const sections = await fetchSections();
    const snippets = await fetchSnippets();

    const songCard = document.createElement("div");
    songCard.className = "song-card";

  };

  function newSongForm() {
    container.innerHTML = '';
    const songCard = document.createElement("div");
    songCard.className = "song-card";
    songCard.innerHTML = `
      <form>
      <input id="new-song-form" type="text" placeholder="Song Title">
      <button id="submit-new-song" type="submit">
      </form>
    `;
    container.append(songCard);
  }

  sideBar.addEventListener('click', (e) => {
    switch(e.target.id) {
      case "start":
      newSongForm();
        break;
      case "contribute":
      listSongsInProgress();
        break;
      case "view":
      viewCompletedSongs();
        break;
    };
  });

});
