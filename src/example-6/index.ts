import { concatMap, delay, tap, scan, map, switchMap, mergeMap } from 'rxjs/operators';
import { of, fromEvent, Observable, Subject } from 'rxjs';
import './style.scss';

const update = document.getElementById('update');
const outlet = document.getElementById('outlet');

const source$ = fromEvent(update, "click")

source$.pipe(
	scan(acc => acc + 1, 0),
	map(count => `Message ${count}`),
	//concatMap(message => showAlert(message))
	mergeMap(message => showAlert(message), 5)
)
.subscribe();

function showAlert(message: string): Observable<HTMLElement> {
	return of(message).pipe(
		map(message => renderAlert(message)),
		delay(1000),
		mergeMap(alert => hideAlert(alert)),
		tap(markRemovedAlert),
		delay(1000),
		tap(removeAlert)
	)
}

function hideAlert(alert: HTMLElement): Observable<HTMLElement> {
	const close$ = new Subject<HTMLElement>();
	const close = renderClose(alert);
	close.addEventListener('click', () => {
		close$.next(alert);
		close$.complete();
	});
	return close$;
}

/**
 * Html functions 
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

