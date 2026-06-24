import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Feature {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'demo-home',
  imports: [MatCardModule, MatIconModule],
  template: `
    <section class="hero">
      <h1>Каталог компонентов Angular Material</h1>
      <p class="subtitle">
        Витрина важных компонентов Material 3 на Angular {{ angularVersion }} (zoneless).
        Выбирайте раздел в верхнем меню — страницы добавляются по одной.
      </p>
    </section>

    <section class="features">
      @for (f of features; track f.title) {
        <mat-card appearance="outlined" class="feature-card">
          <mat-card-content>
            <mat-icon class="feature-icon">{{ f.icon }}</mat-icon>
            <h3>{{ f.title }}</h3>
            <p>{{ f.text }}</p>
          </mat-card-content>
        </mat-card>
      }
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .hero {
      text-align: center;
      padding: 4rem 1rem 3rem;
    }
    .hero h1 {
      font: var(--mat-sys-display-small);
      margin: 0 0 1rem;
    }
    .subtitle {
      max-width: 640px;
      margin: 0 auto;
      color: var(--mat-sys-on-surface-variant);
      font: var(--mat-sys-body-large);
    }
    .features {
      max-width: 1080px;
      margin: 0 auto;
      padding: 0 1.5rem 4rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.25rem;
    }
    .feature-icon {
      width: 48px;
      height: 48px;
      font-size: 48px;
      color: var(--mat-sys-primary);
      margin-bottom: 0.75rem;
    }
    .feature-card h3 {
      font: var(--mat-sys-title-large);
      margin: 0 0 0.5rem;
    }
    .feature-card p {
      margin: 0;
      color: var(--mat-sys-on-surface-variant);
    }
  `,
})
export class HomePage {
  protected readonly angularVersion = 22;

  protected readonly features: Feature[] = [
    {
      icon: 'widgets',
      title: 'Компоненты',
      text: 'Кнопки, поля форм, таблицы, диалоги и другое — каждый на своей странице с описанием.',
    },
    {
      icon: 'palette',
      title: 'Material 3',
      text: 'Единая темизация на CSS-переменных и azure-палитра из коробки.',
    },
    {
      icon: 'menu_open',
      title: 'Навигация',
      text: 'Компоненты сгруппированы в верхнем меню по официальным разделам Material.',
    },
  ];
}
