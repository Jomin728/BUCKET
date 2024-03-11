import { AfterViewChecked, Component,OnInit,ViewChild,afterNextRender,HostListener } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadService } from '../file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalBoxComponent } from '../modal-box/modal-box.component';
import { MessengerService } from '../messenger.service';
@Component({
  selector: 'app-general-section',
  standalone: true,
  imports: [HttpClientModule,CommonModule,ModalBoxComponent],
  templateUrl: './general-section.component.html',
  styleUrl: './general-section.component.scss'
})
export class GeneralSectionComponent implements OnInit,AfterViewChecked {
  constructor(private uploadService:FileUploadService,public http: HttpClient,private messenger:MessengerService)
  {
    afterNextRender(() => {
      this.getFilesData()
    });

  }
  ngOnInit(): void {
  }
  ngAfterViewChecked(): void {

  }
  
  @ViewChild("fileInput") fileInput;
  public uploadProgress
  public filesList = [];
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
    this.http.post('http://localhost:8000/file-upload',formData).subscribe((response:any)=>{
      if (response.type == HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (response.loaded / response.total));
      }
      this.filesList.push(response)
    })
  }
  getFilesData()
  {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')

  this.http.get('http://localhost:8000/file-details',{'headers':headers}).subscribe((data:any)=>{
  this.filesList = [...data]
  this.filesList = [...this.filesList]
  this.resetOptionsView()
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
      this.http.get('http://localhost:8000/file-download',{'params':params,responseType: 'blob'}).subscribe((data:any)=>{
        
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.filesList[index]['filename'];
        link.click();

    })
    }
    if(item['title'] == 'Share')
    {
     this.messenger.eventEmit.emit({
      type:'fileInfo',
      data:this.filesList[index]
     })
    }
    this.resetOptionsView()

  }
}
