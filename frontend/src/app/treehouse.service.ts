import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class TreehouseService {
  constructor(private http: HttpClient) {

  }

  private domain = '192.168.122.87:8080';

  private getPostIds(apiPath: string) {
    let postIds = new Array();
    let data: any = [];
    const url = 'http://' + this.domain + '/' + apiPath + '/10';
    this.http.get(url).subscribe((res) => {
      data = res;
      for (const i of data) {
        postIds.push(i.post_id);
      }
    });
    return postIds;
  }

  private getPost(postId: string) {
    let data: any = [];
    const url = 'http://' + this.domain + '/post/' + postId;
    this.http.get(url).subscribe((res) => {
      data['heading'] = res.heading;
      data['imageKey'] = res.image;
      data['description'] = res.description;
      data['user'] = res.meta.user;
      data['license'] = res.meta.license;
      data['date'] = res.meta.date;
    });
    console.log(data);
    return data;
  }

  private getNewestPostIds() {
    return this.getPostIds('newest');
  }

  private getRandomPostIds() {
    return this.getPostIds('random');
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  public async getNewestPost() {
    const postIds = this.getNewestPostIds();
    let post: any = [];
    while ( postIds.length === 0 ) {
      await this.delay(100);
    }
    console.log(postIds[0]);

    post = this.getPost(postIds[0]);
    while ( post.length === 0 ) {
      await this.delay(100);
    }
    return post;
  }

  public async getRandomPost() {
    const postIds = this.getRandomPostIds();
    let post: any = [];
    while ( postIds.length === 0 ) {
      await this.delay(100);
    }
    console.log(postIds[0]);

    post = this.getPost(postIds[0]);
    while ( post.length === 0 ) {
      await this.delay(100);
    }
    return post;
  }

}
