const element = document.querySelector('#myFile');
const imgEl = document.querySelector('.log img');

// ファイル選択ダイアログが選択されたら
element.addEventListener('input', (event) => {
  const target = event.target;
  // 選択されたファイルを参照
  const files = target.files;
  // 配列になってるので、0番目のファイルを参照
  const file = files[0];

  // FileReaderのインスタンスを作成
  const reader = new FileReader();
  // 読み込み終わったら
  reader.addEventListener('load', () => {
    // 画像を表示
    imgEl.src = reader.result;
  });
  // テキストファイルとして読み込む
  reader.readAsDataURL(file);
});

const html = document.querySelector("html");
const breakPointWidth = 750;
const htmlFontSize = (maxSize) =>{
  let windowWidth = window.innerWidth
  if (windowWidth <= maxSize) {
    html.style.fontSize = windowWidth / 7.5 + "px";
  } else {
    html.style.fontSize = null;
  }
}
window.addEventListener("resize", ()=>{
  htmlFontSize(breakPointWidth)
});
htmlFontSize(breakPointWidth);
