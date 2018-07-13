import { fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";
import { tap, mergeMap, switchMap, concatMap, debounceTime, throttleTime } from "rxjs/operators";

const output = document.querySelector("output");
const button = document.querySelector("button");

fromEvent(button, "click")
	.pipe(
		concatMap(getAlbums),		
		tap(result => console.log(result))
	)
	.subscribe(render, err => console.error(err));

function getAlbums() {
	const userId = Math.round(Math.random() * 10);
	return ajax(
		`https://jsonplaceholder.typicode.com/albums?userId=${userId}`
	);
}

function render(res: any) {
	output.innerHTML = "";
	for (const post of res.response) {
		const article = document.createElement("article");
		const h1 = document.createElement("h1");
		const p = document.createElement("p");
		h1.textContent = post.title;
		p.textContent = `id:${post.id} userId: ${post.userId}`;
		article.appendChild(h1);
		article.appendChild(p);
		output.appendChild(article);
	}
}