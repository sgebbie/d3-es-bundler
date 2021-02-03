// d3-rollup-resolver.js

export default function d3RollupResolver (show) {
	return {
		name: 'my-example', // this name will show up in warnings and errors
		resolveId ( source ) {
			let redirected = null; // default to null so that other sources are handled in the usual way
			// use cwd() since a pure relative path seems to fail some times
			let base = process.cwd() + "/.."

			// resolve internal d3 modules
			if (/^d3-.*/.test(source)) {
				// this signals that rollup should not ask other plugins or check the file system to find this id
				redirected = base + "/build/modules/d3/" + source + "/index.js";
			}

			// resolve dependency special cases
			if (/internmap/.test(source)) {
				redirected = base + "/submodules/dep/" + source + "/src/index.js";
			}
			if (/delaunator/.test(source)) {
				redirected = base + "/submodules/dep/" + source + "/index.js";
			}

			if (show) console.log("Resolved source=[" + source + "] as [" + redirected + "]");
			return redirected;
		},
		load ( id ) {
			let loaded = null; // default to null so that other ids handled the usual way
			if (id === 'artificial-dummy-placeholder') {
				loaded = 'Should happen - just a placeholder'; // the source code for "virtual-module"
			}
			if (show) console.log("Loading id=[" + id + "] via  [" + loaded + "]");
			return loaded;
		}
	};
}

export { d3RollupResolver };
