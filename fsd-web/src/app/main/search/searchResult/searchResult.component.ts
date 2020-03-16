import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
	selector: 'searchResult',
	templateUrl: 'searchResult.component.html',
	styleUrls: ['searchResult.component.css'],
	animations: [
		trigger('detailExpand', [
		  state('collapsed', style({height: '0px', minHeight: '0'})),
		  state('expanded', style({height: '*'})),
		  transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		])]
})

export class SearchResultComponent implements OnInit {
	@Input() documents: Array<Product>;

	
	columToDisplay: string[] = [ 'select','id', 'name','title','passId','homeBranch','productTypeCode', 'branchCode', 'created','expired',];
	expandedElement: Product | null;
	dataSource = new MatTableDataSource<Product>(this.documents);
	selection = new SelectionModel<Product>(true, []);
	@Output() outputSelection = new EventEmitter<Product[]>();

	ngOnInit() {
	}
	ngOnChanges(changes: SimpleChanges){
		console.log(this.dataSource);
		this.dataSource = new MatTableDataSource<Product>(changes.documents.currentValue)
		this.clearSelection()
	}


	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	  }
	
	  /** Selects all rows if they are not all selected; otherwise clear selection. */
	  masterToggle() {
		this.selection.clear()
		this.outputSelection.emit(this.selection.selected)
	  }
	  handleSelection(row){
		  if(this.selection.isSelected(row)){
			this.clearSelection()
		  }
		  else{
			this.selection.clear()
			this.selection.select(row)
			this.outputSelection.emit(this.selection.selected)
		  }
	  }
	  clearSelection(){
		this.selection.clear()
		this.outputSelection.emit(this.selection.selected)
	  }
	
	  /** The label for the checkbox on the passed row */
	  checkboxLabel(row?: Product): string {
		if (!row) {
		  return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id }`;
	  }
}
export class Pagable<T>{
	elementsCount : number;
    elements : T[];
}
export class Client{
	id: number ;

	passId: String;

	homeBranch: number;

	name: String;

	title: String;
}
export class FolderType{
	id: String;

    text: String;

    productTypeCode: number;

    archived: boolean;

    lastAccessAction: String;
}
export class FolderSlot{
	id : number;

    archived: boolean;

    number: number;

    note: String;

    location: Location;

}
export class Location{
	id: String;

    name: String;

    branchCode: number;

    creatDate: Date;

    unUsed: boolean;
}
export class ArchRecord{
	id: number;

    pnumberInBox: number;

    archBox: ArchBox;
}
export class ArchBox{
	id: number;

    archDate: Date;

    note: String;

    state: boolean;

    sendDate: Date;

    shredCode : ShredCode;

    location : Location;

    creator : String;

    sender: String;
}
export class ShredCode{
	id : String;

    text: String;
}
export class Document{
	id: number;

	note: String;

	client  : Client;

	folderType : FolderType;

	slot: FolderSlot;

	lastState: String;

	archRecord: ArchRecord;

	isBlocked : boolean;
}

export class Product {
	id : number;

    productTypeCode : number;

	branchCode : number;

    created : Date;

    expired : Date;

	client : Client;

    documentDtoList : Array<Document>;
  }
