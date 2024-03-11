import { Component, Input, OnInit } from '@angular/core';
import { MessengerService } from '../messenger.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-box.component.html',
  styleUrl: './modal-box.component.scss'
})
export class ModalBoxComponent implements OnInit {
constructor(private messenger:MessengerService)
{

}
@Input() type:String;
@Input() visibility:Boolean;
public showModal = false
public fileList = {}
ngOnInit(): void {
  this.messenger.messageListener().subscribe((data)=>{
     debugger
     this.showModal = true;
     this.fileList=data['data']
     console.log(data)
  })
}
closeModal()
{
  this.showModal = false;
}
}
