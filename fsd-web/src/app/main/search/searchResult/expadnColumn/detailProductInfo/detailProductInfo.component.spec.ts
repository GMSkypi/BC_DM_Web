import { TestBed, inject } from '@angular/core/testing';

import { DetailProductInfoComponent } from './detailProductInfo.component';

describe('a detailProductInfo component', () => {
	let component: DetailProductInfoComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DetailProductInfoComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([DetailProductInfoComponent], (DetailProductInfoComponent) => {
		component = DetailProductInfoComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});