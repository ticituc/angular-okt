import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren, ViewContainerRef, afterNextRender, afterRender } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { PostComponent } from '../post/post.component';


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [MatListModule, PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements AfterViewInit {
  @ViewChild('post', { read: ViewContainerRef }) post: any;

  @ViewChildren(PostComponent) public posts: QueryList<PostComponent> | undefined;


  constructor() {
    afterNextRender(() => {
      console.log("After next render")
    });
    afterRender(() => {
      console.log("After Render");
    });
  }

  ngAfterViewInit() {

  }

}
