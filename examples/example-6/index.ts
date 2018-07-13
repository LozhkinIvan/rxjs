import { delay, tap, scan, map, mergeMap, first } from 'rxjs/operators';
import { of, fromEvent, Observable } from 'rxjs';
import './style.scss';

const update = document.getElementById('update');
const outlet = document.getElementById('outlet');

const source$: Observable<string> = fromEvent(update, "click").pipe(
	scan(acc => acc + 1, 0),
	map(count => `Message ${count}`)
)

source$.pipe(
	mergeMap(message => createAlert(message), 5)
)
	.subscribe();

function createAlert(message: string): Observable<HTMLElement> {
	return of(message).pipe(
		map(message => renderAlert(message)),
		delay(4000),
		mergeMap(alert => createCloseButton(alert)),
		tap(markRemovedAlert),
		delay(1000),
		tap(removeAlert)
	)
}

function createCloseButton(alert: HTMLElement): Observable<HTMLElement> {
	const close = renderClose(alert);
	const close$ = fromEvent(close, 'click')
		.pipe(
			first(),
			map(() => alert)
		);

	return close$;
}

/**
 * Html render functions 
 * */
function renderAlert(message: string): HTMLElement {
	const alert = document.createElement('div');
	alert.setAttribute('class', 'alert show');
	alert.textContent = message;
	return outlet.appendChild(alert);
}

function markRemovedAlert(alert: HTMLElement): void {
	alert.setAttribute('class', 'alert hide');
}

function removeAlert(alert: HTMLElement): void {
	outlet.removeChild(alert);
}

function renderClose(alert: HTMLElement): HTMLElement {
	const close = document.createElement('button');
	close.setAttribute('class', 'close');
	close.textContent = '✖';
	return alert.appendChild(close);
}

