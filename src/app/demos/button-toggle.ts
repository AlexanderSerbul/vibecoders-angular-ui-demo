import { Component, computed, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'demo-button-toggle',
  imports: [MatButtonToggleModule, MatIconModule],
  template: `
    <div class="page">
      <h1>Кнопки-переключатели</h1>
      <p class="lead">
        Группа соединённых кнопок, из которых выбираешь вариант. В отличие от
        обычной кнопки (она делает действие и тут же «отпускается»), переключатель
        запоминает выбор и остаётся «нажатым» — как кнопки на старом радиоприёмнике:
        нажал одну, остальные отжались.
      </p>

      <section class="demo-section">
        <h2>Один выбор <code class="api">mat-button-toggle-group</code></h2>
        <p class="explain">
          Можно выбрать только один вариант из группы. Классика — выравнивание
          текста. Понажимай кнопки — образец ниже сразу подстроится.
        </p>
        <div class="demo-row">
          <mat-button-toggle-group
            [value]="align()"
            (change)="align.set($event.value)"
            hideSingleSelectionIndicator
            aria-label="Выравнивание текста"
          >
            <mat-button-toggle value="left" aria-label="По левому краю">
              <mat-icon>format_align_left</mat-icon>
            </mat-button-toggle>
            <mat-button-toggle value="center" aria-label="По центру">
              <mat-icon>format_align_center</mat-icon>
            </mat-button-toggle>
            <mat-button-toggle value="right" aria-label="По правому краю">
              <mat-icon>format_align_right</mat-icon>
            </mat-button-toggle>
            <mat-button-toggle value="justify" aria-label="По ширине">
              <mat-icon>format_align_justify</mat-icon>
            </mat-button-toggle>
          </mat-button-toggle-group>
          <span class="value-label">Выбрано: {{ alignLabel() }}</span>
        </div>
        <p class="sample" [style.text-align]="align()">
          Это образец текста. Нажимайте кнопки выравнивания выше — и абзац будет
          прижиматься влево, по центру, вправо или растягиваться по ширине.
        </p>
      </section>

      <section class="demo-section">
        <h2>Несколько сразу <code class="api">multiple</code></h2>
        <p class="explain">
          Если добавить режим «несколько» (<code class="api">multiple</code>), можно
          включить сразу несколько вариантов — например, жирный и курсив вместе.
        </p>
        <div class="demo-row">
          <mat-button-toggle-group
            multiple
            [value]="formats()"
            (change)="formats.set($event.value)"
            aria-label="Форматирование текста"
          >
            <mat-button-toggle value="bold" aria-label="Жирный">
              <mat-icon>format_bold</mat-icon>
            </mat-button-toggle>
            <mat-button-toggle value="italic" aria-label="Курсив">
              <mat-icon>format_italic</mat-icon>
            </mat-button-toggle>
            <mat-button-toggle value="underline" aria-label="Подчёркнутый">
              <mat-icon>format_underlined</mat-icon>
            </mat-button-toggle>
          </mat-button-toggle-group>
        </div>
        <p
          class="sample"
          [style.font-weight]="formats().includes('bold') ? '700' : '400'"
          [style.font-style]="formats().includes('italic') ? 'italic' : 'normal'"
          [style.text-decoration]="formats().includes('underline') ? 'underline' : 'none'"
        >
          Образец текста — включайте жирный, курсив и подчёркивание в любых сочетаниях.
        </p>
      </section>

      <section class="demo-section">
        <h2>С текстом, а не значками</h2>
        <p class="explain">
          Внутри переключателей может быть и обычный текст — удобно для коротких
          понятных вариантов, например периода.
        </p>
        <div class="demo-row">
          <mat-button-toggle-group
            [value]="period()"
            (change)="period.set($event.value)"
            hideSingleSelectionIndicator
            aria-label="Период"
          >
            <mat-button-toggle value="День">День</mat-button-toggle>
            <mat-button-toggle value="Неделя">Неделя</mat-button-toggle>
            <mat-button-toggle value="Месяц">Месяц</mat-button-toggle>
          </mat-button-toggle-group>
          <span class="value-label">Период: {{ period() }}</span>
        </div>
      </section>

      <section class="demo-section">
        <h2>Отдельные варианты можно отключить</h2>
        <p class="explain">
          Недоступный вариант становится серым и ненажимаемым — например, размера
          «нет в наличии».
        </p>
        <div class="demo-row">
          <mat-button-toggle-group value="M" hideSingleSelectionIndicator aria-label="Размер">
            <mat-button-toggle value="S">S</mat-button-toggle>
            <mat-button-toggle value="M">M</mat-button-toggle>
            <mat-button-toggle value="L" disabled>L — нет в наличии</mat-button-toggle>
          </mat-button-toggle-group>
        </div>
      </section>

      <section class="demo-section">
        <h2>Когда что брать</h2>
        <p class="explain">
          Переключатели хороши, когда вариантов немного (2–5) и их удобно показать
          в ряд, особенно значками: выравнивание, вид списка, период. Если вариантов
          много или это длинные подписи — лучше выпадающий список или радио-кнопки.
          А если нужно просто «сделать действие» (отправить, сохранить) — это
          <b>обычная кнопка</b>, а не переключатель.
        </p>
      </section>
    </div>
  `,
  styles: `
    .sample {
      margin: 1rem 0 0;
      padding: 1rem;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 8px;
      background: var(--mat-sys-surface-container-low);
      max-width: 560px;
    }
    .value-label {
      color: var(--mat-sys-on-surface-variant);
    }
  `,
})
export class ButtonTogglePage {
  protected readonly align = signal<'left' | 'center' | 'right' | 'justify'>('left');
  protected readonly formats = signal<string[]>(['bold']);
  protected readonly period = signal('Неделя');

  protected readonly alignLabel = computed(
    () =>
      ({
        left: 'по левому краю',
        center: 'по центру',
        right: 'по правому краю',
        justify: 'по ширине',
      })[this.align()],
  );
}
