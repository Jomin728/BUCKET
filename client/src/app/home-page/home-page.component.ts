import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

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
      title:"Shared"
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
}
