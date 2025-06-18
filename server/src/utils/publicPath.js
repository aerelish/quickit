import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicPath = (publicPath) => {
  return path.join(__dirname, publicPath)
};

export default publicPath;