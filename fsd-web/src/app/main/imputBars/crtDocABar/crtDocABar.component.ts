import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Product, Document, ArchBox } from '../../search/searchResult/searchResult.component';
import { ErrorPopUpComponent } from 'src/popUp/errorPopUp/errorPopUp.component';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SnackBarComponent } from 'src/popUp/snackBar/snackBar.component';

@Component({
	selector: 'crtDocABar',
	templateUrl: 'crtDocABar.component.html'
})

export class CrtDocABarComponent implements OnInit {
	@Output() break= new EventEmitter<Boolean>();
	@Input() selected: Product;
	@Output() modifProduct = new EventEmitter<Product>();

	private boxes : ArchBox[]
	private selectedBoxdId : number;

	private note : string;

	ngOnInit() { }

	cancel(){
		this.break.emit(true)
	}
	constructor(private httpService : HttpService,
		public dialog: MatDialog,
		private _snackBar: MatSnackBar){}

	ngOnChanges(changes: SimpleChanges){
		this.loadBoxes()
	}
	loadBoxes(){
		const boxIsClose : Boolean = false;
		this.httpService.findBoxes(boxIsClose).pipe(
			catchError((res: HttpErrorResponse) => {
				const dialogRef = this.dialog.open(ErrorPopUpComponent,  {
					data: {name: "Načtení krabic",
					 text: "Nepodařilo se načíst krabice na vaší lokalitě",
					  values: [res.error.message]}})
				return throwError(res);
			}))
			.subscribe(data => {
			this.boxes = data.body.elements
			if(this.boxes.length === 0){
				const dialogRef = this.dialog.open(ErrorPopUpComponent,  {
					data: {name: "Krabice",
					 text: "Na vaší lokalitě nejsou žádné otevřené krabice",}})
				this.cancel()
			}
			else{
				this.selectedBoxdId = this.boxes[0].id
			}
		})
	}
	summit(){
		this.httpService.createDocumentWArch(this.selected.id,this.note,this.selectedBoxdId).pipe(
			catchError((res: HttpErrorResponse) => {
				const dialogRef = this.dialog.open(ErrorPopUpComponent,  {
					data: {name: "Založení / Archivace",
					 text: "Dokument se nepodařilo založit a archivovat",
					  values: [res.error.message]}})
				return throwError(res);
			}))
		.subscribe(data =>{
			this.modifProduct.emit(data)
			this._snackBar.openFromComponent(SnackBarComponent, {
				duration: 5 * 1000, data: {name: "", text: "Dokument byl založen a archivován",} 
			  });
		})
	}
}