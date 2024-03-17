import { Component,afterNextRender } from '@angular/core';
import { LinkModule } from 'carbon-components-angular';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LinkModule,RouterModule,CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  constructor( private router:Router,public routerService:FileUploadService)
  {
    afterNextRender(() => {
      this.routerService.checkRoute('landingPage')
    });
  
  }
  public cards= [
    {title:'Store and protect your files',
    imageUrl:'../../assets/lock-svgrepo-com.svg',
    content:'Get the storage you and your teams need with security features like file recovery, password protection, watermarking, and viewer history.'
    },
    {title:'Stay in control of shared content',
    imageUrl:'../../assets/search-svgrepo-com.svg',
    content:'Trackable links show when someone has opened a shared file and how long they’ve engaged with it. Plus, you can turn off access for any individual at any time without affecting others’ permissions.',
    },
    {title:'Collaborate on your work',
    imageUrl:'../../assets/file-edit-svgrepo-com.svg',
    content:'Directly edit PDFs and use video tools to streamline feedback and approval processes.'
    },
    {title:'Manage your business',
    imageUrl:'../../assets/notes-svgrepo-com.svg',
    content:'Automate manual processes with tools like eSignature templates, which let you reuse documents in seconds.'
    }
  ]
  public footers = [
    {
      title:"Dropbox",
      content:[{text:'Desktop app'},{text:'Mobile app'},{text:'Integrations'},{text:'Features'},{text:'Solutions'},{text:'Security'}]
    },
    {
      title:"Products",
      content:[{text:'Plus'},{text:'Professional'},{text:'Integrations'},{text:'Business'},{text:'Enterprise'},{text:'DocSend'},{text:'Product updates'}]
    },
    {
      title:"Features",
      content:[{text:'Send large files'},{text:'Send long videos'},{text:'Cloud photo storage '},{text:'Secure file transfer '},{text:'Password manager'},{text:'Cloud backup '},{text:'Screen recorder'},{text:'Convert to PDF'},{text:'Cloud backup'}]
    }
  ]
  login()
  {
    this.router.navigateByUrl('/login', {});
  }
  register()
  {
    this.router.navigateByUrl('/register', {});
  }
}
