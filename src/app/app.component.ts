import {Component, computed} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {MATERIAL_IMPORTS} from './material.imports';
import {ToolbarComponent} from './components/toolbar.component';
import {TodoInputComponent} from './components/todo-input/todo-input.component';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {TodoService} from './services/todo.service';
import {Todo} from "./models/todo";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf, ToolbarComponent, TodoInputComponent, TodoListComponent, ...MATERIAL_IMPORTS],
  template: `
    <div class="bg">
      <div class="gradient"></div>
    </div>

    <main class="container">
      <app-toolbar></app-toolbar>

      <mat-card class="panel">
        <h1>Danh sách việc cần làm</h1>
        <app-todo-input (add)="onAdd($event)"></app-todo-input>

        <mat-divider class="my-16"></mat-divider>

        <app-todo-list
          [todos]="todos"
          (toggle)="onToggle($event)"
          (rename)="onRename($event)"
          (remove)="onRemove($event)"
          (clearCompleted)="onClearCompleted()"
        ></app-todo-list>

        <div class="footer">
<!--          <span>{{ activeCount() }} việc đang làm • {{ completedCount() }} hoàn thành</span>-->
        </div>
      </mat-card>
    </main>
  `,
  styleUrls: [`./app.component.scss`]
})
export class AppComponent {
  // todos = this.todoService.todos;
  // activeCount = this.todoService.activeCount;
  // completedCount = this.todoService.completedCount;
  todos: Todo[] = this.todoService['todos'];

  constructor(private todoService: TodoService) {
    // todos
  }

  onAdd(title: string) {
    this.todoService.add(title);
    this.todos = this.todoService.getTodos();
    console.log(this.todos);
  }

  onToggle(id: string) {
    this.todoService.toggle(id);
  }

  onRename(e: { id: string, title: string }) {
    this.todoService.rename(e.id, e.title);
  }

  onRemove(id: string) {
    this.todoService.remove(id);
    this.todos = this.todoService.getTodos();
  }

  onClearCompleted() {
    this.todoService.clearCompleted();
    this.todos = this.todoService.getTodos();
  }
}
