import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'demo-seo',
  imports: [MatIconModule, MatExpansionModule],
  template: `
    <div class="page">
      <h1>Чтобы сайт находили в поиске</h1>
      <p class="lead">
        Сайт готов — теперь хочется, чтобы его находили в Google и Яндексе, когда люди
        ищут что‑то по теме. Это и называется SEO — поисковая оптимизация. Ниже —
        что по шагам попросить у Claude&nbsp;Code и зачем каждый шаг нужен. Шаги идут
        по важности: первый — самый главный.
      </p>

      <div class="note">
        <mat-icon>visibility_off</mat-icon>
        <p>
          <b>Почему без этого сайт почти невидим для поиска.</b> Сайты на Angular
          «рисуются» прямо в браузере у гостя. Живой человек видит всё отлично, но
          поисковый робот заходит на долю секунды и успевает увидеть лишь пустую
          заготовку — показывать в результатах ему нечего. Особенно строг к этому
          Яндекс. Поэтому первый шаг — самый важный.
        </p>
      </div>

      <section class="demo-section">
        <h2>1. Сделать страницы видимыми для поиска</h2>
        <p class="explain">
          Нужно, чтобы во время сборки сайт заранее превращался в готовые страницы
          с текстом, а не собирался уже у гостя в браузере. Тогда роботу будет что
          прочитать. На языке разработчиков это «серверный рендеринг» и «prerender».
        </p>
        <div class="ask">
          <span class="ask-label"><mat-icon>chat</mat-icon> Скажи Claude Code:</span>
          <p class="prompt">
            «Подключи к моему Angular‑сайту серверный рендеринг и включи prerender всех
            страниц, чтобы в собранных файлах был готовый текст, а не пустая заготовка.
            После сборки проверь, что в HTML реально лежит содержимое страницы».
          </p>
        </div>
        <div class="detail">
          <mat-icon>bolt</mat-icon>
          <p>
            <b>Кому и когда отдаётся этот HTML?</b> Он собирается один раз при сборке и
            отдаётся всем одинаково — и роботам, и людям. Робот просто читает из него
            текст. А человеку браузер показывает готовую страницу <b>мгновенно</b>, и уже
            в фоне подгружается «оживление» — клики и переходы начинают работать (это
            называют гидрацией). Гость сразу видит содержимое вместо пустого экрана, а
            через долю секунды сайт становится живым. Поэтому отдельный HTML «только для
            роботов» делать не нужно — один готовый HTML полезен и поиску, и людям.
          </p>
        </div>

        <mat-expansion-panel class="glossary">
          <mat-expansion-panel-header>
            <mat-panel-title>Непонятные слова: SSR, SSG, prerender — что это?</mat-panel-title>
          </mat-expansion-panel-header>
          <p class="explain">
            Разница между ними только в одном — <b>где и когда собирается HTML</b> страницы.
          </p>
          <ul class="terms">
            <li>
              <b>CSR</b> (рендеринг в браузере) — страницу собирает браузер гостя. Так наш
              сайт работает сейчас: роботу достаётся пустая страница, а гость ждёт загрузки.
            </li>
            <li>
              <b>SSR</b> (рендеринг на сервере) — сервер собирает готовый HTML на каждый
              запрос, прямо в момент захода. Свежо и под каждого, но нужен постоянно
              работающий сервер.
            </li>
            <li>
              <b>SSG</b> = <b>prerender</b> (готовые страницы) — HTML собирается один раз
              при сборке и лежит готовыми файлами. Быстро, дёшево, отлично для поиска.
              Нашему сайту подходит именно это — контент у всех одинаковый.
            </li>
            <li>
              <b>Гидрация</b> — «оживление»: браузер показывает готовый HTML сразу, а затем
              подгруженный JavaScript привязывает к нему клики и переходы.
            </li>
          </ul>
        </mat-expansion-panel>
      </section>

      <section class="demo-section">
        <h2>2. Дать каждой странице заголовок и описание</h2>
        <p class="explain">
          В результатах поиска у каждой ссылки есть заголовок и короткое описание под
          ним. Если их не задать, поисковик придумает сам — часто неудачно. Это же
          описание и картинка показываются, когда ссылку кидают в Телеграм или соцсети.
        </p>
        <div class="ask">
          <span class="ask-label"><mat-icon>chat</mat-icon> Скажи Claude Code:</span>
          <p class="prompt">
            «Добавь каждой странице свой заголовок и короткое описание для поиска, а ещё
            Open Graph‑теги (заголовок, описание, картинка), чтобы при отправке ссылки
            в мессенджер показывалось красивое превью».
          </p>
        </div>
      </section>

      <section class="demo-section">
        <h2>3. Указать, что сайт на русском</h2>
        <p class="explain">
          В коде сайта по умолчанию часто стоит английский язык, хотя сам сайт русский.
          Из‑за этого поиск и авто‑переводчики могут запутаться. Мелочь, но чинится одной строкой.
        </p>
        <div class="ask">
          <span class="ask-label"><mat-icon>chat</mat-icon> Скажи Claude Code:</span>
          <p class="prompt">«Поставь язык сайта русский в главном HTML‑файле».</p>
        </div>
      </section>

      <section class="demo-section">
        <h2>4. Сделать карту сайта и файл для роботов</h2>
        <p class="explain">
          Карта сайта — это список всех страниц, чтобы поисковик ничего не пропустил.
          Файл robots.txt подсказывает роботам, что можно обходить и где лежит карта.
        </p>
        <div class="ask">
          <span class="ask-label"><mat-icon>chat</mat-icon> Скажи Claude Code:</span>
          <p class="prompt">
            «Сделай карту сайта (sitemap.xml) со всеми адресами страниц и файл robots.txt
            со ссылкой на эту карту, положи их в нужную папку сайта».
          </p>
        </div>
      </section>

      <section class="demo-section">
        <h2>5. Указать «главный адрес» страницы</h2>
        <p class="explain">
          Иногда одна и та же страница открывается по нескольким адресам, и поиск считает
          их разными копиями — это вредит. «Канонический» адрес говорит поисковику, какой
          адрес считать основным.
        </p>
        <div class="ask">
          <span class="ask-label"><mat-icon>chat</mat-icon> Скажи Claude Code:</span>
          <p class="prompt">
            «Добавь каждой странице канонический адрес (rel=canonical), чтобы поиск не
            считал копии разными страницами».
          </p>
        </div>
      </section>

      <section class="demo-section">
        <h2>6. Ускорить сайт</h2>
        <p class="explain">
          Google поднимает быстрые сайты выше, а медленные опускает. Замедляют, например,
          тяжёлые шрифты значков и лишние загрузки. Первый шаг (готовые страницы) уже сильно
          ускоряет — здесь дочищаем остальное.
        </p>
        <div class="ask">
          <span class="ask-label"><mat-icon>chat</mat-icon> Скажи Claude Code:</span>
          <p class="prompt">
            «Проверь скорость сайта по Core Web Vitals, облегчи шрифт иконок (оставь только
            используемые значки) и убери лишние загрузки».
          </p>
        </div>
      </section>

      <section class="demo-section">
        <h2>7. Познакомить сайт с поисковиками</h2>
        <p class="explain">
          Можно не ждать, пока поисковик сам наткнётся на сайт, а сразу сказать ему:
          «вот мой сайт, вот карта страниц». Это делается в Google Search Console и
          Яндекс.Вебмастере. Сюда Claude Code сам не зайдёт — нужен твой личный аккаунт, —
          но проведёт по шагам.
        </p>
        <div class="ask">
          <span class="ask-label"><mat-icon>chat</mat-icon> Скажи Claude Code:</span>
          <p class="prompt">
            «Объясни по шагам, как добавить мой сайт в Яндекс.Вебмастер и Google Search
            Console и отправить туда карту сайта».
          </p>
        </div>
      </section>

      <section class="demo-section">
        <h2>Необязательно, но приятно</h2>
        <p class="explain">
          Когда основное сделано, можно попросить картинку‑превью для соцсетей (она
          показывается при отправке ссылки) и «структурированные данные» — чтобы в поиске
          у сайта были красивые расширенные подписи.
        </p>
      </section>

      <section class="demo-section">
        <h2>С чего начать</h2>
        <p class="explain">
          Давай эти просьбы Claude&nbsp;Code <b>по одной</b> и проверяй результат после
          каждой — ровно так, как собирался этот сайт. Начни с первого шага: одного его
          уже достаточно, чтобы сайт перестал быть для поиска невидимым.
        </p>
      </section>
    </div>
  `,
  styles: `
    .note {
      display: flex;
      gap: 0.75rem;
      max-width: 75ch;
      margin: 0 0 2.5rem;
      padding: 1rem 1.25rem;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 12px;
      background: var(--mat-sys-surface-container);
    }
    .note mat-icon {
      flex: none;
      color: var(--mat-sys-primary);
    }
    .note p {
      margin: 0;
    }
    .detail {
      display: flex;
      gap: 0.6rem;
      max-width: 75ch;
      margin: 1rem 0 0;
      padding: 0.85rem 1.1rem;
      border-radius: 10px;
      background: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);
    }
    .detail mat-icon {
      flex: none;
      color: var(--mat-sys-on-secondary-container);
    }
    .detail p {
      margin: 0;
    }
    .explain {
      max-width: 75ch;
    }
    .glossary {
      max-width: 75ch;
      margin-top: 1rem;
    }
    .terms {
      margin: 0.5rem 0 0;
      padding-left: 1.2rem;
    }
    .terms li {
      margin: 0.5rem 0;
    }
    .ask {
      max-width: 75ch;
    }
    .ask-label {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: var(--mat-sys-primary);
    }
    .ask-label mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
    .prompt {
      margin: 0.4rem 0 0;
      padding: 0.85rem 1.1rem;
      border-left: 3px solid var(--mat-sys-primary);
      border-radius: 6px;
      background: var(--mat-sys-surface-container-high);
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class SeoPage {}
