// d3-rollup-resolver.js
export default function d3RollupResolver () {
	return {
		name: 'my-example', // this name will show up in warnings and errors
		resolveId ( source ) {
			let redirected = null; // default to null so that other sources are handled in the usual way
			if (/^d3-.*/.test(source)) {
				// this signals that rollup should not ask other plugins or check the file system to find this id
				// redirected = "../" + source + "/index.js";
				redirected = "/home/www/stewart/rsys-d3-es-bundler/build/modules/d3/" + source + "/index.js";
			}
			console.log("Resolved source=[" + source + "] as [" + redirected + "]");
			return redirected;
		},
		load ( id ) {
			let loaded = null; // default to null so that other ids handled the usual way
			if (id === 'virtual-module') {
				loaded = 'export default "This is virtual!"'; // the source code for "virtual-module"
			}
			console.log("Loading id=[" + id + "] via  [" + loaded + "]");
			return loaded;
		}
	};
}

export { d3RollupResolver };
