import { range } from 'rxjs';
import { tap } from 'rxjs/operators';

const output = document.querySelector("#output");

range(1, 6)
	.pipe(
		tap(render)
	)
	.subscribe(val => console.log(val));


function render(num: number) {
	output.innerHTML += `<li><a href="example-${num}/index.html">example-${num}</a></li>`;
}