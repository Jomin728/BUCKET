import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerService } from '../messenger.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {

  constructor(public messenger:MessengerService,public ngZone:NgZone)
  {

  }
  public notificationList = []
  ngOnInit(): void {
    this.messenger.messageListener().subscribe((data)=>{
      debugger
      if(data['type'] == "notification")
      {
        let item = {
          title:data.message,
          imageUrl:this.imageUrls[data.notificationType],
          timer:setTimeout(() => {
            clearTimeout(this.notificationList[0].timer)
            this.notificationList.shift()
            this.ngZone.run(() => this.notificationList)
          }, 4000)
        }
        this.notificationList.push(item)
      }
      this.ngZone.run(() => this.notificationList)
    })
  }
  public imageUrls = {
    info:'../../assets/info-circle-svgrepo-com.svg',
    error:'../../assets/error-svgrepo-com.svg',
    success:'../../assets/success-filled-svgrepo-com.svg'
  }
}
