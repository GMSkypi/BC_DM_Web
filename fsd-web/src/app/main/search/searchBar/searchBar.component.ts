
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { Product } from '../searchResult/searchResult.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';




@Component({
	selector: 'searchBar', 
	templateUrl: 'searchBar.component.html',
	styleUrls: ['searchBar.component.css']
})
export class SearchBarComponent implements OnInit {
	
	constructor(private httpService : HttpService,
		private http: HttpClient,
		private router: Router){}

	private searchForm: FormGroup;
	noDigitsRegex = "^[a-zA-ZáčďéěíňóřšťůúýžÁČĎÉĚÍŇÓŘŠŤŮÚÝŽ \']*$";
	birthNumberRegex  = "^[0-9/]*$";
	onlyNumber = "^[0-9]*$";

	foundDocumet: Product[];
	totalNumber : number;
	selectedProduct: Product[];

	buttonDisabled : boolean = true;
	

	ngOnInit() {
		let account = new FormControl("", Validators.pattern(this.onlyNumber));
    	let kbi = new FormControl("", Validators.pattern(this.onlyNumber)); 
    	let einBn = new FormControl("", Validators.pattern(this.onlyNumber));
		let clientName = new FormControl("", Validators.pattern(this.noDigitsRegex));

		this.searchForm = new FormGroup({
			clientName : clientName,
			einBn : einBn,
			account : account,
			kbi : kbi
		  })
	 }

	 onSubmit(){
		 
		
	 }
	 loadSelection($event){
		this.selectedProduct = $event;
		this.selectedProduct.length != 0 ? this.buttonDisabled = false  : this.buttonDisabled = true
		
	 }

	 handleCreate(){
		this.buttonDisabled = true;
		console.log(this.selectedProduct)
	}
	handleFind(){
		if(this.searchForm.valid){
			console.log("valid");
			this.httpService.productFind(this.searchForm.value).subscribe(data => {
				console.log(data);
				this.foundDocumet = data.body.elements;
				this.totalNumber = data.body.elementsCount;
			});
			 
		 }
		 else{
			 console.log("invalid");
		 }
	}

}
