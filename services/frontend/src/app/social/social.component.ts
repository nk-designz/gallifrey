import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc' ;
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.styl']
})
export class SocialComponent implements OnInit {

  constructor(private oauthService: OAuthService, private dialog: MatDialog) {}

  ngOnInit() {
  }

  openOptionsBottomSheet(): void {
    this.dialog.open(SocialOptionsDialogComponent, {});
  }

  public get name() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) { return null; }
    return claims['preferred_username'];
  }

}

@Component({
  selector: 'app-social-options-dialog',
  templateUrl: './app.social.options.dialog.component.html',
})
export class SocialOptionsDialogComponent {
  constructor(
    private bottomSheetRef: MatDialogRef<SocialOptionsDialogComponent>,
    private oauthService: OAuthService
    ) {}

  public logMeOut() {
    this.oauthService.logOut();
  }
}
