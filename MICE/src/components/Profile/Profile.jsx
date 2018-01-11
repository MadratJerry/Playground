import React from 'react'
import { Tabs, Input, Form, Button, message, Avatar, Card, Icon } from 'antd'
import nike from '~/assets/images/swoosh_plus_black_2x.png'
import Login from './Login'
import Register from './Register'
import styles from './Login.css'
import Item from '@/components/Good/Item'
import { data } from '@/components/Good/Good.json'

const TabPane = Tabs.TabPane
const FormItem = Form.Item
const { Meta } = Card

class Profile extends React.Component {
  state = {
    isAuth: true,
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success('修改成功')
      }
    })
  }
  showGoods() {
    const f = data
    let result = []
    for (let i = 0, len = f.length; i < len; i += 4)
      result.push(f.slice(i, i + 4))
    return result.map((e, i) => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }} key={i}>
        {e.map((e, i) => <Item key={i} {...e} />)}
      </div>
    ))
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return this.state.isAuth ? (
      <Tabs defaultActiveKey="0" className={styles.tab}>
        <TabPane tab="我的信息" key="0">
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <Icon type="setting" />,
              <Icon type="edit" />,
              <Icon type="ellipsis" />,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="CM"
              description="男 2000-10-10"
            />
          </Card>
        </TabPane>
        <TabPane tab="我的收藏" key="1">
          {this.showGoods()}
        </TabPane>
        <TabPane tab="我的订单" key="2">
          {this.showGoods()}
        </TabPane>
        <TabPane tab="修改密码" key="3">
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(<Input type="password" placeholder="密码" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.checkPassword,
                },
              ],
            })(
              <Input
                type="password"
                onBlur={this.handleConfirmBlur}
                placeholder="确认密码"
              />,
            )}
          </FormItem>
          <FormItem>
            <Button>修改</Button>
          </FormItem>
        </TabPane>
      </Tabs>
    ) : (
      <Tabs defaultActiveKey="0" className={styles.tab}>
        <TabPane tab="登录" key="0" className={styles.tabPane}>
          <img src={nike} alt="" />
          <br />
          <h1>登录NIKE+账号</h1>
          <Login close={this.props.close} state={this} />
        </TabPane>
        <TabPane tab="注册" key="2" className={styles.tabPane}>
          <img src={nike} alt="" />
          <br />
          <h1>注册成为NIKE⁠+会员</h1>
          <Register close={this.props.close} />
        </TabPane>
      </Tabs>
    )
  }
}

export default Form.create()(Profile)
