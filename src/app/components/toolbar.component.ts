import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatSlideToggleModule],
  template: `
  <header class="toolbar">
    <div class="brand">
      <mat-icon>check_circle</mat-icon>
      <span>Todo Glow</span>
    </div>
    <div class="actions">
      <button mat-button (click)="onThemeToggle()" aria-label="Toggle theme">
        <mat-icon>dark_mode</mat-icon><span>Theme</span>
      </button>
      <a class="github" href="https://github.com/" target="_blank" rel="noreferrer"><mat-icon>code</mat-icon> Source</a>
    </div>
  </header>
  `,
  styles: [`
  .toolbar{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-radius:18px;backdrop-filter:blur(10px);background:rgba(255,255,255,.15);box-shadow:0 10px 30px rgba(0,0,0,.12)}
  .brand{display:flex;gap:8px;align-items:center;font-weight:700;letter-spacing:.4px}
  .brand mat-icon{font-variation-settings:"FILL" 1}
  .actions{display:flex;gap:10px;align-items:center}
  .github{display:inline-flex;gap:6px;align-items:center;text-decoration:none}
  `]
})
export class ToolbarComponent {
  onThemeToggle(){
    document.documentElement.classList.toggle('dark');
  }
}