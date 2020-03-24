import { Component, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ArchBox, Product, ShredCode } from '../search/searchResult/searchResult.component';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ThrowStmt } from '@angular/compiler';
import { SnackBarComponent } from 'src/popUp/snackBar/snackBar.component';
import { ErrorPopUpComponent } from 'src/popUp/errorPopUp/errorPopUp.component';


enum selectedState {none = 0 ,redy = 1,closed = 2,}

enum displayState {search = 0 , inside = 1}

@Component({
	selector: 'archBox',
	templateUrl: 'archBox.component.html'
})

export class ArchBoxComponent implements OnInit {
	private shredCodes : ShredCode[];
	private selectedShredCodeId : String;
	private findOpenCheckBox : boolean = false;
	private boxNote : String;

	private boxes : ArchBox[] = [];
	private dataSource = new MatTableDataSource<ArchBox>(this.boxes);
	selection = new SelectionModel<ArchBox>(true, []);
	private selectedStateVal : selectedState = selectedState.none;

	private displayStateVal : displayState = displayState.search;
	foundDocumet: Product[];

	columToDisplay: string[] = [ 'select','id', 'archDate','note','state','sendDate','shredCode','location', 'creator', 'sender',];


	ngOnInit() {this.loadShredCodes() }

		constructor(private httpService : HttpService,
		public dialog: MatDialog,
		private _snackBar: MatSnackBar){}


	ngOnChanges(changes: SimpleChanges){
		this.loadShredCodes()
		this.dataSource = new MatTableDataSource<ArchBox>(changes.documents.currentValue)
		this.clearSelection()
	}

	loadShredCodes(){
		this.httpService.findAllshredCodes().subscribe(data => {
			this.shredCodes = data.body.elements
			this.selectedShredCodeId = this.shredCodes[0].id
		})
	}
	findAllBoxes(){
		this.httpService.findBoxes(this.findOpenCheckBox).subscribe(data => {
			this.boxes = data.body.elements
			this.dataSource = new MatTableDataSource<ArchBox>(this.boxes);
		})
		this.selection.clear();
	}
	createBox(){
		this.httpService.createBox(this.selectedShredCodeId,this.boxNote).subscribe(data =>{
			if(data.status == 200){
				this.boxes.push(data.body)
				this.dataSource = new MatTableDataSource<ArchBox>(this.boxes);
				this._snackBar.openFromComponent(SnackBarComponent, {
					duration: 5 * 1000, data: {name: "", text: "Krabice byla vytvořena",} 
				  });
			}
			else{
				const dialogRef = this.dialog.open(ErrorPopUpComponent,  {
					data: {name: "Vytvoření krabice",
					 text: "Krabice nemohla být vytvořena",
					  values: [data.statusText]}})
			}
		})
	}
	deleteBox(){
		if(this.selection.selected.length != 0){
			this.httpService.deleteBox(this.selection.selected[0].id).subscribe(data =>{
				if(data.status == 200){
					this.boxes = this.boxes.filter(box => box.id !== this.selection.selected[0].id)
					this.clearSelection()
					this.dataSource = new MatTableDataSource<ArchBox>(this.boxes);
					this._snackBar.openFromComponent(SnackBarComponent, {
						duration: 5 * 1000, data: {name: "", text: "Krabice byla smazána",} 
					  });
				}
				else{
					const dialogRef = this.dialog.open(ErrorPopUpComponent,  {
						data: {name: "Smazání krabice",
						 text: "Krabice nemohla být smazána",
						  values: [data.statusText]}})
				}
			})
		}
		else{
			this._snackBar.openFromComponent(SnackBarComponent, {
				duration: 5 * 1000, data: {name: "VAROVÁNÍ:", text: "Nevybrali jste žádnou krabici",} 
			  });
		}
	}
	closeBox(){
		if(this.selection.selected.length != 0){
			this.httpService.sendBox(this.selection.selected[0].id).subscribe(data =>{
				if(data.status == 200){
					this.boxes = this.boxes.filter(box => box.id !== this.selection.selected[0].id)
					this.clearSelection()
					this.boxes.push(data.body)
					this.dataSource = new MatTableDataSource<ArchBox>(this.boxes);
					this._snackBar.openFromComponent(SnackBarComponent, {
						duration: 5 * 1000, data: {name: "", text: "Krabice je uzavřena",} 
					  });
				}
				else{
					const dialogRef = this.dialog.open(ErrorPopUpComponent,  {
						data: {name: "Uzavřena krabice",
						 text: "Krabice nemohla být uzavřena",
						  values: [data.statusText]}})
				}
				
			});
		}
		else{
			this._snackBar.openFromComponent(SnackBarComponent, {
				duration: 5 * 1000, data: {name: "VAROVÁNÍ:", text: "Nevybrali jste žádnou krabici",} 
			  });
		}
	}
	insideBox(){
		this.displayStateVal = displayState.inside;
		this.httpService.inBox(this.selection.selected[0].id).subscribe(data => {
			this.foundDocumet = data.body.elements
		})
	}
	back(){
		this.displayStateVal = displayState.search;
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	  }
	
	  /** Selects all rows if they are not all selected; otherwise clear selection. */
	  masterToggle() {
		this.selection.clear()
	  }
	  handleSelection(row){
		  if(this.selection.isSelected(row)){
			this.clearSelection()
		  }
		  else{
			this.selection.clear()
			this.selection.select(row)
			if(this.selection.selected[0].state === true){
				this.selectedStateVal = selectedState.closed
			}
			else{
				this.selectedStateVal = selectedState.redy
			}
		  }
	  }
	  clearSelection(){
		this.selection.clear()
		this.selectedStateVal = selectedState.none
	  }
	
	  /** The label for the checkbox on the passed row */
	  checkboxLabel(row?: ArchBox): string {
		if (!row) {
		  return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id }`;
	  }
}