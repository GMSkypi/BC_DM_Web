import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
	selector: 'unauthorizedPopUp',
	templateUrl: 'unauthorizedPopUp.component.html'
})

export class UnauthorizedPopUpComponent implements OnInit {

	ngOnInit() { }
	constructor(public dialogRef: MatDialogRef<UnauthorizedPopUpComponent>,
		private router: Router,){}

	onClick(){
		this.dialogRef.close();
	}
	login(){
		this.dialogRef.close();
		this.router.navigate(['login']);
	}
}