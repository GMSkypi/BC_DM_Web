import { TestBed, inject } from '@angular/core/testing';

import { CrtDocFBarComponent } from './crtDocFBar.component';

describe('a crtDocFBar component', () => {
	let component: CrtDocFBarComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CrtDocFBarComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([CrtDocFBarComponent], (CrtDocFBarComponent) => {
		component = CrtDocFBarComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});