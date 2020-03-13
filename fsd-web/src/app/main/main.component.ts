import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';

@Component({
	selector: 'main',
	templateUrl: 'main.component.html',
	styleUrls: ['main.component.css']
})

export class MainComponent implements OnInit {



	handleFind(){
		return this.http.get(`http://localhost:8080/folder/findfreefolder/?folderType=AV&page=0&size=10&sortDir=asc&sort=id`,{withCredentials:true}).subscribe(data => {
			console.log(data)
		})
	}

  constructor(private route: ActivatedRoute,
    private router: Router,
	private authenticationService: AuthenticationService,
	private http: HttpClient) { }

  ngOnInit() {
  }

  handleLogout() {
    if(this.authenticationService.logout()){
		this.router.navigate(['login']);
	}
	else{
		console.log('unable to logout');
	}
  }
}