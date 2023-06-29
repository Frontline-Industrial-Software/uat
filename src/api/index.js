import axios from "axios";
// !inputDATA
const instance = axios.create({
  baseURL: "api",
  timeout: 10000,
});
export default {
  // !inputDATA
  /**
   * 
   * @param {*} file 文件内容
   */
  sendFile(file) {
    instance
      .post(`upload`, {
       param:{
        file,
      }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
  sendConstraintsFile(constraintsFile) {
    instance
      .post(`upload`, {
        constraintsFile,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  /**
   * @function 请求计算端口
   * @param null
   * @return object
   */
  getPort(){
    instance
    .get(`optimizePort`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  /**
   * @function 获取总结
   * @param {string} preset 优化选项 4选1
   * @param {string} filename 请求端口后返回的文件名
   * @param {string} steps 优化步数 
   */
  getOptimized(preset,filename,steps){
    instance.get('results',{params: {
      preset,filename,steps
    }})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  },
  /**
   * @function 获得报告结果
   * @param  filename 请求端口后返回的文件名
   */
  getReport(){
    instance.get('fileDownload/reports/')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};
