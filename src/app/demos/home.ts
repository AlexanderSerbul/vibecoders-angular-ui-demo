import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'demo-home',
  imports: [DecimalPipe, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <section class="hero">
      <h1>Каталог компонентов Angular Material</h1>
    </section>

    <section class="vibe">
      <mat-card appearance="outlined" class="vibe-card">
        <mat-card-content>
          <h2 class="vibe-title">
            <mat-icon>auto_awesome</mat-icon> Сделано вайбкодингом — собери подобный сайт и ты
          </h2>
          <p class="vibe-text">
            Весь этот сайт собран без ручного программирования — общением простым
            человеческим языком с AI-агентом в Claude Desktop (вкладка «Code»,
            модель Opus 4.8, режим рассуждения «Max», контекст 1 млн токенов).
            Хочешь такой же? Достаточно начать с одной фразы:
          </p>
          <p class="prompt">«Давай сделаем минимальный сайт на Angular Material»</p>
          <p class="vibe-text">А дальше создавай разделы, компоненты, контент так же просто:</p>
          <p class="prompt">«Добавь в раздел такой-то компонент такой-то»</p>

          <div class="vibe-actions">
            <a
              matButton="filled"
              href="https://github.com/AlexanderSerbul/vibecoders-angular-ui-demo"
              target="_blank"
              rel="noopener"
            >
              <svg class="gh-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path [attr.d]="ghPath" />
              </svg>
              Исходники на GitHub
            </a>

            <a matButton="outlined" href="https://github.com/angular/angular" target="_blank" rel="noopener">
              <svg class="gh-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path [attr.d]="ghPath" />
              </svg>
              <span>Angular</span>
              <span class="stars"><mat-icon class="star-ic">star</mat-icon>{{ stars() | number }}</span>
            </a>
          </div>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .hero {
      text-align: center;
      padding: 4rem 1rem 2rem;
    }
    .hero h1 {
      font: var(--mat-sys-display-small);
      margin: 0;
    }
    .vibe {
      max-width: 1080px;
      margin: 0 auto;
      padding: 1rem 1.5rem 4rem;
    }
    .vibe-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font: var(--mat-sys-headline-small);
      margin: 0 0 1rem;
    }
    .vibe-title mat-icon {
      color: var(--mat-sys-primary);
    }
    .vibe-text {
      margin: 0.75rem 0;
      max-width: 70ch;
      color: var(--mat-sys-on-surface-variant);
    }
    .prompt {
      margin: 0.5rem 0;
      padding: 0.75rem 1rem;
      border-left: 3px solid var(--mat-sys-primary);
      border-radius: 6px;
      background: var(--mat-sys-surface-container-high);
      font: var(--mat-sys-title-medium);
    }
    .vibe-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }
    .stars {
      display: inline-flex;
      align-items: center;
      gap: 0.15rem;
      margin-left: 0.4rem;
      font-weight: 600;
    }
    .star-ic {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #f5a623;
    }
  `,
})
export class HomePage {
  // Логотип GitHub (Octocat) — общий путь для обеих ссылок.
  protected readonly ghPath =
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12';

  // Подстраховка: показываем последнее известное число, а живой запрос обновит его,
  // когда GitHub API доступен (без токена лимит — всего 60 запросов в час).
  protected readonly stars = signal(100447);

  constructor() {
    // Живое число звёзд Angular с GitHub. Если не вышло (лимит/оффлайн) — просто не покажем.
    fetch('https://api.github.com/repos/angular/angular')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.stargazers_count === 'number') this.stars.set(d.stargazers_count);
      })
      .catch(() => {});
  }
}
