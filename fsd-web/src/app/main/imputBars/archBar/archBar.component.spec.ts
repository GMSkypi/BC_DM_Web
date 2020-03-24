import { TestBed, inject } from '@angular/core/testing';

import { ArchBarComponent } from './archBar.component';

describe('a archBar component', () => {
	let component: ArchBarComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ArchBarComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ArchBarComponent], (ArchBarComponent) => {
		component = ArchBarComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});