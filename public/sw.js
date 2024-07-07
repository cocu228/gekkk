self.addEventListener('notificationclick', (event) => {
    const notification = event.notification;
    console.log('Trying to open window:', notification.data);

    notification.close();
    
    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(windowClients => {
            let mySiteWindow = null;

            for (const windowClient of windowClients) {
                if (windowClient.url.includes(notification.data.origin)) {
                    mySiteWindow = windowClient;
                    break;
                }
            }

            return !!mySiteWindow
                ? mySiteWindow.focus()
                : clients.openWindow(`${notification.data.origin}${notification.data.navUrl}`);
        })
    );
});
