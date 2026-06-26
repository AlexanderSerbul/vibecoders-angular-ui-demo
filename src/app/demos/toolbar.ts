import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'demo-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <div class="page">
      <h1>Тулбар</h1>
      <p class="lead">
        Тулбар — это верхняя полоса приложения. Слева обычно название или логотип,
        справа — кнопки‑действия: поиск, профиль, меню. Та самая полоса, что наверху
        этого сайта.
      </p>

      <section class="demo-section try">
        <h2>Тулбар в действии</h2>
        <p class="explain">
          Слева — название, дальше «распорка» (пустое место, которое отодвигает всё
          остальное к правому краю), справа — кнопки‑действия. Нажми любую — увидишь,
          что сработало.
        </p>
        <mat-toolbar class="bar">
          <button matIconButton aria-label="Меню раздела" (click)="run('Меню')">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="bar-title">Моё приложение</span>
          <span class="spacer"></span>
          <button matIconButton aria-label="Поиск" (click)="run('Поиск')">
            <mat-icon>search</mat-icon>
          </button>
          <button matIconButton aria-label="В избранное" (click)="run('Избранное')">
            <mat-icon>favorite</mat-icon>
          </button>
          <button matIconButton aria-label="Ещё" [matMenuTriggerFor]="more">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #more="matMenu">
            <button mat-menu-item (click)="run('Профиль')">Профиль</button>
            <button mat-menu-item (click)="run('Настройки')">Настройки</button>
          </mat-menu>
        </mat-toolbar>
        <p class="result">Последнее действие: <b>{{ lastAction() }}</b></p>
      </section>

      <section class="demo-section">
        <h2>Цвет</h2>
        <p class="explain">
          Полосу можно покрасить в основной цвет приложения, чтобы она выделялась, —
          или оставить нейтральной, чтобы не отвлекала. Цвет берётся из темы сайта:
          смени её переключателем вверху — полосы поменяются вместе с ней.
        </p>
        <div class="bars">
          <mat-toolbar class="bar"><span class="bar-title">Нейтральный</span></mat-toolbar>
          <mat-toolbar class="bar tb-primary"><span class="bar-title">Основной цвет</span></mat-toolbar>
          <mat-toolbar class="bar tb-tertiary"><span class="bar-title">Дополнительный цвет</span></mat-toolbar>
        </div>
      </section>

      <section class="demo-section">
        <h2>Две строки</h2>
        <p class="explain">
          Когда нужно уместить больше — заголовок, а под ним разделы — тулбар умеет
          в несколько строк.
        </p>
        <mat-toolbar class="bar">
          <mat-toolbar-row>
            <span class="bar-title">Почта</span>
            <span class="spacer"></span>
            <button matIconButton aria-label="Поиск по почте">
              <mat-icon>search</mat-icon>
            </button>
          </mat-toolbar-row>
          <mat-toolbar-row class="sub-row">
            <span>Входящие</span>
            <span>Отправленные</span>
            <span>Черновики</span>
          </mat-toolbar-row>
        </mat-toolbar>
      </section>

      <section class="demo-section">
        <h2>Когда тулбар?</h2>
        <p class="explain">
          Тулбар — это «шапка» экрана: в ней держат название текущего раздела и
          несколько частых действий. Для переходов между разделами рядом ставят
          <b>меню</b> или <b>боковую панель</b>, а сам тулбар оставляют для заголовка
          и кнопок. Не перегружай его — три‑четыре действия справа, остальное прячь
          под кнопку «Ещё».
        </p>
      </section>
    </div>
  `,
  styles: `
    .bar {
      border-radius: 12px;
    }
    .bar-title {
      font-size: 1rem;
      font-weight: 500;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .bars {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .tb-primary {
      background: var(--mat-sys-primary);
      color: var(--mat-sys-on-primary);
    }
    .tb-tertiary {
      background: var(--mat-sys-tertiary);
      color: var(--mat-sys-on-tertiary);
    }
    .sub-row {
      gap: 1.5rem;
      font-size: 0.9rem;
      opacity: 0.85;
    }
    .result {
      margin-top: 1rem;
    }
  `,
})
export class ToolbarPage {
  protected readonly lastAction = signal('—');

  run(name: string): void {
    this.lastAction.set(name);
  }
}
