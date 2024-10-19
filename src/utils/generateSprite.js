import fs from 'fs';
import path from 'path';
const __dirname = path.join();

// 경로 설정
const assetsPath = path.join(__dirname, 'public/assets');
const iconsPath = path.join(assetsPath, 'icons');
const imagesPath = path.join(assetsPath, 'images');

// height와 width를 제거하는 함수
const removeDimensions = (svgContent) => {
  return svgContent
    .replace(/\swidth="[^"]*"/gi, '')
    .replace(/\sheight="[^"]*"/gi, '');
};

// icons 폴더의 SVG 파일 처리 (fill, stroke을 currentColor로 변경하고, height, width 제거)
const processIconsSvgFile = (filePath) => {
  let svgContent = fs.readFileSync(filePath, 'utf8');

  // fill과 stroke 속성을 currentColor로 변경 (symbol 태그는 제외)
  svgContent = svgContent.replace(
    /(<(?!symbol)[^>]+)\sfill\s*=\s*['"]#([0-9a-fA-F]{3,6})['"]/gi,
    '$1 fill="currentColor"'
  );
  svgContent = svgContent.replace(
    /(<(?!symbol)[^>]+)\sstroke\s*=\s*['"]#([0-9a-fA-F]{3,6})['"]/gi,
    '$1 stroke="currentColor"'
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
const generateSprite = (folderPath, outputFileName, processSvgFile) => {
  const svgFiles = fs
    .readdirSync(folderPath)
    .filter((file) => path.extname(file) === '.svg');
  let spriteContent = '<svg xmlns="http://www.w3.org/2000/svg">\n';

  svgFiles.forEach((file) => {
    const filePath = path.join(folderPath, file);
    let svgContent = processSvgFile(filePath);

    // id 값 추출 (파일 이름을 기반으로 id를 만듦)
    const fileNameWithoutExt = path.basename(file, path.extname(file));
    const symbolId = fileNameWithoutExt;

    // <svg> 태그를 <symbol>로 변경하고 id 속성 추가
    svgContent = svgContent
      .replace('<svg', `<symbol id="${symbolId}"`)
      .replace('</svg>', '</symbol>');

    spriteContent += svgContent + '\n';
  });

  spriteContent += '</svg>';

  // assets 폴더 아래에 스프라이트 파일을 생성
  const outputFilePath = path.join(assetsPath, outputFileName);
  fs.writeFileSync(outputFilePath, spriteContent, 'utf8');
  console.log(`SVG sprite generated at ${outputFilePath}`);
};

// icons 스프라이트 생성 (assets/icon_sprite.svg) - fill과 stroke를 currentColor로 변경하고, height와 width 제거
generateSprite(iconsPath, 'icons_sprite.svg', processIconsSvgFile);

// images 스프라이트 생성 (assets/image_sprite.svg) - fill과 stroke는 그대로 두고, height와 width만 제거
generateSprite(imagesPath, 'images_sprite.svg', processImagesSvgFile);
