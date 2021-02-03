# D3 ES Bundler

Builds a ES compliant JavaScript module for D3.

D3 is developed using ES JavaScript modules. However, for legacy reasons, the
distributions are provided for non-standard module formats. This project
packages the complete D3 suite as an [ES module][mozesmod], thereby enabling the
use of D3, natively in browsers that supports ES modules, without any need for
transpiling.

## Usage

```html
<script type="module">
	import * as d3 from './build/d3.es.js'
</script>
```

## Build

```
make
```

## Process

This follows the basic steps:

- fetch all d3 source packages by cloning the relevant git repositories
- fetch extra dependencies by cloning the relevant git repositories
- generate a grouping module
- apply `rollup` (using a custom resolver) to compile a standalone ES module for
  D3
- enjoy using D3

[mozesmod]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules "JavaScript ES Modules"
