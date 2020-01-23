
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpService} from '../../http.service';



@Component({
	selector: 'searchBar', 
	templateUrl: 'searchBar.component.html',
	styleUrls: ['searchBar.component.css']
})
export class SearchBarComponent implements OnInit {
	


	constructor(private http: HttpService){}

	private searchForm: FormGroup;
	noDigitsRegex = "^[a-zA-ZáčďéěíňóřšťůúýžÁČĎÉĚÍŇÓŘŠŤŮÚÝŽ \']*$";
	birthNumberRegex  = "^[0-9/]*$";
	onlyNumber = "^[0-9]*$";
	  
	entriesPerPage = 30;
	currentPage = 0;

	foundDocumet: any[];


	ngOnInit() {
		let account = new FormControl("", Validators.pattern(this.onlyNumber));
    	let Kbid = new FormControl("", Validators.pattern(this.onlyNumber)); 
    	let einBn = new FormControl("", Validators.pattern(this.birthNumberRegex));
		let clientName = new FormControl("", Validators.pattern(this.noDigitsRegex));

		this.searchForm = new FormGroup({
			clientName : clientName,
			einBn : einBn,
			account : account,
			Kbid : Kbid
		  })
	 }
	 onSubmit(){
		 if(this.searchForm.valid){
			console.log("valid");
			this.http.getDocuments(this.searchForm.value, this.entriesPerPage, this.currentPage).subscribe(data => {
				this.foundDocumet = data;
			});
		 }
		 else{
			 console.log("invalid");
		 }
		
	 }

}
