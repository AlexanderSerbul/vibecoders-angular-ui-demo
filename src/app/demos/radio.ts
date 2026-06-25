import { Component, computed, signal } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'demo-radio',
  imports: [MatRadioModule],
  template: `
    <div class="page">
      <h1>Радио-кнопки</h1>
      <p class="lead">
        Радио-кнопки — кружки, из которых выбираешь ровно один вариант. Выберешь
        новый — старый снимется сам. Так выбирают способ оплаты, доставку, размер —
        когда вариант должен быть только один.
      </p>

      <section class="demo-section try">
        <h2>Выбор одного варианта</h2>
        <p class="explain">Нажми на любой вариант — отметится только он, а выбор появится справа.</p>
        <div class="demo-row">
          <mat-radio-group
            [value]="delivery()"
            (change)="delivery.set($event.value)"
            class="column"
            aria-label="Способ доставки"
          >
            <mat-radio-button value="courier">Курьер</mat-radio-button>
            <mat-radio-button value="pickup">Самовывоз</mat-radio-button>
            <mat-radio-button value="post">Почта</mat-radio-button>
          </mat-radio-group>
          <span class="result">Выбрано: {{ deliveryLabel() }}</span>
        </div>
      </section>

      <section class="demo-section">
        <h2>В столбик или в ряд</h2>
        <p class="explain">Когда вариантов мало и они короткие, их удобно поставить в ряд.</p>
        <mat-radio-group value="M" class="row" aria-label="Размер">
          <mat-radio-button value="S">S</mat-radio-button>
          <mat-radio-button value="M">M</mat-radio-button>
          <mat-radio-button value="L">L</mat-radio-button>
          <mat-radio-button value="XL">XL</mat-radio-button>
        </mat-radio-group>
      </section>

      <section class="demo-section">
        <h2>Недоступный вариант</h2>
        <p class="explain">Отдельный вариант можно отключить — например, если его сейчас нет.</p>
        <mat-radio-group value="standard" class="column" aria-label="Тариф">
          <mat-radio-button value="standard">Стандарт</mat-radio-button>
          <mat-radio-button value="express" disabled>Экспресс — временно недоступно</mat-radio-button>
        </mat-radio-group>
      </section>

      <section class="demo-section">
        <h2>Радио или чекбокс?</h2>
        <p class="explain">
          <b>Радио</b> — когда нужно выбрать <b>ровно один</b> вариант из нескольких.
          <b>Чекбокс</b> — когда можно отметить <b>сколько угодно</b> (хоть ни одного).
          А если вариантов много — удобнее выпадающий список.
        </p>
      </section>
    </div>
  `,
  styles: `
    .column {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .row {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
    }
    .result {
      color: var(--mat-sys-primary);
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class RadioPage {
  protected readonly delivery = signal('courier');

  protected readonly deliveryLabel = computed(
    () => ({ courier: 'Курьер', pickup: 'Самовывоз', post: 'Почта' })[this.delivery()],
  );
}
