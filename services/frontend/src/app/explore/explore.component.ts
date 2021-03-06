import { Component, OnInit } from '@angular/core';
import { TreehouseService } from './../treehouse.service';
import { Post, PostListEntry } from '../post';
import { HostListener, ChangeDetectorRef } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { SearchBoxComponent } from '../search-box/search-box.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.styl']
})
export class ExploreComponent implements OnInit {

  constructor(private treehouse: TreehouseService, private cdr: ChangeDetectorRef, public dialog: MatDialog) { }

  oldScroll: number;
  posts = new Array<Post>();
  searchQuery: string;

  GetRandomPost() {
    this.treehouse.GetRandomPostId().subscribe((data: Array<PostListEntry>) => {
      this.treehouse.GetPost(data[0].post_id).subscribe((d: Post) => {
        let i = 0;
        for ( const post of this.posts ) {
          if ( post.image === d.image ) {
            i++;
          }
        }
        if (i === 0) {
          this.posts.push(d);
        }
      });
    });
  }

  public getPost() {
    this.GetRandomPost();
  }


  @HostListener('window:scroll', ['$event'])
  handleScroll($event) {
    if ($event.target.scrollTop % 30 === 0 && this.oldScroll < $event.target.scrollTop) {
      this.GetRandomPost();
      this.cdr.detectChanges();
    }
    this.oldScroll = $event.target.scrollTop;
  }

  public openSearchBox() {
    const searchBoxDialogRef = this.dialog.open(SearchBoxComponent, {
    });
    searchBoxDialogRef.afterClosed().subscribe(result => {
      this.searchQuery = result;
    });
  }

  ngOnInit() {
    for (let i of Array<number>(4)) {
      this.GetRandomPost();
    }
  }
}
