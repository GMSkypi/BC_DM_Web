import { TestBed, inject } from '@angular/core/testing';

import { ErrorPopUpComponent } from './errorPopUp.component';

describe('a errorPopUp component', () => {
	let component: ErrorPopUpComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ErrorPopUpComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ErrorPopUpComponent], (ErrorPopUpComponent) => {
		component = ErrorPopUpComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});