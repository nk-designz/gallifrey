import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc' ;

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.styl']
})
export class SocialComponent implements OnInit {

  constructor(private oauthService: OAuthService) {}

  ngOnInit() {
  }

  public get name() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) { return null; }
    console.log(claims);
    return claims['preferred_username'];
  }

}

class Claim {
  prefered_name: string;
}
