import { TestBed, inject } from '@angular/core/testing';

import { ReturnBarComponent } from './returnBar.component';

describe('a returnBar component', () => {
	let component: ReturnBarComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ReturnBarComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ReturnBarComponent], (ReturnBarComponent) => {
		component = ReturnBarComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});