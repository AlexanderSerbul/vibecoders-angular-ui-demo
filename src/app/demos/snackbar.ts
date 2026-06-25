import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'demo-snackbar',
  imports: [MatButtonModule, MatIconModule, MatSnackBarModule],
  template: `
    <div class="page">
      <h1>Снэкбар</h1>
      <p class="lead">
        Снэкбар — короткое сообщение, которое всплывает снизу экрана и само исчезает
        через пару секунд. Это лёгкая обратная связь: «Сохранено», «Скопировано». В
        отличие от диалога, он <b>не блокирует</b> — можно вообще не обращать внимания.
      </p>

      <section class="demo-section try">
        <h2>Простое уведомление</h2>
        <p class="explain">
          Самое частое: коротко сказать «готово». Нажми — снизу появится сообщение и
          через пару секунд исчезнет само.
        </p>
        <div class="demo-row">
          <button matButton="filled" (click)="save()">
            <mat-icon>save</mat-icon> Сохранить
          </button>
        </div>
      </section>

      <section class="demo-section try">
        <h2>С кнопкой действия (Отменить)</h2>
        <p class="explain">
          У снэкбара может быть одна кнопка. Классика — «Отменить» сразу после
          действия: удалил письмо и можешь передумать. Нажми «Удалить письмо», затем
          «Отменить» в снэкбаре.
        </p>
        <div class="demo-row">
          <button matButton="filled" (click)="deleteMail()">
            <mat-icon>delete</mat-icon> Удалить письмо
          </button>
          @if (lastAction()) {
            <span class="result">{{ lastAction() }}</span>
          }
        </div>
      </section>

      <section class="demo-section">
        <h2>Снэкбар или диалог?</h2>
        <p class="explain">
          Снэкбар — мягко: сообщил и пропал, ничего не требуя. Диалог — жёстко:
          останавливает и ждёт ответа. Для «готово/сохранено» берите снэкбар; для
          «точно удалить?» — диалог.
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
export class SnackbarPage {
  private readonly snackBar = inject(MatSnackBar);
  protected readonly lastAction = signal('');

  save(): void {
    this.snackBar.open('Сохранено', undefined, { duration: 3000 });
  }

  deleteMail(): void {
    const ref = this.snackBar.open('Письмо удалено', 'Отменить', { duration: 6000 });
    ref.onAction().subscribe(() => this.lastAction.set('Удаление отменено'));
  }
}
