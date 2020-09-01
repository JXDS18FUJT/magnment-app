// 定义一些常量
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

var transform = {
	/**
     * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02) 的转换
     * 即 百度 转 谷歌、高德
     * @param bd_lng
     * @param bd_lat
     * @returns {*[]}
     */
	bd09togcj02: function(bd_lng, bd_lat) {
      var bd_lng = +bd_lng;
      var bd_lat = +bd_lat;
      var x = bd_lng - 0.0065;
      var y = bd_lat - 0.006;
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
      var gg_lng = z * Math.cos(theta);
      var gg_lat = z * Math.sin(theta);
      return [gg_lng, gg_lat];
    },
    /**
     * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
     * 即 谷歌、高德 转 百度
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    gcj02tobd09: function(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
        var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
        var bd_lng = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        return [bd_lng, bd_lat];
    },
    /**
     * WGS-84 转 GCJ-02
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    wgs84togcj02: function(lng, lat) {
      var lat = +lat;
      var lng = +lng;
      if (transform.out_of_china(lng, lat)) {
    	console.log("经纬度有误");
        return [lng, lat];
      } else {
        var dlat = transform.transformlat(lng - 105.0, lat - 35.0);
        var dlng = transform.transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return [mglng, mglat];
    }
  },
  /**
   * GCJ-02 转换为 WGS-84
   * @param lng
   * @param lat
   * @returns {*[]}
   */
  gcj02towgs84: function(lng, lat) {
    var lat = +lat;
    var lng = +lng;
    if (transform.out_of_china(lng, lat)) {
      console.log("经纬度有误");
      return [lng, lat];
    } else {
      var dlat = transform.transformlat(lng - 105.0, lat - 35.0);
      var dlng = transform.transformlng(lng - 105.0, lat - 35.0);
      var radlat = lat / 180.0 * PI;
      var magic = Math.sin(radlat);
      magic = 1 - ee * magic * magic;
      var sqrtmagic = Math.sqrt(magic);
      dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
      dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
      var mglat = lat + dlat;
      var mglng = lng + dlng;
      return [lng * 2 - mglng, lat * 2 - mglat];
    }
  },
  transformlat: function(lng, lat) {
    var lat = +lat;
    var lng = +lng;
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret;
  },
  transformlng: function(lng, lat) {
    var lat = +lat;
    var lng = +lng;
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret;
  },
  out_of_china: function(lng, lat) {
    var lat = +lat;
    var lng = +lng;
    // 纬度 3.86~53.55, 经度 73.66~135.05 
    return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
  },
  /**
   * 计算纬度B对应的弧长
   * @param B 纬度
   * @return 弧长
   */
  arcLength: function(B){
	  var a0 = 6367449.145713924;
	  var a2 = 32077.01738796219;
	  var a4 = 67.33039926427864;
	  var a6 = 0.13188597937874771;
	  var a8 = 2.446294848088663E-4;
      return a0 * B - a2 * Math.sin(2 * B) / 2 + a4 * Math.sin(4 * B) / 4 -
              a6 * Math.sin(6 * B) / 6 + a8 * Math.sin(8 * B) / 8;
  },
  gaussianProject: function(lng, lat){
	var res = new Array();
	var a = 6378137.0;
	var e2 = 0.006694380022900787;
	var l = (lng - 120) * 0.01745329;
	var B = lat * 0.01745329;
	var N = a / Math.sqrt(1 - e2 * Math.pow(Math.sin(B), 2));
	var t = Math.tan(B);
	var p = 0.081819 * Math.cos(B);
	var X = transform.arcLength(B);
	// 计算高斯投影平面坐标
  var cos = Math.cos(B);
    res[1] = X + N * t * Math.pow(cos, 2) * Math.pow(l, 2) / 2 +
            N * t * Math.pow(cos, 4) * (5 - Math.pow(t, 2) +
                    9 * Math.pow(p, 2) + 4 * Math.pow(p, 4)) * Math.pow(l, 4) / 24 +
            N * t * Math.pow(cos, 6) * (61 - 58 * Math.pow(t, 2) + Math.pow(t, 4) +
                    270 * Math.pow(p, 2) - 330 * Math.pow(p, 2) * Math.pow(t, 2)) * Math.pow(l, 6) / 720;
    res[0]= N * cos * l + N * Math.pow(cos, 3) * (1 - Math.pow(t, 2) + Math.pow(p, 2)) *
            Math.pow(l, 3) / 6 + N * Math.pow(cos, 5) * (5 - 18 * Math.pow(t, 2) +
            Math.pow(t, 4) + 14 * Math.pow(p, 2) - 58 * Math.pow(p, 2)) * Math.pow(l, 5) / 120 +
            500000;
    return res;
  }
}
export default transform