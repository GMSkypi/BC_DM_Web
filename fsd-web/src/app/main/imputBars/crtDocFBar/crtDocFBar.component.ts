import { Component, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Product } from '../../search/searchResult/searchResult.component';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorPopUpComponent } from 'src/popUp/errorPopUp/errorPopUp.component';
import { SnackBarComponent } from 'src/popUp/snackBar/snackBar.component';




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
	@Input() selected: Product;
	private freeSlots : Slot[];


	private selectedSlotId : number;
	private docNote : String;
	private folderNote : String;



	@Output() break = new EventEmitter<Boolean>();
	@Output() modifProduct = new EventEmitter<Product>();
	ngOnInit() {
		
	 }
	 ngOnChanges(changes: SimpleChanges){
		this.loadSlots()
	}
	loadSlots(){
		if(this.selected != undefined){
			this.httpService.freeSlot(this.selected.productTypeCode).pipe(
				catchError((res: HttpErrorResponse) => {
					const dialogRef = this.dialog.open(ErrorPopUpComponent,  {
						data: {name: "Prázdná složka",
						 text: "Nepodařilo se načíst prázdné složky",
						  values: [res.error.message]}})
					return throwError(res);
				}))
				.subscribe(data => {
				this.freeSlots = data.body.elements;
				this.selectedSlotId = this.freeSlots[0].id		
			});
		}
	}

	cancel(){
		this.break.emit(true)
	}
	constructor(private httpService : HttpService,
		public dialog: MatDialog,
		private _snackBar: MatSnackBar){}

	summit(){
		this.httpService.createDocumentWSlot(this.selected.id,this.docNote,this.selectedSlotId,this.folderNote).pipe(
			catchError((res: HttpErrorResponse) => {
				const dialogRef = this.dialog.open(ErrorPopUpComponent,  {
					data: {name: "Založení složky",
					 text: "Dokument se nepodařilo založit",
					  values: [res.error.message]}})
				return throwError(res);
			}))
		.subscribe(data =>{
			this.modifProduct.emit(data.body)
			this._snackBar.openFromComponent(SnackBarComponent, {
				duration: 5 * 1000, data: {name: "", text: "Dokument byl založen",} 
			  });
		})
	}
}
