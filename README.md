# gitops-blog-frontend

Astro blog display application.

Content is copied in at build time from `gitops-blog-content`:

```bash
npm run sync:content
npm run build
```

In CI, checkout `gitops-blog-content` beside this repository, copy/sync content, then build and push the Docker image.

`src/content/posts`, `src/content/authors`, `src/content/settings`, and `public/uploads` are ignored because they are generated working copies from the content repository.
