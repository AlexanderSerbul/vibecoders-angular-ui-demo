import { AfterViewInit, Component, signal, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

interface Product {
  name: string;
  category: string;
  price: number;
  stock: number;
}

const PRODUCTS: Product[] = [
  { name: 'Кофеварка', category: 'Кухня', price: 7990, stock: 12 },
  { name: 'Наушники', category: 'Аудио', price: 4490, stock: 34 },
  { name: 'Рюкзак', category: 'Аксессуары', price: 3200, stock: 8 },
  { name: 'Настольная лампа', category: 'Дом', price: 1990, stock: 21 },
  { name: 'Коврик для мыши', category: 'Аксессуары', price: 690, stock: 50 },
  { name: 'Клавиатура', category: 'Аксессуары', price: 5400, stock: 15 },
];

const COLUMN_NAMES: Record<string, string> = {
  name: 'Название',
  price: 'Цена',
  stock: 'Остаток',
};

@Component({
  selector: 'demo-sort',
  imports: [MatTableModule, MatSortModule],
  template: `
    <div class="page">
      <h1>Сортировка</h1>
      <p class="lead">
        Сортировка — это упорядочивание строк по столбцу. Нажми на заголовок столбца —
        таблица перестроится: сначала по возрастанию, потом по убыванию, потом обратно
        в исходный порядок. Так легко найти самое дорогое, самый большой остаток или
        расставить по алфавиту.
      </p>

      <section class="demo-section try">
        <h2>Сортируемая таблица</h2>
        <p class="explain">
          Нажимай на заголовки «Название», «Цена», «Остаток» — рядом появится стрелка
          направления, а строки перестроятся. Под таблицей видно, по чему сейчас
          сортировка. («Категория» нарочно несортируемая — ненужные столбцы можно отключать.)
        </p>
        <div class="table-card">
          <table mat-table [dataSource]="dataSource" matSort (matSortChange)="onSort($event)" class="table">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Название</th>
              <td mat-cell *matCellDef="let p">{{ p.name }}</td>
            </ng-container>

            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef>Категория</th>
              <td mat-cell *matCellDef="let p">{{ p.category }}</td>
            </ng-container>

            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Цена</th>
              <td mat-cell *matCellDef="let p">{{ money(p.price) }}</td>
            </ng-container>

            <ng-container matColumnDef="stock">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Остаток</th>
              <td mat-cell *matCellDef="let p">{{ p.stock }} шт.</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="columns"></tr>
            <tr mat-row *matRowDef="let row; columns: columns"></tr>
          </table>
        </div>
        <p class="result">Сортировка: <b>{{ sortText() }}</b></p>
      </section>

      <section class="demo-section">
        <h2>Когда сортировка?</h2>
        <p class="explain">
          Сортировка нужна, когда строк много и важен порядок: дороже/дешевле,
          новее/старее, по алфавиту. Включайте её на те столбцы, по которым реально ищут.
          Вместе с <b>таблицей</b> и <b>листалкой</b> это обычный набор для любого списка данных.
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
    .result {
      margin-top: 1rem;
    }
  `,
})
export class SortPage implements AfterViewInit {
  protected readonly columns = ['name', 'category', 'price', 'stock'];
  protected readonly dataSource = new MatTableDataSource<Product>(PRODUCTS);
  protected readonly sortText = signal('нет');

  @ViewChild(MatSort) private sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onSort(s: Sort): void {
    if (!s.direction) {
      this.sortText.set('нет');
      return;
    }
    const dir = s.direction === 'asc' ? 'по возрастанию' : 'по убыванию';
    this.sortText.set(`${COLUMN_NAMES[s.active]} — ${dir}`);
  }

  money(value: number): string {
    return value.toLocaleString('ru-RU') + ' ₽';
  }
}
