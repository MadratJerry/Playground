import React from 'react'
import { Form, Input, Button, Radio, DatePicker, message } from 'antd'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class Register extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success('注册成功')
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
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
          <DatePicker style={{ width: '100%' }} placeholder="选择你的生日" />
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
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            注册
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(Register)
