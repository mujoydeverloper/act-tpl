var hddir = ''; //项目目录
requirejs.config({
    baseUrl: "//image.ledu.com/",
    paths: {
        /***第三方库****/
        jquery: 'scripts/jquery-1.11.3.min',
        vue: 'scripts/vue/vue.min',
        vant: 'scripts/vant/2.5/vant.min',
        /*******************/

        /***内部共用模块***/
        login: '//img1.ledu.com/source/js/base/loginEject',//登录 文档地址：https://quqi.com/6/277793
        LDpaylayer: 'ledu/LDpaylayer/LDpaylayer', //支付宝，微信支付 文档地址：https://quqi.com/6/272366
        cnzz: 'ledu/cnzzsdk/cnzz',//友盟统计上报 文档地址：https://quqi.com/6/278578
        imsdk: 'ledu/imsdk/imsdk', // 客服入口文件
        hdsdk: 'ledu/hdsdk/hdsdk', // 活动通用上报模板 文档地址：https://quqi.com/6/279300        
        AMF: 'scripts/common/AMF', // 活动共用方法
        weburl: 'scripts/common/weburl', // 活动共用链接
        /*******************/

        /***活动单独模块***/
        main: hddir + '/js/main'
        /*******************/
    },
    shim: {
        common: {
            deps: ['jquery']
        },
        vant: {
            deps: ['vue']
        }
    }
});

requirejs(['main'], function ($) {
});