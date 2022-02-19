const fileRegex = /\.(le|sc|c)ss$/

function viteExcludeStylePlugin() {
  let config

  return {
    name: 'vite-exclude-style-plugin',

    apply: 'build',

    configResolved(resolvedConfig) {
      config = resolvedConfig
    },

    transform(source, id) {
      const external = config?.build?.rollupOptions?.external

      if (external?.length && fileRegex.test(id)) {
        const externalRe = new RegExp(`(${external.map(moduleName => 'node_modules/' + moduleName).join('|')})`)
        return {
          code: externalRe.test(id) ? '' : source,
          map: null
        }
      }
    }
  }
}

exports.viteExcludeStylePlugin = viteExcludeStylePlugin;
