import jsonp from 'jsonp';
import { message } from "antd";
import ajax from './ajax';

// export const reqLogin = (data) => ajax('/login', data, 'POST');
// 请求参数3-4个以上使用
// export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST');
// 请求参数1-2个使用
/**
 * 请求登录函数
 * @param username 用户名
 * @param password 密码
 * @returns {返回值一定成功状态promise（请求成功里面有数据，请求失败里面没有）}
 */
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST');

/**
 * 请求验证用户信息
 * @param id
 * @returns {返回值一定成功状态promise（请求成功里面有数据，请求失败里面没有）}
 */

export const reqValidateUserInfo = (id) => ajax('/validate/user', {id} , 'POST');
//获取异步代码的返回值，必须用promise
//避免一开始就加载，调用才调用，外层用一个函数包裹
export const reqWeather = function () {
  return new Promise((resolve, reject) => {
    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`, {}, function (err, data) {
      if (!err) {
        const { dayPictureUrl, weather} = data.results[0].weather_data[0];
        resolve({
          weatherImg: dayPictureUrl,
          weather
        }) ;
      } else {
        message.error('请求失败，请刷新重试');
        resolve();
      }
    });
  });

};

