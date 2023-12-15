import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TODOItem } from '../../entities/TODOItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  protected itemsSubject = new BehaviorSubject<TODOItem[]>([]);

  constructor(protected http: HttpClient) {

  }

  protected mapRawToEntity(raw: any): TODOItem {
    const item = new TODOItem();

    item.id = raw.id ?? -1;
    item.userId = raw.userId ?? -1;
    item.title = raw.title ?? "-";
    item.completed = raw.completed ?? false;

    return item;

  }

  async list(): Promise<TODOItem[]> {

    try {
      const res = this.http.get<any[]>("https://jsonplaceholder.typicode.com/todos");

      res.subscribe((rawData) => {
        this.itemsSubject.next(rawData.map(this.mapRawToEntity));
      });


    } catch (e) {
      console.error("Handled", e);
    }

    return [];
  }

  async create(todoItem: TODOItem): Promise<TODOItem> {

    const res = this.http.post<TODOItem>("https://jsonplaceholder.typicode.com/todos", todoItem.toRaw());


    this.list();
    return this.mapRawToEntity(await res.toPromise());
  }
  async read(itemId: number) {

    const res = this.http.get<TODOItem>("https://jsonplaceholder.typicode.com/todos/" + itemId);

    return this.mapRawToEntity(await res.toPromise());
  }
  async update(item: TODOItem): Promise<TODOItem> {
    const res = this.http.put<TODOItem>("https://jsonplaceholder.typicode.com/todos/" + item.id, item.toRaw());

    this.list();
    return this.mapRawToEntity(await res.toPromise());
  }

  async delete(itemId: number): Promise<TODOItem> {
    const res = this.http.delete<TODOItem>("https://jsonplaceholder.typicode.com/todos/" + itemId);
    this.list();
    return this.mapRawToEntity(await res.toPromise());
  }

}

