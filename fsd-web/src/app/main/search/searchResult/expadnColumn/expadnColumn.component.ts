import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Product, Document } from '../searchResult.component';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
	@Input() product: Product;
	@Input() extended : boolean;
	
	columToDisplay: string[] = [ 'select','loc', 'block', 'number', 'type','archif','numberInBox','box_id','state'];
	expandedElement: Product | null;
	dataSource :any;
	selection = new SelectionModel<Product>(true, []);
	

	ngOnInit() { 
		this.dataSource = new MatTableDataSource<Document>(this.product.documentDtoList);
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
	  checkboxLabel(row?: Product): string {
		if (!row) {
		  return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id }`;
	  }
}

