import { Component, OnInit } from '@angular/core';
import { TreehouseService } from './../treehouse.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  constructor(private treehouse: TreehouseService) { }

  public getPost() {
    console.log(this.treehouse.getRandomPost());
  }

  ngOnInit() {
  }
}
