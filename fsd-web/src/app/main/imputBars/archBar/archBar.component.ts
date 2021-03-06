import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Document, ArchBox } from '../../search/searchResult/searchResult.component';
import { HttpService } from 'src/app/http.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ErrorPopUpComponent } from 'src/popUp/errorPopUp/errorPopUp.component';
import { SnackBarComponent } from 'src/popUp/snackBar/snackBar.component';

@Component({
	selector: 'archBar',
	templateUrl: 'archBar.component.html'
})

export class ArchBarComponent implements OnInit {
	@Input() selected: Document[];

	@Output() break = new EventEmitter<Boolean>();
	@Output() modifProduct = new EventEmitter<Document[]>();
	
	private boxes : ArchBox[]
	private selectedBoxdId : number;
	private note : string;
	cancel(){
		this.break.emit(true)
	}
	constructor(private httpService : HttpService,
		public dialog: MatDialog,
		private _snackBar: MatSnackBar){}
		
	ngOnInit() { }
	
	ngOnChanges(changes: SimpleChanges){
		this.loadBoxes()
	}
	loadBoxes(){
		const boxIsClose : Boolean = false;
		this.httpService.findBoxes(boxIsClose).subscribe(data => {
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
		this.httpService.archiveDocument(this.selected.map(doc => doc.id),this.selectedBoxdId,this.note).subscribe(data =>{
			if(data.body.length !== 0){
				const dialogRef = this.dialog.open(ErrorPopUpComponent,  {
					data: {name: "Archivace",
					 text: "Archivace nemohla být provedena (nesprávný stav dokumentu)",
					  values: data.body.map(product => 
						"ČU:" + product.id +
						 " LOC:" + product.documentDtoList[0].slot.location.id +
						  " POZ:" + product.documentDtoList[0].slot.number +
						  " ŘAD:" + product.documentDtoList[0].folderType.id )}})
			}
			var modobject : Document[] = this.selected.filter(doc => (data.body.find(prod => prod.documentDtoList[0].id === doc.id) === undefined))
			this.modifProduct.emit(modobject)
			if(this.selected.length == modobject.length){
				this._snackBar.openFromComponent(SnackBarComponent, {
					duration: 5 * 1000, data: {name: "", text: "Dokumenty byly přidány do krabice",} 
				  });
			}
			else{
				this._snackBar.openFromComponent(SnackBarComponent, {
					duration: 5 * 1000, data: {name: "", text: "Né všechny dokumenty byly přidány do krabice",} 
				  });
			}
		})
	}
}

