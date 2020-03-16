import { TestBed, inject } from '@angular/core/testing';

import { CrtDocABarComponent } from './crtDocABar.component';

describe('a crtDocABar component', () => {
	let component: CrtDocABarComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CrtDocABarComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([CrtDocABarComponent], (CrtDocABarComponent) => {
		component = CrtDocABarComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});