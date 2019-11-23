import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadPostDirective } from './upload-post.directive';
import { TreehouseService } from '../treehouse.service';
import { Post } from '../post';
import { throwError } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

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

  constructor(
    public UPD: UploadPostDirective,
    private treehouse: TreehouseService,
    private snackBar: MatSnackBar,
    private oauthService: OAuthService
  ) {}

  postImageChange(postImage: string) {
    this.post.image = postImage.split(',')[1];
  }

  public uploadPost(heading: string, description: string, license: string, tags: string) {
    let postData: object;
    try {
      this.post.date = (new Date()).toISOString();
      this.post.user = this.name();
      this.post.heading = heading;
      this.post.description = description;
      this.post.license = license;
      this.post.tags = tags.split(' #');
      this.modalTitle = this.modalTitles[0];

      this.treehouse.AddPost(this.post).subscribe((data: {}) => {
        postData = data;
        this.openSnackBar('You posted an image :D', 'ok');
      });
    } catch (e) {
      console.log(e + postData);
      this.openSnackBar('Sorry an error occured :(', 'ok');
    }
  }

  public name() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) { throwError(claims); }
    return claims['preferred_username'];
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
  }

}
