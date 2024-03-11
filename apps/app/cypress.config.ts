import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import verifyDownloads from 'cy-verify-downloads';
import { defineConfig } from 'cypress';
import { polyfillNode } from 'esbuild-plugin-polyfill-node';

const { verifyDownloadTasks } = verifyDownloads;

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [
        polyfillNode({ polyfills: { crypto: true } }),
        createEsbuildPlugin(config),
      ],
    }),
  );

  on('task', verifyDownloadTasks);

  return config;
}

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: '**/*.feature',
    setupNodeEvents,
  },
});
