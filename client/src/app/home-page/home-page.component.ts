import { Component, OnInit,afterNextRender } from '@angular/core';
import {CommonModule} from '@angular/common';
import { Search } from 'carbon-components-angular';
import { Router, RouterOutlet } from '@angular/router';
import { HostListener } from '@angular/core';
import { MessengerService } from '../messenger.service';
import { title } from 'process';
import { NotificationModule } from 'carbon-components-angular';
import { NotificationComponent } from '../notification/notification.component';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FileUploadService } from '../file-upload.service';
import { LoaderComponent } from '../loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BehaviorSubject, debounce,debounceTime } from 'rxjs';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NotificationModule,NotificationComponent,RouterModule,LoaderComponent,MatProgressSpinnerModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{
  public searchQuery$ = new BehaviorSubject<string>('').pipe(debounceTime(1000),switchMap(id => this.http.get('http://localhost:8000/api/search-file',{withCredentials:true})),);
  constructor(public messageService:MessengerService,public http: HttpClient,public router:Router,public routerService:FileUploadService)
  {
    afterNextRender(() => {
      this.routerService.checkRoute('home')
    });

  }
  public showLoading = false;
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
 ngOnInit(): void {
  this.searchQuery$.subscribe((data)=>{

  })
 }
 public getSearchApi(value)
 {
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')

  const param = new HttpParams()
  .set('searchkey',value)
  return this.http.get('http://localhost:8000/api/file-search',{'params':param,'headers':headers})
 }
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
  public logout()
  {
    this.http.post('http://localhost:8000/api/logout',{},{withCredentials:true}).subscribe((data:any)=>{
    this.router.navigateByUrl('/login', {});
     });

  }
}
