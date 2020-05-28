# gulp_scss

私はgulpをまだ業務で使用したことがないため今後のプロジェクトのために備忘録として作成したいと思います。

# インストール手順

 Node.jsをインストール

package.jsonを作成

`npm init -y`

Gulpをインストール

`npm i -D gulp`

CSS関係

`npm i -D gulp-sass gulp-plumber gulp-notify gulp-autoprefixer browser-sync`

jpeg・png・gif・svg圧縮関係

`npm i -D gulp-imagemin imagemin-jpeg-recompress imagemin-pngquant imagemin-gifsicle gulp-svgmin gulp-changed`

JS関係

`npm i -D gulp-concat jshint gulp-jshint gulp-uglify gulp-rename`

自動更新

`npm i -D browser-sync`

上記をインストールする際に一括でインストールする

`npm i -D gulp-sass gulp-plumber gulp-notify gulp-autoprefixer browser-sync gulp-imagemin imagemin-jpeg-recompress imagemin-pngquant imagemin-gifsicle gulp-svgmin gulp-changed gulp-concat jshint gulp-jshint gulp-uglify gulp-rename browser-sync`

下記をpackage.jsonに追記する。（あくまでも一例です）

```json
  "browserslist": [
    "last 2 versions",
    "ie >= 11",
    "Android >= 4",
    "ios_saf >= 8"
  ]
```(