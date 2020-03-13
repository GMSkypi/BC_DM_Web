import { TestBed, inject } from '@angular/core/testing';

import { MainComponent } from './main.component';

describe('a main component', () => {
	let component: MainComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MainComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([MainComponent], (MainComponent) => {
		component = MainComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});