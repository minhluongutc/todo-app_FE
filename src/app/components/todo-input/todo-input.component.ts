import { Component, EventEmitter, Output, signal } from '@angular/core';
import { MatFormField} from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule],
  template: `
  <form class="todo-input" (ngSubmit)="submit()">
    <mat-form-field appearance="outline" class="field">
      <mat-label>Thêm việc cần làm</mat-label>
      <input matInput placeholder="Ví dụ: Học Kubernetes, dọn phòng..." [(ngModel)]="titleValue" name="title">
    </mat-form-field>
    <button mat-raised-button type="submit">Thêm</button>
  </form>
  `,
  styles: [`
    .todo-input{display:flex;gap:12px}
    .field{flex:1}
  `]
})
export class TodoInputComponent {
  @Output() add = new EventEmitter<string>();
  titleValue = '';

  submit(){
    const t = this.titleValue.trim();
    if(!t) return;
    this.add.emit(t);
    this.titleValue = '';
  }
}