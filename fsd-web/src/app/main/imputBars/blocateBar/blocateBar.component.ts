import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Document } from '../../search/searchResult/searchResult.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ErrorPopUpComponent } from 'src/popUp/errorPopUp/errorPopUp.component';
import { SnackBarComponent } from 'src/popUp/snackBar/snackBar.component';

@Component({
	selector: 'blocateBar',
	templateUrl: 'blocateBar.component.html'
})

export class BlocateBarComponent implements OnInit {
	@Input() selected: Document[];

	@Output() break = new EventEmitter<Boolean>();
	@Output() modifProduct = new EventEmitter<Document[]>();

	
	private note : String;
	private officer : String;
	private room : String;
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
		this.httpService.blocateFolder(this.selected.map(doc => doc.id),this.note,this.officer,this.room).subscribe(data =>{
			if(data.body.length !== 0){
				const dialogRef = this.dialog.open(ErrorPopUpComponent,  {
					data: {name: "Blokace",
					 text: "Blokace nemohla být provedena (nesprávný stav)",
					  values: data.body.map(product => 
						"ČU:" + product.id +
						 " LOC:" + product.documentDtoList[0].slot.location.id +
						  " POZ:" + product.documentDtoList[0].slot.number +
						  " ŘAD:" + product.documentDtoList[0].folderType.id )}})
			}
			var modobject : Document[] = this.selected.filter(doc => (data.body.find(prod => prod.documentDtoList[0].id === doc.id) === undefined))
			modobject.forEach(doc => doc.blocked = true)
			this.modifProduct.emit(modobject)
			if(this.selected.length == modobject.length){
				this._snackBar.openFromComponent(SnackBarComponent, {
					duration: 5 * 1000, data: {name: "", text: "Dokumenty byly blokovány",} 
				  });
			}
			else{
				this._snackBar.openFromComponent(SnackBarComponent, {
					duration: 5 * 1000, data: {name: "", text: "Né všechny dokumenty byly zablokovány",} 
				  });
			}
		})
	}
}