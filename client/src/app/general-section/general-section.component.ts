import { Component,ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadService } from '../file-upload.service';
import { HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-general-section',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './general-section.component.html',
  styleUrl: './general-section.component.scss'
})
export class GeneralSectionComponent {
  constructor(private uploadService:FileUploadService)
  {

  }
  @ViewChild("fileInput") fileInput;
  public uploadProgress
  public filesList = [];
  // fileInput.value=''
  onFilesAdded(event)
  {
    let files = event.target.files
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formData.append("file", element,element.name)
    }
    this.uploadService.uploadFile(formData).subscribe((response:any)=>{
      if (response.type == HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (response.loaded / response.total));
      }
    })
  }
  get fileList() {
		return Array.from(this.fileInput.nativeElement.files);
	}
}
