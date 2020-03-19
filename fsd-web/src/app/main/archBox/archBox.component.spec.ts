import { TestBed, inject } from '@angular/core/testing';

import { ArchBoxComponent } from './archBox.component';

describe('a archBox component', () => {
	let component: ArchBoxComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ArchBoxComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ArchBoxComponent], (ArchBoxComponent) => {
		component = ArchBoxComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});