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

  function showNewlyCreatedSong(data) {
    console.log(data)
    container.innerHTML = '';
  }

  function createSong(e) {
    const newSongTitle = document.getElementById("new-song-title");
    fetch(`${apiURL}songs`, {
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
      body: JSON.stringify({
        title: newSongTitle
      })
    }).then(res => res.json())
    .then(data => showNewlyCreatedSong(data))
  }

  function newSongForm() {
    container.innerHTML = '';
    const songCard = document.createElement("div");
    songCard.className = "song-card";
    songCard.innerHTML = `
      <form id="new-song-form">
      <input id="new-song-title" type="text" placeholder="Song Title">
      <button id="submit-new-song" type="submit">
      </form>
    `;
    container.append(songCard);
    const newSongForm = document.getElementById("new-song-form");
    newSongForm.addEventListener('click', e => {
      if (e.target.id === "submit-new-song") {
        createSong(e)
      }
    })
  };

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
