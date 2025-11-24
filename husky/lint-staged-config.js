import fs from 'fs';
import { ESLint } from 'eslint';

let stylelintExt = 'js';

if (fs.existsSync('./node_modules/stylelint/bin/stylelint.mjs')) {
  stylelintExt = 'mjs';
}

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();

  const isIgnored = await Promise.all(
    files.map(file => eslint.isPathIgnored(file)),
  );
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);

  return filteredFiles.join(' ');
};

export default {
  '**/*.(vue|js|ts)': filenames => removeIgnoredFiles(filenames)
    .then(filesToLint => [
      `node ./node_modules/eslint/bin/eslint.js ${filesToLint} --ext .js,.vue --ignore-path .gitignore --max-warnings=0`,
    ]),
  '**/*.(vue|scss|css)': filenames => removeIgnoredFiles(filenames)
    .then(filesToLint => [
      `node ./node_modules/stylelint/bin/stylelint.${stylelintExt} ${filesToLint}`,
    ]),
  '**/*.(vue|ts|js)': () => 'node ./node_modules/nuxt/bin/nuxt.mjs typecheck',
};
