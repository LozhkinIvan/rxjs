import { fromEvent, Observable } from 'rxjs';

const output = document.querySelector('output');
const button = document.querySelector('button');

const observable$: Observable<Event> = fromEvent(button, 'click');

observable$.subscribe((event: Event) => {
	console.log(event);
	output.textContent = Math.random().toString(36).slice(2);
});