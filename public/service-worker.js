// Set this to true for production
var doCache = true;

// Name our cache
var CACHE_NAME = 'generator';

// Delete old caches that are not our current one!
// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
          return true;
        }))
      )
  );
});

// The first time the user starts up the PWA, 'install' is triggered.
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', function(event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          // Get the assets manifest so we can see what our js file is named
          // This is because webpack hashes it
          
          fetch("asset-manifest.json")
            .then(response => {
              return response.json();
            })
            .then(assets => {
              // Open a cache and cache our files
              // We could also cache any static assets like CSS or images
              const files = assets.files;
              const cachedFiles = [];
              for (const url in files) {
                if (Object.hasOwnProperty.call(files, url)) {
                  cachedFiles.push(files[url]);                  
                }
              }

              cache.addAll(cachedFiles)
              console.log('cached');
            })
            .catch((e) => {
              console.error(e)
            });

            fetch("/settings/data.json")
            .then(response => {
              return response.json();
            })
            .then(settings => {
              const cachedFiles = [];
              settings.map((setting) => {
                cachedFiles.push(setting.icon);
                cachedFiles.push(`/settings/${setting.code}.json`);
                return true;
              });
              cache.addAll(cachedFiles);
            })
            .catch((e) => {
              console.error(e)
            });
        })
    );
  }
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', function(event) {
    if (doCache) {
      event.respondWith(
          caches.match(event.request).then(function(response) {
              return response || fetch(event.request);
          })
      );
    }
});