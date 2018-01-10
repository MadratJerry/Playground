import React from 'react'
import { Menu } from 'antd'
import { Route } from 'react-router-dom'

import { data } from './Good.json'

import Item from './Item'
const MenuItemGroup = Menu.ItemGroup

class Good extends React.Component {
  showGoods() {
    const f =
      this.props.location.search === ''
        ? data
        : data.filter(e => {
            return this.props.location.search
              .slice(1)
              .split('&')
              .reduce((res, i) => {
                res = e[i.split('=')[0]] === decodeURI(i.split('=')[1])
                return res
              }, true)
          })
    let result = []
    for (let i = 0, len = f.length; i < len; i += 4)
      result.push(f.slice(i, i + 4))
    return result.map(e => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {e.map((e, i) => <Item key={i} {...e} />)}
      </div>
    ))
  }
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            overflow: 'auto',
            width: 200,
            height: 'auto',
            position: 'fixed',
            zIndex: 999,
            backgroundColor: 'white',
            left: 0,
          }}
        >
          <div className="logo" />
          <Menu theme="white" mode="inline" defaultSelectedKeys={['4']}>
            <MenuItemGroup title="性别">
              <Menu.Item key="man">男子</Menu.Item>
              <Menu.Item key="woman">女子</Menu.Item>
              <Menu.Item key="boy">男孩</Menu.Item>
              <Menu.Item key="girl">女孩</Menu.Item>
            </MenuItemGroup>
          </Menu>
        </div>
        <div style={{ marginLeft: 200 }}>{this.showGoods()}</div>
      </React.Fragment>
    )
  }
}

export default Good
