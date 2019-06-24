import React, { Component } from 'react';
import { Icon, Menu } from "antd";
//withRouter给你想要的非路由组件传递路由组件的三大属性:history location match
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import menuList from '../../config/menu-config';

import './index.less';
import logo from '../../assets/images/logo.png';

const { SubMenu, Item } = Menu;

class LeftNav extends Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired
  };

  createMenu = (menu) => {
    return <Item key={menu.key}>
      <Link to={menu.key}>
        <Icon type={menu.icon} />
        <span>{menu.title}</span>
      </Link>
    </Item>
  };
  //拿不到函数componentWillMount的返回值，因为不是我们调用的
  componentWillMount() {
    const { pathname } = this.props.location;
    //根据menuList生成菜单
    //根据原数组生成一个长度一样的新数组，新数组的每一项值我们可以自定义
    //menus跟状态没关系，所以可以直接挂载到this上
    this.menus = menuList.map((menu) => {
      //缓存一下
      const children = menu.children;
      //判断是一级菜单还是二级菜单
      if (children) {
        //二级菜单
        //这是个虚拟DOM对象
        return <SubMenu
          key={menu.key}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{menu.title}</span>
            </span>
          }
        >
          {
            children.map((item) => {
              if (item.key === pathname) {
                //只要相等说明当前地址是二级菜单,需要展开一级菜单
                //初始化展开的菜单
                this.openKey = menu.key;
              }
              return this.createMenu(item)
            })
          }
        </SubMenu>
      } else {
        //一级菜单
        return this.createMenu(menu)
      }
    });
    this.selectedKey = pathname;
  }

  render() {
    const { collapsed } = this.props;
    return <div>
      <Link className="left-nav-logo" to='/home'>
        <img src={logo} alt="logo"/>
        <h1 style={{display: collapsed ? 'none' : 'block'}}>硅谷后台</h1>
      </Link>;
      {/*
       defaultSelectedKeys  默认值 读取一次
      */}
      <Menu theme="dark" defaultSelectedKeys={[this.selectedKey]} defaultOpenKeys={[this.openKey]} mode="inline">
        {
          this.menus
        }
        {
          /*
            一级菜单：{
                      key: '/home'
                      icon: 'home'
                      tittle: '/首页'
                     }
            二级菜单：{
                      key: '/product'
                      icon: 'appstore'
                      tittle: '/首页'
                      children: [
                        {
                         key: '/product'
                         icon: 'appstore'
                         tittle: '/首页'
                        },
                        {},
                       ]
                      }
            模板在课件中
          */
        }
        {
          /*
            <Item key="home">
              <Link to="/home">
                <Icon type="home" />
                <span>首页</span>
              </Link>
            </Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="appstore" />
                  <span>商品</span>
                </span>
              }
            >
              <Item key="/category">
                <Link to="/category">
                  <Icon type="bars" />
                  <span>品类管理</span>
                </Link>
              </Item>
              <Item key="4">
                <Icon type="tool" />
                <span>商品管理</span>
              </Item>
            </SubMenu>
            <Item key="5">
              <Icon type="user" />
              <span>用户管理</span>
            </Item>
            <Item key="6">
              <Icon type="user" />
              <span>权限管理</span>
            </Item>
            <SubMenu
              key="sub2"
              title={
                <span>
                    <Icon type="team" />
                    <span>图形图表</span>
                  </span>
              }
            >
              <Item key="7">
                <Icon type="team" />
                <span>柱形图</span>
              </Item>
              <Item key="8">
                <Icon type="team" />
                <span>折线图</span>
              </Item>
              <Item key="9">
                <Icon type="team" />
                <span>饼图</span>
              </Item>
            </SubMenu>
          */
        }

      </Menu>
    </div>;
  }
}

export default withRouter(LeftNav);