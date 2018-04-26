import axios from './axios';
import urls from './interface';

export default {

    /**
     * 模板
     * ---
     * POST Request
     * postTest(data) {
     *     return axios().post(urls.URL_TEST, data)
     * }
     * ---
     * GET Request
     * getTest(data) {
     *     return axios().get(urls.URL_TEST, data);
     * }
     * ---
     * Upload
     * uploadTest(data) {
     *     return axios().post(urls.URL_TEST, data, {
     *         headers: {
     *             "Content-Type": "multipart/form-data"
     *         }
     *     })
     * }
     */

    // 登录
    postLogin(data) {
        return axios().post(urls.LOGIN, data);
    }
};
