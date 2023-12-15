import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PostsComponent } from '../rawExamplesForPresentation/posts/posts.component';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatIconModule, PostsComponent, MatDividerModule],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss'
})
export class ExamplesComponent {

  title = 'AngularOkt';
    pokemon:string="Charmander"
    isCharmander: boolean = true;
    pokemons: string[] = ['Charmander', 'Pikatchu', 'Bulbasaur'];
    changePokemon() {
        this.isCharmander = !this.isCharmander;
    }

}
