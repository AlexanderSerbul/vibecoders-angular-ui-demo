import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'demo-form-field',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  template: `
    <div class="page">
      <h1>Поле ввода</h1>
      <p class="lead">
        Поле ввода — то, куда человек печатает: имя, почту, сообщение. В Material оно
        аккуратно оформлено: подпись «уезжает» наверх, когда начинаешь печатать, снизу
        можно дать подсказку или показать ошибку, по краям — значки.
      </p>

      <section class="demo-section">
        <h2>Два вида: с рамкой и с заливкой</h2>
        <p class="explain">
          Одно и то же поле в двух стилях — выбираешь, что лучше смотрится: с рамкой
          (<code class="api">appearance="outline"</code>) или с заливкой
          (<code class="api">appearance="fill"</code>).
        </p>
        <div class="demo-row">
          <mat-form-field appearance="outline" class="field">
            <mat-label>Имя</mat-label>
            <input matInput placeholder="Анна" />
            <mat-hint>С рамкой</mat-hint>
          </mat-form-field>
          <mat-form-field appearance="fill" class="field">
            <mat-label>Фамилия</mat-label>
            <input matInput placeholder="Иванова" />
            <mat-hint>С заливкой</mat-hint>
          </mat-form-field>
        </div>
      </section>

      <section class="demo-section">
        <h2>Подпись, подсказка и значки</h2>
        <p class="explain">
          У поля есть подпись (<code class="api">mat-label</code>), подсказка снизу
          (<code class="api">mat-hint</code>) и значки по краям
          (<code class="api">matPrefix</code> / <code class="api">matSuffix</code>).
        </p>
        <div class="demo-row">
          <mat-form-field appearance="outline" class="field">
            <mat-label>Поиск по сайту</mat-label>
            <mat-icon matPrefix>search</mat-icon>
            <input matInput placeholder="Введите запрос" />
          </mat-form-field>
          <mat-form-field appearance="outline" class="field">
            <mat-label>Телефон</mat-label>
            <span matTextPrefix>+7&nbsp;</span>
            <input matInput placeholder="900 000-00-00" />
          </mat-form-field>
        </div>
      </section>

      <section class="demo-section">
        <h2>Многострочное поле</h2>
        <p class="explain">Для длинного текста — поле в несколько строк (textarea).</p>
        <div class="demo-row">
          <mat-form-field appearance="outline" class="field wide">
            <mat-label>Сообщение</mat-label>
            <textarea matInput rows="3" placeholder="Напишите что-нибудь…"></textarea>
            <mat-hint>Тянется под длинный текст</mat-hint>
          </mat-form-field>
        </div>
      </section>

      <section class="demo-section try">
        <h2>Проверка ввода</h2>
        <p class="explain">
          Поле может проверять, что ввели правильно, и показывать ошибку. Введи ниже
          что-то не похожее на email и щёлкни мимо поля — появится красная подсказка.
        </p>
        <div class="demo-row">
          <mat-form-field appearance="outline" class="field">
            <mat-label>Email</mat-label>
            <mat-icon matPrefix>mail</mat-icon>
            <input
              matInput
              type="email"
              [(ngModel)]="email"
              required
              email
              placeholder="you@example.com"
            />
            <mat-hint>Например: anna&#64;mail.ru</mat-hint>
            <mat-error>Введите корректный email</mat-error>
          </mat-form-field>
        </div>
      </section>

      <section class="demo-section try">
        <h2>Пароль — показать или скрыть</h2>
        <p class="explain">
          Частый приём: значок-«глаз» справа переключает, видно пароль или нет. Нажми
          на него.
        </p>
        <div class="demo-row">
          <mat-form-field appearance="outline" class="field">
            <mat-label>Пароль</mat-label>
            <input matInput [type]="hidePassword() ? 'password' : 'text'" value="secret123" />
            <button
              matIconButton
              matSuffix
              type="button"
              (click)="hidePassword.set(!hidePassword())"
              [attr.aria-label]="hidePassword() ? 'Показать пароль' : 'Скрыть пароль'"
            >
              <mat-icon>{{ hidePassword() ? 'visibility' : 'visibility_off' }}</mat-icon>
            </button>
          </mat-form-field>
        </div>
      </section>

      <section class="demo-section">
        <h2>Доступность</h2>
        <p class="explain">
          Главное — всегда давать полю подпись (<code class="api">mat-label</code>): её
          читают программы для незрячих, чтобы человек понял, что вводить. Подсказку и
          ошибку Material тоже связывает с полем сам.
        </p>
      </section>
    </div>
  `,
  styles: `
    .field {
      width: 320px;
      max-width: 100%;
    }
    .field.wide {
      width: 520px;
    }
  `,
})
export class FormFieldPage {
  protected email = '';
  protected readonly hidePassword = signal(true);
}
