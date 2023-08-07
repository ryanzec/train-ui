import TinyColor from '@ctrl/tinycolor';
import StyleDictionary from 'style-dictionary';

const notDefault = (value, defaultValue) => (value !== defaultValue ? value : '');

const fontFamily = ({ fontFamily }, { fontFamilies } = {}) =>
  fontFamilies && fontFamilies[fontFamily] ? fontFamilies[fontFamily] : fontFamily;

export default {
  transform: {
    'size/px': {
      type: 'value',
      matcher: function (token) {
        return token.type === 'dimension' && token.value !== 0;
      },
      transformer: function (token) {
        return `${token.value}px`;
      },
    },
    'web/shadow': {
      type: 'value',
      matcher: function (token) {
        return token.type === 'custom-shadow' && token.value !== 0;
      },
      transformer: function ({ value }) {
        return `${value.shadowType === 'innerShadow' ? 'inset ' : ''}${value.offsetX}px ${value.offsetY}px ${
          value.radius
        }px ${value.spread}px ${new TinyColor.TinyColor(value.color).toRgbString()}`;
      },
    },
    'web/radius': {
      type: 'value',
      matcher: function (token) {
        return token.type === 'custom-radius';
      },
      transformer: function ({ value }) {
        if ([value.topRight, value.bottomLeft, value.bottomRight].every((v) => v === value.topLeft)) {
          return `${value.topLeft}px`;
        }
        return `${value.topLeft}px ${value.topRight}px ${value.bottomLeft}px ${value.bottomRight}px`;
      },
    },
    'web/padding': {
      type: 'value',
      matcher: function (token) {
        return token.type === 'custom-spacing';
      },
      transformer: ({ value: { top, left, bottom, right } }) => {
        if ([bottom, left, right].every((v) => v === top)) {
          return `${top}px`;
        }
        return `${top}px ${right}px ${bottom}px ${left}px`;
      },
    },
    'web/font': {
      type: 'value',
      matcher: function (token) {
        return token.type === 'custom-fontStyle';
      },
      transformer: function ({ value: font }, { options }) {
        // font: font-style font-variant font-weight font-size/line-height font-family;
        return `${notDefault(font.fontStretch, 'normal')} ${notDefault(font.fontStyle, 'normal')} ${font.fontWeight} ${
          font.fontSize
        }/${font.lineHeight} ${fontFamily(font, options)}`.trim();
      },
    },
    'web/gradient': {
      type: 'value',
      matcher: function (token) {
        return token.type === 'custom-gradient';
      },
      transformer: function ({ value }) {
        const stopsString = value.stops
          .map((stop) => {
            return `${new TinyColor.TinyColor(stop.color).toRgbString()} ${stop.position * 100}%`;
          })
          .join(', ');
        if (value.gradientType === 'linear') {
          return `linear-gradient(${value.rotation}deg, ${stopsString})`;
        }
        if (value.gradientType === 'radial') {
          return `radial-gradient(${stopsString})`;
        }
      },
    },
    'color/hex8ToRgba': {
      type: 'value',
      matcher: function (token) {
        return token.type === 'color';
      },
      transformer: function ({ value }) {
        return `${new TinyColor.TinyColor(value).toRgbString()}`;
      },
    },
  },
  transformGroup: {
    'custom/css': StyleDictionary.transformGroup.css.concat([
      'size/px',
      'web/shadow',
      'web/radius',
      'web/padding',
      'web/font',
      'web/gradient',
      'color/hex8ToRgba',
    ]),
  },
  format: {},
  action: {},
};
