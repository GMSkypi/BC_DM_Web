import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../../search/searchResult/searchResult.component';
import { HttpService } from 'src/app/http.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ErrorPopUpComponent } from 'src/popUp/errorPopUp/errorPopUp.component';
import { SnackBarComponent } from 'src/popUp/snackBar/snackBar.component';

@Component({
	selector: 'returnBar',
	templateUrl: 'returnBar.component.html'
})

export class ReturnBarComponent implements OnInit {
	@Input() selected: Document[];

	@Output() break = new EventEmitter<Boolean>();
	@Output() modifProduct = new EventEmitter<Document[]>();
	
	private note : String;

	ngOnInit() { }

	cancel(){
		this.break.emit(true)
	}
	constructor(private httpService : HttpService,
		public dialog: MatDialog,
		private _snackBar: MatSnackBar){}

	summit(){
		if(this.selected.length === 0){
			return
		}
		this.httpService.returnFolder(this.selected.map(doc => doc.id),this.note).subscribe(data =>{
			if(data.body.length !== 0){
				const dialogRef = this.dialog.open(ErrorPopUpComponent,  {
					data: {name: "Vráceni",
					 text: "Vráceni nemohla být provedeno (nesprávný stav)",
					  values: data.body.map(product => 
						"ČU:" + product.id +
						 " LOC:" + product.documentDtoList[0].slot.location.id +
						  " POZ:" + product.documentDtoList[0].slot.number +
						  " ŘAD:" + product.documentDtoList[0].folderType.id )}})
			}
			var modobject : Document[] = this.selected.filter(doc => (data.body.find(prod => prod.documentDtoList[0].id === doc.id) === undefined))
			modobject.forEach(doc => doc.blocked = false)
			this.modifProduct.emit(modobject)
			if(this.selected.length == modobject.length){
				this._snackBar.openFromComponent(SnackBarComponent, {
					duration: 5 * 1000, data: {name: "", text: "Dokumenty byly vráceny",} 
				  });
			}
			else{
				this._snackBar.openFromComponent(SnackBarComponent, {
					duration: 5 * 1000, data: {name: "", text: "Né všechny dokumenty byly vráceny",} 
				  });
			}
		})
	}	
}