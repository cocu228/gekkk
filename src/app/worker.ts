async function loadIndexModule(url) {

    try {
        const response = await fetch(url);
        const scriptText = await response.text();

        const cache = await caches.open('app.bundle');

        await cache.put(url, new Response(scriptText));

        return {
            status: {
                fetch: scriptText !== "",
                cache: true
            }
        };

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
