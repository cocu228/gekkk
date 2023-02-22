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

## Code style:

В проэкте с большим приоритетом используется утилита [**tailwindcss**](https://tailwindcss.com/).
Это предпочтительный способ описания стилей и присвоения классов.

Структура папок и файлов именуется в `kebab-case`, кроме `.jsx` (`PascalCase`);

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