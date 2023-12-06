import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PostsComponent } from './views/posts/posts.component';
import { ExamplesComponent } from './views/examples/examples.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, MatToolbarModule, MatIconModule, PostsComponent, ExamplesComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'AngularOkt';
    fruit:string="Apple"
    isApple: boolean = true;
    fruits: string[] = ['Apple', 'Orange', 'Banana'];
    toggleFruit() {
        this.isApple = !this.isApple;
    }
}
