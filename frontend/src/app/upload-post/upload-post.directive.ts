import { Directive } from '@angular/core';
import { HostListener, HostBinding, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appUploadPostDropZone]'
})
export class UploadPostDirective {

  public message: string;
  public imagePath: any;
  public imgURL: any;
  @Output() private postImageChangeEmiter: EventEmitter<FileList> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {
  }

  @HostBinding('style.background') public background = '#eee';
  @HostBinding('style.background-image') public backgroundImage;

  @HostListener('dragover', ['$event']) public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }
  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    const files = evt.dataTransfer.files;

    if ( files.length > 0) {
      this.background = '#eee';
      const reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        this.imgURL = reader.result;
        this.postImageChangeEmiter.emit(this.imgURL);
        this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url("${this.imgURL}")`);
      };
    }
  }
}
