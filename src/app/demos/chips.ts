import { Component, computed, signal } from '@angular/core';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'demo-chips',
  imports: [MatChipsModule, MatIconModule, MatFormFieldModule],
  template: `
    <div class="page">
      <h1>Чипы</h1>
      <p class="lead">
        Чипы — маленькие «бирки»: компактные ярлычки с текстом. Ими показывают теги,
        выбранные фильтры или вводят набор значений — например, добавляешь теги к посту
        или адреса в письме. Часто их можно удалять крестиком и добавлять новые.
      </p>

      <section class="demo-section try">
        <h2>Теги-бирки</h2>
        <p class="explain">Просто ярлычки. Здесь у каждого есть крестик — нажми, чтобы удалить.</p>
        <mat-chip-set aria-label="Теги">
          @for (tag of tags(); track tag) {
            <mat-chip (removed)="removeTag(tag)">
              {{ tag }}
              <button matChipRemove aria-label="Удалить тег">
                <mat-icon>cancel</mat-icon>
              </button>
            </mat-chip>
          }
        </mat-chip-set>
        @if (tags().length === 0) {
          <p class="explain">Все теги удалены 🙂</p>
        }
      </section>

      <section class="demo-section try">
        <h2>Чипы-фильтры</h2>
        <p class="explain">
          Здесь чипы можно выбирать — как набор фильтров. Нажми несколько: у выбранных
          появится галочка.
        </p>
        <mat-chip-listbox multiple [value]="filters()" (change)="filters.set($event.value)" aria-label="Фильтры">
          @for (f of allFilters; track f) {
            <mat-chip-option [value]="f">{{ f }}</mat-chip-option>
          }
        </mat-chip-listbox>
        <span class="result">Выбрано: {{ filtersLabel() }}</span>
      </section>

      <section class="demo-section try">
        <h2>Ввод своих тегов</h2>
        <p class="explain">
          А так чипами вводят значения: впиши слово и нажми Enter — появится новый чип.
          Крестик удаляет.
        </p>
        <mat-form-field appearance="outline" class="field-wide">
          <mat-label>Ваши теги</mat-label>
          <mat-chip-grid #chipGrid aria-label="Ваши теги">
            @for (tag of myTags(); track tag) {
              <mat-chip-row (removed)="removeMyTag(tag)">
                {{ tag }}
                <button matChipRemove aria-label="Удалить тег">
                  <mat-icon>cancel</mat-icon>
                </button>
              </mat-chip-row>
            }
          </mat-chip-grid>
          <input
            placeholder="Новый тег…"
            [matChipInputFor]="chipGrid"
            (matChipInputTokenEnd)="addMyTag($event)"
          />
        </mat-form-field>
      </section>
    </div>
  `,
  styles: `
    .field-wide {
      width: 420px;
      max-width: 100%;
    }
    mat-chip-set,
    mat-chip-listbox {
      display: block;
    }
    .result {
      display: block;
      margin-top: 0.75rem;
      color: var(--mat-sys-primary);
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class ChipsPage {
  protected readonly tags = signal(['Срочно', 'Идея', 'В работе', 'Готово']);

  protected readonly allFilters = ['Дешёвые', 'В наличии', 'С доставкой', 'Со скидкой'];
  protected readonly filters = signal<string[]>([]);
  protected readonly filtersLabel = computed(() => {
    const f = this.filters();
    return f.length ? f.join(', ') : '—';
  });

  protected readonly myTags = signal(['ангуляр', 'material']);

  removeTag(tag: string): void {
    this.tags.update((list) => list.filter((t) => t !== tag));
  }

  addMyTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) this.myTags.update((list) => [...list, value]);
    event.chipInput?.clear();
  }

  removeMyTag(tag: string): void {
    this.myTags.update((list) => list.filter((t) => t !== tag));
  }
}
