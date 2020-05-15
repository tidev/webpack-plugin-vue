# @titanium-sdk/webpack-plugin-vue

> Titanium Vue plugin for Appcd Webpack

## Installation

To install this plugin in an existing project, run the following command in your project root:

```sh
npm i @titanium-sdk/webpack-plugin-vue titanium-vue-template-compiler
```

## Webpack configuration

This plugin will add/modify the following Webpack options:

### Resolve

- Aliases
  - `@`: `./src`
- Extensions: `vue`

### Rules

- `rule('vue')`
- `rule('vue').use('vue-loader')`

### Plugins

- `plugin('vue-define')`: add platform constant so `titanium-vue-template-compiler` knows for what platform to compile
- `plugin('vue-loader')`:  add the `VueLoaderPlugin`
- `plugin('titanium-loader')` add the `TitaniumLoaderPlugin` to track Titanium UI API usage in Vue templates.
