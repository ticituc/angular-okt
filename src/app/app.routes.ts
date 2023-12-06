import { Routes } from '@angular/router';
import { PostsComponent } from './todo/views/posts/posts.component';
import { PostComponent } from './todo/views/post/post.component';

export const routes: Routes = [

    { path: "", component: PostsComponent },
    { path: "post/:id", component: PostComponent }

];
