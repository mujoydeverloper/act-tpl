var image_url = '//image.ledu.com/',
    im1_url = '//img1.ledu.com/',
    hddir = '/ledu/zt/2020/{{projectName}}'; //项目目录
requirejs.config({
    baseUrl: image_url,
    paths: {
        /***第三方库****/
        jquery: 'scripts/jquery-1.11.3.min',
        vue: 'scripts/vue/vue.min',
        vant: 'scripts/vant/2.5/vant.min',
        /*******************/

        /***内部共用模块***/
        login: im1_url + 'source/js/base/loginEject',//登录 文档地址：https://quqi.com/6/277793
        LDpaylayer: 'ledu/LDpaylayer/LDpaylayer', //支付宝，微信支付 文档地址：https://quqi.com/6/272366
        cnzz: 'ledu/cnzzsdk/cnzz',//友盟统计上报 文档地址：https://quqi.com/6/278578
        imsdk: 'ledu/imsdk/imsdk', // 客服入口文件
        hdsdk: 'ledu/hdsdk/hdsdk', // 活动通用上报模板 文档地址：https://quqi.com/6/279300        
        sharesdk:'ledu/sharesdk/1.0.0/sharesdk', //分享模块 文档地址：https://quqi.com/6/278375
        AMF: 'scripts/common/AMF', // 活动共用方法
        weburl: 'scripts/common/weburl', // 活动共用链接
        IETest: 'scripts/IETest', //判断浏览器，在加载主页面文件时，必须先调用
        /*******************/

        /***活动单独模块***/
        main: hddir + '/js/main'
        /*******************/
    },
    //兼容IE8、IE9加载样式
    IESelectorLimit: true,
    //加载所有模块前加载CSS模块
    map: {
        '*': {
            'css': image_url + 'scripts/require/require-css/css.min.js',
        }
    },
    shim: {
        main: {
            deps: ['IETest', 'css!' + hddir + '/css/main']
        },
        vant: {
            deps: ['vue', 'css!' + image_url + 'scripts/vant/2.5/index']
        },
        sharesdk:{
            deps:['jquery']
        }
    }
});

requirejs(['main'], function ($) {
});