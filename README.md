# Shelepen's personal site of the 4-st version.
## Summary
This is a continuation of the project Shelepen personal site. The main difference is the stack of technologies(ReactJS) and the new main feature is multi-paging to make it more SEO friendly.
## Development
Development is per page where you can define a language of content translation.

### Serve page development
```bash
npm run cli -- serve -p home -l ua
```
## Build
The site is built by Github actions. These commands are internal for scripts and debugging.
### Build the whole site
```bash
npm run cli -- build
```
### Build a page on the site
```bash
npm run cli -- build-page -p home -l ua
```