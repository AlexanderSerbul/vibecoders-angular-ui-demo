import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'demo-buttons',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="page">
      <h1>Кнопки</h1>
      <p class="lead">
        Кнопка — это то, что человек нажимает, чтобы что-то произошло: отправить,
        сохранить, купить. В Material кнопки отличаются «громкостью»: чем заметнее
        кнопка, тем важнее действие.
      </p>

      <section class="demo-section">
        <h2>Главное правило: громкость = важность</h2>
        <p class="explain">
          На одном экране делайте <b>одну</b> самую заметную кнопку — это главное
          действие. Остальные пусть будут тише, чтобы не спорить с ней за внимание.
          Вот те же кнопки от «громкой» к «тихой»:
        </p>
        <div class="ladder">
          <div class="ladder-item">
            <button matButton="filled">Залитая</button>
            <span>погромче</span>
          </div>
          <div class="ladder-item"><button matButton="tonal">Тональная</button><span></span></div>
          <div class="ladder-item"><button matButton="outlined">С обводкой</button><span></span></div>
          <div class="ladder-item">
            <button matButton>Текстовая</button>
            <span>потише</span>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Залитая <code class="api">matButton="filled"</code></h2>
        <p class="explain">
          Самая заметная. Это главное действие экрана — то, что вы хотите, чтобы
          человек нажал в первую очередь: «Купить», «Отправить», «Сохранить».
          Обычно такая на экране одна.
        </p>
        <div class="demo-row">
          <button matButton="filled">Сохранить</button>
          <button matButton="filled"><mat-icon>send</mat-icon> Отправить</button>
          <button matButton="filled" disabled>Недоступно</button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Тональная <code class="api">matButton="tonal"</code></h2>
        <p class="explain">
          Мягкая заливка — что-то среднее по важности. Подходит, когда действие
          важное, но не самое главное на экране.
        </p>
        <div class="demo-row">
          <button matButton="tonal">Добавить в корзину</button>
          <button matButton="tonal"><mat-icon>bookmark</mat-icon> Сохранить позже</button>
        </div>
      </section>

      <section class="demo-section">
        <h2>С обводкой <code class="api">matButton="outlined"</code></h2>
        <p class="explain">
          Контур без заливки — для второстепенного действия рядом с главным.
          Классика: «Отмена» рядом с «Сохранить».
        </p>
        <div class="demo-row">
          <button matButton="filled">Сохранить</button>
          <button matButton="outlined">Отмена</button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Приподнятая <code class="api">matButton="elevated"</code></h2>
        <p class="explain">
          С лёгкой тенью, будто чуть приподнята над поверхностью. Помогает кнопке
          не потеряться на пёстром фоне или поверх картинки.
        </p>
        <div class="demo-row">
          <button matButton="elevated">Подробнее</button>
          <button matButton="elevated"><mat-icon>download</mat-icon> Скачать</button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Текстовая <code class="api">matButton</code></h2>
        <p class="explain">
          Просто текст без фона — самое незаметное действие. Для мелочей вроде
          «Подробнее», «Пропустить», «Не сейчас».
        </p>
        <div class="demo-row">
          <button matButton>Пропустить</button>
          <button matButton>Подробнее</button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Кнопка-иконка <code class="api">matIconButton</code></h2>
        <p class="explain">
          Только значок, без подписи — когда действие понятно по картинке:
          сердечко «в избранное», шестерёнка «настройки», корзина «удалить».
          Важно: такой кнопке всегда дают скрытую подпись (<code class="api">aria-label</code>),
          чтобы её «прочитали» программы для незрячих.
        </p>
        <div class="demo-row">
          <button matIconButton aria-label="В избранное"><mat-icon>favorite</mat-icon></button>
          <button matIconButton aria-label="Настройки"><mat-icon>settings</mat-icon></button>
          <button matIconButton aria-label="Поделиться"><mat-icon>share</mat-icon></button>
          <button matIconButton aria-label="Удалить"><mat-icon>delete</mat-icon></button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Плавающая кнопка (FAB) <code class="api">matFab</code></h2>
        <p class="explain">
          Большая круглая кнопка для <b>самого главного</b> действия на экране —
          чаще всего «создать новое» (письмо, заметку, контакт). Обычно «плавает»
          в правом нижнем углу. Бывает обычная, с подписью (extended) и
          уменьшенная (mini).
        </p>
        <div class="demo-row">
          <button matFab aria-label="Создать"><mat-icon>add</mat-icon></button>
          <button matFab extended><mat-icon>add</mat-icon> Создать</button>
          <button matMiniFab aria-label="Создать"><mat-icon>add</mat-icon></button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Неактивная кнопка</h2>
        <p class="explain">
          Серая кнопка, которая не нажимается. Так показывают, что действие сейчас
          недоступно — например, пока не заполнена форма. Как только всё готово —
          кнопка «оживает».
        </p>
        <div class="demo-row">
          <button matButton="filled" disabled>Оплатить</button>
          <button matButton="outlined" disabled>Отмена</button>
        </div>
      </section>

      <section class="demo-section try">
        <h2>Попробуйте сами</h2>
        <p class="explain">
          Нажмите — и увидите, что кнопка действительно «делает» действие:
        </p>
        <div class="demo-row">
          <button matButton="filled" (click)="count.set(count() + 1)">
            <mat-icon>add_reaction</mat-icon> Нажми меня
          </button>
          <span class="counter">Нажато: {{ count() }}</span>
          @if (count() > 0) {
            <button matButton (click)="count.set(0)">Сбросить</button>
          }
        </div>
      </section>
    </div>
  `,
  styles: `
    .explain {
      max-width: 70ch;
      line-height: 1.6;
      margin: 0 0 1rem;
    }
    .api {
      font-family: ui-monospace, monospace;
      font-size: 0.7em;
      font-weight: 400;
      background: var(--mat-sys-surface-container-high);
      color: var(--mat-sys-on-surface-variant);
      padding: 2px 8px;
      border-radius: 6px;
      vertical-align: middle;
      margin-left: 0.4rem;
    }
    .explain .api {
      margin-left: 0;
      font-size: 0.85em;
    }
    .ladder {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
    }
    .ladder-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.35rem;
    }
    .ladder-item span {
      font: var(--mat-sys-label-small);
      color: var(--mat-sys-on-surface-variant);
      min-height: 1em;
    }
    .counter {
      font: var(--mat-sys-title-medium);
    }
    .try {
      background: var(--mat-sys-surface-container-low);
      border-radius: 12px;
      padding: 1.25rem 1.5rem;
    }
  `,
})
export class ButtonsPage {
  protected readonly count = signal(0);
}
