import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { TreehouseService } from './../treehouse.service';
import { Post, PostListEntry } from '../post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})

export class HomeComponent implements OnInit {
  constructor(private treehouse: TreehouseService, private cdr: ChangeDetectorRef) { }

  oldScroll: number;
  sub: any;
  posts = new Array<Post>();

  GetNewestPost() {
    try {
      this.treehouse.GetNewestPostId(10).subscribe((data: Array<PostListEntry>) => {
        for(const dt of data) {
          this.treehouse.GetPost(dt.post_id).subscribe((d: Post) => {
            let i = 0;
            for( const post of this.posts ) {
              if( post.image === d.image ) {
                i++;
              }
            }
            if (i === 0) {
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

  @HostListener('window:scroll', ['$event'])
    handleScroll($event) {
      const tracker = $event.target;
      const limit = tracker.scrollHeight - tracker.clientHeight;
      if (tracker.scrollTop >= limit - 500 && this.oldScroll < tracker.scrollTop) {
        const datePostLog = this.posts[this.posts.length - 1].date;
        console.log(datePostLog);
        this.cdr.detectChanges();
      }
      this.oldScroll = tracker.scrollTop;
    }

  ngOnInit() {
    this.getPost();
    setInterval(() => {
      this.getPost();
    }, 15000);
  }
}
