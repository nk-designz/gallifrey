import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ScrollingModule} from '@angular/cdk/scrolling';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExploreComponent,
    ProfileComponent,
    SocialComponent
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
    MatExpansionModule
  ],
  providers: [TreehouseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
