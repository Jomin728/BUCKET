import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule,RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
constructor(public http: HttpClient,private router:Router)
{

}
public showRequired = false;
public showEmailSection = true;
public showLoginSection = false;
public showSignUpSection = false
public username=''
signUpForm = new FormGroup({
  email: new FormControl('',[Validators.email,Validators.required]),
})
LogInForm = new FormGroup({
  password: new FormControl('',[Validators.required]),
})

get emailError() {
  return this.signUpForm.get('email');
} 
get password(){
  return this.LogInForm.get('password')
}
onSubmit()
{
  // console.log(this.signUpForm.value)
  // console.log(this.signUpForm.valid)
  // console.log(this.signUpForm.controls.email.errors)
    this.showRequired = true
  if(!this.signUpForm.valid)
  {
    return;
  }
  let value:any=this.signUpForm.value.email
  const params = new HttpParams()
    .set('email',value)
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')

  this.http.get('http://localhost:8000/userSearch',{'params':params,'headers':headers}).subscribe((data:any)=>{
    console.log(data)
    if(data.length !=0)
    {
        this.username=data[0]['username']
        this.showLoginSection = true;
        this.showEmailSection = false;
    }
    else
    this.showSignUpSection = true;
    this.showEmailSection = false;
  })
}
login()
{

  let password:any=this.LogInForm.value.password
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')

  this.http.post('http://localhost:8000/login',{'username':this.username,'password':password,},{'headers':headers}).subscribe((data)=>{
    console.log(data)
    this.router.navigateByUrl('/home', {});
  })

}

}
