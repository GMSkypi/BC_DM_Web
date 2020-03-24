import { TestBed, inject } from '@angular/core/testing';

import { UnauthorizedPopUpComponent } from './unauthorizedPopUp.component';

describe('a unauthorizedPopUp component', () => {
	let component: UnauthorizedPopUpComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				UnauthorizedPopUpComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([UnauthorizedPopUpComponent], (UnauthorizedPopUpComponent) => {
		component = UnauthorizedPopUpComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});