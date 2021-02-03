// import ascii from "rollup-plugin-ascii";
// import {terser} from "rollup-plugin-terser";
import * as meta from "../package.json";
import { d3RollupResolver } from '../d3-rollup-resolver.js';

const copyright = `// D3 ES ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author.name} [packaged by ${meta.packager.organisation} (${meta.packager.author.name}) - ${meta.packager.homepage}]`;

function onwarn(message, warn) {
if (message.code === "CIRCULAR_DEPENDENCY") return;
	warn(message);
}

export default [
	{
		input: "index.js",
		plugins: [
			d3RollupResolver(false),
			//	ascii(),
			//	terser(),
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
