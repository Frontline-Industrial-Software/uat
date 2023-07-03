import axios from "axios";
// !inputDATA
const instance = axios.create({
  baseURL: "https://api.frontline-optimizer.com/",
  timeout: 10000,
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
    const res = await instance.post(`upload`, {
      constraintsFile,
    });
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
  async getOptimized(preset, filename, steps) {
    console.log("启动");
    const res= await instance
      .get("results", {
        params: {
          preset: "Balanced",
          filename: "22ff83d36cc33de3e337eba08.xer",
          steps: 20,
        },
      })
      return res;
  },
  /**
   * @function 获得报告结果
   * @param  filename 请求端口后返回的文件名
   */
  getReport() {
  const res=  instance
      .get("fileDownload/reports/")
    return res
  },
};
