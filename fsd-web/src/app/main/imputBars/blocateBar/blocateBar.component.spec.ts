import { TestBed, inject } from '@angular/core/testing';

import { BlocateBarComponent } from './blocateBar.component';

describe('a blocateBar component', () => {
	let component: BlocateBarComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				BlocateBarComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([BlocateBarComponent], (BlocateBarComponent) => {
		component = BlocateBarComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});