const { src, dest, watch, series, parallel } = require("gulp");

const sass = require("gulp-sass");
//Auto reload
const browserSync = require("browser-sync");
// Stream中に起こるのエラーが原因でタスクが強制停止することを防止する。
const plumber = require("gulp-plumber");
// デスクトップ通知が行えるモジュール
const notify = require("gulp-notify");
//ベンタープレフィックスの自動付与
const autoprefixer = require("gulp-autoprefixer");
//image
const changed = require("gulp-changed");
const imagemin = require("gulp-imagemin");
const imageminJpg = require("imagemin-jpeg-recompress");
const imageminPng = require("imagemin-pngquant");
const imageminGif = require("imagemin-gifsicle");
const svgmin = require("gulp-svgmin");
//js
const concat = require("gulp-concat");
const jshint = require("gulp-jshint");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

//コンパイル前ディレクトリ
const origin_files_pass = "./src";
//コンパイル後ディレクトリ
const compiled_files_pass = "./static";

// ローカルサーバ起動
const buildServer = done => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  done();
};

// ブラウザ自動リロード
const browserReload = done => {
  browserSync.reload();
  done();
};

// Sassファイルのコンパイル
const sassCompile = done => {
  src(origin_files_pass + "/sass/*.scss")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(autoprefixer())
    // css書き出し場所
    .pipe(dest(compiled_files_pass + "/css/", { sourcemaps: "/maps" }))
    // ブラウザ差分反映
    .pipe(browserSync.stream());
  done();
};

//画像圧縮
const image_compression = () => {
  // jpeg,png,gif
  return (
    src(origin_files_pass + "/img/**/*.+(jpg|jpeg|png|gif)")
      // srcとdestを比較して差分のみ反映させる
      .pipe(changed(compiled_files_pass + "/img/"))
      //圧縮
      .pipe(
        imagemin([
          imageminPng(),
          imageminJpg(),
          imageminGif({
            interlaced: false,
            optimizationLevel: 3,
            colors: 180
          })
        ])
      )
      // 画像書き出し
      .pipe(dest(compiled_files_pass + "/img/"))
  );
};

//SVG圧縮
const svg_compression = () => {
  // svg
  return (
    src(origin_files_pass + "/img/**/*.+(svg)")
      // srcとdestを比較して差分のみ反映させる
      .pipe(changed(compiled_files_pass + "/img/"))
      .pipe(svgmin())
      // svg書き出し
      .pipe(dest(compiled_files_pass + "/img/"))
  );
};

//JS結合
const js_concat = () => {
  return src([origin_files_pass + "/js/*.+(js)"])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(concat("bundle.js"))
    .pipe(dest(compiled_files_pass + "/js/"));
};
//JS圧縮
const js_compress = () => {
  return src(compiled_files_pass + "/js/bundle.js")
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename("bundle.min.js"))
    .pipe(dest(compiled_files_pass + "/js"));
};

// ファイル監視
const watchFiles = () => {
  watch(origin_files_pass + "/js/*.js", browserReload);
  watch("./**/*.html", browserReload);
  // scssファイルを監視
  watch(origin_files_pass + "/sass/**/*.scss", series(sassCompile, browserReload));
  // 画像を監視
  watch(origin_files_pass + "/img/**/*.+(jpg|jpeg|png|gif)", series(image_compression));
  watch(origin_files_pass + "/img/**/*.+(svg)", series(svg_compression));
  watch(origin_files_pass + "/js/*.+(js)", series(js_concat, js_compress, browserReload));
};

// 処理登録
exports.initialize = series(
  sassCompile,
  image_compression,
  svg_compression,
  js_concat,
  js_compress
);
// タスク実行
exports.default = parallel(buildServer, watchFiles);
