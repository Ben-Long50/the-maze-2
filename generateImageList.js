import { readdir, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the directory path and output file
const directoryPath = join(__dirname, 'public/backgrounds');
const outputFile = join(__dirname, 'src/services/imageList.js');

// Read the directory and generate the image list
readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const imageUrls = files
    .filter((file) => /\.(jpg|jpeg|png|gif|svg)$/i.test(file)) // Filter image files
    .map((file) => `/backgrounds/${file}`); // Create relative paths

  const outputContent = `export const imageUrls = ${JSON.stringify(imageUrls, null, 2)};`;

  writeFileSync(outputFile, outputContent);
  console.log('Image list generated in:', outputFile);
});
