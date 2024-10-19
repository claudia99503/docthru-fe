import fs from 'fs';
import path from 'path';
const __dirname = path.join();

const assetsPath = path.join(__dirname, 'public/assets');
const outputSpritePath = path.join(__dirname, 'public/assets/sprite.svg');

const toCamelCase = (fileName) => {
  if (fileName === '.DS_Store') {
    return null;
  }
  const splitName = fileName.split('_');

  const prefix = splitName[0];

  const camelCaseName = splitName
    .slice(1)
    .map((word, i) => {
      if (i === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');

  return `${prefix}_${camelCaseName}`;
};

let spriteContent = `<svg xmlns="http://www.w3.org/2000/svg">\n`;

try {
  const categories = fs.readdirSync(assetsPath).filter((item) => {
    const category = path.join(assetsPath, item);
    return fs.statSync(category).isDirectory();
  });

  categories.forEach((category) => {
    const imgPath = path.join(assetsPath, category);
    const imgNames = fs.readdirSync(imgPath);

    imgNames.forEach((img) => {
      if (path.extname(img) === '.svg') {
        const nameWithoutExt = path.basename(img, path.extname(img));
        const symbolId = toCamelCase(nameWithoutExt);
        if (symbolId) {
          try {
            let svgContent = fs.readFileSync(path.join(imgPath, img), 'utf8');

            svgContent = svgContent
              .replace(/<svg[^>]*\swidth="[^"]*"/, '<svg')
              .replace(/<svg[^>]*\sheight="[^"]*"/, '<svg');

            const symbol = svgContent
              .replace('<svg', `<symbol id="${symbolId}"`)
              .replace('</svg>', '</symbol>')
              .replace(/\s?xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, '');

            spriteContent += symbol + '\n';
          } catch (err) {
            console.error(`Error reading file: ${img} - ${err.message}`);
          }
        }
      }
    });
  });

  spriteContent += '</svg>';

  fs.writeFileSync(outputSpritePath, spriteContent);
  console.log(`SVG sprite generated at ${outputSpritePath}`);
} catch (err) {
  console.error(`Error processing categories: ${err.message}`);
}
