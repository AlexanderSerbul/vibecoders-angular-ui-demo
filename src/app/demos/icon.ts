import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

interface IconGroup {
  title: string;
  icons: string[];
}

@Component({
  selector: 'demo-icon',
  imports: [MatIconModule, MatButtonToggleModule],
  template: `
    <div class="page">
      <h1>Иконки</h1>
      <p class="lead">
        Иконки — маленькие понятные значки: сердечко «в избранное», корзина
        «удалить», лупа «поиск». Они экономят место и считываются мгновенно,
        ещё до чтения подписи.
      </p>

      <section class="demo-section">
        <h2>Как вставить иконку <code class="api">&lt;mat-icon&gt;</code></h2>
        <p class="explain">
          Пишешь <b>имя</b> иконки между тегами — и появляется картинка. Например,
          <code class="api">&lt;mat-icon&gt;home&lt;/mat-icon&gt;</code> покажет домик.
          Полный список имён — на
          <a href="https://fonts.google.com/icons" target="_blank" rel="noopener">Google Fonts Icons</a>.
        </p>
        <div class="demo-row">
          <span class="named"><mat-icon>home</mat-icon><code>home</code></span>
          <span class="named"><mat-icon>search</mat-icon><code>search</code></span>
          <span class="named"><mat-icon>favorite</mat-icon><code>favorite</code></span>
          <span class="named"><mat-icon>settings</mat-icon><code>settings</code></span>
        </div>
      </section>

      <section class="demo-section">
        <h2>Частые иконки — нажми, чтобы скопировать имя</h2>
        <p class="explain">
          Самые ходовые значки. Нажми на любой — его имя скопируется в буфер,
          вставишь в код или в промпт.
        </p>
        @if (copied()) {
          <p class="copied"><mat-icon>check</mat-icon> Скопировано: <code>{{ copied() }}</code></p>
        }
        @for (group of groups; track group.title) {
          <h3 class="group-title">{{ group.title }}</h3>
          <div class="icon-grid">
            @for (name of group.icons; track name) {
              <button
                type="button"
                class="icon-tile"
                (click)="copy(name)"
                [attr.aria-label]="'Скопировать имя иконки: ' + name"
              >
                <mat-icon>{{ name }}</mat-icon>
                <span class="name">{{ name }}</span>
              </button>
            }
          </div>
        }
      </section>

      <section class="demo-section">
        <h2>Размер</h2>
        <p class="explain">Иконка масштабируется как текст — задаётся размером шрифта. Переключи:</p>
        <div class="demo-row">
          <mat-button-toggle-group
            [value]="iconSize()"
            (change)="iconSize.set($event.value)"
            hideSingleSelectionIndicator
            aria-label="Размер иконки"
          >
            <mat-button-toggle value="24">Маленькая</mat-button-toggle>
            <mat-button-toggle value="36">Средняя</mat-button-toggle>
            <mat-button-toggle value="56">Большая</mat-button-toggle>
          </mat-button-toggle-group>
          <mat-icon
            class="size-sample"
            [style.font-size.px]="iconSize()"
            [style.width.px]="iconSize()"
            [style.height.px]="iconSize()"
            >rocket_launch</mat-icon
          >
        </div>
      </section>

      <section class="demo-section">
        <h2>Цвет</h2>
        <p class="explain">
          По умолчанию иконка берёт цвет текста рядом. Можно покрасить — например,
          в цвета темы. Переключи тему вверху справа — эти иконки поменяются вместе с ней.
        </p>
        <div class="demo-row color-row">
          <mat-icon>favorite</mat-icon>
          <mat-icon style="color: var(--mat-sys-primary)">palette</mat-icon>
          <mat-icon style="color: var(--mat-sys-tertiary)">spa</mat-icon>
          <mat-icon style="color: var(--mat-sys-error)">report</mat-icon>
        </div>
      </section>

      <section class="demo-section">
        <h2>Иконка рядом с текстом</h2>
        <p class="explain">Чаще всего иконка стоит рядом с подписью — так понятнее всего.</p>
        <div class="demo-row">
          <span class="inline-ic"><mat-icon>schedule</mat-icon> 5 минут</span>
          <span class="inline-ic"><mat-icon>location_on</mat-icon> Москва</span>
          <span class="inline-ic"><mat-icon>verified</mat-icon> Проверено</span>
        </div>
      </section>

      <section class="demo-section">
        <h2>Доступность (для незрячих)</h2>
        <p class="explain">
          Если иконка — просто украшение рядом с текстом, программы для незрячих её
          пропускают (так и задумано). Но если значок несёт смысл сам по себе —
          например, кнопка только с иконкой, — ему дают скрытую подпись
          (<code class="api">aria-label</code>), иначе человек не поймёт, что это.
          Подробнее — на странице «Кнопки».
        </p>
      </section>
    </div>
  `,
  styles: `
    .named,
    .inline-ic {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    .group-title {
      font: var(--mat-sys-title-small);
      color: var(--mat-sys-on-surface-variant);
      margin: 1.25rem 0 0.5rem;
    }
    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 0.5rem;
    }
    .icon-tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
      padding: 0.85rem 0.4rem;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 10px;
      background: var(--mat-sys-surface-container-low);
      color: var(--mat-sys-on-surface);
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
    }
    .icon-tile:hover {
      background: var(--mat-sys-surface-container-high);
      border-color: var(--mat-sys-primary);
    }
    .icon-tile mat-icon {
      color: var(--mat-sys-primary);
    }
    .icon-tile .name {
      font-family: ui-monospace, monospace;
      font-size: 0.72rem;
      color: var(--mat-sys-on-surface-variant);
      text-align: center;
      word-break: break-word;
      line-height: 1.2;
    }
    .copied {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      margin: 0 0 0.75rem;
      padding: 0.4rem 0.75rem;
      border-radius: 8px;
      background: var(--mat-sys-surface-container-high);
      color: var(--mat-sys-primary);
    }
    .copied mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
    .size-sample {
      transition: font-size 0.15s;
    }
  `,
})
export class IconPage {
  protected readonly copied = signal('');
  protected readonly iconSize = signal('36');

  protected readonly groups: IconGroup[] = [
    {
      title: 'Навигация и основное',
      icons: ['home', 'menu', 'search', 'settings', 'close', 'arrow_back', 'arrow_forward', 'more_vert', 'expand_more', 'check'],
    },
    {
      title: 'Действия',
      icons: ['add', 'edit', 'delete', 'content_copy', 'save', 'share', 'download', 'upload', 'refresh', 'done'],
    },
    {
      title: 'Общение',
      icons: ['favorite', 'star', 'thumb_up', 'notifications', 'chat', 'mail', 'call', 'person', 'group', 'visibility'],
    },
    {
      title: 'Файлы и медиа',
      icons: ['photo_camera', 'image', 'play_arrow', 'pause', 'folder', 'attach_file', 'calendar_today', 'schedule', 'location_on', 'shopping_cart'],
    },
  ];

  copy(name: string): void {
    this.copied.set(name);
    navigator.clipboard?.writeText(name).catch(() => {
      /* буфер недоступен — подтверждение всё равно покажем */
    });
  }
}
