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
    "start": "vite --host",
    "build": "tsc && vite build",
    "preview": "vite build && vite preview --host"
  }
}
```

## Архитектура ([Feature-Sliced Design](https://feature-sliced.design/ru/docs/get-started/overview))

Структура папок и файлов именуется в `kebab-case`, кроме `.jsx` (`PascalCase`);
#### Для статики используется `publicPath: "public"`. При указании абсолютного пути папка не учитывается _(прим. **`<img src="/img/icon/ApeCoin.svg">`**)_



```
└── src/
    ├── app/                    #    Initializing application logic        #    Entrypoint for connecting the application (formerly App. tsx)
    |    └── index.css          #    Global application styles
    ├── pages/                  #
    ├── widgets/                #
    ├── features/               #               
    └── shared                  #
```
![Image alt](etc/img.png)
![Image alt](etc/img_1.png)



## Style Guide:

В проекте с большим приоритетом используется утилита [**tailwindcss**](https://tailwindcss.com/).
Это предпочтительный способ описания стилей и присвоения классов. При этом, следует использовать уже заложенный набор классов и при необходимости добавлять инструкции новых.

#### (cs) | (notuse)

(cs) - [custom] - в начале имени файла или папки, говорит о кастомных изменениях сторонних зависимотей проекта. (_Прим.
(cs)antd.scss_)

#### .wrapper | .row | .col

Класс `.wrapper` не имеет описания свойств и служит для понимания структуры html кода, там где блок требует вложенность. Аналогично этому в проекте допускаются классы без свойств - `.row` `.col`.

#### .Class (:components using)

`style.module.scss`

Стили импортируемые для отдельного компонента, сопровождается названию класса с большой буквы, при этом несвязанность модуля позволяет
брать более высокие абстракции,поэтому рекомендуется делать нейминг в одно слово. (_Прим. 'Title', 'First', 'Label' и др._)
Допускается применение модификаторов с нижним подчеркиванием _'\_Hidden', '\_Open', '\_Disabled' и др._

## JavaScript Guid

`camelCase` stylized

См. документацию по [**React**](https://reactjs.org/docs/getting-started.html), [**TypeScript**](https://www.typescriptlang.org/docs/) (tsconfig.json)

## Docker Stage

Для стенда используется команда `npm run preview` и параллельно с этим на стороне сервера `.env.local` файл с переменной `VITE_DEV_DOCKER='true'`.

## State Manager ([Zustand](https://github.com/pmndrs/zustand))

    "zustand": "4.3.6"

Multi-storage который предусматривает опционально middleware:

    - persist; 
    - devtools;
    - immer;


## Операции с числами ([Decimal.js](https://github.com/MikeMcl/decimal.js/))

Экземпляр Decimal увеличивает точность вычислений JavaScript. Полнофункциональный API Повторяет многие методы объектов JavaScript Number.prototype и Math