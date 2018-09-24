const gulp  = require('gulp');


gulp.task('default', () => {
    console.log('');
    console.log('===== Documentation =====');
    console.log('');
    console.log('Usage: gulp [command]');
    console.log('The commands are the following');
    console.log('-------------------------------------------------------');
    console.log('        clean: Removes all the compiled files on ./dist');
    console.log('        cssmin: Copy the complied css files');
    console.log('        templates: Copy the Html files');
    console.log('        imageMin: Copy the newer images to the build folder');
    console.log('        deploy: Creates the dist folder if not already create and copy all files in it');
    console.log('');
});
