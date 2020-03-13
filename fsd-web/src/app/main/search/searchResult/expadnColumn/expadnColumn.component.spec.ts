import { TestBed, inject } from '@angular/core/testing';

import { ExpadnColumnComponent } from './expadnColumn.component';

describe('a expadnColumn component', () => {
	let component: ExpadnColumnComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ExpadnColumnComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ExpadnColumnComponent], (ExpadnColumnComponent) => {
		component = ExpadnColumnComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});