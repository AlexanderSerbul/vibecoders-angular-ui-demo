import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';

interface Order {
  order: string;
  client: string;
  amount: string;
}

const CLIENTS = ['Анна Петрова', 'Борис Лебедев', 'Вера Чен', 'Глеб Орлов', 'Дина Сафина'];

const ORDERS: Order[] = Array.from({ length: 23 }, (_, i) => ({
  order: `Заказ №${i + 1}`,
  client: CLIENTS[i % CLIENTS.length],
  amount: `${(((i * 7) % 12) + 3) * 490} ₽`.replace(/\B(?=(\d{3})+(?!\d))/, ' '),
}));

// Русские подписи листалки (по умолчанию Material подписывает их по-английски).
class RuPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Строк на странице:';
  override nextPageLabel = 'Следующая страница';
  override previousPageLabel = 'Предыдущая страница';
  override firstPageLabel = 'Первая страница';
  override lastPageLabel = 'Последняя страница';
  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) return `0 из ${length}`;
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, length);
    return `${start}–${end} из ${length}`;
  };
}

@Component({
  selector: 'demo-paginator',
  imports: [MatTableModule, MatPaginatorModule],
  providers: [{ provide: MatPaginatorIntl, useClass: RuPaginatorIntl }],
  template: `
    <div class="page">
      <h1>Пагинатор</h1>
      <p class="lead">
        Пагинатор — это листалка внизу таблицы или списка. Когда записей много, их не
        показывают все разом, а бьют на страницы по несколько штук. Снизу видно «сколько
        из скольких» и стрелки вперёд‑назад, а ещё можно выбрать, сколько строк показывать.
        Так длинные списки не пугают и быстрее грузятся.
      </p>

      <section class="demo-section try">
        <h2>Листалка к таблице</h2>
        <p class="explain">
          В таблице 23 заказа, но показываем по 5 за раз. Снизу — листалка: стрелки
          вперёд/назад, надпись «сколько из скольких» и выбор размера страницы.
          Полистай и поменяй, сколько строк показывать.
        </p>
        <div class="table-card">
          <table mat-table [dataSource]="dataSource" class="table">
            <ng-container matColumnDef="order">
              <th mat-header-cell *matHeaderCellDef>Заказ</th>
              <td mat-cell *matCellDef="let o">{{ o.order }}</td>
            </ng-container>

            <ng-container matColumnDef="client">
              <th mat-header-cell *matHeaderCellDef>Клиент</th>
              <td mat-cell *matCellDef="let o">{{ o.client }}</td>
            </ng-container>

            <ng-container matColumnDef="amount">
              <th mat-header-cell *matHeaderCellDef>Сумма</th>
              <td mat-cell *matCellDef="let o">{{ o.amount }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="columns"></tr>
            <tr mat-row *matRowDef="let row; columns: columns"></tr>
          </table>
          <mat-paginator [pageSize]="5" [pageSizeOptions]="[5, 10, 20]" aria-label="Листалка заказов"></mat-paginator>
        </div>
      </section>

      <section class="demo-section">
        <h2>Когда пагинатор?</h2>
        <p class="explain">
          Пагинатор нужен, когда записей десятки, сотни или тысячи: показывать все разом —
          долго грузить и тяжело глазам. Он бьёт список на удобные страницы. Для коротких
          списков (десяток строк) он лишний — проще показать всё. Часто работает в паре
          с <b>сортировкой</b> по столбцам — это следующая страница.
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
  `,
})
export class PaginatorPage implements AfterViewInit {
  protected readonly columns = ['order', 'client', 'amount'];
  protected readonly dataSource = new MatTableDataSource<Order>(ORDERS);

  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
