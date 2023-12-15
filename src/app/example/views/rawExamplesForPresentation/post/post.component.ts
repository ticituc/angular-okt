import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MatListModule, MatButtonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  //animations: [       // metadata array
  //  trigger('toggleClick', [     // trigger block
  //    state('true', style({      // final CSS following animation
  //      backgroundColor: 'green'
  //    })),
  //    state('false', style({
  //      backgroundColor: 'red'
  //    })),
  //    transition('true => false', animate('1000ms linear')),  // animation timing
  //    transition('false => true', animate('1000ms linear'))
  //  ])
  //]
})
export class PostComponent {

  @Input({ required: true }) 
  post: string = "Post"
  
  isGreen: string= "false";



  updatePostContent(post: string) {
    this.post = post;
  }

  toggleIsCorrect() {
    this.isGreen = this.isGreen === 'true' ? 'false' : 'true'; // change in data-bound value
  }
}
