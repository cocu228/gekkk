async function loadIndexModule(url) {
    try {
        const response = await fetch(url);
        const scriptText = await response.text();

        // Сохраняем скрипт в кеше
        const cache = await caches.open('script-cache');
        await cache.put(url, new Response(scriptText));

        return `${url} module loaded`;

    } catch (error) {
        return error.message;
    }
}

self.addEventListener('message', async function (e) {

    if (e.data.method === "loadIndexModule") {
        const result = await loadIndexModule(e.data.url)
        self.postMessage(result)
    }

    self.postMessage(e.data);

}, false);
