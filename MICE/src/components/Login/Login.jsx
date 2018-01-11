import React from 'react'
import {
  Tabs,
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  DatePicker,
  Radio,
} from 'antd'
import nike from '~/assets/images/swoosh_plus_black_2x.png'
import styles from './Login.css'

const TabPane = Tabs.TabPane
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class Login extends React.Component {
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
    return (
      <Tabs defaultActiveKey="1" className={styles.tab}>
        <TabPane tab="登录" key="1" className={styles.tabPane}>
          <img src={nike} alt="" />
          <br />
          <h1>登录NIKE+账号</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="账号"
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="密码"
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住我</Checkbox>)}
              <a className="login-form-forgot" href="">
                忘记密码
              </a>
            </FormItem>
            <p>一旦登录，即表明你同意 Nike 的 隐私政策 和 使用条款</p>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane tab="注册" key="2" className={styles.tabPane}>
          <img src={nike} alt="" />
          <br />
          <h1>注册成为NIKE⁠+会员</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input placeholder="邮箱" />)}
            </FormItem>
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
              <DatePicker
                style={{ width: '100%' }}
                placeholder="选择你的生日"
              />
            </FormItem>
            <FormItem>
              {getFieldDecorator('radio-button')(
                <RadioGroup style={{ width: '100%' }}>
                  <RadioButton value="a">男</RadioButton>
                  <RadioButton value="b">女</RadioButton>
                </RadioGroup>,
              )}
            </FormItem>
            <p>一旦登录，即表明你同意 Nike 的 隐私政策 和 使用条款</p>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                注册
              </Button>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
    )
  }
}

export default Form.create()(Login)
