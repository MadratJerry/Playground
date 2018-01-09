import React from 'react'
import { AutoComplete, Input, Icon } from 'antd'
import { Link } from 'react-router-dom'
import Glyph from '@/components/Glyph'
import styles from './Nav.css'

const Option = AutoComplete.Option

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
    dataSource: [],
  }

  handleSearch = value => {
    this.setState({
      dataSource: value ? searchResult(value) : [],
    })
  }

  render() {
    const { dataSource } = this.state
    return (
      <React.Fragment>
        <nav className={styles.topNav}>
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
            </ul>
          </div>
          <div className={styles.rightSide}>
            <ul className={styles.list}>
              <li>
                <Link to="/">加入/登录Nike+账号</Link>
              </li>
              <li>
                <Link to="/">
                  <Glyph type="chat" size="21" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Glyph type="cart" size="21" />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <nav className={styles.bottomNav}>
          <Glyph type="logo" size="70" color="black" />
          <AutoComplete
            size="default"
            style={{ width: '25%', padding: '20px' }}
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

export default Nav
