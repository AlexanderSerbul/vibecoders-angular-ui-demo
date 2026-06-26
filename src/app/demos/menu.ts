import { Component, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'demo-menu',
  imports: [MatMenuModule, MatButtonModule, MatIconModule],
  template: `
    <div class="page">
      <h1>Меню</h1>
      <p class="lead">
        Меню — небольшой список действий, который выскакивает по клику на кнопку
        (например, на «три точки» ⋮). Прячет действия до нажатия и экономит место — так
        делают «Ещё», контекстные меню, выпадашки. Кстати, верхнее меню этого сайта тоже на нём.
      </p>
      <p class="result">
        {{ lastAction() ? 'Выбрано: ' + lastAction() : 'Пока ничего не выбрано — нажми любую кнопку ниже' }}
      </p>

      <section class="demo-section try">
        <h2>Меню действий</h2>
        <p class="explain">Нажми кнопку — выскочит список. Выбери пункт — он отметится выше.</p>
        <button matButton="filled" [matMenuTriggerFor]="actionsMenu">
          Действия <mat-icon>arrow_drop_down</mat-icon>
        </button>
        <mat-menu #actionsMenu="matMenu">
          <button mat-menu-item (click)="pick('Редактировать')">
            <mat-icon>edit</mat-icon> Редактировать
          </button>
          <button mat-menu-item (click)="pick('Поделиться')">
            <mat-icon>share</mat-icon> Поделиться
          </button>
          <button mat-menu-item (click)="pick('Удалить')">
            <mat-icon>delete</mat-icon> Удалить
          </button>
        </mat-menu>
      </section>

      <section class="demo-section try">
        <h2>Вложенное меню</h2>
        <p class="explain">Пункт может открывать ещё одно меню — как «Экспорт → PDF / Word».</p>
        <button matButton="outlined" [matMenuTriggerFor]="mainMenu">Открыть меню</button>
        <mat-menu #mainMenu="matMenu">
          <button mat-menu-item (click)="pick('Создать документ')">
            <mat-icon>description</mat-icon> Создать документ
          </button>
          <button mat-menu-item [matMenuTriggerFor]="exportMenu">
            <mat-icon>download</mat-icon> Экспорт
          </button>
        </mat-menu>
        <mat-menu #exportMenu="matMenu">
          <button mat-menu-item (click)="pick('Экспорт в PDF')">PDF</button>
          <button mat-menu-item (click)="pick('Экспорт в Word')">Word</button>
        </mat-menu>
      </section>

      <section class="demo-section try">
        <h2>«Ещё» на трёх точках</h2>
        <p class="explain">
          Классика — кнопка-иконка ⋮ рядом с элементом. Один пункт здесь недоступен (серый).
        </p>
        <button matIconButton [matMenuTriggerFor]="moreMenu" aria-label="Ещё действия">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #moreMenu="matMenu">
          <button mat-menu-item (click)="pick('Закрепить')"><mat-icon>push_pin</mat-icon> Закрепить</button>
          <button mat-menu-item (click)="pick('В архив')"><mat-icon>archive</mat-icon> В архив</button>
          <button mat-menu-item disabled><mat-icon>block</mat-icon> Недоступно</button>
        </mat-menu>
      </section>

      <section class="demo-section">
        <h2>Меню или выпадающий список?</h2>
        <p class="explain">
          <b>Меню</b> — это список <b>действий</b> (редактировать, удалить, экспорт):
          выбрал — что-то произошло. <b>Выпадающий список</b> — это выбор <b>значения</b>
          в форме (город, тариф): выбрал — значение осталось в поле.
        </p>
      </section>
    </div>
  `,
  styles: `
    .result {
      color: var(--mat-sys-primary);
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class MenuPage {
  protected readonly lastAction = signal('');

  pick(action: string): void {
    this.lastAction.set(action);
  }
}
