document.addEventListener("DOMContentLoaded", () => {

	const contributeButton = document.querySelector('#contribute');
	listSongsInProgress();

});

function listSongsInProgress() {
	console.log("Hello");
	const container = document.querySelector('.container');
	container.style.color = 'rgb(61, 100, 122)';
	container.innerHTML = `
		<h1>Songs Currently Being Written</h1>
	`;

	fetch('http://localhost:3000/api/v1/songs')
	.then(response => response.json())
	.then(songs => songs.forEach(song => {

		console.log(song.title);

	}))

}
