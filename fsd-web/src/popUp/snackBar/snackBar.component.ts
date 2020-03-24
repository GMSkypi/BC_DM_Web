import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';


export interface DialogData {
	name: String;
	text: string;
  }
@Component({
	selector: 'snackBar',
	templateUrl: 'snackBar.component.html'
})

export class SnackBarComponent implements OnInit {
	
	ngOnInit() { }

	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: DialogData) { }

}