import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  searchText = "";

  ngOnInit() {
  }

  logOut()
  {
    this.authService.logOut();
  }

  get isLogged()
  {
    return this.authService.loggedIn();
  }

  search(searchText)
  {
    //this.router.navigateByUrl(this.router.url+"?q="+searchText);
    this.router.navigateByUrl("product?q="+searchText);
  }

 

}
