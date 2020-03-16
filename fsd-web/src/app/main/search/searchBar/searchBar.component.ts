
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { Product, SearchResultComponent } from '../searchResult/searchResult.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


enum displayState {none = 1,selected = 2, createDocArch = 3, createDocFile = 4}


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

	displayDocument: Product[];


	totalNumber : number;
	selectedProduct: Product[];

	buttonDisabled : boolean = true;

	displayStateValue : displayState = displayState.none;
	

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
		
		if(this.displayStateValue == displayState.none || this.displayStateValue == displayState.selected ){
			this.selectedProduct = $event;
			this.selectedProduct.length != 0 ? this.displayStateValue = displayState.selected  : this.displayStateValue = displayState.none
		}
	 }
	 defaultState($event){
		this.displayStateValue = displayState.none
		this.displayDocument = this.foundDocumet;
		
	 }

	 handleCreateWArch(){
		this.displayStateValue = displayState.createDocArch
		this.displayDocument = this.selectedProduct
		
		
	}
	handleCreateWSlot(){
		this.displayStateValue = displayState.createDocFile
		this.displayDocument = this.selectedProduct
		
	}
	


	handleFind(){
		if(this.searchForm.valid){
			this.httpService.productFind(this.searchForm.value).subscribe(data => {
				console.log(data);
				this.foundDocumet = data.body.elements;
				this.totalNumber = data.body.elementsCount;
				this.displayDocument = this.foundDocumet;
			});
			 
		 }
		 else{
			 console.log("invalid");
		 }
		 
	}

}
