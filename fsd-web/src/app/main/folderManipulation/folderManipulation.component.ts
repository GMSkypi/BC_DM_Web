import { Component, OnInit } from '@angular/core';
import { Product } from '../search/searchResult/searchResult.component';
import { HttpService } from 'src/app/http.service';

@Component({
	selector: 'folderManipulation',
	templateUrl: 'folderManipulation.component.html'
})

export class FolderManipulationComponent implements OnInit {
	private searchResult : Product[]


	constructor(private httpService : HttpService){}

	ngOnInit() { }


	findOwnBlocation(){
		this.httpService.findOwnBlocked().subscribe(data =>{
			this.searchResult = data.body.elements
		})
	}
	findAllBlocation(){
		this.httpService.findAllBlocked().subscribe(data =>{
			this.searchResult = data.body.elements
		})
	}
	findOwnPickUp(){
		this.httpService.findOwnPickUp().subscribe(data =>{
			this.searchResult = data.body.elements
		})
	}
	findAllPickUp(){
		this.httpService.findAllPickUp().subscribe(data =>{
			this.searchResult = data.body.elements
		})
	}
}