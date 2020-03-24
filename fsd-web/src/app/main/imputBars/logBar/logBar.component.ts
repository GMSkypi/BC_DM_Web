import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../../search/searchResult/searchResult.component';
import { HttpService } from 'src/app/http.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorPopUpComponent } from 'src/popUp/errorPopUp/errorPopUp.component';
import { throwError } from 'rxjs';

@Component({
	selector: 'logBar',
	templateUrl: 'logBar.component.html'
})

export class LogBarComponent implements OnInit {
	@Input() selected: Document[];

	@Output() break = new EventEmitter<Boolean>();
	@Output() modifProduct = new EventEmitter<Document[]>();

	private foundLog : FolderLog[];

	ngOnInit() { 
		if(this.selected.length === 1){
			this.httpService.findFolderLog(this.selected[0].id).pipe(
				catchError((res: HttpErrorResponse) => {
					const dialogRef = this.dialog.open(ErrorPopUpComponent,  {
						data: {name: "Log",
						 text: "Nepodařilo se načíst log dokumentu",
						  values: [res.error.message]}})
					return throwError(res);
				}))
				.subscribe(data =>{
				this.foundLog = data.body.elements
			})
		}
	}

	cancel(){
		this.break.emit(true)
	}
	constructor(private httpService : HttpService,
		public dialog: MatDialog,
		private _snackBar: MatSnackBar){}
}


export class FolderLog {

    id : number;

    actionDate : Date;

    note : String;

    accessLog : FolderAccessLog;

    action : String;

	user : String;
}
	


export class FolderAccessLog {

	id : number;
	
	officer : String;

	room : String;
}