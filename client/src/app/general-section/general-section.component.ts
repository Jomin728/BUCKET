import { Component,ViewChild } from '@angular/core';

@Component({
  selector: 'app-general-section',
  standalone: true,
  imports: [],
  templateUrl: './general-section.component.html',
  styleUrl: './general-section.component.scss'
})
export class GeneralSectionComponent {
  @ViewChild("fileInput") fileInput;
  onFilesAdded()
  {
   console.log(this.fileList)
  }
  get fileList() {
		return Array.from(this.fileInput.nativeElement.files);
	}
}
