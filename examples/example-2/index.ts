import { fromEvent } from "rxjs";
import { bufferCount, tap, map } from "rxjs/operators";

const button = document.querySelector('button');
const output = document.querySelector('output');

const observable$ = fromEvent(button, 'click')
	.pipe(
		tap(res => console.log('tap1', res)),
		bufferCount(3),
		map(res => {
			console.log('map', res);
			return "123"
		}),
		tap(res => console.log('tap2', res))
	);

observable$.subscribe((res) => {
	console.log(res);
	output.textContent = Math.random().toString(36).slice(2);
});