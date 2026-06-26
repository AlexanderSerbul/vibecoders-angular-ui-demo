import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

interface Product {
  name: string;
  category: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'demo-table',
  imports: [MatTableModule],
  template: `
    <div class="page">
      <h1>Таблица</h1>
      <p class="lead">
        Таблица — это данные в строках и столбцах, как в Excel или Google Таблицах.
        Каждая строка — один объект (товар, человек, заказ), каждый столбец — одно его
        свойство. Удобно, когда нужно сравнивать много однотипных записей по одинаковым полям.
      </p>

      <section class="demo-section try">
        <h2>Таблица товаров</h2>
        <p class="explain">
          Сверху — строка заголовков (что в каждом столбце), ниже — строки с данными.
          Нажми на любую строку: она подсветится, а под таблицей появится, что выбрано.
        </p>
        <div class="table-card">
          <table mat-table [dataSource]="products" class="table">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Название</th>
            <td mat-cell *matCellDef="let p">{{ p.name }}</td>
          </ng-container>

          <ng-container matColumnDef="category">
            <th mat-header-cell *matHeaderCellDef>Категория</th>
            <td mat-cell *matCellDef="let p">{{ p.category }}</td>
          </ng-container>

          <ng-container matColumnDef="price">
            <th mat-header-cell *matHeaderCellDef>Цена</th>
            <td mat-cell *matCellDef="let p">{{ money(p.price) }}</td>
          </ng-container>

          <ng-container matColumnDef="stock">
            <th mat-header-cell *matHeaderCellDef>Остаток</th>
            <td mat-cell *matCellDef="let p">{{ p.stock }} шт.</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr
            mat-row
            *matRowDef="let p; columns: columns"
            class="data-row"
            [class.selected]="selected() === p.name"
            (click)="selected.set(p.name)"
          ></tr>
          </table>
        </div>
        <p class="result">Выбрана строка: <b>{{ selected() ?? 'нет' }}</b></p>
      </section>

      <section class="demo-section">
        <h2>Когда таблица?</h2>
        <p class="explain">
          Таблица нужна, когда записей много и их <b>сравнивают по одинаковым полям</b>:
          прайс‑листы, отчёты, списки заказов. Если же у каждой записи своя картинка и
          набор кнопок — нагляднее <b>карточки</b>, а для простого перечня строк хватит
          <b>списка</b>. Дальше к таблице добавим <b>сортировку</b> по столбцам и
          <b>постраничную листалку</b> — это отдельные соседние страницы.
        </p>
      </section>
    </div>
  `,
  styles: `
    .table-card {
      max-width: 640px;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 12px;
      overflow: hidden;
    }
    .table {
      width: 100%;
    }
    .data-row {
      cursor: pointer;
    }
    .data-row:hover {
      background: var(--mat-sys-surface-container-high);
    }
    .data-row.selected {
      background: var(--mat-sys-primary-container);
    }
    .result {
      margin-top: 1rem;
    }
  `,
})
export class TablePage {
  protected readonly columns = ['name', 'category', 'price', 'stock'];
  protected readonly selected = signal<string | null>(null);

  protected readonly products: Product[] = [
    { name: 'Кофеварка', category: 'Кухня', price: 7990, stock: 12 },
    { name: 'Наушники', category: 'Аудио', price: 4490, stock: 34 },
    { name: 'Рюкзак', category: 'Аксессуары', price: 3200, stock: 8 },
    { name: 'Настольная лампа', category: 'Дом', price: 1990, stock: 21 },
    { name: 'Коврик для мыши', category: 'Аксессуары', price: 690, stock: 50 },
  ];

  money(value: number): string {
    return value.toLocaleString('ru-RU') + ' ₽';
  }
}
