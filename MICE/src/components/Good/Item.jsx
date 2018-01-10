import React from 'react'
import { Card, Icon } from 'antd'

const { Meta } = Card

class Item extends React.Component {
  render() {
    const { image, name, kind, price, gender, code } = this.props
    return (
      <Card
        cover={<img alt={name} src={image} style={{ width: '300%' }} />}
        actions={[
          <Icon type="heart-o" />,
          <Icon type="shopping-cart" />,
          <Icon type="upload" />,
        ]}
        style={{ margin: 4, overflow: 'hidden' }}
      >
        <Meta
          title={
            <div style={{ display: 'flex' }}>
              <span
                style={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {name}
              </span>
              <span style={{ color: 'gray', fontSize: 12 }}>
                {code.length} 色
              </span>
            </div>
          }
          description={
            <p
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {gender}
                {kind}
              </span>
              <span style={{ color: 'orange' }}>￥{price}</span>
            </p>
          }
        />
      </Card>
    )
  }
}

export default Item
