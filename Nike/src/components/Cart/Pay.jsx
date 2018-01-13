import React from 'react'
import { Steps, Select, Button, message, Icon } from 'antd'
import CartModel from './CartModel'
import ewm from '~/assets/images/1515686208.png'

const Step = Steps.Step
const Option = Select.Option

class Pay extends React.Component {
  state = {
    current: 0,
  }
  next() {
    this.setState({ current: this.state.current + 1 })
  }
  prev() {
    this.setState({ current: this.state.current - 1 })
  }
  render() {
    const steps = [
      {
        content: (
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option value="jack">洪崖洞</Option>
            <Option value="lucy">解放碑</Option>
            <Option value="Yiminghe">理工大学</Option>
          </Select>
        ),
      },
      {
        content: (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={ewm} alt="" />
          </div>
        ),
      },
      {
        content: (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Icon
                type="check-circle"
                style={{
                  fontSize: '100px',
                  color: '#52c41a',
                }}
              />
            </div>
            <p>订单完成！</p>
          </div>
        ),
      },
    ]
    return (
      <React.Fragment>
        <Steps current={this.state.current}>
          <Step title="确认地址" description="选个坐标，快点~" />
          <Step title="付款" description="给钱，快点哟！" />
          <Step title="完成订单" description="好，你可以走了~" />
        </Steps>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div
          className="steps-action"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {this.state.current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {this.state.current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('完成!')}>
              完成
            </Button>
          )}
          {this.state.current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default Pay
