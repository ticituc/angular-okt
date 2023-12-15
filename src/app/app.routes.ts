import { Routes } from '@angular/router';
import { PostsComponent } from './example/views/rawExamplesForPresentation/posts/posts.component';







export const routes: Routes = [

    
    { path: "", component: PostsComponent },
    { path: "todo", loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)},

];
