import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { HttpClient,HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
constructor(public http: HttpClient)
{

}
public showEmailError = false;
public showRequired = false;
signUpForm = new FormGroup({
  email: new FormControl('',[Validators.email,Validators.required]),
})


get emailError() {
  return this.signUpForm.get('email');
} 

onSubmit()
{
  debugger
  console.log(this.signUpForm.value)
  console.log(this.signUpForm.valid)
  console.log(this.signUpForm.controls.email.errors)
  this.showEmailError = false;
  this.showRequired = false
  if(!this.signUpForm.valid)
  {
    return;
  }
  let value:any=this.signUpForm.value.email
  const params = new HttpParams()
    .set('email',value)
  this.http.get('http://localhost:8000/userSearch',{'params':params}).subscribe((data)=>{
    console.log(data)
  })
}

}
