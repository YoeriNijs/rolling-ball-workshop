# Rolling Ball

Let's make a PWA of this game!

## Preparations

To make this app fully progressive, it needs to be served over HTTPS. Let's use 
Google Firebase hosting for that!

1. Create a project for yourself at [Google Firebase](https://console.firebase.google.com)
2. Install the [Firebase CLI](https://firebase.google.com/docs/cli/)
3. Run `firebase init` in this project. Choose "Hosting" and use the current directory (`.`)
as web directory (instead of the default `public` path).

Now you can serve the app locally with `firebase serve`. You can deploy the app to a HTTPS environment using `firebase deploy`.

You can test the PWA features using [Lighthouse](https://developers.google.com/web/tools/lighthouse/) in Chrome Devtools. 

## A. Service Worker support

This part can be done locally. Use `firebase serve` to run the app locally.

1. Register the service worker in `app.js`. Check in your Devtools if it is being registered correctly.
2. Prefetch all the required assets (`/`, `/style.css`, `/app.js`) on `install`. Check in your Devtools if the assets 
    are added to the application cache.
3. Now serve the cached assets from cache, on the `fetch` event. Check if the app works offline.
4. All right, you made it so far! Now it would be nice to update the pre-fetched assets when there are updates.
    You can check it by changing something in `index.html`, without changing the service worker, and see if it is updated 
    in the cache on refresh (and being served after a second refresh).

    
A bonus exercise: support different caches per service worker instance. I recommend doing exercise B first!

- You need a different cache name per instance.
- On `activate` of the new service worker, it should cleanup the old caches.
- The new service worker is being activated when all tabs are closed.  

## B. App Manifest

1. Add a app `manifest.json`. You can use [App Manifest Generator](https://app-manifest.firebaseapp.com/) for that.
2. Register it using `<link rel="manifest" href="manifest.json">`. You might also want to add `<meta name="theme-color" content="yourhexcolorhere">`.
3. Validate your manifest using Chrome Lighthouse.

For iOS, some manifest options are ignored / not implemented yet. You the following metatags to make it work on iOS 
(replace the values!).

```
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="your hex color here">
<meta name="apple-mobile-web-app-title" content="your app name here">
<link rel="apple-touch-icon" href="images/icons/icon-152x152.png">
```

## Deploy and test it!

Now deploy using `firebase deploy`. On both iOS and Android you should be able to add it to your homescreen and use it offline.
On Android, the PWA will be detected, and a popup should automatically show up within 30 seconds. 