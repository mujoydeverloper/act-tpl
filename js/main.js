define([
    'jquery',
    'vue',
    'vant',
    'AMF',
    'weburl',
    'hdsdk',
    'imsdk',
    'login',
    'cnzz'
], function ($, Vue, vant, AMF, weburl) {
    'use strict';
    /**********
     * VANT组件文档：https://youzan.github.io/vant/#/zh-CN/home
     * 如果需要使用VANT组件，首先需要加载组件
     * 示例Loading组件：Vue.use(vant.Loading);
     */
    //使用vant按钮组件
    Vue.use(vant.Button);
    // 接口域名地址
    var baseUrl = location.host === 'pre-huodong.ledu.com' ? '//pre-api-huodong.ledu.com' : '//apihuodong.ledu.com'
    // 具体活动地址
    var sAct_url = baseUrl + '/activity/v1.1'
    //VUE初始化
    var vm = new Vue({
        el: "#app",
        data: {
            /********** 活动公用 **********/
            uid: 0,//用户ID
            user_name: '用户名',//用户名
            is_login: 0,//登录状态
            face_logo: '//img1.ledu.com/source/img/noavatar_middle.gif',//用户头像
            category: '活动名称',//活动名称，用于友盟上报
            /********** 活动弹窗 **********/
            layertitle: '',
            layerhtml: '',
            layer1: false,
            layer2: false,
            layer3: false,
            layer4: false,
            layer5: false,
            layer6: false,
            layer7: false,
            layer8: false,
            layer9: false,
            layer10: false,
            layer11: false,
            layer12: false,
            layer13: false,
            bodybg: false,
            /********** 活动单独 **********/
        },
        /**
         * vue共用参数
         */
        methods: {
            /**
             * 活动初始化
             */
            fnInit: function () {
                var _this = this;
                //初始化接口返回数据
                var data = {
                    "error": 0,
                    "msg": "错误提示",
                    "res": {
                        "act_flag": 0,//0活动进行中，1活动未开始 2活动已结束
                        "uid": 123093449,
                        "login": 1,// 0 未登录，1已登录(numberl)
                        "user_name": "17774009251",//用户名（string)
                        "face_logo": "//img1.ledu.com/source/img/noavatar_middle.gif",//头像                           
                    }
                }
                var error = data.error;
                if (!error) {
                    var res = data.res;
                    /*** 活动公用 **/
                    _this.uid = res.uid;
                    _this.user_name = res.user_name;
                    _this.is_login = res.login;
                    _this.face_logo = res.face_logo;
                    _this.act_flag = res.act_flag;
                    /*********************/
                } else {
                    vant.Toast({
                        message: data.msg,
                        duration: 1500
                    });
                }
            },
            /*************************************
             * 活动所用到的公用模块和方法
             * 下面定义的6个方法，基本所有活动都能通用
             * **********************************/
            /**
             * 错误信息提示 1活动未开始 2活动已结束 3:未登录 4：操作太频繁
             * @param {*} a 错误码
             */
            fnError: function (a) {
                var _this = this;
                if (a == 1 || a == 2 || a == 3 || a == 4) {
                    var msg = {
                        1: '活动未开始',
                        2: '活动已结束',
                        4: '操作太频繁'
                    }
                    //未登录
                    if (a == 3) {
                        _this.fnLogin();
                    } else {
                        _this.fnShowTips({
                            content: msg[a]
                        })
                    }
                    return false
                } else {
                    return true
                }
            },
            /**
             * 登录
             */
            fnLogin: function () {
                var _this = this;
                LDLogin({
                    is_reg: 0,
                    success: function (data) {
                        //登录成功、刷新页面
                        AMF.fnMyRefresh()
                    }
                });
            },
            /**
             * 退出登录
             */
            fnLogOut: function () {
                var _this = this;
                hdsdk.fnLogout({
                    success: function () {
                        //退出成功、刷新页面
                        AMF.fnMyRefresh()
                    }
                });
            },
            /**
             * 友盟上报
             * @param {*} action 事件名
             * @param {*} success 上报成功回调
             */
            fnCnzzSdk: function (action, success) {
                var _this = this;
                cnzzsdk._trackEvent({
                    category: _this.category,
                    action: action,
                    label: _this.uid,
                    callback: function () {
                        if (typeof success == 'function') {
                            success();
                        }
                    }
                })
            },
            /**
            * 统一弹窗
            * @param {*} parame
            */
            fnShowTips: function (parame) {
                var _this = this;
                parame.title ? _this.layertitle = parame.title : _this.layertitle = '提示信息';
                parame.content ? _this.layerhtml = parame.content : _this.layerhtml = '提示出错了！';
                _this.fnCloseLayer();
                _this.layer1 = _this.bodybg = true;
            },
            /**
            * 关闭弹窗
            */
            fnCloseLayer: function () {
                this.layer1 = this.layer2 = this.layer3 = this.layer4 = this.layer5 = this.layer6 = this.layer7 = this.layer8 = this.layer9 = this.layer10 = this.layer11 = this.layer12 = this.layer13 = this.bodybg = false;
            },
        },
        /**
         * vue加载完成执行
         */
        mounted: function () {
            var _this = this;
            _this.$nextTick(function () {
                _this.fnInit();
            })
        }
    });
});
