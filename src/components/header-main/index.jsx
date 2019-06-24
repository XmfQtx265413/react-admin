import React, { Component } from 'react';
import { Modal } from 'antd';
import { withRouter} from 'react-router-dom';
import dayjs from 'dayjs';

import MyButton from '../my-button';
import { getItem, removeItem } from "../../utils/storage-tools";
import { reqWeather } from '../../api';

import logo from '../../assets/images/logo.png';
import './index.less';

class HeaderMain extends Component {
  state = {
    sysTime: Date.now(),
    weather: '晴',
    weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png'
  };

  componentWillMount() {
    //只需要读取一次
    this.username = getItem().username
  }

  async componentDidMount() {
    setInterval(() => {
      this.setState({
        sysTime: Date.now()
      })
    }, 1000);
    //发送请求，请求天气
    const result = await reqWeather()
    if (result) {
      this.setState(result);
    }
  }

  logout = () => {
    Modal.confirm({
      title: '你确认要退出登陆吗',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        //清空本地数据
        removeItem();
        //推出登录
        //先清空再切换
        this.props.history.replace('/login')
      },
    })
  };

  render() {
    const { sysTime, weather, weatherImg } = this.state;
    return <div>
      <div className="header-main-top">
        <span>欢迎, {this.username}</span>
        <MyButton onClick={this.logout}>退出</MyButton>
      </div>
      <div className="header-main-bottom">
        <span className="header-main-left">用户管理</span>
        <div className="header-main-right">
          <span>{dayjs(sysTime).format('YYYY-MM-DD HH:mm:ss')}</span>
          <img src={weatherImg} alt=""/>
          <span>{weather}</span>
        </div>
      </div>
    </div>;
  }
}

export default withRouter(HeaderMain)