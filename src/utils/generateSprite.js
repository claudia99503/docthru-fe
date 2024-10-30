import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES 모듈에서 __dirname을 구현하는 방법
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 경로 설정
const assetsPath = path.resolve(__dirname, '../../public/assets');
const iconsPath = path.join(assetsPath, 'icons');
const imagesPath = path.join(assetsPath, 'images');

// 첫 글자는 그대로 두고 나머지를 카멜케이스로 변환하는 함수
const createIdName = (str) => {
  const splitName = str.split('_');
  const prefix = splitName[0];

  const toCamelCase = splitName
    .splice(1)
    .map((word, index) =>
      index === 0
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');

  return `${prefix}_${toCamelCase}`;
};

// 아이콘 SVG 파일 처리 함수
const processIconsSvgFile = (filePath) => {
  let svgContent = fs.readFileSync(filePath, 'utf8');

  // Remove width and height only from the <svg> tag
  svgContent = svgContent.replace(/<svg[^>]*\swidth="[^"]*"/gi, '<svg');
  svgContent = svgContent.replace(/<svg[^>]*\sheight="[^"]*"/gi, '<svg');

  // Process fill, stroke, width, and height for each element inside the SVG
  const svgElements = [
    'path',
    'circle',
    'rect',
    'polygon',
    'ellipse',
    'line',
    'polyline',
  ];

  svgElements.forEach((tag) => {
    const regex = new RegExp(`<${tag}([^>]*)\/>`, 'gi');
    svgContent = svgContent.replace(regex, (match, attributes) => {
      const fillMatch = attributes.match(/\sfill\s*=\s*['"]([^'"]+)['"]/);
      const strokeMatch = attributes.match(/\sstroke\s*=\s*['"]([^'"]+)['"]/);
      const widthMatch = attributes.match(/\swidth\s*=\s*['"]([^'"]+)['"]/);
      const heightMatch = attributes.match(/\sheight\s*=\s*['"]([^'"]+)['"]/);

      const originalFill = fillMatch ? fillMatch[1] : null;
      const originalStroke = strokeMatch ? strokeMatch[1] : null;
      const originalWidth = widthMatch ? widthMatch[1] : '24';
      const originalHeight = heightMatch ? heightMatch[1] : '24';

      attributes = attributes.replace(/\sfill\s*=\s*['"][^'"]+['"]/gi, '');
      attributes = attributes.replace(/\sstroke\s*=\s*['"][^'"]+['"]/gi, '');
      attributes = attributes.replace(/\swidth\s*=\s*['"][^'"]+['"]/gi, '');
      attributes = attributes.replace(/\sheight\s*=\s*['"][^'"]+['"]/gi, '');

      let modifiedTag = `<${tag} ${attributes.trim()}`;
      if (originalFill)
        modifiedTag += ` fill="var(--${tag}-fill, ${originalFill})"`;
      if (originalStroke)
        modifiedTag += ` stroke="var(--${tag}-stroke, ${originalStroke})"`;
      modifiedTag += ` width="var(--${tag}-width, ${originalWidth})"`;
      modifiedTag += ` height="var(--${tag}-height, ${originalHeight})" />`;

      return modifiedTag;
    });
  });

  return svgContent;
};

// images 폴더의 SVG 파일 처리
const processImagesSvgFile = (filePath) => {
  let svgContent = fs.readFileSync(filePath, 'utf8');
  svgContent = svgContent
    .replace(/<svg[^>]*\swidth="[^"]*"/gi, '<svg')
    .replace(/<svg[^>]*\sheight="[^"]*"/gi, '<svg');
  return svgContent;
};

// 폴더에서 SVG 파일을 읽고 스프라이트 파일 생성
const generateSprite = (folderPath, outputFileName, processSvgFile) => {
  const svgFiles = fs
    .readdirSync(folderPath)
    .filter((file) => path.extname(file) === '.svg');
  let spriteContent = '<svg xmlns="http://www.w3.org/2000/svg">\n';

  svgFiles.forEach((file) => {
    const filePath = path.join(folderPath, file);
    let svgContent = processSvgFile(filePath);

    const fileNameWithoutExt = path.basename(file, path.extname(file));
    const symbolId = createIdName(fileNameWithoutExt);

    svgContent = svgContent
      .replace('<svg', `<symbol id="${symbolId}"`)
      .replace('</svg>', '</symbol>')
      .replace(/\s?xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, '');

    spriteContent += svgContent + '\n';
  });

  spriteContent += '</svg>';

  const outputFilePath = path.join(assetsPath, outputFileName);
  fs.writeFileSync(outputFilePath, spriteContent, 'utf8');
  console.log(`SVG sprite generated at ${outputFilePath}`);
};

// icons 스프라이트 생성
generateSprite(iconsPath, 'icons_sprite.svg', processIconsSvgFile);

// images 스프라이트 생성
generateSprite(imagesPath, 'images_sprite.svg', processImagesSvgFile);
