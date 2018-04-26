import axios from 'axios';
import errorList from './error';
import Notice from 'iview/src/components/notice';

export default function () {
    let instance = axios.create({
        timeout: 100000
    });

    instance.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        // 请求出错处理
        Notice.error({desc: '请求出错'});
        return Promise.reject(error);
    });

    instance.interceptors.response.use(function (response) {
        /**
        * code为非200时抛错
        */
        let res = response.data;
        if (res.code !== 0) {
            Notice.error({
                title: res.code,
                desc: errorList[res.code] || res.msg
            });
            // 某些错误需要跳回登录页面
            if ([12001, 12002, 12003, 12006, 12008, 12009].find(e => e === res.code)) {
                removeToken();
                removeMenu(); // 清除菜单缓存
                setTimeout(function () {
                    location.reload();
                }, 3000);
            }
        }
        return res;
    }, function (error) {
        // 响应出错处理
        Notice.error({
            title: '消息提醒',
            desc: '网络错误，请稍后再'
        });
        return Promise.reject(error);
    });

    return instance;
}
