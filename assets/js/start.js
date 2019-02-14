document.addEventListener("DOMContentLoaded", () =>{
  const apiURL = `http://localhost:3000/api/v1/`;
  const container = document.querySelector(".container");
  const sideBar = document.querySelector(".menu")

  async function fetchSongs() {
    const request = await fetch(`${apiURL}songs.json`);
    const songs = await request.json();
    return songs;
  }

  async function fetchSections() {
    const request = await fetch(`${apiURL}sections.json`)
    const sections = await request.json();
    return sections;
  }

  async function fetchSnippets() {
    const request = await fetch(`${apiURL}snippets.json`)
    const snippets = await request.json();
    return snippets
  }

  async function viewCompletedSongs() {
    const songs = await fetchSongs();
    const sections = await fetchSections();
    const snippets = await fetchSnippets();

    const songCard = document.createElement("div");
    songCard.className = "song-card";

  };

  function addSection(e) {
    const songId = e.target.parentElement.id.slice(5);
    fetch(`${apiURL}sections`, {
      method: `POST`,
      headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
      body: JSON.stringify({
        song_id: songId,
        section_type: 'verse'
      })
    }).then(res => data.json)
    .then(console.log)
  }

  async function showNewlyCreatedSong() {
    container.innerHTML = '';
    const songs = await fetchSongs();
    const lastSongId = songs[songs.length - 1].id
    const lastSong = songs.find(song => song.id === lastSongId)


    const title = document.createElement("h2");
    title.id = `song-${lastSongId}`
    title.class = `song-title`
    title.innerText = lastSong.title;
    container.append(title);

    const newSectionDiv = document.createElement("div");
    newSectionDiv.class = `song-${lastSongId}`;
    const newSnippetForm = document.createElement("form");
    newSnippetForm.class = "new-snippet-form";
    const newSnippetInput = document.createElement("input");
    newSnippetInput.class = "new-snippet-content";
    const newSnippetDropDown = document.createElement("select");
    newSnippetDropDown.class = "section-type";
    const chorusOption = document.createElement("option");
    chorusOption.value = "chorus";
    chorusOption.innerText = "Chorus";
    const verseOption = document.createElement("option");
    verseOption.value = "verse";
    verseOption.innerText = "Verse";
    const newSnippetButton = document.createElement("button");
    newSnippetButton.class = "submit-new-snippet container-buttons";
    newSnippetButton.innerText = "Submit"

    container.append(newSectionDiv);
    newSectionDiv.append(newSnippetForm);
    newSnippetForm.append(newSnippetInput);
    newSnippetForm.append(newSnippetDropDown);
    newSnippetForm.append(newSnippetDropDown);
    newSnippetDropDown.append(chorusOption);
    newSnippetDropDown.append(verseOption);
    newSnippetForm.append(newSnippetButton);

    newSectionDiv.addEventListener('submit', e => {e.preventDefault(); addSection(e)})}


  function createSong(e) {
    const newSongTitle = document.getElementById("new-song-title");
    fetch(`${apiURL}songs`, {
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
      body: JSON.stringify({
        title: newSongTitle.value
      })
    }).then(() => showNewlyCreatedSong())
  };

  function newSongForm() {
    container.innerHTML = '';
    const songCard = document.createElement("div");
    songCard.className = "song-card";
    songCard.innerHTML = `
      <form id="new-song-form">
      <input id="new-song-title" type="text" placeholder="Song Title"><br>
      <button id="submit-new-song" type="submit" class="container-buttons">Submit</button>
      </form>
    `;
    container.append(songCard);
    const newSongForm = document.getElementById("new-song-form");
    newSongForm.addEventListener('click', e => {
      e.preventDefault();
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








// CODE GRAVEYARD FOR POSSIBLE RESSURECTION


// const sections = await fetchSections();
// const theseSections = sections.filter(section => section.song_id === lastSongId)
//
// const snippets = await fetchSnippets();
// const theseSnippets = [];
// theseSections.forEach(section => {
  //     snippets.forEach(snippet => {
    //         if(section.id === snippet.section_id) {
      //             theseSnippets.push(snippet)
      //           }
      //         })
      //       })

      // theseSections.map(section => {
        //   const sectionDiv = documentCreatElement("div");
        //   sectionDiv.id = `section-${section.id}`;
        //   sectionDiv.innerText = section.section_type
        //   container.appendChild(sectionDiv)
        // })
        //
        // theseSnippets.map(snippet => {
          //   const snippetDiv = document.createElement("div");
          //   const mySection = document.getElementById(`section-${snippet.section_id}`);
          //   snippetDiv.id = `snippet-${snippet.id}`;
          //   snippetDiv.innerText = snippet.content;
          //   mySection.appendChild(snippetDiv);
          // })
          //
          // theseSections.forEach(section => {
            //   const sectionDiv = document.getElementById(`section-${section.id}`);
            //   const newSnippetForm = document.createElement("form");
            //   newSnippetForm.class = "new-snippet-form"
            //   const newSnippetInput = document.createElement("input");
            //   newSnippetInput.class = "new-snippet-content";
            //   const newSnippetButton = documetn.createElement("button");
            //   newSnippetButton.class = "submit-new-snippet";
            //   sectionDiv.appendChild(newSnippetForm);
            //   newSnippetForm.appendChild(newSnippetInput);
            //   newSnippetForm.appendChild(newSnippetButton);
            // })
