export type TodoStatus = 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  notes?: string;
  status: TodoStatus;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  // order: number;     // for custom sorting / drag-drop
}
