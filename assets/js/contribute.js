document.addEventListener("DOMContentLoaded", () => {

	const contributeButton = document.querySelector('#contribute');


});

function listSongsInProgress() {
	console.log("Hello");
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
			<h1 class="headline">${song.title}</h1>`

		// song.snippets.forEach(snippet => {
		//	console.log(song);
		// })


		verseSectionForm();

	})


}


function verseSectionForm() {
	const container = document.querySelector('.container');
	let vForm = document.createElement('form');

	//vForm.setAttribute("data-id", )
	vForm.innerHTML = `
		<textarea data-type="verse" placeholder="Drop a line or two here." rows="2"></textarea>
		<input name="submit" type="submit">
	`;
	vForm.submit.addEventListener('click', submitSnippet);
	container.append(vForm);
}

function submitSnippet(e) {
	e.preventDefault();
	console.log("Snippet Submitted");
}
