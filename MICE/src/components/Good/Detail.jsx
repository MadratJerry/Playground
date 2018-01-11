import React from 'react'
import { Link } from 'react-router-dom'
import { Radio, Button, Icon, Rate, Form, message } from 'antd'
import { data, codes } from './Good.json'
import CartModel from '../Cart/CartModel'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const FormItem = Form.Item

class Detail extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        CartModel.add({
          code: this.props.match.params.code,
          size: parseInt(values['radio-button'], 10),
        })
        message.success('添加成功')
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form

    if (!codes[this.props.match.params.code])
      return <h1 style={{ textAlign: 'center' }}>无该商品</h1>
    const detail = codes[this.props.match.params.code]
    const source = data[detail.source]
    const buttonStyle = {
      color: 'white',
      backgroundColor: 'black',
    }
    return (
      <React.Fragment>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '70%' }}>
            {detail.images.map((e, index) => (
              <img src={e} key={index} alt="" width="100%" />
            ))}
          </div>
          <div style={{ width: '30%', position: 'fixed', right: 0 }}>
            <h1>{source.name}</h1>
            <h3>
              {source.gender}
              {source.kind}
              <span style={{ color: 'orange' }}>￥{source.price}</span>
            </h3>
            <h4>
              {source.code.map((e, index) => {
                return (
                  <Link
                    to={e}
                    key={index}
                    style={{
                      width: '100px',
                      overflow: 'hidden',
                      display: 'inline-block',
                    }}
                  >
                    <img
                      src={source.image}
                      alt=""
                      style={{
                        width: '300%',
                        marginLeft: `-${index * 100}%`,
                      }}
                    />
                  </Link>
                )
              })}
            </h4>
            <h5>选择尺码</h5>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('radio-button', {
                  rules: [{ required: true, message: '请选择尺码!' }],
                })(
                  <RadioGroup>
                    {detail.size.map((e, index) => (
                      <RadioButton key={index} value={e}>
                        {e}
                      </RadioButton>
                    ))}
                  </RadioGroup>,
                )}
              </FormItem>

              <Button style={buttonStyle} htmlType="submit">
                加入购物车
              </Button>
              <Button style={buttonStyle}>
                <Icon type="heart-o" />
              </Button>
            </Form>
            <p>{detail.description}</p>
            <ul>
              <li>显示颜色：{detail.color.join('/')}</li>
              <li>型号：{this.props.match.params.code}</li>
            </ul>
            <span>评分：</span>
            <Rate allowHalf defaultValue={detail.rate} />
            <p>
              价格说明（此说明仅当出现价格比较时有效)
              划线价格：划线的价格可能是商品的专柜价吊牌价或正品零售价指导价或该商品的曾经展示过的销售价等，仅供您参考。未划线价格：未划线的价格是商品在本平台上的销售标价，具体的成交价格可能因顾客使用优惠券、礼品卡等情况发生变化，最终以订单结算页价格为准。
            </p>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Form.create()(Detail)
