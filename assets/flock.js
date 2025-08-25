// Tinybird analytics client

(() => {
  // Locate the current script tag to read configuration
  const script = document.currentScript || document.querySelector('script[src$="flock.js"]');
  if (!script) return;
  const projectId = script.dataset.tbProjectId;
  if (!projectId) return;

  // Cache token so we don't fetch it multiple times
  let authToken;
  async function getToken() {
    if (authToken) return authToken;
    try {
      const res = await fetch(`https://api.tinybird.co/v0/auth/anonymous?project=${projectId}`);
      if (!res.ok) throw new Error('auth failed');
      const data = await res.json();
      authToken = data.token;
      return authToken;
    } catch (err) {
      console.error('Tinybird auth failed', err);
      return null;
    }
  }

  async function send(name, payload = {}) {
    const token = await getToken();
    if (!token) return;
    const url = `https://api.tinybird.co/v0/events?name=${encodeURIComponent(name)}&token=${token}`;
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      });
    }
  }

  // expose a simple API
  window.flock = { event: send };

  // send initial page view
  send('page_view', {
    url: location.href,
    referrer: document.referrer,
  });
})();

