var gulp=require("gulp"),
    connect=require("gulp-connect"),
    less=require("gulp-less"),
    cssmin=require("gulp-clean-css"),
    htmlmin=require("gulp-htmlmin"),
    imagemin=require("gulp-imagemin"),
    jsmin=require("gulp-uglify");
    
//样式文件处理
gulp.task("css",function(){
	gulp.src("./src/public/less/*.less").pipe(less()).pipe(cssmin()).pipe(gulp.dest("./dist/public/css"))
	gulp.src("./src/public/css/*.css").pipe(cssmin()).pipe(gulp.dest("./dist/public.css"));
});

//图像文件处理
gulp.task('img',function(){
	gulp.src('./src/public/img/*.*')
	.pipe(imagemin({
		progressive:true
	})).pipe(gulp.dest('./dist/public/img'));
});

//js文件处理
gulp.task("js",function(){
	var jsDate={
		mangle:{
			except:['require','exports','module','$']},
			compress:true,
	}
	gulp.src("./src/public/js/*.js").pipe(jsmin(jsDate)).pipe(gulp.dest("./dist/public/js"));
});

//字体文件处理
gulp.task("ttf",function(){
	gulp.src("./src/public/fonts/*.ttf").pipe(ttfmin).pipe(gulp.dest("./dist/public/fonts"));
});

//html文件处理
gulp.task("html",function(){
	var htmlDate={
		removeComments:true,//清除html注释
		collapseWhitespace:true,//压缩html
		collapseBooleanAttributes:true,//省略布尔属性的值
		removesEmptyAttributes:true,//删除空格属性值
		removeScriptTypeAttrIvutes:true,//删除<script>中的type="text/javascript"
		removeStyleLinkTypeAttributes:true,//删除<style>和<link>的type="text/css"
		minifyJS:true,//压缩页面js
		minifyCSS:true//压缩页面css
	};
	gulp.src("./src/html/*.html").pipe(htmlmin(htmlDate)).pipe(gulp.dest("./dist/html"));
	gulp.src("./src/index.html").pipe(htmlmin(htmlDate)).pipe(gulp.dest("./dist"));
});

//监听模块
gulp.task("watch",function(){
	gulp.watch("./src/public/css/*.css",["css","reload"]);
	gulp.watch("./src/public/less/*.less",["css","reload"]);
	gulp.watch("./src/public/js/*.js",["js","reload"]);
	gulp.watch("./src/public/img/*.*",["img","reload"]);
	gulp.watch("./src/html/*.html",["html","reload"]);
	gulp.watch("./src/*.html",["html","reload"]);
});

gulp.task('deploy',['less','imagemin']);

//手动控制编译
gulp.task("init",["css","js","html","img"]);

//执行刷新
gulp.task("reload",function(){
	gulp.src("./dist/html/*.html").pipe(connect.reload());
});

//开启web服务器
gulp.task("server",function(){
	connect.server({
		root:"./dist",
		port:8080,
		livereload:true
	});
});

//配置默认启动项
gulp.task("default",["server","watch"]);
