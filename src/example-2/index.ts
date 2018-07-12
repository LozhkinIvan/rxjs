import { fromEvent } from "rxjs";
import { bufferCount } from "rxjs/operators";

const button = document.querySelector('button');
const output = document.querySelector('output');

fromEvent(button, 'click')
	.pipe(
		bufferCount(3)
	)
	.subscribe((res) => {
		output.textContent = Math.random().toString(36).slice(2);
	});