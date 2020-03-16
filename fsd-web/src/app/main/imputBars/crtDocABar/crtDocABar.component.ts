import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Product } from '../../search/searchResult/searchResult.component';

@Component({
	selector: 'crtDocABar',
	templateUrl: 'crtDocABar.component.html'
})

export class CrtDocABarComponent implements OnInit {
	@Input() visible: boolean = false;
	@Output() break= new EventEmitter<Boolean>();
	@Input() selected: Product;

	ngOnInit() { }

	cancel(){
		this.break.emit(true)
	}
	constructor(private httpService : HttpService){}
}