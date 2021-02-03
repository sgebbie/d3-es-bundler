// import ascii from "rollup-plugin-ascii";
// import {terser} from "rollup-plugin-terser";
// import * as meta from "./package.json";
import { d3RollupResolver } from './d3-rollup-resolver.js';

//const copyright = `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author.name}`;
const copyright = '// D3 ES packaged by Resystems (Stewart Gebbie)'

function onwarn(message, warn) {
  if (message.code === "CIRCULAR_DEPENDENCY") return;
  warn(message);
}

export default [
  {
    input: "index.js",
    plugins: [
//       ascii(),
//       terser(),
//		nodeResolve(), - didn't seem to solve the resolving of non-conformant module paths
		d3RollupResolver(false),
    ],
    output: {
      extend: true,
      banner: copyright,
      file: "d3.es.js",
      format: "es",
      indent: true,
      name: "D3"
    },
    onwarn
  },
];
