import { Component, signal } from '@angular/core';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'demo-list',
  imports: [MatListModule, MatIconModule],
  template: `
    <div class="page">
      <h1>Списки</h1>
      <p class="lead">
        Список — это аккуратные строки одного вида: текст, иногда иконка или картинка
        слева и вторая строчка‑пояснение. Из списков делают меню, настройки, перечни
        писем и контактов. Бывают просто для показа, кликабельные и с галочками для выбора.
      </p>

      <section class="demo-section">
        <h2>Обычный список</h2>
        <p class="explain">
          Строка может нести иконку слева, заголовок и приглушённую вторую строку
          с деталями. Такой список просто показывает данные — на него не нажимают.
        </p>
        <mat-list class="boxed">
          @for (f of files; track f.name) {
            <mat-list-item>
              <mat-icon matListItemIcon>{{ f.icon }}</mat-icon>
              <span matListItemTitle>{{ f.name }}</span>
              <span matListItemLine>{{ f.meta }}</span>
            </mat-list-item>
          }
        </mat-list>
      </section>

      <section class="demo-section try">
        <h2>Список с галочками</h2>
        <p class="explain">
          Если из строк нужно что‑то <b>выбрать</b> — у каждой появляется галочка.
          Отметь начинку: внизу соберётся список выбранного.
        </p>
        <mat-selection-list class="boxed" (selectionChange)="onSelect($event)" aria-label="Начинка пиццы">
          @for (t of toppings; track t) {
            <mat-list-option [value]="t">{{ t }}</mat-list-option>
          }
        </mat-selection-list>
        <p class="result">Выбрано: <b>{{ chosen().length ? chosen().join(', ') : 'ничего' }}</b></p>
      </section>

      <section class="demo-section">
        <h2>Когда список?</h2>
        <p class="explain">
          Список хорош для <b>однотипных строк</b>, где у каждой нет своей картинки‑обложки
          и набора кнопок, — иначе берите <b>карточки</b>. Строки можно сделать ссылками
          (тогда это навигация — как пункты бокового меню) или кнопками‑действиями. А если
          данные удобнее сравнивать по столбцам — это уже <b>таблица</b>.
        </p>
      </section>
    </div>
  `,
  styles: `
    .boxed {
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 12px;
      max-width: 480px;
    }
    .result {
      margin-top: 1rem;
    }
  `,
})
export class ListPage {
  protected readonly chosen = signal<string[]>([]);
  protected readonly toppings = ['Сыр', 'Грибы', 'Пепперони', 'Оливки', 'Халапеньо'];

  protected readonly files = [
    { icon: 'description', name: 'Отчёт.pdf', meta: 'изменён вчера · 2,4 МБ' },
    { icon: 'image', name: 'Обложка.png', meta: 'изменён 3 дня назад · 1,1 МБ' },
    { icon: 'table_chart', name: 'Бюджет.xlsx', meta: 'изменён неделю назад · 320 КБ' },
  ];

  onSelect(e: MatSelectionListChange): void {
    this.chosen.set(e.source.selectedOptions.selected.map((o) => o.value as string));
  }
}
