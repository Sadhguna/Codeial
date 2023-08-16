//import { task, src, dest as _dest, series } from 'gulp';
import pkg from 'gulp';
const { task, src, dest: _dest, series } = pkg;
import cssnano from 'gulp-cssnano';
import pkg1 from 'gulp-rev';
const rev = pkg1;
const {manifest} =pkg1;
import uglify from 'gulp-uglify';
import { deleteSync } from 'del';
import imagemin from 'gulp-imagemin';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);


//const del = require('del');
// import pkg2 from 'del';
// const {sync} = pkg2;
//import { sync } from 'del';


// import pkg from 'gulp';
// const { task, src, dest } = pkg;
// import pkg1 from 'gulp-rev';
// const rev = pkg1;
// import dartSass from 'sass';
// import gulpSass from 'gulp-sass';

// const sass = gulpSass(dartSass);
// import cssnano from 'gulp-cssnano';



task('css', function(done){
    console.log('minifying css....');
    src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(_dest('./assets.css'));

    return src('./assets/**/*.css')
    .pipe(rev())
    .pipe(_dest('./public/assets'))
    .pipe(manifest({
        cwd : 'public',
        merge : true
    }))
    .pipe(_dest('./public/assets'));
    done();
})

task('js', function(done){
    console.log('minifying js...');
     src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(_dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(_dest('./public/assets'));
    done()
});


task('images', function(done){
    console.log('compressing images...');
    src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(_dest('./public/assets'))
    .pipe(manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(_dest('./public/assets'));
    done();
});


// empty the public/assets directory
task('clean:assets', function(done){
    deleteSync('./public/assets');
    done();
});

task('build', series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});