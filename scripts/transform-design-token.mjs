import StyleDictionary from 'style-dictionary'
import deepMerge from "deepmerge";
import config from './style-dictionary-config.mjs';

const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: token => {
    return (token.unit === 'pixel' || token.type === 'dimension') && token.value !== 0
  },
  transformer: token => {
    return `${token.value}px`
  }
})

StyleDictionary.registerTransform({
  name: 'size/percent',
  type: 'value',
  matcher: token => {
    return token.unit === 'percent' && token.value !== 0
  },
  transformer: token => {
    return `${token.value}%`
  }
})

const isThemedPath = (path) => {
  path = path || [];
  const partPath = path[1] || '';

  if (partPath === 'light' || partPath === 'dark') {
    return true;
  }

  return false;
}

const isValidPath = (path, includeVariableMode = '') => {
  path = path || [];

  if (!path[0]) {
    return false;
  }

  if (includeVariableMode && path[1] && includeVariableMode !== path[1]) {
    return false;
  }

  return true;
}

StyleDictionary.registerFilter({
  name: 'validTokenDefault',
  matcher: function(token) {
    const isValidPath2 = isValidPath(token?.path, 'light');
    const isThemePath = isThemedPath(token?.path);
    const isValid = !isThemePath || isValidPath2;

    if (!isValidPath(token?.path, 'light') && isThemedPath(token?.path)) {
      return false;
    }

    return [
      "dimension",
      "string",
      "number",
      "color",
      "custom-spacing",
      "custom-gradient",
      "custom-fontStyle",
      "custom-radius",
      "custom-shadow",
    ].includes(token.type);
  }
})

StyleDictionary.registerFilter({
  name: 'validTokenDark',
  matcher: function(token) {
    if (!isValidPath(token?.path, 'dark')) {
      return false;
    }

    return [
      "dimension",
      "string",
      "number",
      "color",
      "custom-spacing",
      "custom-gradient",
      "custom-fontStyle",
      "custom-radius",
      "custom-shadow",
    ].includes(token.type);
  }
})

StyleDictionary.registerFormat({
  name: 'css/custom/default',
  formatter: ({dictionary, file, options}) => {
    const { outputReferences, theme } = options;

    // the double mode-1 replace can handle when a single mode variables aliases another single mode variable in figma
    return (
      fileHeader({file}) + `:root {\n` + formattedVariables({format: 'css', dictionary, outputReferences}) + `\n}\n`
    ).replace(/-light-/g, '-').replace(/-mode-1-mode-1-/g, '-').replace(/-mode-1-/g, '-')
  }
})

StyleDictionary.registerFormat({
  name: 'css/custom/dark',
  formatter: ({dictionary, file, options}) => {
    const { outputReferences, theme } = options;

    // the double mode-1 replace can handle when a single mode variables aliases another single mode variable in figma
    return (
      fileHeader({file}) + `[data-theme="dark"] {\n` + formattedVariables({format: 'css', dictionary, outputReferences}) + `\n}\n`
    ).replace(/-dark-/g, '-').replace(/-mode-1-mode-1-/g, '-').replace(/-mode-1-/g, '-')
  }
})

const StyleDictionaryDefault = StyleDictionary.extend({
  ...deepMerge.all([config]),
  source: ["./packages/assets/json/design-tokens.json"],
  platforms: {
    css: {
      transformGroup: "custom/css",
      buildPath: "./packages/styles/",
      files: [
        {
          destination: "variables-base.css",
          format: "css/custom/default",
          filter: "validTokenDefault",
          options: {
            showFileHeader: false,
          },
        },
      ],
    },
  },
});

StyleDictionaryDefault.buildAllPlatforms()

const StyleDictionaryDark = StyleDictionary.extend({
  ...deepMerge.all([config]),
  source: ["./packages/assets/json/design-tokens.json"],
  platforms: {
    css: {
      transformGroup: "custom/css",
      buildPath: "./packages/styles/",
      files: [
        {
          destination: "variables-dark.css",
          format: "css/custom/dark",
          filter: "validTokenDark",
          options: {
            showFileHeader: false,
          },
        },
      ],
    },
  },
});

StyleDictionaryDark.buildAllPlatforms()
