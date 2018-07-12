import { fromEvent } from "rxjs";
import { bufferWhen, filter, delay } from "rxjs/operators";

const output = document.querySelector('output');
const button = document.querySelector('button');

const click$ = fromEvent(button, 'click');

click$
	.pipe(
		bufferWhen(() => click$.pipe(delay(400))),
		filter(events => events.length >= 3)
	)
	.subscribe((res) => {
		output.textContent = Math.random().toString(36).slice(2);
	});