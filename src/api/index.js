import axios from "axios";
import pako from "pako";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// !inputDATA
const instance = axios.create({
  baseURL: "https://api.frontline-optimizer.com/",
});
// 请求拦截器
instance.interceptors.request.use(config => {
  // 在请求开始时显示进度条
  NProgress.start();
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(response => {
  // 在请求结束后隐藏进度条
  NProgress.done();
  return response;
}, error => {
  // 在请求结束后隐藏进度条
  NProgress.done();
  return Promise.reject(error);
});
export default {
  // !inputDATA
  /**
   * @function 上传初始工程文件
   * @param {*} file 文件内容
   */
  async sendFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await instance.post("upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  /**
   * @function 获取约束模板
   * @param {*} constraintsFilename 约束条件
   * @return void
   */
  constraintsFileDownload(constraintsFilename) {
    instance
      .get(`fileDownload/constraints/${constraintsFilename}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  /**
   * @function 发送约束模板
   * @param {*} file
   */
  async sendConstraintsFile(constraintsFile) {
    const res = await instance.post(
      `upload`,
      {
        constraintsFile,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  },
  /**
   * @function 请求计算端口
   * @param null
   * @return object
   */
  async getPort() {
    const res = await instance.get(`optimizePort`);
    return res;
  },
  /**
   * @function 获取总结
   * @param {string} preset 优化选项 4选1
   * @param {string} filename 请求端口后返回的文件名
   * @param {string} steps 优化步数
   */

  async getOptimized(data,size) {
    const fileSizeThreshold = 1 * 1024 * 1024;

    const res = await instance.get("results", {
      params: {
        ...data,
      },
      responseType: size>fileSizeThreshold?'arraybuffer':'json' // 设置响应数据类型为二进制数组
    });
    if (res.headers["content-type"] == "application/gzip") {
      const byteArray = new Uint8Array(res.data); // 切换数据编码为Uint8Array
      const pakoArr = pako.inflate(byteArray, { to: "string" }); // 调用 pako 的方法解压数据
      res.data=JSON.parse(pakoArr)
    }
    return res;
  },
  /**
   * @function 获得报告结果
   * @param  filename 请求端口后返回的文件名
   */
  getReport(data) {
    const res = instance.get(`fileDownload/reports/${data}`);
    return res;
  },
};
