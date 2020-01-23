import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.css']
})

export class TopbarComponent implements OnInit {
	private cep = "prvoz"
	private user = "RGALLAS"
	private location = "PR"
	ngOnInit() { }
}