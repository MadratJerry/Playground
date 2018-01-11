import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Popover } from 'antd'

const { Meta } = Card

class Item extends React.Component {
  render() {
    const { image, name, kind, price, gender, code } = this.props
    return (
      <Card
        cover={
          <Popover
            content={code.map((e, index) => {
              return (
                <div
                  key={index}
                  style={{
                    width: '100px',
                    overflow: 'hidden',
                    display: 'inline-block',
                  }}
                >
                  <img
                    src={image}
                    alt=""
                    style={{
                      width: '300%',
                      marginLeft: `-${index * 100}%`,
                    }}
                  />
                </div>
              )
            })}
            placement="bottom"
          >
            <Link to={`good/${code[0]}`}>
              <img alt={name} src={image} style={{ width: '300%' }} />
            </Link>
          </Popover>
        }
        actions={[
          <Icon type="heart-o" />,
          <Link to={`good/${code[0]}`}>
            <Icon type="shopping-cart" />
          </Link>,
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
