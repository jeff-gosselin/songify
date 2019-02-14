document.addEventListener("DOMContentLoaded", () => {

	const logo = document.querySelector('.logo');
	showContent();
	logo.addEventListener("click", showContent);



});

function showContent() {
	console.log("Hello");
	const container = document.querySelector('.container');
	container.style.color = 'rgb(61, 100, 122)';
	container.innerHTML = `
		<h1 class="headline">Collaborate on Writing Lyrics for a Song!</h1>
		<p>Each lyrical snippet you contribute can only be a maximum of 100 characters</p>
	`;

}
