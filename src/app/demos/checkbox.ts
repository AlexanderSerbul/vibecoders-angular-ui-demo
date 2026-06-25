import { Component, computed, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface Item {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'demo-checkbox',
  imports: [MatCheckboxModule],
  template: `
    <div class="page">
      <h1>Чекбокс</h1>
      <p class="lead">
        Чекбокс — квадратик, который ставишь галочкой или снимаешь. Каждый сам по себе:
        можно отметить сразу несколько. Так соглашаются с условиями, включают опции или
        выбирают несколько пунктов из списка.
      </p>

      <section class="demo-section try">
        <h2>Базовый чекбокс</h2>
        <p class="explain">Нажми — галочка появится или пропадёт, опция включится или выключится.</p>
        <div class="demo-row">
          <mat-checkbox [checked]="agree()" (change)="agree.set($event.checked)">
            Согласен с условиями
          </mat-checkbox>
          <span class="result">{{ agree() ? 'Включено' : 'Выключено' }}</span>
        </div>
      </section>

      <section class="demo-section try">
        <h2>Несколько сразу и «Выбрать всё»</h2>
        <p class="explain">
          Главный чекбокс «Выбрать всё» управляет списком. Когда отмечены не все, а
          только часть — он показывает «промежуточное» состояние (чёрточку вместо галочки).
        </p>
        <mat-checkbox
          [checked]="allChecked()"
          [indeterminate]="someChecked()"
          (change)="setAll($event.checked)"
        >
          Выбрать всё
        </mat-checkbox>
        <div class="children">
          @for (item of items(); track item.name; let i = $index) {
            <mat-checkbox [checked]="item.checked" (change)="toggle(i, $event.checked)">
              {{ item.name }}
            </mat-checkbox>
          }
        </div>
        <span class="result">Выбрано: {{ selected() }}</span>
      </section>

      <section class="demo-section">
        <h2>Состояния</h2>
        <p class="explain">Чекбокс можно сделать недоступным — серым и ненажимаемым.</p>
        <div class="children">
          <mat-checkbox disabled>Недоступно и выключено</mat-checkbox>
          <mat-checkbox disabled checked>Недоступно и включено</mat-checkbox>
        </div>
      </section>

      <section class="demo-section">
        <h2>Чекбокс, радио или переключатель?</h2>
        <p class="explain">
          <b>Чекбокс</b> — когда можно выбрать <b>несколько</b> независимых вариантов.
          <b>Радио-кнопки</b> — когда нужно выбрать <b>ровно один</b> из нескольких.
          <b>Переключатель</b> — для одной настройки «вкл/выкл», как тумблер.
        </p>
      </section>
    </div>
  `,
  styles: `
    .children {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin: 0.5rem 0 0.75rem 1.5rem;
    }
    .result {
      color: var(--mat-sys-primary);
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class CheckboxPage {
  protected readonly agree = signal(false);

  protected readonly items = signal<Item[]>([
    { name: 'Сыр', checked: true },
    { name: 'Грибы', checked: false },
    { name: 'Бекон', checked: false },
    { name: 'Оливки', checked: false },
  ]);

  protected readonly allChecked = computed(() => this.items().every((i) => i.checked));
  protected readonly someChecked = computed(
    () => this.items().some((i) => i.checked) && !this.allChecked(),
  );
  protected readonly selected = computed(() => {
    const names = this.items()
      .filter((i) => i.checked)
      .map((i) => i.name);
    return names.length ? names.join(', ') : 'ничего';
  });

  setAll(checked: boolean): void {
    this.items.update((list) => list.map((i) => ({ ...i, checked })));
  }

  toggle(index: number, checked: boolean): void {
    this.items.update((list) => list.map((i, idx) => (idx === index ? { ...i, checked } : i)));
  }
}
