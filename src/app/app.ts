import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeSwitcher } from './theme-switcher';

interface NavItem {
  label: string;
  path: string;
  ready: boolean;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, ThemeSwitcher],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly year = new Date().getFullYear();

  // Каталог компонентов по официальным категориям Angular Material.
  // ready: false => пункт виден как «скоро» и неактивен. Когда добавляем
  // страницу компонента — ставим ready: true и заводим маршрут в app.routes.ts.
  protected readonly sections: NavSection[] = [
    {
      label: 'Поля и контролы форм',
      items: [
        { label: 'Поле ввода', path: 'form-field', ready: true },
        { label: 'Выпадающий список', path: 'select', ready: true },
        { label: 'Автодополнение', path: 'autocomplete', ready: true },
        { label: 'Чекбокс', path: 'checkbox', ready: true },
        { label: 'Радио-кнопки', path: 'radio', ready: true },
        { label: 'Переключатель', path: 'slide-toggle', ready: true },
        { label: 'Слайдер', path: 'slider', ready: true },
        { label: 'Дата', path: 'datepicker', ready: true },
        { label: 'Чипы', path: 'chips', ready: true },
      ],
    },
    {
      label: 'Навигация',
      items: [
        { label: 'Меню', path: 'menu', ready: true },
        { label: 'Боковая панель', path: 'sidenav', ready: true },
        { label: 'Тулбар', path: 'toolbar', ready: true },
      ],
    },
    {
      label: 'Макет',
      items: [
        { label: 'Карточка', path: 'cards', ready: false },
        { label: 'Вкладки', path: 'tabs', ready: false },
        { label: 'Раскрывающиеся панели', path: 'expansion', ready: false },
        { label: 'Списки', path: 'list', ready: false },
        { label: 'Шаги', path: 'stepper', ready: false },
        { label: 'Дерево', path: 'tree', ready: false },
        { label: 'Разделитель', path: 'divider', ready: false },
      ],
    },
    {
      label: 'Кнопки и индикаторы',
      items: [
        { label: 'Кнопки', path: 'buttons', ready: true },
        { label: 'Кнопки-переключатели', path: 'button-toggle', ready: true },
        { label: 'Иконки', path: 'icon', ready: true },
        { label: 'Бейдж', path: 'badge', ready: true },
        { label: 'Прогресс (круг)', path: 'progress-spinner', ready: true },
        { label: 'Прогресс (полоса)', path: 'progress-bar', ready: true },
      ],
    },
    {
      label: 'Поповеры и модалки',
      items: [
        { label: 'Диалог', path: 'dialog', ready: true },
        { label: 'Нижний лист', path: 'bottom-sheet', ready: true },
        { label: 'Снэкбар', path: 'snackbar', ready: true },
        { label: 'Подсказка', path: 'tooltip', ready: true },
      ],
    },
    {
      label: 'Таблицы данных',
      items: [
        { label: 'Таблица', path: 'table', ready: false },
        { label: 'Пагинатор', path: 'paginator', ready: false },
        { label: 'Сортировка', path: 'sort', ready: false },
      ],
    },
  ];
}
