import { Component, signal } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'demo-stepper',
  imports: [MatStepperModule, MatButtonModule, MatRadioModule, MatIconModule],
  template: `
    <div class="page">
      <h1>Шаги</h1>
      <p class="lead">
        Шаги (мастер) ведут по задаче по порядку: один шаг — одно дело. Сверху видно,
        на каком ты шаге и сколько осталось, а кнопки «Назад» и «Далее» переключают.
        Так оформляют заказы, регистрацию и настройку — всё, что делается по шагам.
      </p>

      <section class="demo-section try">
        <h2>Оформление заказа по шагам</h2>
        <p class="explain">
          Пройди мастер: «Корзина → Доставка → Оплата → Готово». Текущий шаг подсвечен
          сверху, пройденные отмечаются галочкой, а на последнем шаге собирается сводка
          из того, что ты выбрал.
        </p>
        <mat-stepper #stepper class="boxed">
          <mat-step label="Корзина">
            <p>В корзине: наушники и чехол. Всё верно — идём дальше.</p>
            <div class="step-actions">
              <button matButton="filled" matStepperNext>К доставке</button>
            </div>
          </mat-step>

          <mat-step label="Доставка">
            <p>Как доставить заказ?</p>
            <mat-radio-group
              class="choices"
              [value]="delivery()"
              (change)="delivery.set($event.value)"
              aria-label="Способ доставки"
            >
              <mat-radio-button value="курьером">Курьером до двери</mat-radio-button>
              <mat-radio-button value="самовывозом">Самовывоз из пункта выдачи</mat-radio-button>
            </mat-radio-group>
            <div class="step-actions">
              <button matButton matStepperPrevious>Назад</button>
              <button matButton="filled" matStepperNext>К оплате</button>
            </div>
          </mat-step>

          <mat-step label="Оплата">
            <p>Чем оплатить?</p>
            <mat-radio-group
              class="choices"
              [value]="payment()"
              (change)="payment.set($event.value)"
              aria-label="Способ оплаты"
            >
              <mat-radio-button value="картой">Картой онлайн</mat-radio-button>
              <mat-radio-button value="наличными">Наличными при получении</mat-radio-button>
            </mat-radio-group>
            <div class="step-actions">
              <button matButton matStepperPrevious>Назад</button>
              <button matButton="filled" matStepperNext>Оплатить</button>
            </div>
          </mat-step>

          <mat-step label="Готово">
            <p class="done"><mat-icon>check_circle</mat-icon> Заказ оформлен!</p>
            <p class="summary">Доставка: <b>{{ delivery() }}</b>, оплата: <b>{{ payment() }}</b>.</p>
            <div class="step-actions">
              <button matButton (click)="stepper.reset()">Оформить новый заказ</button>
            </div>
          </mat-step>
        </mat-stepper>
      </section>

      <section class="demo-section">
        <h2>Когда шаги?</h2>
        <p class="explain">
          Шаги нужны, когда дело делается <b>строго по порядку</b> и сразу всё показывать
          незачем: оформление заказа, регистрация, настройка с нуля. Если разделы
          <b>равноправны</b> и между ними прыгают туда‑сюда — это <b>вкладки</b>. Шаги
          можно сделать «строгими»: пока не заполнил текущий — дальше не пускает.
        </p>
      </section>
    </div>
  `,
  styles: `
    .boxed {
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 12px;
      max-width: 640px;
    }
    .choices {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin: 0.5rem 0 1rem;
    }
    .step-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;
    }
    .done {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }
    .done mat-icon {
      color: var(--mat-sys-primary);
    }
    .summary {
      margin: 0;
    }
  `,
})
export class StepperPage {
  protected readonly delivery = signal('курьером');
  protected readonly payment = signal('картой');
}
