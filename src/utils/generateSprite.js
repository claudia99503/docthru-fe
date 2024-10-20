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

// height와 width를 제거하는 함수
const removeDimensions = (svgContent) => {
  return svgContent
    .replace(/\swidth="[^"]*"/gi, '')
    .replace(/\sheight="[^"]*"/gi, '');
};

// 첫 글자는 그대로 두고 나머지를 카멜케이스로 변환하는 함수
const createIdName = (str) => {
  const splitName = str.split('_');
  const prefix = splitName[0];

  const toCamelCase = splitName
    .splice(1) // 언더스코어로 분리
    .map((word, index) =>
      index === 0
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ) // 첫 글자만 대문자로
    .join('');

  return `${prefix}_${toCamelCase}`;
};

// icons 폴더의 SVG 파일 처리 (fill, stroke 속성을 모두 currentColor로 변경)
const processIconsSvgFile = (filePath) => {
  let svgContent = fs.readFileSync(filePath, 'utf8');

  // 모든 fill과 stroke를 currentColor로 변경
  svgContent = svgContent.replace(
    /\sfill\s*=\s*['"][^'"]+['"]/gi,
    ' fill="currentColor"'
  );
  svgContent = svgContent.replace(
    /\sstroke\s*=\s*['"][^'"]+['"]/gi,
    ' stroke="currentColor"'
  );

  // <svg> 태그의 fill 속성만 제거
  svgContent = svgContent.replace(
    /(<svg[^>]+)\sfill\s*=\s*['"][^'"]+['"]/gi,
    '$1'
  );

  // height와 width 제거
  svgContent = removeDimensions(svgContent);

  return svgContent;
};

// images 폴더의 SVG 파일 처리 (fill, stroke 속성은 그대로 두고, height, width만 제거)
const processImagesSvgFile = (filePath) => {
  let svgContent = fs.readFileSync(filePath, 'utf8');

  // height와 width만 제거
  svgContent = removeDimensions(svgContent);

  return svgContent;
};

// 폴더에서 SVG 파일을 읽고 스프라이트 파일 생성
const generateSprite = (folderPath, outputFileName, processSvgFile, prefix) => {
  const svgFiles = fs
    .readdirSync(folderPath)
    .filter((file) => path.extname(file) === '.svg');
  let spriteContent = '<svg xmlns="http://www.w3.org/2000/svg">\n';

  svgFiles.forEach((file) => {
    const filePath = path.join(folderPath, file);
    let svgContent = processSvgFile(filePath);

    // id 만들기
    const fileNameWithoutExt = path.basename(file, path.extname(file));
    const symbolId = createIdName(fileNameWithoutExt);

    // <svg> 태그를 <symbol>로 변경하고 id 속성 추가
    svgContent = svgContent
      .replace('<svg', `<symbol id="${symbolId}"`)
      .replace('</svg>', '</symbol>')
      .replace(/\s?xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, ''); // symbol 태그에서 xmlns 속성 제거

    spriteContent += svgContent + '\n';
  });

  spriteContent += '</svg>';

  // assets 폴더 아래에 스프라이트 파일을 생성
  const outputFilePath = path.join(assetsPath, outputFileName);
  fs.writeFileSync(outputFilePath, spriteContent, 'utf8');
  console.log(`SVG sprite generated at ${outputFilePath}`);
};

// icons 스프라이트 생성 (assets/icons_sprite.svg) - 모든 fill, stroke을 currentColor로 변경하고, height와 width 제거
generateSprite(iconsPath, 'icons_sprite.svg', processIconsSvgFile, 'ic');

// images 스프라이트 생성 (assets/images_sprite.svg) - fill과 stroke는 그대로 두고, height와 width만 제거
generateSprite(imagesPath, 'images_sprite.svg', processImagesSvgFile, 'img');
