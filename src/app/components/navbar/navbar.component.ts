import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from "angular-token";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(private tokenService: AngularTokenService, private router: Router) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.tokenService.signOut().subscribe(
        (res) => {
          this.router.navigate(["/sign-in"]);
        },
        error =>    console.log(error)
    );
  }

}
