# Service Worker API

- **Service Worker** essentially act as proxy servers that sit between web applications, the browser, and the network (when available).
- The **Service Worker** enables developers to create reliable, performant, and offline-capable web applications.
- **Service Worker** are JavaScript files that run in the background(seperately from main thread), acting as a programmable network proxy to intercept requests, cache resources, and enable features like offline support and push notifications. It works only in HTTPS.

A **service worker** is a background script that:

- Runs independently(seperately from main thread) of the web page.
- It is an event-driven worker registered against an origin and a path.
- Intercepts network requests and manages caches.
- Supports offline functionality, push notifications, and background sync.
- Requires HTTPS (except localhost) and operates within a defined scope.
- They are non-blocking and designed to be fully asynchronous.

**Key Characteristics**:

- No DOM access; communicates via `postMessage`.
- Event-driven and asynchronous (uses Promises).
- Scope-based (e.g., `/app/`).

## Purpose

Service workers are used to:

- Cache resources for faster load times.
- Enable offline access to content.
- Deliver push notifications.
- Sync data in the background.
- Build reliable Progressive Web Apps (PWAs).

## Service Worker Lifecycle

The Service Worker lifecycle consists of several distinct phases:

### 1. Registration

```javascript
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("ServiceWorker registration successful");
    })
    .catch((err) => {
      console.log("ServiceWorker registration failed: ", err);
    });
}
```

### 2. Installation

The install event is the first event a service worker gets, and it only happens once.

```javascript
const CACHE_NAME = "my-site-cache-v1";
const urlsToCache = ["/", "/styles/main.css", "/script/main.js"];

self.addEventListener("install", (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});
```

### 3. Activation

After installation, the service worker enters the activation phase. This is where you'd clean up old caches.

```javascript
self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["my-site-cache-v1"];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

### 4. Idle

The service worker is now ready to handle functional events (fetch, push, sync, etc.)

### 5. Fetch (Handling Requests)

```javascript
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
```

### 6. Update

When you change your service worker file, the browser detects this and starts the update process.

## Complete Lifecycle Example

Here's a complete example showing the full lifecycle:

**HTML (index.html):**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Service Worker Demo</title>
  </head>
  <body>
    <script>
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
              console.log("SW registered: ", registration);
            })
            .catch((registrationError) => {
              console.log("SW registration failed: ", registrationError);
            });
        });
      }
    </script>
  </body>
</html>
```

**Service Worker (sw.js):**

```javascript
const CACHE_NAME = "my-app-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/images/logo.png",
];

// Install phase
self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching app shell");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate phase
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");

  // Remove old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch events
self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        console.log("Found in cache:", event.request.url);
        return response;
      }

      // Otherwise fetch from network
      console.log("Fetching from network:", event.request.url);
      return fetch(event.request).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache the new response
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
```

## Advanced Features

Service Workers also enable other powerful features:

1. **Push Notifications**

```javascript
self.addEventListener("push", (event) => {
  const title = "Push Notification";
  const options = {
    body: event.data.text(),
    icon: "images/icon.png",
    badge: "images/badge.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
```

2. **Background Sync**

```javascript
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(syncData());
  }
});

function syncData() {
  // Perform data synchronization
  return Promise.resolve();
}
```

3. **Offline Analytics**

```javascript
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/analytics")) {
    // Store analytics data in IndexedDB when offline
    // Send when connection is restored
  }
});
```

## Compatibility Notes

1. **Markdown Syntax**:

   - The content uses standard Markdown syntax (e.g., `#` for headings, `-` for lists, ``` for code blocks), ensuring compatibility with all Markdown parsers.
   - Code snippets are fenced with ```javascript for syntax highlighting in supported viewers (e.g., GitHub, VS Code).
   - Bold (`**`) and inline code (`) are used for emphasis and terms.

2. **File Extension**:

   - Save the content with a `.md` extension (e.g., `service-worker-api.md`).
   - It will render correctly in Markdown editors, GitHub, or static site generators like Jekyll or Hugo.

3. **Rendering**:

   - Most platforms (e.g., GitHub, GitLab, VS Code) will display the file with proper formatting, including headings, lists, and code highlighting.
   - Some advanced features (e.g., tables) weren’t needed here, but Markdown supports them if required.

4. **Portability**:

   - The `.md` file is plain text, making it lightweight and portable across systems.
   - No external dependencies are required to view or edit.

5. **Potential Enhancements**:
   - Add a table of contents with links (e.g., `[TOC]` in some parsers).
   - Include images or diagrams (e.g., lifecycle flowchart) using `![alt text](image-url)`.
   - Use Markdown extensions (e.g., GitHub Flavored Markdown) for features like task lists or emojis, if needed.

## How to Use

1. **Create the File**:

   - Copy the Markdown content above into a text editor (e.g., VS Code, Notepad).
   - Save as `service-worker-api.md`.

2. **View/Edit**:

   - Open in a Markdown viewer (e.g., VS Code with Markdown Preview, GitHub by uploading to a repo).
   - Edit using any text editor; Markdown is human-readable.

3. **Render as HTML**:

   - Use a static site generator (e.g., Jekyll, Hugo) or a Markdown-to-HTML converter (e.g., `pandoc`) to create a webpage.
   - Example with pandoc:
     ```bash
     pandoc service-worker-api.md -o service-worker-api.html
     ```

4. **Host or Share**:
   - Upload to a GitHub repository for rendered display.
   - Include in documentation sites or wikis supporting Markdown.

## Verification

The content was structured to:

- Retain all technical details (lifecycle, events, examples).
- Use proper Markdown formatting for readability.
- Ensure code snippets are intact and highlighted.
- Be concise yet comprehensive, as per the original explanation.
