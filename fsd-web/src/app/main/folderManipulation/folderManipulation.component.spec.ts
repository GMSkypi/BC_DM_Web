import { TestBed, inject } from '@angular/core/testing';

import { FolderManipulationComponent } from './folderManipulation.component';

describe('a folderManipulation component', () => {
	let component: FolderManipulationComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				FolderManipulationComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([FolderManipulationComponent], (FolderManipulationComponent) => {
		component = FolderManipulationComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});