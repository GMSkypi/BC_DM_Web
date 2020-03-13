import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
@Component({
	selector: 'login',
	templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

	username: string;
	password : string;
	errorMessage = 'Invalid Credentials';
	successMessage: string;
	invalidLogin = false;
	loginSuccess = false;

	constructor(
    private route: ActivatedRoute,
	private router: Router,
	private userService: UserService,
    private authenticationService: AuthenticationService) {   }
	ngOnInit() { 
		this.authenticationService.tryLogin().toPromise().then((res) => {
			this.authenticationService.setLoggedIn(true);
			this.userService.userDetail = res.body
			this.router.navigate(['/'])
		  }).catch((error) => {
			
			})
		
	}

	handleLogin() {
		this.authenticationService.authenticationService(this.username, this.password)
		.subscribe((result)=> {
		  this.invalidLogin = false;
		  this.loginSuccess = true;
		  this.successMessage = 'Login Successful.';
		  this.userService.userDetail = result
		  this.router.navigate(['/'])

		}, () => {

		  this.invalidLogin = true;
		  this.loginSuccess = false;
		});
	}

}