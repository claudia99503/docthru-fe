// 이미지 주소 객체로 정리해주는 코드
// 로직 앞에 '_' 기준으로 split 한뒤 맨 처음 단어 버리고 카멜케이스로 만듦.
// e.g btn_active_heart.svg => activeHeart
//image 소스 다 맞는 폴더에 정리되고 npm run image 실행시킨후 콘솔로 찍히는 객체 /utils/image.js 에 assert 객체안에 복붙 하면 됩니다.
//그 후 컴포넌트에서 assert 객체 불러와서 src={asset.buttons.activeHeart}로 이미지 접근 가능

import fs from 'fs';
import path from 'path';
const __dirname = path.join();

const assets = {};

const assetsPath = path.join(__dirname, 'public/assets');
const categories = fs.readdirSync(assetsPath).filter((item) => {
  const category = path.join(assetsPath, item);
  return fs.statSync(category).isDirectory();
});

const toCamelCase = (fileName) => {
  if (fileName === '.DS_Store') {
    return null;
  }
  const name = fileName
    .split('_')
    .splice(1)
    .map((word, i) => {
      if (i === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');

  return name;
};

categories.forEach((category) => {
  const imgPath = path.join(assetsPath, category);
  const imgNames = fs.readdirSync(imgPath);

  const result = imgNames.reduce((acc, img) => {
    const nameWithOutExt = path.basename(img, path.extname(img));
    const fieldName = toCamelCase(nameWithOutExt);
    if (fieldName) {
      acc[fieldName] = `/assets/${category}/${img}`;
    }

    return acc;
  }, {});
  assets[category] = result;
});
// console로 나온 이미지 객체 복붙해서 씀
console.log(assets);
