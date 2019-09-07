import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms"

@Component({
  selector: 'app-user-operations',
  templateUrl: './user-operations.component.html',
  styleUrls: ['./user-operations.component.css']
})
export class UserOperationsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  loginUser:any={};
  registerUser:any={};
  userAddForm: FormGroup;
  userLoginForm: FormGroup;
  userStatus= true;
  
  createUserForm()
  {
    this.userAddForm = this.formBuilder.group({
      name:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  createLoginForm()
  {
    this.userLoginForm = this.formBuilder.group({
      loginEmail:["",Validators.required],
      loginPassword:["",Validators.required]
    })
  }

  ngOnInit() {
    this.isAuthenticated();
    this.createUserForm();
    this.createLoginForm();
  }

  login(){
    if(this.userLoginForm.valid)
    {
      this.loginUser['email'] = this.userLoginForm.value["loginEmail"];
      this.loginUser['password'] = this.userLoginForm.value["loginPassword"];
      this.authService.login(this.loginUser);
    }
  }

  logOut(){
    this.authService.logOut();
  }

  createUser()
  {
    if(this.userAddForm.valid)
    {
      this.registerUser = Object.assign({},this.userAddForm.value);
      this.registerUser['password_confirmation'] = this.registerUser['password'];
      this.authService.register(this.registerUser);
    }
  }

  isAuthenticated()
  {
    if(this.authService.loggedIn() == true) this.router.navigateByUrl("/products");
  }

}
