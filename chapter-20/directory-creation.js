import { mkdir } from 'fs/promises';
import { urlPath } from './file-server.js';

// Run file-server.js with node for testing
const mkcolHandler = async (request) => {
  const path = urlPath(request.url);
  try {
    await mkdir(path, { recursive: true });
    return { status: 201 };
  } catch (error) {
    if (error.code != 'EEXIST') throw error;
    else return { status: 400, body: 'Not a directory' };
  }
};

export default mkcolHandler;
