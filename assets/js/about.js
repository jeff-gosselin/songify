document.addEventListener("DOMContentLoaded", () => {

	const logo = document.querySelector('.logo');
	showContent();
	logo.addEventListener("click", showContent);



});

function showContent() {
	const container = document.querySelector('.container');
	container.style.color = 'rgb(61, 100, 122)';
	container.innerHTML = `
		<h1 class="headline">Collaborate on Writing Lyrics for a Song!</h1>
		<p id="instructions">SongScribe allows users to write song lyrics in collaboration with others. Each song written on SongScribe is built with sections, and is completed when 8 sections are filled with content. There are 2 types of sections in a SongScribe song, a verse, and a chorus. Each verse only allows for 4 lyrical snippets, and a chorus allows for only 2. What is a snippet? A snippet is user submitted lyrics and can only be a maximum of 100 characters.</p>
	`;

}
