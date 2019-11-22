import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadPostDirective } from './upload-post.directive';
import { TreehouseService } from '../treehouse.service';
import { Post } from '../post';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.styl']
})
export class UploadPostComponent implements OnInit {

  post = new Post();
  modalTitles = ['Upload your Image', 'Tell us the Story', 'You are done now'];
  modalTitle = this.modalTitles[0];
  postLicense: string;

  constructor(public UPD: UploadPostDirective, private treehouse: TreehouseService, private _snackBar: MatSnackBar) {}

  postImageChange(postImage: string) {
    this.post.image = postImage.split(',')[1];
  }

  public uploadPost(heading: string, description: string, license: string, tags: string) {
    this.post.date = (new Date()).toISOString();
    this.post.user = '';
    this.post.heading = heading;
    this.post.description = description;
    this.post.license = license;
    this.post.tags = tags.split(' ');
    this.modalTitle = this.modalTitles[0];
    console.log(this.post.image);

    try {
      this.treehouse.AddPost(this.post).subscribe((data: {}) => {
        this.openSnackBar("You posted an image :D", "ok");
      });
    } catch(e) {
      console.log(e);
      this.openSnackBar("Sorry an error occured :(", "ok");
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
  }

}
