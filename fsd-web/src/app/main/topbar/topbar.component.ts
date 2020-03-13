import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/login/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/login/authentication.service';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.css']
})

export class TopbarComponent implements OnInit {
	private cep : {name : String}
	private user : String
	private location : String
	ngOnInit() { }
	constructor(private userService : UserService,
		private router: Router,
	private authenticationService: AuthenticationService,){
		this.user = this.userService.userDetail.fullName
		this.location = this.userService.userDetail.locality
		this.cep = this.userService.userDetail.roles
	}
	handleLogout() {
		if(this.authenticationService.logout()){
			this.router.navigate(['login']);
		}
		else{
			console.log('unable to logout');
		}
		return true;
	}
}