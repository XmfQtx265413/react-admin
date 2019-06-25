import React, { Component } from 'react';
import { Card, Button, Icon, Table, Modal, message } from 'antd';

import { reqCategories,reqAddCategory } from "../../api";
import MyButton from '../../components/my-button';
import AddCategoryForm from './add-category-form';
import './index.less';



export default class Category extends Component {
  state = {
    //一级分类列表
    categories: [],
    //显示添加分类，一开始不显示，所以时false
    isShowAddCategory: false,
  };

  async componentDidMount() {
    const result = await reqCategories('0');
    if (result) {
      this.setState({
        categories: result
      });
    }
  }

  /**
   * 显示添加品类
   */
  showAddCategory = () => {
    //点击的时候，出现对话框，isShowAddCategory改为true
    this.setState({
      isShowAddCategory: true
    })
  };
  /**
   * 隐藏添加品类
   */
  hideAddCategory = () => {
    //点击取消按钮隐藏对话框
    this.setState({
      isShowAddCategory: false
    })
};

  /**
   *
   * 添加品类
   */
  addCategory = () => {
  //表单验证
  //收集表单数据
  //发送请求
    this.addCategoryForm.props.form.validateFields(async (err, values) => {
      if (!err) {
        //验证通过
        console.log(values);
        const { parentId, categoryName } = values;
        const result = await reqAddCategory(parentId, categoryName);
        if (result) {
          //添加分类成功
          message.success('添加分类成功', 2);
          this.setState({
            isShowAddCategory: false
          })
        }
      }
    })
  };

  render() {
    const { categories,isShowAddCategory } = this.state;
    //决定表头内容
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        className: 'category-operation',
        //改变当列的显示
        render: text => {
          return <div>
            <MyButton>修改名称</MyButton>,
            <MyButton>查看其子品类</MyButton>
          </div>
        }
      },
    ];
    //决定表格数据
    /*const data = [
      {
        key: '1',
        categoryName: '手机',
        // operation: 'xxxxx',
      },
      {
        key: '2',
        categoryName: '电脑',
        // operation: 'yyyy',
      },
      {
        key: '3',
        categoryName: '耳机',
        // operation: 'zzzzzz',
      },
      {
        key: '4',
        categoryName: '鼠标',
        // operation: 'zzzzzz',
      },
    ];*/
    return <Card title="一级分类列表" extra={<Button type="primary" onClick={this.showAddCategory}><Icon type="plus" />添加品类</Button>}>
      <Table
        columns={columns}
        dataSource={categories}
        bordered
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['3', '6', '9', '12'],
          defaultPageSize: 3,
          //跳转到某页
          showQuickJumper: true
        }}
        rowKey="_id"
      />
      <Modal
        title="添加分类"
        visible={isShowAddCategory}
        onOk={this.addCategory}
        onCancel={this.hideAddCategory}
        okText="确认"
        cancelText="取消"
      >
        <AddCategoryForm categories={categories} wrappedComponentRef={(form) => this.addCategoryForm = form}/>
      </Modal>
    </Card>;
  }
}