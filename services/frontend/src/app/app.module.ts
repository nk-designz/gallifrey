import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, AppRootUploadDialogComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatDividerModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { ProfileComponent } from './profile/profile.component';
import { SocialComponent } from './social/social.component';
import { HttpClientModule } from '@angular/common/http';
import { TreehouseService } from './treehouse.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { GlobusComponent } from './globus/globus.component';
import { UploadPostComponent } from './upload-post/upload-post.component';
import { AgmCoreModule } from '@agm/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { UploadPostDirective } from './upload-post/upload-post.directive';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SearchBoxComponent } from './search-box/search-box.component';


@NgModule({
  entryComponents: [
    AppRootUploadDialogComponent,
    SearchBoxComponent
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ExploreComponent,
    ProfileComponent,
    SocialComponent,
    AppRootUploadDialogComponent,
    GlobusComponent,
    UploadPostComponent,
    UploadPostDirective,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    HttpClientModule,
    ScrollingModule,
    MatDividerModule,
    MatChipsModule,
    MatExpansionModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://api.gallifrey.local'],
        sendAccessToken: true
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [TreehouseService, UploadPostDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
