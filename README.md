## Command Line Interface


Vite treats index.html as source code and part of the module graph. It resolves `<script type="module" src="...">` that references your JavaScript source code. Even inline `<script type="module">`

1 `npm run dev` - start dev server, aliases: `vite dev`, `vite serve`

2 `npm run build` - build for production 

3 `npm run preview` - locally preview production build


_package.json_

```
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Архитектура

Структура папок и файлов именуется в `kebab-case`, кроме `.jsx` (`PascalCase`);

```
└── src/
    ├── app/                    # Initializing application logic
    |    ├── index.tsx          #    Entrypoint for connecting the application (formerly App. tsx)
    |    └── index.css          #    Global application styles
    ├── pages/                  #
    ├── widgets/                #
    ├── features/               #
    ├── entities/               #
    ├── shared/                 #
    └── index.tsx               # Connecting and rendering the application
```
![Image alt](etc/img.png)
![Image alt](etc/img_1.png)



## Style Guide:

В проекте с большим приоритетом используется утилита [**tailwindcss**](https://tailwindcss.com/).
Это предпочтительный способ описания стилей и присвоения классов.

#### cs-

cs- (custom) - в начале имени файла или папки, говорит о кастомных изменениях сторонних зависимотей проекта. (_Прим.
cs-antd.scss_)

#### .wrapper

Класс `.wrapper` не имеет описания свойств и служит для понимания структуры html кода, там где вложенность требует блок
обертку.

#### .Class (:components using)

`style.module.scss`

Стили импортируемые для отдельного компонента, сопровождается названию класса с большой буквы, при этом несвязанность модуля позволяет
брать более высокие абстракции,поэтому рекомендуется делать нейминг в одно слово. (_Прим. 'Title', 'First', 'Label' и др._)
Допускается применение модификаторов с нижним подчеркиванием _'\_Hidden', '\_Open', '\_Disabled' и др._

## JavaScript Guid

`camelCase` stylized

См. документацию по [**React**](https://reactjs.org/docs/getting-started.html), [**TypeScript
**](https://www.typescriptlang.org/docs/) (tsconfig.json)