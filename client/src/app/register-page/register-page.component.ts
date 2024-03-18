import { Component,afterNextRender } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {RouterModule} from '@angular/router';
import { FileUploadService } from '../file-upload.service';
import { LoaderComponent } from '../loader/loader.component';
@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule,RouterModule,LoaderComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
constructor(public http: HttpClient,private router:Router,public routerService:FileUploadService)
{
  afterNextRender(() => {
    this.routerService.checkRoute('login')
  });

}
public showLoading = false;
public showRequired = false;
public showEmailSection = true;
public showLoginSection = false;
public showSignUpSection = false
public username=''
public registerError = ''
signUpForm = new FormGroup({
  email: new FormControl('',[Validators.email,Validators.required]),
})
LogInForm = new FormGroup({
  password: new FormControl('',[Validators.required]),
})
registerForm = new FormGroup({
  email: new FormControl('',[Validators.email,Validators.required]),
  username:new FormControl('',[Validators.required]),
  password:new FormControl('',[Validators.required])
})

get emailError() {
  return this.signUpForm.get('email');
} 
get password(){
  return this.LogInForm.get('password')
}
get registerEmail()
{
  return this.registerForm.get('email');
}
get registerUsername()
{
  return this.registerForm.get('username');
}
get registerPassword()
{
  return this.registerForm.get('password');
}
onSubmit()
{
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


  this.showLoading = true;
  this.http.get('http://localhost:8000/api/userSearch',{'params':params,'headers':headers}).subscribe((data:any)=>{

  if(data.length !=0)
    {
        this.username=data[0]['username']
        this.showLoginSection = true;
        this.showEmailSection = false;
        this.showSignUpSection = false;
        this.showRequired = false

    }
    else
    {
        let registerData = {
          email:value ,
          username:'',
          password:''
        };
    
      this.registerForm.setValue(registerData) 
      this.showLoginSection = false
      this.showSignUpSection = true;
      this.showEmailSection = false;  
      this.showRequired = false
    }
    this.showLoading = false;
  })
}
login()
{
  this.showRequired = true
  if(!this.LogInForm.valid)
  {
    return;
  }
  let password:any=this.LogInForm.value.password
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    this.showLoading = true;
    this.http.post('http://localhost:8000/api/login',{'username':this.username,'password':password,},{'headers':headers}).subscribe((data)=>{
    
    if(data['message'] == 'Login Attempt Failed.')
    return;
    setTimeout(() => {
      this.showLoading = true;
      this.router.navigateByUrl('/home', {});
    }, 1000);
  })

}
register()
{
  this.showRequired = true
  if(!this.registerForm.valid)
  return;
  
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  this.showLoading = true;
  this.http.post('http://localhost:8000/api/register',{'email':this.registerForm.value.email,'username':this.registerForm.value.username,'password':this.registerForm.value.password},{'headers':headers}).subscribe((data)=>{
    this.showLoading = false;
    if(data['message'] == 'Successful')
    this.router.navigateByUrl('/home', {});
    else
    this.registerError = data['message']
      
  })
}
redirectToHome()
{
  this.router.navigateByUrl('/landingPage', {});
}


resetForms()
{
this.registerError = ''
let registerData = {
  email:'' ,
  username:'',
  password:''
};
let passwordData = {
  password:''
}
this.LogInForm.setValue(passwordData)
this.registerForm.setValue(registerData) 
}
back()
{
   this.showRequired = false;
   this.showEmailSection = true;
   this.showLoginSection = false;
   this.showSignUpSection = false
   this.resetForms()

}

}
