import { Component, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'demo-badge',
  imports: [MatBadgeModule, MatButtonModule, MatIconModule],
  template: `
    <div class="page">
      <h1>Бейдж</h1>
      <p class="lead">
        Бейдж — маленькая метка в уголке элемента: кружок с числом. Та самая красная
        циферка на иконке мессенджера — «у вас 3 новых». Привлекает внимание, почти
        не занимая места.
      </p>

      <section class="demo-section">
        <h2>Как добавить <code class="api">matBadge</code></h2>
        <p class="explain">
          Бейдж — это не отдельный элемент, а «наклейка»: добавляешь
          <code class="api">matBadge</code> к тому, что уже есть — иконке или кнопке.
          В значении пишешь, что показать (число или короткий текст).
        </p>
        <div class="demo-row big-icons">
          <mat-icon matBadge="4" matBadgeDescription="4 новых уведомления">notifications</mat-icon>
          <mat-icon matBadge="12" matBadgeDescription="12 писем">mail</mat-icon>
          <button matButton="tonal" matBadge="3" matBadgeDescription="3 новых сообщения">
            Сообщения
          </button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Цвет <code class="api">matBadgeColor</code></h2>
        <p class="explain">
          Цвет берётся из темы. <b>warn</b> (красный) — для важного и тревожного:
          новые сообщения, ошибки, «требует внимания».
        </p>
        <div class="demo-row big-icons">
          <mat-icon matBadge="8" matBadgeDescription="8 элементов">inbox</mat-icon>
          <mat-icon matBadge="8" matBadgeColor="primary" matBadgeDescription="8 элементов">inbox</mat-icon>
          <mat-icon matBadge="8" matBadgeColor="warn" matBadgeDescription="8 важных">inbox</mat-icon>
        </div>
      </section>

      <section class="demo-section">
        <h2>Положение и большие числа</h2>
        <p class="explain">
          Бейдж можно поставить в любой угол (<code class="api">matBadgePosition</code>),
          а если число большое — показывают «99+», чтобы не растягивать кружок.
        </p>
        <div class="demo-row big-icons">
          <mat-icon matBadge="99+" matBadgeDescription="больше 99">notifications</mat-icon>
          <mat-icon matBadge="1" matBadgePosition="above before" matBadgeDescription="1 новое">
            notifications
          </mat-icon>
          <mat-icon matBadge="1" matBadgePosition="below after" matBadgeDescription="1 новое">
            notifications
          </mat-icon>
        </div>
      </section>

      <section class="demo-section try">
        <h2>Попробуйте сами</h2>
        <p class="explain">
          Добавляйте товары — бейдж на корзине считает их и прячется, когда корзина пуста.
        </p>
        <div class="demo-row">
          <span class="cart-demo">
            <button
              matIconButton
              [matBadge]="cart()"
              [matBadgeHidden]="cart() === 0"
              matBadgeColor="warn"
              matBadgeDescription="Товаров в корзине"
              aria-label="Корзина"
            >
              <mat-icon>shopping_cart</mat-icon>
            </button>
          </span>
          <button matButton="filled" (click)="cart.set(cart() + 1)">
            <mat-icon>add</mat-icon> Добавить товар
          </button>
          <button matButton (click)="cart.set(0)">Очистить</button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Доступность (для незрячих)</h2>
        <p class="explain">
          Само число «4» в углу программе для незрячих ни о чём не говорит. Поэтому
          бейджу дают понятную подпись (<code class="api">matBadgeDescription</code>) —
          например, «4 непрочитанных сообщения». Тогда человек услышит смысл, а не
          просто «четыре».
        </p>
      </section>
    </div>
  `,
  styles: `
    .big-icons {
      gap: 2rem;
    }
    .big-icons mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
  `,
})
export class BadgePage {
  protected readonly cart = signal(0);
}
