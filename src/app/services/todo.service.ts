import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { environment } from '../../environments/environment';

const STORAGE_KEY = 'todo-glass-ui';

@Injectable({ providedIn: 'root' })
export class TodoService {
  // private todosSig = signal<Todo[]>(this.loadFromStorage());
  // public todos = computed(() =>
  //   this.todosSig()
  //     .slice()
  //     .sort((a, b) => a.order - b.order)
  // );

  // public activeCount = computed(
  //   () => this.todos().filter((t) => t.status === 'active').length
  // );
  // public completedCount = computed(
  //   () => this.todos().filter((t) => t.status === 'completed').length
  // );
  private todos: Todo[] = this.loadFromStorage();

  constructor(private http: HttpClient) {}

  private saveToStorage(todos: Todo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  private loadFromStorage(): Todo[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Todo[];
    } catch {
      return [];
    }
  }

  /** Generate an id */
  private uid() {
    return crypto.randomUUID();
  }

  getTodos(): Todo[] {
    return this.loadFromStorage();
  }

  /** Add a new todo */
  add(title: string) {
    const now = new Date().toISOString();
    const todo: Todo = {
      id: this.uid(),
      title: title.trim(),
      status: 'active',
      createdAt: now,
      updatedAt: now,
    };
    this.todos.push(todo);
    this.saveToStorage(this.todos);
  }

  /** Toggle status */
  toggle(id: string) {
    const updated: Todo[] = this.todos.map((t) =>
      t.id === id
        ? {
            ...t,
            status: t.status === 'active' ? 'completed' : 'active',
            updatedAt: new Date().toISOString(),
          }
        : t
    );
    this.todos = updated;
    this.saveToStorage(updated);
  }

  /** Edit title */
  rename(id: string, title: string) {
    const updated: Todo[] = this.todos.map((t) =>
      t.id === id
        ? { ...t, title: title.trim(), updatedAt: new Date().toISOString() }
        : t
    );
    this.todos = updated;
    this.saveToStorage(updated);
  }

  /** Update notes */
  setNotes(id: string, notes: string) {
    // const updated = this.todosSig().map((t) =>
    //   t.id === id ? { ...t, notes, updatedAt: new Date().toISOString() } : t
    // );
    // this.todosSig.set(updated);
    // this.saveToStorage(updated);
  }

  /** Delete */
  remove(id: string) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveToStorage(this.todos);
  }

  /** Clear completed */
  clearCompleted() {
    this.todos = this.todos.filter((t) => t.status !== 'completed');
    this.saveToStorage(this.todos);
  }

  /** Reorder (simple swap) */
  move(fromIndex: number, toIndex: number) {
    // const arr = this.todosSig().slice();
    // const [item] = arr.splice(fromIndex, 1);
    // arr.splice(toIndex, 0, item);
    // arr.forEach((t, i) => (t.order = i + 1));
    // this.todosSig.set(arr);
    // this.saveToStorage(arr);
  }
}
