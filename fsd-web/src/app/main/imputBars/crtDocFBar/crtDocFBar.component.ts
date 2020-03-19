import { Component, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Product } from '../../search/searchResult/searchResult.component';
import { MatTableDataSource } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';




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
	private docNote : String;
	private folderNote : String;

	private message : String = "";


	@Output() break = new EventEmitter<Boolean>();
	@Output() modifProduct = new EventEmitter<Product>();
	ngOnInit() {
		
	 }
	 ngOnChanges(changes: SimpleChanges){
		this.loadSlots()
	}
	loadSlots(){
		if(this.selected != undefined){
			this.httpService.freeSlot(this.selected.productTypeCode).subscribe(data => {
				this.freeSlots = data.body.elements;
				this.selectedSlotId = this.freeSlots[0].id		
			});
		}
	}

	cancel(){
		this.break.emit(true)
	}
	constructor(private httpService : HttpService){}

	summit(){
		this.httpService.createDocumentWSlot(this.selected.id,this.docNote,this.selectedSlotId,this.folderNote).pipe(
			catchError((res: HttpErrorResponse) => {
				this.message = "Dokument se nepadařilo založit: " + res.error.message
				return throwError(res);
			}))
		.subscribe(data =>{
			this.message = "Dokument byl založen"
			this.modifProduct.emit(data.body)
		})
		this.selectedSlotId = undefined;
		this.docNote = undefined;
		this.folderNote = undefined;
	}
}
