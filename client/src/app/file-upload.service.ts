import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(public http:HttpClient,public router:Router) { }
  public checkRoute(routename:string)
  {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    const params = new HttpParams()
    .set('route',routename)
    this.http.get('http://http://ec2-3-83-241-86.compute-1.amazonaws.com:30308/api/route-guard',{'params':params,'headers':headers,withCredentials:true}).subscribe((data:any)=>{
    if(data['redirectTo']!='')
    this.router.navigateByUrl('/'+data['redirectTo'], {});
     });
  
  }
}
