document.addEventListener("DOMContentLoaded", () => {

	const contributeButton = document.querySelector('#contribute');


});

function listSongsInProgress() {
	console.log("Hello");
	const container = document.querySelector('.container');
	container.style.color = 'rgb(61, 100, 122)';
	container.innerHTML = `
		<h1>Songs Currently Being Written</h1>
		<ul class="song-list"></ul>
	`;

	fetch('http://localhost:3000/api/v1/songs')
	.then(response => response.json())
	.then(songs => songs.forEach(song => {

		if (song.complete === false) {

			let songTitle = document.createElement('li');
			let songList = document.querySelector('.song-list');
			songTitle.setAttribute("data-id", `${song.id}`);
			songTitle.style.listStyle = 'none';
			songTitle.innerText = song.title;
			songList.append(songTitle);

			songTitle.addEventListener("click", showSongInProgress)

		}

	}))

}
