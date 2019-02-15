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



  async function addSnippet(data, e) {
    const section_id = data.id
    const content = e.target[0].value

    fetch(`${apiURL}snippets`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        section_id,
        content
      })
    }).then(res => res.json())
    .then(listSongsInProgress)
  }


  async function addSection(e) {
    const song_id = e.target.parentElement.className.slice(5);
    const songs = await fetchSongs();
    const song = songs.find(song => song.id === song_id);
    fetch(`${apiURL}sections`, {
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
      body: JSON.stringify({
        song_id,
        section_type: 'verse'
      })
    }).then(res => res.json())
    .then(data => addSnippet(data, e))
  }

  async function showNewlyCreatedSong(data) {
    container.innerHTML = '';
    const title = document.createElement("h2");
    title.id = `song-${data.id}`
    title.class = `song-title`
    title.innerText = data.title;
    container.append(title);

    const newSectionDiv = document.createElement("div");
    newSectionDiv.className = `song-${data.id}`;
    const newSnippetForm = document.createElement("form");
    newSnippetForm.className = "new-snippet-form";
    const newSnippetInput = document.createElement("input");
    newSnippetInput.className = "new-snippet-content";
    const newSnippetDropDown = document.createElement("select");
    newSnippetDropDown.className = "section-type";
    const chorusOption = document.createElement("option");
    chorusOption.value = "chorus";
    chorusOption.innerText = "Chorus";
    const verseOption = document.createElement("option");
    verseOption.value = "verse";
    verseOption.innerText = "Verse";
    const newSnippetButton = document.createElement("button");
    newSnippetButton.className = "submit-new-snippet container-buttons";
    newSnippetButton.innerText = "Submit"

    const br = document.createElement("br");

    container.append(newSectionDiv);
    newSectionDiv.append(newSnippetForm);
    newSnippetForm.append(newSnippetInput);
    newSnippetForm.append(br);
    newSnippetForm.append(newSnippetDropDown);
    newSnippetDropDown.append(chorusOption);
    newSnippetDropDown.append(verseOption);
    newSnippetForm.append(br);
    newSnippetForm.append(newSnippetButton);

    newSectionDiv.addEventListener('submit', e => {e.preventDefault(); addSection(e)})
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
        title: newSongTitle.value
      })
    }).then(res => res.json())
    .then(showNewlyCreatedSong)
  };

	function showNewSong(the_id) {
		let id = the_id;

		fetch(`http://localhost:3000/api/v1/songs/${id}`)
		.then(response => response.json())
		.then(song => {

			const container = document.querySelector('.container');
			container.style.color = 'rgb(61, 100, 122)';
			container.innerHTML = `
				<h1 class="headline">${song.title}</h1>`;
				displaySections(song);

	})
	}

  function newSongForm() {
    container.innerHTML = '';
    const songCard = document.createElement("div");
    songCard.className = "song-card";
    songCard.innerHTML = `
      <form data-id="" class="snippet-form" id="new-song-form">
      <input  id="new-song-title" type="text" placeholder="Song Title"><br>
      <button id="submit-new-song" type="submit" class="submit">Submit</button>
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
//       snippets.forEach(snippet => {
//             if(section.id === snippet.section_id) {
//                   theseSnippets.push(snippet)
//                 }
//               })
//             })

      // theseSections.map(section => {
      //     const sectionDiv = documentCreatElement("div");
      //     sectionDiv.id = `section-${section.id}`;
      //     sectionDiv.innerText = section.section_type
      //     container.appendChild(sectionDiv)
      //   })
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
