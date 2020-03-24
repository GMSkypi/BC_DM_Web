import { TestBed, inject } from '@angular/core/testing';

import { PickUpBarComponent } from './pickUpBar.component';

describe('a pickUpBar component', () => {
	let component: PickUpBarComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				PickUpBarComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([PickUpBarComponent], (PickUpBarComponent) => {
		component = PickUpBarComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});