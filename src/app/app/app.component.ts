import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PostsComponent } from '../example/views/rawExamplesForPresentation/posts/posts.component';
import { ExamplesComponent } from '../example/views/examples/examples.component';




@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, MatToolbarModule, MatIconModule, PostsComponent, ExamplesComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    public a: number = 0;
    public b: number = 0;
    public c: number = 0;

    title = 'AngularOkt';
    fruit: string = "Apple"
    isApple: boolean = true;
    fruits: string[] = ['Apple', 'Orange', 'Banana'];
    showExample=false;

    constructor() {

    }

    toggleFruit() {
        this.isApple = !this.isApple;
    }


    sum(a: any, b: any): any {
        return parseInt(a) + parseInt(b);
    }


}
