import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
	name: String;
	text: string;
	values: string[];
  }

@Component({
	selector: 'errorPopUp',
	templateUrl: 'errorPopUp.component.html'
})

export class ErrorPopUpComponent implements OnInit {

	ngOnInit() {
	 }
	constructor(
		public dialogRef: MatDialogRef<ErrorPopUpComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

		onClick(): void {
			this.dialogRef.close();
		  }
}