/* eslint-disable no-console */

// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read http://bit.ly/CRA-PWA.

type ServiceWorkerConfig = {
  onSuccess: void,
  onUpdate: void
}

const isLocalhost = Boolean(
  'localhost' === window.location.hostname
  || '[::1]' === window.location.hostname // [::1] is the IPv6 localhost address.
  || window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
  ), // 127.0.0.1/8 is considered localhost for IPv4.
);

const PUBLIC_URL = process.env.PUBLIC_URL || '';

async function registerValidSW(swUrl: string, config: ServiceWorkerConfig) {
  try {
    const registration: ServiceWorkerRegistration = await window.navigator.serviceWorker;
    registration.onupdatefound = () => {
      if (false === 'installing' in registration) {
        return false;
      }
      const installingWorker: ?ServiceWorker = registration.installing;
      if (installingWorker && installingWorker.onstatechange) {
        installingWorker.onstatechange = () => {
          if ('installed' === installingWorker.state) {
            if (window.navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all '
                + 'tabs for this page are closed. See http://bit.ly/CRA-PWA.',
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      }
      return true;
    };
  } catch (error) {
    console.error('Error during service worker registration:', error);
  }
}

async function checkValidServiceWorker(swUrl: string, config: ServiceWorkerConfig) {
  // Check if the service worker can be found. If it can't reload the page.
  try {
    const response: Response = await fetch(swUrl);

    // Service worker found. Proceed as normal.
    if (404 !== response.status || false === 'serviceWorker' in navigator) {
      registerValidSW(swUrl, config);
    }

    // No service worker found. Probably a different app. Reload the page.
    const registration: ServiceWorkerRegistration = await window.navigator.serviceWorker.ready;
    await registration.unregister();
    window.location.reload();
  } catch (e) {
    console.log(
      'No internet connection found. App is running in offline mode.',
    );
  }
}

export function register(config: ServiceWorkerConfig) {
  if ('production' === process.env.NODE_ENV && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', async () => {
      const swUrl = `${PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        await checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        if ('serviceWorker' in navigator) {
          await window.navigator.serviceWorker.ready;
          console.log(
            'This web app is being served cache-first by a service '
              + 'worker. To learn more, visit http://bit.ly/CRA-PWA',
          );
        }
      } else {
        // Is not localhost. Just register service worker
        await registerValidSW(swUrl, config);
      }
    });
  }
}

export async function unregister() {
  if ('serviceWorker' in navigator) {
    const registration: ServiceWorkerRegistration = await window.navigator.serviceWorker.ready;
    registration.unregister();
  }
}
