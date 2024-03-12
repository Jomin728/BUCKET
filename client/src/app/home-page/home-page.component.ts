import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { Search } from 'carbon-components-angular';
import { RouterOutlet } from '@angular/router';
import { HostListener } from '@angular/core';
import { MessengerService } from '../messenger.service';
import { title } from 'process';
import { NotificationModule } from 'carbon-components-angular';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NotificationModule,NotificationComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(public messageService:MessengerService)
  {

  }

  public showMore = false;
  public list = [
    {
      imageUrl:"../../assets/files-fill.svg",
      title:"All Files"
    },
    {
      imageUrl:"../../assets/photos.svg",
      title:"Photos"
    },
    {
      imageUrl:"../../assets/request.svg",
      title:"Shared with me"
    }
  ]

  public moreNavItems = [
    {
      "imageUrl":"../../assets/request.svg",
      "title":"File requests"
    },
    {
      "imageUrl":"../../assets/trash.svg",
      "title":"Deleted Files"
    }
  ]
  public showLess()
  {
    this.showMore = !this.showMore
  }
  public onSearch(value)
  {
    console.log(value)
  }
  public showSelection(item)
  {
    
    this.messageService.eventEmit.emit({title:item['title']})
  }
}
