import { TestBed, inject } from '@angular/core/testing';

import { SnackBarComponent } from './snackBar.component';

describe('a snackBar component', () => {
	let component: SnackBarComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SnackBarComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([SnackBarComponent], (SnackBarComponent) => {
		component = SnackBarComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});