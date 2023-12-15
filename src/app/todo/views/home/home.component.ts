import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todoPromise/todo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  protected todoList:Array<any>=[];

  constructor(protected todoService: TodoService) {

  }



  async ngOnInit(){
    
  }
  async ngAfterViewInit(){
    this.todoList = await this.todoService.list()
  }
}
