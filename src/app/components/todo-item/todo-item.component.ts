import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo';

@Component({
  standalone: true,
  selector: 'app-todo-item',
  imports: [
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrls: ['todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<string>();
  @Output() rename = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  editing = signal(false);

  onRename(event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (input && input.value != null) {
      this.rename.emit(input.value);
    }
  }
}
