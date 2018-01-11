import React from 'react'
import { AutoComplete, Input, Icon, Menu, Modal } from 'antd'
import { Link } from 'react-router-dom'
import Glyph from '@/components/Glyph'
import Login from '@/components/Login'
import styles from './Nav.css'

const Option = AutoComplete.Option
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const topNavHeight = 40
const bottomNavHeight = 48

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min // eslint-disable-line no-mixed-operators
}

function searchResult(query) {
  return new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((item, idx) => ({
      query,
      category: `${query}${idx}`,
      count: getRandomInt(200, 100),
    }))
}

function renderOption(item) {
  return (
    <Option key={item.category} text={item.category}>
      {item.query} 在
      <a
        href={`https://s.taobao.com/search?q=${item.query}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.category}
      </a>
      类
      <span className="global-search-item-count">约 {item.count} 个结果</span>
    </Option>
  )
}

class Nav extends React.Component {
  state = {
    modalVisible: false,
    dataSource: [],
  }

  handleSearch = value => {
    this.setState({
      dataSource: value ? searchResult(value) : [],
    })
  }

  handleClick = params => {
    this.setState({ modalVisible: true })
  }

  render() {
    const { dataSource } = this.state
    return (
      <React.Fragment>
        <Modal
          title={null}
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          onOk={() => this.setState({ modalVisible: false })}
          onCancel={() => this.setState({ modalVisible: false })}
          footer={null}
        >
          <Login />
        </Modal>
        <nav
          className={styles.topNav}
          style={{
            height: topNavHeight,
            lineHeight: topNavHeight + 'px',
          }}
        >
          <div className={styles.leftSide}>
            <ul className={styles.list}>
              <li>
                <Link to="/">NikePlus</Link>
              </li>
              <li>
                <Link to="/" className={styles.jumpman}>
                  <Glyph type="jumpman" size="21" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Glyph type="converse" size="72" style={{ height: 21 }} />
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.rightSide}>
            <ul className={styles.list}>
              <li>
                <a>
                  <Icon
                    type="user"
                    style={{ fontSize: 14 }}
                    onClick={this.handleClick}
                  />
                </a>
              </li>
              <li>
                <Link to="/">
                  <Glyph type="chat" size="21" />
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <Glyph type="cart" size="21" />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <nav className={styles.bottomNav} style={{ height: bottomNavHeight }}>
          <Glyph
            type="logo"
            size="70"
            color="black"
            style={{ height: bottomNavHeight }}
          />
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            style={{ border: 'none' }}
          >
            <SubMenu title={<Link to="/">男子</Link>}>
              <SubMenu title={<Link to="/">鞋类</Link>}>
                <Menu.Item key="setting:1">
                  <Link to="/">休闲</Link>
                </Menu.Item>
                <Menu.Item key="setting:2">
                  <Link to="/">跑步</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu title={<Link to="/">服装</Link>}>
                <Menu.Item key="setting:1">
                  <Link to="/">紧身运动服</Link>
                </Menu.Item>
                <Menu.Item key="setting:1">
                  <Link to="/">连帽衫/套头衫</Link>
                </Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu title={<Link to="/">女子</Link>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu title={<Link to="/">男孩</Link>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu title={<Link to="/">女孩</Link>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu title={<Link to="/">NIKEiD专属定制</Link>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
          </Menu>
          <AutoComplete
            size="default"
            style={{ padding: (bottomNavHeight - 32) / 2 }}
            dataSource={dataSource.map(renderOption)}
            onSearch={this.handleSearch}
            placeholder="搜索"
            optionLabelProp="text"
          >
            <Input suffix={<Icon type="search" />} />
          </AutoComplete>
        </nav>
      </React.Fragment>
    )
  }
}

const navHeight = topNavHeight + bottomNavHeight
Nav.height = navHeight
export default Nav
