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