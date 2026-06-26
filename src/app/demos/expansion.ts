import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'demo-expansion',
  imports: [MatExpansionModule],
  template: `
    <div class="page">
      <h1>Раскрывающиеся панели</h1>
      <p class="lead">
        Раскрывающаяся панель — секция, которая разворачивается по клику. Заголовок
        виден всегда, а содержимое спрятано, пока на него не нажмёшь. Так длинную
        страницу можно свернуть в короткий список заголовков — удобно для частых
        вопросов и длинных форм.
      </p>

      <section class="demo-section try">
        <h2>Вопросы и ответы</h2>
        <p class="explain">
          Нажми на вопрос — раскроется ответ. Панели собраны в «аккордеон»: открыта
          всегда одна, предыдущая закрывается сама, чтобы не было каши.
        </p>
        <mat-accordion>
          @for (item of faq; track item.q) {
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>{{ item.q }}</mat-panel-title>
              </mat-expansion-panel-header>
              <p class="answer">{{ item.a }}</p>
            </mat-expansion-panel>
          }
        </mat-accordion>
      </section>

      <section class="demo-section try">
        <h2>Открыть несколько сразу</h2>
        <p class="explain">
          Те же панели, но в режиме «можно держать открытыми несколько». Открой
          «Доставку», потом «Оплату» — обе останутся развёрнутыми. Удобно, когда
          разделы независимы и их хочется видеть рядом. Заодно справа в заголовке —
          лёгкая подпись‑подсказка.
        </p>
        <mat-accordion multi>
          @for (item of info; track item.title) {
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>{{ item.title }}</mat-panel-title>
                <mat-panel-description>{{ item.hint }}</mat-panel-description>
              </mat-expansion-panel-header>
              <p class="answer">{{ item.text }}</p>
            </mat-expansion-panel>
          }
        </mat-accordion>
      </section>

      <section class="demo-section">
        <h2>Когда раскрывающиеся панели?</h2>
        <p class="explain">
          Берите их, когда содержимого много и большую часть времени оно не нужно:
          частые вопросы, дополнительные настройки, длинная форма по разделам. Если
          разделы <b>равноправны</b> и переключаются часто — это <b>вкладки</b>. Если
          шаги идут <b>строго по порядку</b> — это <b>шаги</b>.
        </p>
      </section>
    </div>
  `,
  styles: `
    mat-accordion {
      display: block;
      max-width: 640px;
    }
    .answer {
      margin: 0;
    }
  `,
})
export class ExpansionPage {
  protected readonly faq = [
    { q: 'Это бесплатно?', a: 'Да, проект открытый — исходники лежат на GitHub.' },
    {
      q: 'Нужно ли уметь программировать?',
      a: 'Нет: сайт собран вайбкодингом — простыми словами в чате с ИИ‑агентом.',
    },
    { q: 'На чём это сделано?', a: 'На Angular и Angular Material последних версий.' },
  ];

  protected readonly info = [
    { title: 'Доставка', hint: 'сроки и способы', text: 'Курьером и в пункты выдачи, обычно 1–3 дня.' },
    { title: 'Оплата', hint: 'как платить', text: 'Картой онлайн или наличными при получении.' },
    { title: 'Возврат', hint: 'если не подошло', text: '14 дней на возврат без лишних вопросов.' },
  ];
}
