module.exports = {
  reactStrictMode: true,
  env: {
    apiServer: "https://gvsapi.xyz/",
    // production api
    //   apiEndPoint: "https://nsrapi.xyz/nsr_wsb.php"
      //apiEndPoint: "https:bien.nceas.ucsb.edu/nsr/nsr_wsb.php",
    // development api (Public)
    apiEndPoint: "http://vegbiendev.nceas.ucsb.edu:7775/gvs_api.php",
    // development api (Private)
    // apiEndPoint: "http://vegbiendev.nceas.ucsb.edu:8775/gvs_api.php",
    // apiEndPoint: "http://vegbiendev.nceas.ucsb.edu:9875/gnrs_api.php",
    // apiEndPoint: "http://vegbiendev.nceas.ucsb.edu:9865/nsr_wsb.php",
  },
};
