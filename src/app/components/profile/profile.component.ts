import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;

  constructor(private tokenService: AngularTokenService, private http: HttpClient) { }

  ngOnInit() {
    this.tokenService.validateToken().subscribe(
      res => this.user = res.data,
      error => console.log(error)
    )
  }

}
