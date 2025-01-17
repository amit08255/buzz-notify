const esbuild = require('esbuild')
const package = require('../package.json')
const fs = require('fs')

const commonOptions = {
  entryPoints: ['src/index.ts'],
  minify: true,
  banner: {
    js: `// ${package.author}`,
    css: `/*${package.author}*/`,
  },
}

// ECMAScript Module
esbuild.buildSync({
  ...commonOptions,
  format: 'esm',
  outdir: 'dist/esm',
})

// IIFE
// Read dist/esm/index.js
const esm = fs
  .readFileSync('dist/esm/index.js', 'utf8')
  .replace(/}\)};export{([a-z]) as Notify,[a-z] as NotifyAsync};/g, '})};return $1;')

// Write dist/index.js
fs.writeFileSync('dist/index.js', `var Notify = (() => {${esm}})();`)

// CSS
esbuild.buildSync({
  ...commonOptions,
  entryPoints: ['src/style.css'],
  outfile: 'dist/buzz-notify.css',
})
