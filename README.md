## Command Line Interface

_package.json_

```json
{
  "scripts": {
    "orval": "orval", // Generates api request functions
    "check": "tsc --noEmit && echo Done.", // Checks for typescript errors
    
    // Local scripts
    "local": "cross-env APP_TYPE=GEKKARD vite --mode dev.gekkard",
    "gko-local": "cross-env APP_TYPE=GEKKOIN vite --mode dev.gekkoin",
    "gkw-local": "cross-env APP_TYPE=GEKWALLET vite --mode dev.gekwallet",
    
    "DEV-GEKKARD": "node tsc && cross-env APP_TYPE=GEKKARD vite build --mode dev.gekkard",
    "DEV-GEKKOIN": "node tsc && cross-env APP_TYPE=GEKKOIN vite build --mode dev.gekkoin",
    "DEV-GEKWALLET": "node tsc && cross-env APP_TYPE=GEKWALLET vite build --mode dev.gekwallet",

    "STG-GEKKARD": "node tsc && cross-env APP_TYPE=GEKKARD vite build --mode stg.gekkard",
    "STG-GEKKOIN": "node tsc && cross-env APP_TYPE=GEKKOIN vite build --mode stg.gekkoin",
    "STG-GEKWALLET": "node tsc && cross-env APP_TYPE=GEKWALLET vite build --mode stg.gekwallet",
    
    "PRD-GEKKARD": "node tsc && cross-env APP_TYPE=GEKKARD vite build --mode prd.gekkard",
    "PRD-GEKKOIN": "node tsc && cross-env APP_TYPE=GEKKOIN vite build --mode prd.gekkoin",
    "PRD-GEKWALLET": "node tsc && cross-env APP_TYPE=GEKWALLET vite build --mode prd.gekwallet"
  }
}
```

## Архитектура ([Feature-Sliced Design](https://feature-sliced.design/ru/docs/get-started/overview))

Структура папок и файлов именуется в `kebab-case`, кроме `.tsx` (`PascalCase`);
#### Для статики используется `publicPath: "public"`. При указании абсолютного пути папка не учитывается _(прим. **`<img src="/img/icon/ApeCoin.svg">`**)_

```
└── src/
    ├── app/                    #    Initializing application logic        #    Entrypoint for connecting the application (formerly App. tsx)
    |    └── index.css          #    Global application styles
    ├── processes/                  #
    ├── pages/                  #
    ├── widgets/                #
    ├── features/               #               
    └── shared                  #
```
![Image alt](etc/img.png)
![Image alt](etc/img_1.png)



## Style Guide:

В проекте с меньшим приоритетом используется утилита [**tailwindcss**](https://tailwindcss.com/).
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

## Работа с датами ([Date-fns](https://date-fns.org/docs/Getting-Started))

date-fns предоставляет наиболее полный, но простой и последовательный набор инструментов для управления датами JavaScript в браузере и Node.js.

## Развертывание на production
В связи с загрузки скриптов в /scr/app/init.ts по условию активной сессии и условиями кэширования, при обновлении production возможны запросы к старым версиям скриптов, 
которых уже нет на сервере — это выливается в ошибки загрузки и зависания. Чтобы предотвратить такие проблемы для пользователей, мы можем перед выкладыванием на прод забирать 
уже собранные файлы скриптов с web.gekkard.com и класть их в код, чтобы они были доступны на сервере. С учетом частоты обновлений и хранения в кэше index.html в течении месяца, 
достаточно хранить 1-2 предыдущие версии.