import { Component, Input, OnInit } from '@angular/core';
import { MessengerService } from '../messenger.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpHeaders,HttpParams,HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-modal-box',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './modal-box.component.html',
  styleUrl: './modal-box.component.scss'
})
export class ModalBoxComponent implements OnInit {
constructor(private messenger:MessengerService,public http: HttpClient)
{

}
@Input() type:String;
@Input() visibility:Boolean;
public showModal = false
public fileList = {}
ngOnInit(): void {
  this.messenger.messageListener().subscribe((data)=>{
    
     if(data['type'] == 'fileInfo')
     {
      this.showModal = true;
      this.fileList=data['data']
      console.log(data)
     }
  })
}
public showRequired = false
signUpForm = new FormGroup({
  email: new FormControl('',[Validators.email,Validators.required]),
})
get emailError() {
  return this.signUpForm.get('email');
} 
closeModal()
{
  this.showModal = false;
}
onSubmit()
{
  if(!this.signUpForm.valid)
  {
    this.showRequired = true
    return;
  }

  let value:any=this.signUpForm.value.email
  const params = new HttpParams()
    .set('email',value)
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
  
  this.http.post('http://localhost:8000/api/share-file',{...this.fileList},{'params':params,'headers':headers}).subscribe((data)=>{
    this.showModal = false;
    this.signUpForm.value.email = ''
    this.messenger.eventEmit.emit({
      type:'notification',
      message:'File Shared to '+value,
      notificationType:'info'
    })
  })

}
}
