import { IconifyJSON } from '@iconify/types';
import presetIcons from '@unocss/preset-icons/browser';
import presetWind3 from '@unocss/preset-wind3';
import initUnocssRuntime, { defineConfig } from '@unocss/runtime';
import biArchive from '@iconify/json/json/bi.json';
import bxHomeAlt from '@iconify/json/json/bx.json';
import faSolidStar from '@iconify/json/json/fa-solid.json';
import fluentPerson from '@iconify/json/json/fluent.json';
import linemdSunnyOutline from '@iconify/json/json/line-md.json';
import materialSymbolsSettings from '@iconify/json/json/material-symbols.json';

async function init() {
  await initUnocssRuntime({
    defaults: defineConfig({
      layers: {
        default: 1,
        icons: 0,
        preflights: 0,
        reset: -1,
      },
      preflights: [
        {
          getCSS: () => import('@unocss/reset/tailwind-compat.css?raw').then(({ default: css }) => css),
          layer: 'reset',
        },
        {
          getCSS: () => /* css */ `
          @view-transition {
            navigation: auto;
          }
          html,
          :host {
            font-family: 'Noto Sans JP', sans-serif !important;
          }
          video {
            max-height: 100%;
            max-width: 100%;
          }
        `,
        },
        {
          getCSS: () => /* css */ `
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `,
        },
      ],
      presets: [
        presetWind3(),
        presetIcons({
          collections: {
            bi: () => Promise.resolve(biArchive as IconifyJSON),
            bx: () => Promise.resolve(bxHomeAlt as IconifyJSON),
            'fa-solid': () => Promise.resolve(faSolidStar as IconifyJSON),
            fluent: () => Promise.resolve(fluentPerson as IconifyJSON),
            'line-md': () => Promise.resolve(linemdSunnyOutline as IconifyJSON),
            'material-symbols': () => Promise.resolve(materialSymbolsSettings as IconifyJSON),
          },
        }),
      ],
    }),
  });
}

init().catch((err: unknown) => {
  throw err;
});
