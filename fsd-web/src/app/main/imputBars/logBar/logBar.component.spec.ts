import { TestBed, inject } from '@angular/core/testing';

import { LogBarComponent } from './logBar.component';

describe('a logBar component', () => {
	let component: LogBarComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				LogBarComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([LogBarComponent], (LogBarComponent) => {
		component = LogBarComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});