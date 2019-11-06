import { Component, OnInit } from '@angular/core';
import { TreehouseService } from './../treehouse.service';
import { Post } from '../post';
import { range } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.styl']
})
export class ExploreComponent implements OnInit {

  constructor(private treehouse: TreehouseService) { }

  posts = new Array<Post>();

  GetRandomPost() {
    this.treehouse.GetRandomPostId().subscribe((data: {}) => {
      this.treehouse.GetPost(data[0].post_id).subscribe((d: Post) => {
        this.posts.push(d);
      });
    });
  }

  public getPost() {
    this.GetRandomPost();
    console.log(this.posts);
  }

  ngOnInit() {
    for (let i of Array<number>(10)) {
      this.GetRandomPost();
    }
  }
}
