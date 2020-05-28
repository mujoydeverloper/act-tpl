var hddir = 'ledu/zt/2020/'; //项目目录
requirejs.config({
    baseUrl: "//image.ledu.com/",
    paths: {
        /***第三方库****/
        jquery: 'scripts/jquery-1.11.3.min',
        vue: 'scripts/vue/vue.min',
        /*******************/

        /***内部共用模块***/
        login: '//img1.ledu.com/source/js/base/loginEject',//登录
        cnzz: 'ledu/cnzzsdk/cnzz',//友盟统计上报
        imsdk: 'ledu/imsdk/imsdk', // 客服入口文件
        AMF: 'scripts/common/AMF', // AMF
        weburl: 'scripts/common/weburl', // weburl
        hdsdk: 'ledu/hdsdk/hdsdk', // hdsdk
        /*******************/
        
        /***活动单独模块***/
        main: hddir + '/js/main'
        /*******************/
    },
    shim: {
        common: {
            deps:['jquery'] 
        },
        hdsdk: {
            deps:['jquery'] 
        },
        main: {
            deps:['cnzz']
        }
    }
});

requirejs(["jquery", 'login', 'main', 'cnzz', 'imsdk'], function ($) {
});