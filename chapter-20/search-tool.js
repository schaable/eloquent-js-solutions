import { stat, readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const regexp = process.argv[2];
const paths = process.argv.slice(3);

const search = async (pattern, paths) => {
  const regexp = new RegExp(pattern);
  try {
    for (const path of paths) {
      const stats = await stat(path);
      if (stats.isDirectory()) {
        const dirContents = await readdir(path);
        const dirPaths = dirContents.map((name) => join(path, name));
        search(regexp, dirPaths);
      } else {
        const contents = await readFile(path, 'utf8');
        if (regexp.test(contents)) {
          console.log(path);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

search(regexp, paths);
