import { Component, OnInit } from '@angular/core';
import { TreehouseService } from './../treehouse.service';
import { Post, PostListEntry } from '../post';
import { HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.styl']
})
export class ExploreComponent implements OnInit {

  constructor(private treehouse: TreehouseService, private cdr: ChangeDetectorRef) { }

  posts = new Array<Post>();

  lastScrollTop = 0;
  direction = '';
  scrollDur = 0;

  GetRandomPost() {
    this.treehouse.GetRandomPostId().subscribe((data: Array<PostListEntry>) => {
      this.treehouse.GetPost(data[0].post_id).subscribe((d: Post) => {
        this.posts.push(d);
      });
    });
  }

  public getPost() {
    this.GetRandomPost();
  }


  @HostListener('window:scroll', ['$event'])
    handleScroll($event){
      this.scrollDur++;
      if(this.scrollDur % 12 === 0) {
        this.GetRandomPost();
        this.cdr.detectChanges();
      }
    }

  ngOnInit() {
    for (let i of Array<number>(4)) {
      this.GetRandomPost();
    }
  }
}
