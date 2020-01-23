import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
	{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
	{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
	{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
	{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
	{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
	{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
	{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
	{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
	{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
	{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];


@Component({
	selector: 'searchResult',
	templateUrl: 'searchResult.component.html',
	styleUrls: ['searchResult.component.css']
})

export class SearchResultComponent implements OnInit {
	@Input() documents: Array<Document>;

	displayedColumns: string[] = ['select', 'loc_id', 'f_type', 'f_nbr', 'acc_on','doc_stat_code',
	 'search_name', 'real', 'action_id', 'archBox_nbr', 'archBox_item', 'note', 'id','doc_id'];
	//dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
	//selection = new SelectionModel<PeriodicElement>(true, []);

	dataSource = new MatTableDataSource<Document>(this.documents);
	selection = new SelectionModel<Document>(true, []);

	ngOnInit() {
	}
	ngOnChanges(changes: SimpleChanges){
		console.log(this.dataSource);
		this.dataSource = new MatTableDataSource<Document>(changes.documents.currentValue)
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
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id }`;
	  }
}
export class Document {
	arch: String;
	client_status: number;
	clnt_pass_id: String;
	public documentSet: {
	};
	public folderSet: {
	};
	home_agncy: number;
	home_brnch_agncy: number;
	id: number;
	public productSet: {
	};
	search_name: String;
	title: String;

  }
