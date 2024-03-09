import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(public httpClient:HttpClient) { }
  // public httpHeader = new HttpHeaders().set("Content-Type","multipart/form-data")
  uploadFile(fileData)
  {
    return this.httpClient.post('http://localhost:8000/file-upload',fileData)
  }
  // multipart/form-data; boundary=----WebKitFormBoundaryiPoPqJOjhHyzFhk3
  // {headers:this.httpHeader}

}
