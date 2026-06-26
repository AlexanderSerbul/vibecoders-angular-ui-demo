import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'demo-divider',
  imports: [MatDividerModule, MatListModule, MatIconModule],
  template: `
    <div class="page">
      <h1>Разделитель</h1>
      <p class="lead">
        Разделитель — это тонкая линия, которая отделяет одно от другого: пункты списка,
        блоки настроек, группы кнопок. Помогает глазу понять, где заканчивается одно и
        начинается другое, — без тяжёлых рамок и лишних отступов.
      </p>

      <section class="demo-section">
        <h2>Линия между блоками</h2>
        <p class="explain">
          Самое простое применение — горизонтальная черта между кусками текста или
          секциями. Аккуратно делит, не перегружая.
        </p>
        <div class="stack boxed">
          <p class="block">Общие настройки</p>
          <mat-divider></mat-divider>
          <p class="block">Уведомления</p>
          <mat-divider></mat-divider>
          <p class="block">Приватность</p>
        </div>
      </section>

      <section class="demo-section">
        <h2>Между пунктами списка</h2>
        <p class="explain">
          Чаще всего разделитель встречается в списках — тонкая черта между строками,
          чтобы они не сливались.
        </p>
        <mat-list class="boxed list">
          <mat-list-item>
            <mat-icon matListItemIcon>inbox</mat-icon>
            <span matListItemTitle>Входящие</span>
          </mat-list-item>
          <mat-divider></mat-divider>
          <mat-list-item>
            <mat-icon matListItemIcon>send</mat-icon>
            <span matListItemTitle>Отправленные</span>
          </mat-list-item>
          <mat-divider></mat-divider>
          <mat-list-item>
            <mat-icon matListItemIcon>drafts</mat-icon>
            <span matListItemTitle>Черновики</span>
          </mat-list-item>
        </mat-list>
      </section>

      <section class="demo-section">
        <h2>Вертикальный</h2>
        <p class="explain">
          Линию можно поставить и стоймя — например, чтобы разделить числа в строке
          профиля или кнопки в ряду.
        </p>
        <div class="stats boxed">
          <span><b>128</b> постов</span>
          <mat-divider vertical></mat-divider>
          <span><b>340</b> подписчиков</span>
          <mat-divider vertical></mat-divider>
          <span><b>180</b> подписок</span>
        </div>
      </section>

      <section class="demo-section">
        <h2>Когда разделитель?</h2>
        <p class="explain">
          Берите его, когда нужно <b>мягко</b> разграничить содержимое: строки списка,
          секции настроек, пункты меню. Но не злоупотребляйте — часто достаточно
          <b>пустого места</b> между блоками, а лишние линии только зашумляют. Если блоки
          совсем разные по смыслу — нагляднее <b>карточки</b>.
        </p>
      </section>
    </div>
  `,
  styles: `
    .boxed {
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 12px;
      max-width: 460px;
    }
    .stack {
      padding: 0.25rem 1rem;
    }
    .stack .block {
      margin: 0;
      padding: 0.85rem 0;
    }
    .list {
      padding: 0;
    }
    .stats {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      padding: 1rem 1.25rem;
    }
    .stats mat-divider {
      height: 1.75rem;
    }
  `,
})
export class DividerPage {}
