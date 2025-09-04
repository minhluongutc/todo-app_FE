import {Component, Input, Output, EventEmitter, computed, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {Todo} from '../../models/todo';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor, NgIf, MatDividerModule, MatChipsModule, MatButtonModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit, OnChanges {
  @Input() todos: Todo[] = [];
  @Output() toggle = new EventEmitter<string>();
  @Output() rename = new EventEmitter<{ id: string, title: string }>();
  @Output() remove = new EventEmitter<string>();
  @Output() clearCompleted = new EventEmitter<void>();

  filter: 'all' | 'active' | 'completed' = 'all';

  constructor(private todoService: TodoService) {
    // todos
  }

  setFilter(f: 'all' | 'active' | 'completed') {
    this.filter = f;
    this.todos = this.todoService.getTodos().filter(t => {
      if (f === 'all') return true;
      return t.status === f;
    })
  }
  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todos']) {
      this.todos = changes['todos'].currentValue;
      console.log(this.todos);
    }
  }

}
