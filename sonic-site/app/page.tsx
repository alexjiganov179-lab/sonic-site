/**
 * The home page.  The static build artefacts from the original
 * repository contained a large hand‑crafted `index.html` with
 * numerous inline scripts and styles.  Rebuilding that page as a
 * maintainable React component would be a substantial piece of work.
 *
 * As a starting point this page simply renders a placeholder.  The
 * intention is that the original HTML can be decomposed into
 * reusable React components here.  Until then, the legacy HTML can
 * be served from the `public` directory by placing the exported
 * `index.html` there and embedding it with an `<iframe>`.
 */
export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'inherit' }}>
      <h1>Welcome to the OSiO Ethiopia Site</h1>
      <p>
        This Next.js project is a scaffold extracted from the original
        static build.  Global CSS resets have been moved into
        <code>app/globals.css</code>, script tags have been removed in
        favour of module bundling, and meta tags are specified via
        <code>metadata</code> in <code>app/layout.tsx</code>.
      </p>
      <p>
        You can now begin decomposing the legacy HTML into proper
        React components.  For reference, place the original
        <code>index.html</code> into the <code>public</code> folder
        and embed it using an <code>&lt;iframe&gt;</code> if needed.
      </p>
    </main>
  );
}
