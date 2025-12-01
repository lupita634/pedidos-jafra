const CACHE_NAME = 'v4.8_Lupita_PWA';

const urlsToCache = [
  '/PedidosJafra/',
  '/PedidosJafra/index.html',
  '/PedidosJafra/secciones/formulario.html'
];

// INSTALAR
self.addEventListener('message', function(event) {
  if (event.data === 'mostrarNotificacion') {
    self.registration.showNotification('WhatsApp', {
      body: 'Nuevo mensaje de Lupita: "Hola"',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
      badge: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
      vibrate: [200, 100, 200],
      tag: 'whatsapp-message',
      renotify: true,
      actions: [
        { action: 'responder', title: 'Responder' },
        { action: 'ver', title: 'Ver mensaje' }
      ]
    });
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("https://wa.me/522751203903")
  );
});
