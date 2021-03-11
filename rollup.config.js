// import ascii from "rollup-plugin-ascii";
import { terser } from "rollup-plugin-terser";
import * as meta from "../package.json";
import { d3RollupResolver } from '../d3-rollup-resolver.js';

const copyright = `// D3 ES ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author.name} [packaged by ${meta.packager.organisation} (${meta.packager.author.name}) - ${meta.packager.homepage}]`;

function onwarn(message, warn) {
if (message.code === "CIRCULAR_DEPENDENCY") return;
	warn(message);
}

const config =
	{
		input: "index.js",
		plugins: [
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
	};

export default [
	// default config
	config,
	// config overlayed with .min.js
	{
		...config,
		plugins: [
			...config.plugins,
			terser(),
		],
		output: {
			...config.output,
			file: "d3.es.min.js",
		},
	},
];
