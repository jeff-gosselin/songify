document.addEventListener("DOMContentLoaded", () => {

	const contributeButton = document.querySelector('#contribute');


});

function listSongsInProgress() {
	const container = document.querySelector('.container');
	container.style.color = 'rgb(61, 100, 122)';
	container.innerHTML = `
		<h1 class="headline">Songs Currently Being Written</h1>
		<ul class="song-list"></ul>
	`;

	fetch('http://localhost:3000/api/v1/songs')
	.then(response => response.json())
	.then(songs => songs.forEach(song => {

		if (song.complete === false) {

			let songTitle = document.createElement('li');
			let editIcon = document.createElement('div');
			let songList = document.querySelector('.song-list');
			songTitle.setAttribute("data-id", `${song.id}`);
			songTitle.className = "song-title";
			songTitle.style.listStyle = 'none';
			songTitle.innerText = song.title;

			editIcon.className = "edit-icon";

			songList.append(songTitle);
			songTitle.append(editIcon);

			songTitle.addEventListener("click", showSongInProgress);
			songTitle.addEventListener("mouseover", hoverSound);

		}

	}))

}

function hoverSound(e) {
	var audio = document.getElementsByTagName("audio")[0];
	audio.play();
}

function showSongInProgress(e) {
	let id = e.target.dataset.id;

	fetch(`http://localhost:3000/api/v1/songs/${id}`)
	.then(response => response.json())
	.then(song => {

		const container = document.querySelector('.container');
		container.style.color = 'rgb(61, 100, 122)';
		container.innerHTML = `
			<h1 class="headline">${song.title}</h1>`;
			displaySections(song);



		// song.sections.forEach(section => {
		// 	console.log(section);
		// })





		// verseSectionForm();

	})


}


function verseSectionForm(div) {
	// const container = document.querySelector('.container');
	let vForm = document.createElement('form');
	vForm.className = "snippet-form"

	//vForm.setAttribute("data-id", )
	vForm.innerHTML = `
		<textarea name="snippet" class="effect-1" data-type="verse" placeholder="Drop a line or two here." rows="2" required></textarea>
		<input class="submit" name="submit" type="submit" value="Submit Lyrical Snippet">
	`;
	vForm.addEventListener('submit', submitSnippet);
	div.append(vForm);
}

function submitSnippet(e) {
	e.preventDefault();
	const section_id = e.target.parentElement.id.slice(8);
	const content = e.target.snippet.value;

	fetch(`http://localhost:3000/api/v1/snippets`, {
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
	.then(snippet => console.log(snippet))
}

function displaySections(song) {
	// let sectionContentArray = [];
	let p = document.createElement('p');
	const container = document.querySelector('.container');
	// let verse = song.sections.filter(section => {
	// 		section.section_type === "verse"
	// })
	// console.log(verse);

	// if (song.sections.length === 0) {
	// 	verseSectionForm();
	// }

	song.sections.forEach(section => {
		const sectionDiv = document.createElement('div');
		const labelDiv = document.createElement('div');
		labelDiv.className = "section-label";
		labelDiv.innerHTML = `<span class="section-label-text">${section.section_type}</span>`;
		sectionDiv.style.position = "relative";
		sectionDiv.id = `section-${section.id}`;
		sectionDiv.className = "section-div"
		container.append(sectionDiv);
		sectionDiv.append(labelDiv);
	})

	song.snippets.forEach(snippet => {
		const sectionDiv = document.getElementById(`section-${snippet.section_id}`);
		const snippetDiv = document.createElement('div');
		snippetDiv.id = `snippet-${snippet.id}`;
		snippetDiv.innerText = snippet.content;
		sectionDiv.append(snippetDiv);

	})

	const existingSectionDivs = Array.from(document.getElementsByClassName("section-div"))
	existingSectionDivs.forEach(div => verseSectionForm(div))
	if(existingSectionDivs.length === 0){
		const sectionDiv = document.createElement('div');
		const labelDiv = document.createElement('div');
		labelDiv.className = "section-label";
		sectionDiv.style.position = "relative";
		sectionDiv.className = "section-div"
		container.append(sectionDiv);
		sectionDiv.append(labelDiv);
		verseSectionForm(sectionDiv)
	}
	// console.log(sectionContentArray);

}
