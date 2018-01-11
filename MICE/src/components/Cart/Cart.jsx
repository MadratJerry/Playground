import React from 'react'
import { Divider, Card, List, Icon, Avatar, message, Button } from 'antd'
import { Link } from 'react-router-dom'
import CartModel from './CartModel'
import { data, codes } from '@/components/Good/GoodData'
import './Cart.css'

class Cart extends React.Component {
  getCart() {
    this.setState({
      listData: CartModel.getAll().map(e => {
        let info = data[codes[e.code].source]
        return {
          num: info.code.indexOf(e.code),
          href: `good/${e.code}`,
          price: info.price,
          title: info.name,
          avatar: info.image,
          image: info.image,
          description: e.code,
          size: e.size,
          color: codes[e.code].color,
        }
      }),
    })
  }
  componentDidMount() {
    this.getCart()
  }
  state = {
    listData: [],
  }
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '70%' }}>
          <Card>
            亲爱的顾客，近期有不法分子假冒各大品牌工作人员进行诈骗活动，为了您的账户和财产安全，请勿轻信此类信息，谨防被骗。
          </Card>
          <Divider />
          <Card>
            你的订单享受免费配送服务
            作为NIKE+会员，你能享受每笔订单免费配送，和30天无理由退换货服务。
          </Card>
          <Divider />
          <Card title="购物车" bordered={false}>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={this.state.listData}
              renderItem={(item, index) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <Icon type="edit" style={{ marginRight: 8 }} />,
                    <Icon
                      type="delete"
                      onClick={() => {
                        CartModel.remove(index)
                        this.getCart()
                        message.success('删除成功')
                      }}
                      style={{ marginRight: 8 }}
                    />,
                  ]}
                  extra={
                    <Link
                      to={item.href}
                      key={index}
                      style={{
                        width: '180px',
                        overflow: 'hidden',
                        display: 'inline-block',
                      }}
                    >
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          width: '300%',
                          marginLeft: `-${index * 100}%`,
                        }}
                      />
                    </Link>
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Link to={item.href}>{item.title}</Link>
                        <span style={{ color: 'orange', fontSize: 12 }}>
                          ￥{item.price}
                        </span>
                      </div>
                    }
                    description={<span>款式：{item.description}</span>}
                  />
                  {
                    <div>
                      <p>颜色：{item.color.join('/')}</p>
                      <p>尺码：{item.size}</p>
                    </div>
                  }
                </List.Item>
              )}
            />
          </Card>
        </div>

        <div style={{ width: '30%', position: 'fixed', right: 0 }}>
          <Card title="小结">
            订单总计: ￥{this.state.listData.reduce((sum, i) => {
              sum += i.price
              return sum
            }, 0)}
            <Button>结算</Button>
          </Card>
        </div>
      </div>
    )
  }
}

export default Cart
