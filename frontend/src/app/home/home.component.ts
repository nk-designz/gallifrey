import { Component, OnInit, HostListener } from '@angular/core';
import { TreehouseService } from './../treehouse.service';
import { Post } from '../post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})

export class HomeComponent implements OnInit {
  constructor(private treehouse: TreehouseService) { }

  posts = new Array<Post>();

  GetNewestPost() {
    this.treehouse.GetNewestPostId().subscribe((data: {}) => {
      this.treehouse.GetPost(data[0].post_id).subscribe((d: Post) => {
        this.posts.push(d);
      });
    });
  }

  public getPost() {
    this.GetNewestPost();
    console.log(this.posts);
  }

  ngOnInit() {
    this.GetNewestPost();
  }
}
