import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TODOItem } from '../../entities/TODOItem';


function expectTodoItemEqualWithRaw(item: TODOItem, raw: any) {
  expect(item.id).toEqual(raw.id, "Raw Id and Item id, not equal");
  expect(item.userId).toEqual(raw.userId, "Raw Id and Item userId, not equal");
  expect(item.title).toEqual(raw.title, "Raw Id and Item title, not equal");
  expect(item.completed).toEqual(raw.completed, "Raw Id and Item completed, not equal");
}

describe('TodoService', () => {
  let service: TodoService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;




  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe("list", () => {



    it("request is successful return with entity list", async () => {
      const testData = [
        {
          "userId": 1,
          "id": 1,
          "title": "delectus aut autem",
          "completed": false
        },
        {
          "userId": 1,
          "id": 2,
          "title": "quis ut nam facilis et officia qui",
          "completed": true
        },
        {
          //Empty object for testing private method
        }
      ];

      service.list().then((list) => {
        console.log("listPromise", list);
        expect(list.length).toEqual(3);

        expectTodoItemEqualWithRaw(list[0], testData[0]);

        expectTodoItemEqualWithRaw(list[1], testData[1]);

        expectTodoItemEqualWithRaw(list[2], {
          userId: -1,
          id: -1,
          title: "-",
          completed: false
        });
      });

      const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/todos');

      expect(req.request.method).toEqual('GET');

      req.flush(testData, {
        status: 200,
        statusText: "OK"
      });

      httpTestingController.verify();
    })

    it("request has an error with empty array ", () => {
      const list = service.list();

      list.then((val) => {
        expect(val.length).toEqual(0);
      })

      const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/todos');

      expect(req.request.method).toEqual('GET');


      req.flush("Unauthorized", {
        status: 401,
        statusText: "Unauthorized"
      });

      httpTestingController.verify();
    })
  })

  it("create", () => {

    const todoITem = new TODOItem();

    service.create(todoITem).then((resItem) => {
      expect(resItem.id).toEqual(todoITem.id);
      expect(resItem.userId).toEqual(todoITem.userId);
      expect(resItem.title).toEqual(todoITem.title);
      expect(resItem.completed).toEqual(todoITem.completed);
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/todos');

    expect(req.request.method).toEqual('POST');

    expect(req.request.body.id).toEqual(todoITem.id);
    expect(req.request.body.userId).toEqual(todoITem.userId);
    expect(req.request.body.title).toEqual(todoITem.title);
    expect(req.request.body.completed).toEqual(todoITem.completed);


    req.flush(todoITem.toRaw(), {
      status: 200,
      statusText: "Ok"
    });

    httpTestingController.verify();
  })

  describe("read", () => {
    //Random testing
    const test = (testingId: number) => {

      const id = testingId;
      const userId = Math.ceil(Math.random() * 100);
      const title = Math.random() > 0.5 ? "A" : "B";
      const completed = Math.random() > 0.5;

      service.read(testingId).then((resTodo) => {
        expectTodoItemEqualWithRaw(resTodo, {
          id: id,
          userId: userId,
          title: title,
          completed: completed,
        });
      })

      const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/todos/' + testingId);

      expect(req.request.method).toEqual('GET');

      req.flush({
        id: id,
        userId: userId,
        title: title,
        completed: completed,
      }, {
        status: 200,
        statusText: "Ok"
      });

      httpTestingController.verify();
    }

    it("Read 1", () => { test(1); })
    //it("Read 2", () => { test(2); })
    //it("Read 3", () => { test(3); })
    //it("Read Random", () => { test(Math.ceil(Math.random() * 100)); })

  })

  describe("update", () => {

    //Random testing
    const test = (testingId: number) => {
      const todo = new TODOItem()

      todo.id = testingId;
      todo.userId = Math.ceil(Math.random() * 100);
      todo.title = Math.random() > 0.5 ? "A" : "B";
      todo.completed = Math.random() > 0.5;

      service.update(todo).then((resTodo) => {
        expectTodoItemEqualWithRaw(resTodo, todo)
      });


      const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/todos/' + testingId);

      expect(req.request.method).toEqual('PUT');

      expect(req.request.body.id).toEqual(todo.id);
      expect(req.request.body.userId).toEqual(todo.userId);
      expect(req.request.body.title).toEqual(todo.title);
      expect(req.request.body.completed).toEqual(todo.completed);

      req.flush({
        id: todo.id,
        userId: todo.userId,
        title: todo.title,
        completed: todo.completed,
      }, {
        status: 200,
        statusText: "Ok"
      });

      httpTestingController.verify();
    }

    it("Update 1", () => { test(1); })
    it("Update 2", () => { test(2); })
    it("Update 3", () => { test(3); })
    it("Update Random", () => { test(Math.ceil(Math.random() * 100)); })

  })
  describe("delete", () => {
    //Random testing
    const test = (testingId: number) => {

      const id = testingId;
      const userId = Math.ceil(Math.random() * 100);
      const title = Math.random() > 0.5 ? "A" : "B";
      const completed = Math.random() > 0.5;

      service.delete(testingId).then((resTodo) => {
        expectTodoItemEqualWithRaw(resTodo, {
          id: id,
          userId: userId,
          title: title,
          completed: completed,
        });
      })

      const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/todos/' + testingId);

      expect(req.request.method).toEqual('DELETE');

      req.flush({
        id: id,
        userId: userId,
        title: title,
        completed: completed,
      }, {
        status: 200,
        statusText: "Ok"
      });

      httpTestingController.verify();
    }

    it("Delete 1", () => { test(1); })
    it("Delete 2", () => { test(2); })
    it("Delete 3", () => { test(3); })
    it("Delete Random", () => { test(Math.ceil(Math.random() * 100)); })

  })

});
