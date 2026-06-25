import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/** Содержимое диалога-подтверждения. Возвращает true, если нажали «Удалить». */
@Component({
  selector: 'demo-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Удалить файл?</h2>
    <mat-dialog-content>
      Файл «отчёт.pdf» будет удалён безвозвратно — отменить не получится.
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton mat-dialog-close>Отмена</button>
      <button matButton="filled" [mat-dialog-close]="true">Удалить</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialog {}

/** Диалог с полем ввода. Возвращает введённое имя. */
@Component({
  selector: 'demo-name-dialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <h2 mat-dialog-title>Как вас зовут?</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full">
        <mat-label>Имя</mat-label>
        <input matInput [(ngModel)]="name" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton mat-dialog-close>Отмена</button>
      <button matButton="filled" [mat-dialog-close]="name">Готово</button>
    </mat-dialog-actions>
  `,
  styles: `
    .full {
      width: 100%;
    }
  `,
})
export class NameDialog {
  name = '';
}

@Component({
  selector: 'demo-dialog',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="page">
      <h1>Диалог</h1>
      <p class="lead">
        Диалог — окно, которое всплывает по центру поверх затемнённого фона. Оно
        «останавливает»: пока не ответишь или не закроешь, с остальной страницей
        ничего не сделать. Так спрашивают важное («Точно удалить?») или показывают
        короткую форму.
      </p>

      <section class="demo-section try">
        <h2>Подтверждение действия</h2>
        <p class="explain">
          Самый частый случай — переспросить перед необратимым действием. Нажми
          «Удалить файл»: появится окно с вопросом. Что выберешь — то и вернётся на
          страницу.
        </p>
        <div class="demo-row">
          <button matButton="filled" (click)="confirmDelete()">
            <mat-icon>delete</mat-icon> Удалить файл
          </button>
          @if (deleteResult()) {
            <span class="result">{{ deleteResult() }}</span>
          }
        </div>
      </section>

      <section class="demo-section try">
        <h2>Окно с полем ввода</h2>
        <p class="explain">
          Диалог умеет не только спрашивать «да/нет», но и собирать данные. Введи
          имя — и оно вернётся на страницу. Так делают мини-формы: переименовать,
          добавить, настроить.
        </p>
        <div class="demo-row">
          <button matButton="filled" (click)="askName()">
            <mat-icon>person</mat-icon> Представиться
          </button>
          @if (greeting()) {
            <span class="result">{{ greeting() }}</span>
          }
        </div>
      </section>

      <section class="demo-section">
        <h2>Из чего состоит диалог</h2>
        <p class="explain">
          Внутри три части: заголовок (<code class="api">mat-dialog-title</code>),
          текст или форма (<code class="api">mat-dialog-content</code>) и кнопки внизу
          (<code class="api">mat-dialog-actions</code>). Кнопка с
          <code class="api">mat-dialog-close</code> закрывает окно и может вернуть
          результат выбора.
        </p>
      </section>

      <section class="demo-section">
        <h2>Доступность (для незрячих и клавиатуры)</h2>
        <p class="explain">
          Material делает диалог доступным сам: фокус «запирается» внутри окна (Tab не
          убегает на страницу), <b>Esc</b> закрывает, а программы для незрячих
          объявляют, что открылось окно. Тебе об этом думать не нужно.
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
export class DialogPage {
  private readonly dialog = inject(MatDialog);

  protected readonly deleteResult = signal('');
  protected readonly greeting = signal('');

  confirmDelete(): void {
    this.dialog
      .open(ConfirmDialog)
      .afterClosed()
      .subscribe((deleted) => this.deleteResult.set(deleted ? 'Файл удалён' : 'Отменено'));
  }

  askName(): void {
    this.dialog
      .open(NameDialog, { width: '360px' })
      .afterClosed()
      .subscribe((name) => {
        if (name) this.greeting.set(`Привет, ${name}!`);
      });
  }
}
