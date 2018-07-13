import { fromEvent, combineLatest } from "rxjs";
import { map, switchMap, debounceTime } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

interface InputEvent extends Event {
	target: HTMLInputElement;
}

const input = document.querySelector("input");
const select = document.querySelector("select");
const output = document.querySelector("output");

const id$ = fromEvent(input, "input")
	.pipe(
		map((e: InputEvent) => e.target.value)
	);

const resource$ = fromEvent(select, "change")
	.pipe(
		map((e: InputEvent) => e.target.value)
	);

const data$ = combineLatest(id$, resource$)
	.pipe(
		switchMap(getResources)
	);

data$.subscribe(render);

function getResources([id, resource]: [string, string]) {
	return ajax(
		`https://jsonplaceholder.typicode.com/${resource}?userId=${id}`
	);
}

function render(res: any) {
	output.innerHTML = "";
	const articles = document.createDocumentFragment();
	for (const post of res.response) {
		const article = document.createElement("article");
		const h1 = document.createElement("h1");
		const p = document.createElement("p");
		h1.textContent = post.title;
		article.appendChild(h1);
		p.textContent = post.body;
		article.appendChild(p);
		articles.appendChild(article);
	}
	output.appendChild(articles);
}