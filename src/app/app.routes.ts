import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./demos/home').then((m) => m.HomePage),
    title: 'Angular 22 для вайбкодера',
  },
  {
    path: 'buttons',
    loadComponent: () => import('./demos/buttons').then((m) => m.ButtonsPage),
    title: 'Кнопки',
  },
  {
    path: 'button-toggle',
    loadComponent: () => import('./demos/button-toggle').then((m) => m.ButtonTogglePage),
    title: 'Кнопки-переключатели',
  },
  {
    path: 'icon',
    loadComponent: () => import('./demos/icon').then((m) => m.IconPage),
    title: 'Иконки',
  },
  {
    path: 'badge',
    loadComponent: () => import('./demos/badge').then((m) => m.BadgePage),
    title: 'Бейдж',
  },
  {
    path: 'progress-spinner',
    loadComponent: () => import('./demos/progress-spinner').then((m) => m.ProgressSpinnerPage),
    title: 'Прогресс (круг)',
  },
  {
    path: 'progress-bar',
    loadComponent: () => import('./demos/progress-bar').then((m) => m.ProgressBarPage),
    title: 'Прогресс (полоса)',
  },
  {
    path: 'dialog',
    loadComponent: () => import('./demos/dialog').then((m) => m.DialogPage),
    title: 'Диалог',
  },
  {
    path: 'snackbar',
    loadComponent: () => import('./demos/snackbar').then((m) => m.SnackbarPage),
    title: 'Снэкбар',
  },
  {
    path: 'tooltip',
    loadComponent: () => import('./demos/tooltip').then((m) => m.TooltipPage),
    title: 'Подсказка',
  },
  {
    path: 'bottom-sheet',
    loadComponent: () => import('./demos/bottom-sheet').then((m) => m.BottomSheetPage),
    title: 'Нижний лист',
  },
  {
    path: 'form-field',
    loadComponent: () => import('./demos/form-field').then((m) => m.FormFieldPage),
    title: 'Поле ввода',
  },
  {
    path: 'checkbox',
    loadComponent: () => import('./demos/checkbox').then((m) => m.CheckboxPage),
    title: 'Чекбокс',
  },
  {
    path: 'radio',
    loadComponent: () => import('./demos/radio').then((m) => m.RadioPage),
    title: 'Радио-кнопки',
  },
  {
    path: 'slide-toggle',
    loadComponent: () => import('./demos/slide-toggle').then((m) => m.SlideTogglePage),
    title: 'Переключатель',
  },
  {
    path: 'slider',
    loadComponent: () => import('./demos/slider').then((m) => m.SliderPage),
    title: 'Слайдер',
  },
  {
    path: 'select',
    loadComponent: () => import('./demos/select').then((m) => m.SelectPage),
    title: 'Выпадающий список',
  },
  {
    path: 'autocomplete',
    loadComponent: () => import('./demos/autocomplete').then((m) => m.AutocompletePage),
    title: 'Автодополнение',
  },
  {
    path: 'datepicker',
    loadComponent: () => import('./demos/datepicker').then((m) => m.DatepickerPage),
    title: 'Дата',
  },
  {
    path: 'chips',
    loadComponent: () => import('./demos/chips').then((m) => m.ChipsPage),
    title: 'Чипы',
  },
  {
    path: 'menu',
    loadComponent: () => import('./demos/menu').then((m) => m.MenuPage),
    title: 'Меню',
  },
  {
    path: 'sidenav',
    loadComponent: () => import('./demos/sidenav').then((m) => m.SidenavPage),
    title: 'Боковая панель',
  },
  {
    path: 'toolbar',
    loadComponent: () => import('./demos/toolbar').then((m) => m.ToolbarPage),
    title: 'Тулбар',
  },
  {
    path: 'cards',
    loadComponent: () => import('./demos/cards').then((m) => m.CardsPage),
    title: 'Карточка',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./demos/tabs').then((m) => m.TabsPage),
    title: 'Вкладки',
  },
  {
    path: 'expansion',
    loadComponent: () => import('./demos/expansion').then((m) => m.ExpansionPage),
    title: 'Раскрывающиеся панели',
  },
  {
    path: 'list',
    loadComponent: () => import('./demos/list').then((m) => m.ListPage),
    title: 'Списки',
  },
  {
    path: 'stepper',
    loadComponent: () => import('./demos/stepper').then((m) => m.StepperPage),
    title: 'Шаги',
  },
  {
    path: 'tree',
    loadComponent: () => import('./demos/tree').then((m) => m.TreePage),
    title: 'Дерево',
  },
  {
    path: 'divider',
    loadComponent: () => import('./demos/divider').then((m) => m.DividerPage),
    title: 'Разделитель',
  },
  {
    path: 'table',
    loadComponent: () => import('./demos/table').then((m) => m.TablePage),
    title: 'Таблица',
  },
  {
    path: 'paginator',
    loadComponent: () => import('./demos/paginator').then((m) => m.PaginatorPage),
    title: 'Пагинатор',
  },
  {
    path: 'sort',
    loadComponent: () => import('./demos/sort').then((m) => m.SortPage),
    title: 'Сортировка',
  },
  // Демо-страницы компонентов добавляются по одной выше этой строки.
  { path: '**', redirectTo: '' },
];
