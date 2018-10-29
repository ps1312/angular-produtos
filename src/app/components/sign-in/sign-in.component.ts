import { Component, OnInit } from '@angular/core';
import { AngularTokenService, SignInData } from "angular-token";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInData: SignInData = <SignInData>{};
  rForm: FormGroup;

  email:string;
  password:string;

  constructor(private router: Router, private tokenService: AngularTokenService, private fb: FormBuilder) {
    this.rForm = fb.group({
      "email": [null, Validators.email],
      "password": [null, Validators.minLength(8)]
    })
  }

  ngOnInit() {
  }

  onSubmit(formValues) {
    this.signInData.login = formValues.email;
    this.signInData.password = formValues.password;
    this.tokenService.signIn(this.signInData).subscribe(
      (res) => {
        this.router.navigate(['/products'])
      },
      error => console.log(error)
    )
  }

}
