import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TODOItem } from '../../entities/TODOItem';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

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
      const res = this.http.get<TODOItem[]>("https://jsonplaceholder.typicode.com/todos");

      console.log("res ", res);
      const values = await res.toPromise();
      if (values) {
        return values.map(this.mapRawToEntity);
      } else {
        return [];
      }

    } catch (e) {
      console.error("Handled", e);
    }

    return [];
  }

  async create(todoItem: TODOItem): Promise<TODOItem> {

    const res = this.http.post<TODOItem>("https://jsonplaceholder.typicode.com/todos", todoItem.toRaw());

    return this.mapRawToEntity(await res.toPromise());
  }
  async read(itemId: number) {

    const res = this.http.get<TODOItem>("https://jsonplaceholder.typicode.com/todos/" + itemId);

    return this.mapRawToEntity(await res.toPromise());
  }
  async update(item: TODOItem): Promise<TODOItem> {
    const res = this.http.put<TODOItem>("https://jsonplaceholder.typicode.com/todos/" + item.id, item.toRaw());

    return this.mapRawToEntity(await res.toPromise());
  }

  async delete(itemId: number): Promise<TODOItem> {
    const res = this.http.delete<TODOItem>("https://jsonplaceholder.typicode.com/todos/" + itemId);

    return this.mapRawToEntity(await res.toPromise());
  }

}

