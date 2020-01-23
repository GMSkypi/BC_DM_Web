import { TestBed, inject } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';

describe('a topbar component', () => {
	let component: TopbarComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				TopbarComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([TopbarComponent], (TopbarComponent) => {
		component = TopbarComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});