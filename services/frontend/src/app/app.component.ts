import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

export interface DialogData {
  image: string;
  heading: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'Gallifrey';
  public identityClaims: any;

  constructor(public dialog: MatDialog, private oauthService: OAuthService) {
    this.configure();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AppRootUploadDialogComponent, {
      width: '100vw'
    });
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin();
    this.identityClaims = this.oauthService.getIdentityClaims();
  }
}

@Component({
  selector: 'app-upload-post-component',
  template: '<app-upload-post></app-upload-post>'
})
export class AppRootUploadDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AppRootUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
