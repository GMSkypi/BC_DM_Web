import { Component, OnInit, Input } from '@angular/core';
import { Product, Document } from '../../searchResult.component';

@Component({
	selector: 'detailProductInfo',
	templateUrl: 'detailProductInfo.component.html'
})

export class DetailProductInfoComponent implements OnInit {
	@Input() product: Product;
	@Input() document: Document;

	ngOnInit() {}
}	