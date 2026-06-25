import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'demo-tooltip',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <div class="page">
      <h1>Подсказка</h1>
      <p class="lead">
        Подсказка (tooltip) — маленькая надпись, которая всплывает, когда наводишь
        курсор на элемент. Поясняет, что делает кнопка или иконка, не занимая места на
        экране. Кстати, она уже работает на иконках темы вверху справа.
      </p>

      <section class="demo-section">
        <h2>Базовая подсказка</h2>
        <p class="explain">
          Достаточно добавить <code class="api">matTooltip</code> с текстом к любому
          элементу. Наведи на кнопку — увидишь подсказку.
        </p>
        <div class="demo-row">
          <button
            matButton="filled"
            matTooltip="Это всплывающая подсказка — поясняет, что делает элемент"
          >
            Наведи на меня
          </button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Чаще всего — на иконках</h2>
        <p class="explain">
          Кнопка-иконка без подписи непонятна без подсказки. Наведи на любую:
        </p>
        <div class="demo-row">
          <button matIconButton matTooltip="В избранное" aria-label="В избранное">
            <mat-icon>favorite</mat-icon>
          </button>
          <button matIconButton matTooltip="Поделиться" aria-label="Поделиться">
            <mat-icon>share</mat-icon>
          </button>
          <button matIconButton matTooltip="Удалить" aria-label="Удалить">
            <mat-icon>delete</mat-icon>
          </button>
          <button matIconButton matTooltip="Настройки" aria-label="Настройки">
            <mat-icon>settings</mat-icon>
          </button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Положение</h2>
        <p class="explain">
          Подсказку можно показать сверху, снизу, слева или справа
          (<code class="api">matTooltipPosition</code>). Наведи на каждую:
        </p>
        <div class="demo-row">
          <button matButton="outlined" matTooltip="Сверху" matTooltipPosition="above">Сверху</button>
          <button matButton="outlined" matTooltip="Снизу" matTooltipPosition="below">Снизу</button>
          <button matButton="outlined" matTooltip="Слева" matTooltipPosition="left">Слева</button>
          <button matButton="outlined" matTooltip="Справа" matTooltipPosition="right">Справа</button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Важно</h2>
        <p class="explain">
          Подсказка — это именно <b>подсказка</b>, а не место для важного: она
          появляется только при наведении, а на телефоне — по долгому нажатию. Поэтому
          не прячьте в неё то, без чего не разобраться. И для незрячих у кнопки-иконки
          всё равно нужна скрытая подпись (<code class="api">aria-label</code>).
        </p>
      </section>
    </div>
  `,
})
export class TooltipPage {}
