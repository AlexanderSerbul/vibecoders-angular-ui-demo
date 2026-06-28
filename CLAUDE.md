# CLAUDE.md

Инструкции для работы над этим проектом.

## Что это
Сайт-витрина важных компонентов Angular Material. **Аудитория — вайбкодеры, не технари.**

## ⭐ Главное правило страниц компонентов
Каждая демо-страница объясняет компонент **простым, человеческим языком**: что это
и когда использовать — **без технических терминов и жаргона**. Рядом с живым примером
даём короткое понятное объяснение «что это и зачем». Название атрибута/кода можно
показать ненавязчиво (как подсказку), но основной текст пишем для неспециалиста.

## Стек
- Angular 22 (**zoneless** — реактивность через signals), Angular Material 22, Material 3, тема azure.
- Новый API кнопок Material: `matButton`, `matButton="filled|outlined|tonal|elevated"`, `matIconButton`, `matFab`/`matMiniFab`.
- Standalone-компоненты, ленивые маршруты.

## Рендеринг (SSG / prerender)
Сборка делает **статический prerender всех маршрутов**: `@angular/ssr`, в `angular.json`
`outputMode: "static"`, гидрация через `provideClientHydration()`. В собранном HTML уже лежит
контент (быстрый первый экран + видно поисковикам), а в браузере страница «оживает» гидрацией.
`npm run build` → «Prerendered N static routes»; прод-превью (`prod`) отдаёт `dist/homepage/browser`.
**Важно:** любой код, трогающий браузерные API при инициализации (`document`, `window`,
`localStorage`, `fetch`), оборачиваем в `afterNextRender(...)` или `isPlatformBrowser(...)` —
иначе prerender падает на сервере (примеры: `theme.ts`, `home.ts`).

## Как добавляем страницу компонента (по одной за раз)
1. `src/app/demos/<name>.ts` — standalone-компонент, inline-шаблон, общие классы `.page` / `.demo-*` из `src/styles.scss`.
2. Маршрут (lazy `loadComponent`) в `src/app/app.routes.ts`.
3. В `src/app/app.ts` у нужного пункта массива `sections` поставить `ready: true` (пункт меню станет активным; до этого он «скоро» и disabled).
4. Спека Playwright `e2e/<name>.spec.ts`: страница грузится → ключевое взаимодействие работает → доступна из меню.
5. `npm run e2e` → проверка → коммит и пуш (один коммит на компонент).

## Тесты
- E2E — Playwright (`npm run e2e`). `e2e/fixtures.ts` проваливает тест при любой ошибке в консоли.
- Vitest + TestBed (`ng test`) — точечно, только где есть собственная логика. (Дефолтный `src/app/app.spec.ts` устарел и упадёт — обновить, когда дойдём до юнитов.)

## Превью
Через Claude Preview + `.claude/launch.json`: `homepage` (dev `ng serve`) и `prod` (статика `dist/homepage/browser`), оба на порту 4200.

## Репозиторий
GitHub: `AlexanderSerbul/vibecoders-angular-ui-demo` (public), remote `origin`, ветка `main`.
