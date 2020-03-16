import { Component, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Product } from '../../search/searchResult/searchResult.component';
import { MatTableDataSource } from '@angular/material';



export class Slot{
	id : number;

    location : Location;

    folder_number : number;

    row : String;

    last : boolean;
}

  
@Component({
	selector: 'crtDocFBar',
	templateUrl: 'crtDocFBar.component.html'
})

export class CrtDocFBarComponent implements OnInit {
	@Input() visible: boolean = false;
	@Input() selected: Product;
	private freeSlots : Slot[];
	private selectedSlotId : number;


	@Output() break = new EventEmitter<Boolean>();
	ngOnInit() {
		
	 }
	 ngOnChanges(changes: SimpleChanges){
		this.loadSlots()
	}
	loadSlots(){
		if(this.selected != undefined){
			console.log(this.selected)
			console.log(this.selected.productTypeCode)
			this.httpService.freeSlot(this.selected.productTypeCode).subscribe(data => {
				this.freeSlots = data.body.elements;
			});
		}
	}

	cancel(){
		this.break.emit(true)
	}
	constructor(private httpService : HttpService){}

	summit(){
		console.log(this.selectedSlotId);
	}
}
