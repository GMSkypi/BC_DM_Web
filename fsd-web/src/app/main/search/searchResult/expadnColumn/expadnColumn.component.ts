import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Product, Document } from '../searchResult.component';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { HttpService } from 'src/app/http.service';
import { $ } from 'protractor';

enum displayState {default = 1,blocate = 2, picked = 3, return = 4, archive = 5, log= 6}

@Component({
	selector: 'expadnColumn',
	templateUrl: 'expadnColumn.component.html',
	styleUrls: ['expadnColumn.component.css'],
	animations: [
		trigger('detailExpand', [
		  state('collapsed', style({height: '0px', minHeight: '0'})),
		  state('expanded', style({height: '*'})),
		  transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		])]
})

export class ExpadnColumnComponent implements OnInit {
	@Input() product: Product[];
	@Input() extended : boolean;
	@Input() removable : boolean =false;
	
	columToDisplay: string[] = [ 'select','loc', 'block', 'number', 'type','archif','numberInBox','box_id','state'];
	expandedElement: Product | null;
	dataSource :any;
	selection = new SelectionModel<Document>(true, []);

	displayStateValue : displayState= displayState.default; 

	displayData : [Document,Product][];

	displayMessage : String = ""
	constructor(private httpService : HttpService){}

	ngOnInit() { 
		this.reload()
	}

	ngOnChanges(changes: SimpleChanges){
		this.reload()
	}

	reload(){
		this.displayData = [].concat.apply([],this.product.map(product => product.documentDtoList.map(document => [document,product])))
		this.dataSource = new MatTableDataSource<[Document,Product]>(this.displayData);
		this.selection.clear()
	}

	blocate(){
		if(this.selection.selected.length !== 0){
			this.displayStateValue = displayState.blocate;
		}
		
	}
	pickUp(){
		if(this.selection.selected.length !== 0){
			this.displayStateValue = displayState.picked;
		}
	}
	return(){
		if(this.selection.selected.length !== 0){
			this.displayStateValue = displayState.return;
		}

	}
	archive(){
		if(this.selection.selected.length !== 0){
			this.displayStateValue = displayState.archive;
		}
	}
	log(){
		if(this.selection.selected.length === 1){
			this.displayStateValue = displayState.log;
		}
	}
	back(){
		this.selection.clear()
		this.displayStateValue = displayState.default;
	}
	modifItem($event : Document[]){
		debugger
		if(this.removable){
			this.removeItem($event)
		}
		else{
			this.product.forEach(product => product.documentDtoList.map(document =>{
				var fDoc = $event.find(fDoc => fDoc.id === document.id)
				if(fDoc == undefined){
					return document
				}
				return fDoc
				
			}))
			this.reload()
		}
		this.back()
	}


	removeItem(doc : Document[]){
		// TODO nefunguje remove
		if(this.removable){
			debugger
			this.displayData = this.displayData.filter(element => doc.find(remDoc => remDoc.id == element[0].id) === undefined)
			this.dataSource = new MatTableDataSource<[Document,Product]>(this.displayData);
		}
	}


	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	  }
	
	  /** Selects all rows if they are not all selected; otherwise clear selection. */
	  masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	  }
	
	  /** The label for the checkbox on the passed row */
	  checkboxLabel(row?: Document): string {
		if (!row) {
		  return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
	  }
}

