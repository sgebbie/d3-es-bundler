default: build/index.js

.git:
	git init

D3_MODULES = 			\
	d3-array			\
	d3-axis				\
	d3-brush			\
	d3-chord			\
	d3-color			\
	d3-contour			\
	d3-delaunay			\
	d3-dispatch			\
	d3-drag				\
	d3-dsv				\
	d3-ease				\
	d3-fetch			\
	d3-force			\
	d3-format			\
	d3-geo				\
	d3-hierarchy		\
	d3-interpolate		\
	d3-path				\
	d3-polygon			\
	d3-quadtree			\
	d3-random			\
	d3-scale			\
	d3-scale-chromatic	\
	d3-selection		\
	d3-shape			\
	d3-time				\
	d3-time-format		\
	d3-timer			\
	d3-transition		\
	d3-zoom				\

##


# npm install --save-dev rollup-plugin-terser

build/d3.es.js: build/index.js | build
	cp rollup.config.js build
	cp d3-rollup-resolver.js build
	cd build && rollup -c rollup.config.js

build:
	mkdir -p build

submodules/d3:
	mkdir -p $@

build/modules/d3: | build
	mkdir -p $@

build/index.js: add-d3-modules | build
	@echo "[ constructing index.js ]"
	@for d3m in $(D3_MODULES); do			\
		echo "export * from \"./modules/d3/$${d3m}/index.js\";";	\
	done > $@

add-d3-modules: add-d3-submodules | build/modules/d3
	@echo "[ linking submodules ]"
	@cd $(firstword $|);															\
	for d3m in $(D3_MODULES); do												\
		[ ! -L $${d3m} ] && ln -sf ../../../submodules/d3/$${d3m}/src $${d3m};	\
		true;																	\
	done

D3_MODULES_SUB=$(D3_MODULES:%=submodules/d3/%)

add-d3-submodules: | $(D3_MODULES_SUB)

$(D3_MODULES_SUB): | .git submodules/d3
	git submodule add https://github.com/d3/$(notdir $@) $@

clean:
	rm -rf build
