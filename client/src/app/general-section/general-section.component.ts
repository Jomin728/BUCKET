import { AfterViewChecked, Component,OnInit,ViewChild,afterNextRender,HostListener } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadService } from '../file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalBoxComponent } from '../modal-box/modal-box.component';
import { MessengerService } from '../messenger.service';
import {io} from 'socket.io-client';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgZone } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from '../loader/loader.component';
@Component({
  selector: 'app-general-section',
  standalone: true,
  imports: [HttpClientModule,CommonModule,ModalBoxComponent,LoaderComponent],
  templateUrl: './general-section.component.html',
  styleUrl: './general-section.component.scss'
})
export class GeneralSectionComponent implements OnInit,AfterViewChecked {
  constructor(private uploadService:FileUploadService,public http: HttpClient,private messenger:MessengerService,public ngZone:NgZone)
  {
    afterNextRender(() => {
      this.getUserInfo()
      this.getFilesData()
    });

  }
  public showLoading = false;
  public title = "All Files";
  public user = {} ;
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  private socket ;

  ngOnInit(): void {
    this.message$.subscribe((data)=>{
      if(data == 'message from server')
      {

      }
    })
    this.ngZone.runOutsideAngular(() => {
      this.socket = io('http://http://ec2-3-83-241-86.compute-1.amazonaws.com:30308')
    })

    this.messenger.messageListener().subscribe((data)=>{
      
      if(data['title'] == "Shared with me")
      {
        this.title = "Files Shared with me"
        this.getSharedFilesData()
        this.list =this.list.filter((val)=> val['title']!='Share')
      }
      else if(data['title'] == "All Files")
      {
        this.title = "All Files"
        this.list = [...this.options]
        this.getFilesData()
      }
      else if(data['title'] == "Photos")
      {
        this.title = "Image Files"
        this.list = [...this.options]
        this.getImageData()
        
      }
      else if(data['title'] == "Search")
      {
        this.title = "Search Results"
        this.list = [...this.options]
        this.filesList =[...data['searchResults']]
      }
    })
    
  }
  ngAfterViewChecked(): void {

  }

  
  @ViewChild("fileInput") fileInput;


  
  public uploadProgress
  public filesList = [];
  public sharedFilesList = [];
  public share = 
  {
    imageUrl:"../../assets/request.svg",
    title:"Share"
  }
  public list = [
    {
      imageUrl:"../../assets/download-svgrepo-com.svg",
      title:"Download"
    },
    {
      imageUrl:"../../assets/request.svg",
      title:"Share"
    },
    {
      imageUrl:"../../assets/copy-link-svgrepo-com.svg",
      title:"Copy Link"
    }
  ]
  public options = 
  [
    {
      imageUrl:"../../assets/download-svgrepo-com.svg",
      title:"Download"
    },
    {
      imageUrl:"../../assets/request.svg",
      title:"Share"
    },
    {
      imageUrl:"../../assets/copy-link-svgrepo-com.svg",
      title:"Copy Link"
    }
  ]
  @HostListener('window:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.resetOptionsView
  }
  resetOptionsView()
  {
    this.filesList.forEach((value,index)=>{
      this.filesList[index]['optionVisibility'] = false
    })  
  }


  // fileInput.value=''
  onFilesAdded(event)
  {
    let files = event.target.files
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formData.append("file", element,element.name)
    }
    this.showLoading = true;
    this.http.post('http://http://ec2-3-83-241-86.compute-1.amazonaws.com:30308/api/file-upload',formData).subscribe((response:any)=>{
      if (response.type == HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (response.loaded / response.total));
      }
      this.filesList.push(response)
      this.messenger.eventEmit.emit({
        type:'notification',
        message:'File Upload Successful',
        notificationType:'success'
      })
      this.fileInput.nativeElement.value = ''
      this.showLoading = false;
    })
  }
  getUserInfo()
  {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    this.showLoading = true;
  this.http.get('http://http://ec2-3-83-241-86.compute-1.amazonaws.com:30308/api/user-info',{'headers':headers}).subscribe((data:any)=>{
  this.user = data
  this.socket.on(this.user['email'], (message) =>{
    
    this.messenger.eventEmit.emit({
      type:'notification',
      message:'A New File is shared to You',
      notificationType:'info'
    })
    this.message$.next(message);
  });
  this.showLoading = false;
  })

  }
  getFilesData()
  {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    this.showLoading = true;
  this.http.get('http://http://ec2-3-83-241-86.compute-1.amazonaws.com:30308/api/file-details',{'headers':headers}).subscribe((data:any)=>{
  this.filesList = [...data]
  this.filesList = [...this.filesList]
  this.ngZone.run(() => this.filesList)
  this.resetOptionsView()
  this.showLoading = false;
  })
 }
 getSharedFilesData()
 {
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  this.showLoading = true;
  this.http.get('http://http://ec2-3-83-241-86.compute-1.amazonaws.com:30308/api/sharedfile-details',{'headers':headers}).subscribe((data:any)=>{
   this.filesList =[...data]
   this.showLoading = false;
  })
 }
 getImageData()
 {
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  this.showLoading = true;
  this.http.get('http://http://ec2-3-83-241-86.compute-1.amazonaws.com:30308/api/imagefile-data',{'headers':headers}).subscribe((data:any)=>{
   this.filesList =[...data]
   this.showLoading = false;

  })
 }
  get fileList() {
		return Array.from(this.fileInput.nativeElement.files);
	}
  showOptions(index)
  {
    let currentValue = this.filesList[index]['optionVisibility']
    this.resetOptionsView()
    this.filesList[index]['optionVisibility'] = !currentValue
  }
  fileaction(item,index)
  {
    
    const params = new HttpParams()
    .set('filename',this.filesList[index]['filename'])
    const headers =new HttpHeaders()
    .set('Content-Type', 'image/png'
    )
    if(item['title'] == 'Download')
    {
      this.showLoading = true;
      this.http.get('http://http://ec2-3-83-241-86.compute-1.amazonaws.com:30308/api/file-download',{'params':params,responseType: 'blob'}).subscribe((data:any)=>{
        
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.filesList[index]['filename'];
        link.click();
        this.messenger.eventEmit.emit({
          type:'notification',
          message:'File Download Successful',
          notificationType:'info'
        })
        this.showLoading = false;
    })
    }
    if(item['title'] == 'Share')
    {
     this.messenger.eventEmit.emit({
      type:'fileInfo',
      data:this.filesList[index]
     })
    }
    if(item['title'] == 'Copy Link')
    {
      this.messenger.eventEmit.emit({
        type:'notification',
        message:'Notification Recieved',
        notificationType:'info'
      })
    }
    this.resetOptionsView()

  }
}
