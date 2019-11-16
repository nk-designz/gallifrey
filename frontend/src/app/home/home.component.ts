import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TreehouseService } from './../treehouse.service';
import { Post, PostListEntry } from '../post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})

export class HomeComponent implements OnInit {
  constructor(private treehouse: TreehouseService, private cdr: ChangeDetectorRef) { }

  sub: any;
  posts = new Array<Post>();

  GetNewestPost() {
    try {
      this.treehouse.GetNewestPostId(10).subscribe((data: Array<PostListEntry>) => {
        for(const dt of data) {
          this.treehouse.GetPost(dt.post_id).subscribe((d: Post) => {
            if (!this.posts.includes(d)) {
              this.posts.unshift(d);
            }
          });
        }
      });
    } catch (error) {
      console.log('No connection');
    }
  }

  public getPost() {
    this.GetNewestPost();
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.GetNewestPost();
  }
}
