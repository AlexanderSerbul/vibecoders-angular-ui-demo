import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Product {
  name: string;
  price: string;
  note: string;
  cover: string;
}

@Component({
  selector: 'demo-cards',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="page">
      <h1>Карточка</h1>
      <p class="lead">
        Карточка — это плитка, которая собирает вместе связанные вещи: заголовок,
        картинку, текст и кнопки. Из карточек складывают ленты, каталоги товаров
        и списки — всё, что выглядит как набор аккуратных плиток.
      </p>

      <section class="demo-section">
        <h2>Из чего состоит</h2>
        <p class="explain">
          Сверху — «шапка»: кружок‑аватар, заголовок и подзаголовок. Под ней — картинка,
          затем основной текст, а внизу — кнопки‑действия. Любую часть можно не ставить.
        </p>
        <mat-card class="demo-card">
          <mat-card-header>
            <div mat-card-avatar class="avatar"></div>
            <mat-card-title>Анна Петрова</mat-card-title>
            <mat-card-subtitle>дизайнер</mat-card-subtitle>
          </mat-card-header>
          <div mat-card-image class="cover cover-hero"></div>
          <mat-card-content>
            <p>
              Короткий текст карточки: пара предложений о том, что внутри. Здесь
              может быть описание товара, начало статьи или заметка.
            </p>
          </mat-card-content>
          <mat-card-actions align="end">
            <button matButton>Подробнее</button>
            <button matButton="tonal">Открыть</button>
          </mat-card-actions>
        </mat-card>
      </section>

      <section class="demo-section">
        <h2>Тень или рамка</h2>
        <p class="explain">
          Карточку можно сделать «приподнятой» — с лёгкой тенью, будто она лежит поверх
          страницы, — или «плоской» с тонкой рамкой. Тень привлекает внимание, рамка
          выглядит строже и спокойнее.
        </p>
        <div class="demo-grid">
          <mat-card class="demo-card">
            <mat-card-header><mat-card-title>С тенью</mat-card-title></mat-card-header>
            <mat-card-content><p>Приподнятая плитка — вариант по умолчанию.</p></mat-card-content>
          </mat-card>
          <mat-card appearance="outlined" class="demo-card">
            <mat-card-header><mat-card-title>С рамкой</mat-card-title></mat-card-header>
            <mat-card-content><p>Плоская плитка с тонкой обводкой.</p></mat-card-content>
          </mat-card>
        </div>
      </section>

      <section class="demo-section try">
        <h2>Лента из карточек</h2>
        <p class="explain">
          Так это работает в жизни: одинаковые карточки выстраиваются в сетку. Нажми
          «В корзину» на любой — счётчик сверху обновится.
        </p>
        <div class="cart-row">
          <span class="result">В корзине: <b>{{ cart() }}</b></span>
          @if (cart() > 0) {
            <button matButton (click)="cart.set(0)">Очистить</button>
          }
        </div>
        <div class="demo-grid">
          @for (p of products; track p.name) {
            <mat-card appearance="outlined" class="demo-card">
              <div mat-card-image class="cover" [class]="p.cover"></div>
              <mat-card-header>
                <mat-card-title>{{ p.name }}</mat-card-title>
                <mat-card-subtitle>{{ p.price }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content><p>{{ p.note }}</p></mat-card-content>
              <mat-card-actions align="end">
                <button matButton="filled" (click)="add()">В корзину</button>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      </section>

      <section class="demo-section">
        <h2>Когда карточка?</h2>
        <p class="explain">
          Карточка хороша, когда на экране много <b>однотипных</b> объектов и каждый —
          со своим заголовком, картинкой и действиями: товары, статьи, профили. Если
          же это просто строки без картинок и кнопок — возьми обычный <b>список</b>,
          он легче и компактнее.
        </p>
      </section>
    </div>
  `,
  styles: `
    .demo-card {
      max-width: 360px;
    }
    .avatar {
      background: linear-gradient(135deg, var(--mat-sys-primary), var(--mat-sys-tertiary));
    }
    .cover {
      height: 150px;
    }
    .cover-hero {
      background: linear-gradient(135deg, var(--mat-sys-primary-container), var(--mat-sys-tertiary-container));
    }
    .cover-a { background: linear-gradient(135deg, #ff9a9e, #fad0c4); }
    .cover-b { background: linear-gradient(135deg, #a1c4fd, #c2e9fb); }
    .cover-c { background: linear-gradient(135deg, #84fab0, #8fd3f4); }
    .cart-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .result {
      font-size: 1.05rem;
    }
  `,
})
export class CardsPage {
  protected readonly cart = signal(0);

  protected readonly products: Product[] = [
    { name: 'Кофеварка', price: '7 990 ₽', note: 'Тихая, варит большую кружку за минуту.', cover: 'cover-a' },
    { name: 'Наушники', price: '4 490 ₽', note: 'Лёгкие, держат заряд весь день.', cover: 'cover-b' },
    { name: 'Рюкзак', price: '3 200 ₽', note: 'С отделением для ноутбука и зонта.', cover: 'cover-c' },
  ];

  add(): void {
    this.cart.update((n) => n + 1);
  }
}
