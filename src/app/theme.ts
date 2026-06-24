import { Injectable, effect, signal } from '@angular/core';

export type ThemeColor = 'azure' | 'green' | 'violet' | 'rose';
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Хранит выбор темы (цветная палитра + светлая/тёмная/системная) в signals,
 * применяет его к <html> и запоминает в localStorage.
 *
 * Тёмная тема ничего не пересобирает: mat.theme() уже эмитит пары light-dark(),
 * а режим выбирает CSS-свойство `color-scheme`. Цвет — это класс `theme-*` на <html>.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly color = signal<ThemeColor>(this.stored('color', 'azure'));
  readonly mode = signal<ThemeMode>(this.stored('mode', 'light'));

  constructor() {
    effect(() => {
      const color = this.color();
      const mode = this.mode();
      const html = document.documentElement;

      html.classList.remove('theme-azure', 'theme-green', 'theme-violet', 'theme-rose');
      if (color !== 'azure') html.classList.add(`theme-${color}`);

      html.style.colorScheme = mode === 'system' ? 'light dark' : mode;

      try {
        localStorage.setItem('mat-demo-color', color);
        localStorage.setItem('mat-demo-mode', mode);
      } catch {
        /* localStorage может быть недоступен — не критично */
      }
    });
  }

  setColor(color: ThemeColor): void {
    this.color.set(color);
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
  }

  /** Светлая → тёмная → как в системе → светлая. */
  toggleMode(): void {
    this.mode.update((m) => (m === 'light' ? 'dark' : m === 'dark' ? 'system' : 'light'));
  }

  private stored<T extends string>(key: 'color' | 'mode', fallback: T): T {
    try {
      return (localStorage.getItem(`mat-demo-${key}`) as T) ?? fallback;
    } catch {
      return fallback;
    }
  }
}
