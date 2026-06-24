import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeColor, ThemeService } from './theme';

@Component({
  selector: 'theme-switcher',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  template: `
    <button
      matIconButton
      (click)="theme.toggleMode()"
      [matTooltip]="'Тема: ' + modeLabel()"
      [attr.aria-label]="'Сменить тему. Сейчас: ' + modeLabel()"
    >
      <mat-icon>{{ modeIcon() }}</mat-icon>
    </button>

    <button
      matIconButton
      [matMenuTriggerFor]="paletteMenu"
      matTooltip="Цвет темы"
      aria-label="Выбрать цвет темы"
    >
      <mat-icon>palette</mat-icon>
    </button>
    <mat-menu #paletteMenu="matMenu">
      @for (p of palettes; track p.id) {
        <button mat-menu-item (click)="theme.setColor(p.id)">
          <span class="swatch" [style.background-color]="p.dot"></span>
          <span>{{ p.label }}</span>
          @if (theme.color() === p.id) {
            <mat-icon class="swatch-check">check</mat-icon>
          }
        </button>
      }
    </mat-menu>
  `,
})
export class ThemeSwitcher {
  protected readonly theme = inject(ThemeService);

  protected readonly modeIcon = computed(
    () =>
      ({ light: 'light_mode', dark: 'dark_mode', system: 'brightness_auto' })[this.theme.mode()],
  );
  protected readonly modeLabel = computed(
    () => ({ light: 'светлая', dark: 'тёмная', system: 'как в системе' })[this.theme.mode()],
  );

  protected readonly palettes: { id: ThemeColor; label: string; dot: string }[] = [
    { id: 'azure', label: 'Лазурная', dot: '#005cbb' },
    { id: 'green', label: 'Зелёная', dot: '#3c6900' },
    { id: 'violet', label: 'Фиолетовая', dot: '#6a4cc7' },
    { id: 'rose', label: 'Розовая', dot: '#b3325a' },
  ];
}
