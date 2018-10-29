import { Component, OnInit } from '@angular/core';
import { AngularTokenService, RegisterData } from "angular-token";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //Criar uma interface vazia
  registerData: RegisterData = <RegisterData>{};

  rForm:FormGroup;
  email:string;
  password:string;
  password_confirmation:string;

  constructor(private router: Router, private tokenService: AngularTokenService, private fb: FormBuilder) {
    this.rForm = fb.group({
      "email": [null, Validators.email],
      "password": [null, Validators.minLength(8)],
      "password_confirmation": [null, Validators.minLength(8)]
    })
  }

  ngOnInit() {
  }

  onSubmit(formvalues) {
    this.registerData.login = formvalues.email;
    this.registerData.password = formvalues.password;
    this.registerData.passwordConfirmation = formvalues.password_confirmation;
    
    this.tokenService.registerAccount(this.registerData).subscribe(
      res => this.router.navigate(["/products"]),
      error => console.log(error)
    );

  }

}
