import React, { Component } from 'react'
import Header from './Header'
import DishTable from './DishTable'
import OrderTable from './OrderTable'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Snackbar from 'material-ui/Snackbar'
import Fade from 'material-ui/transitions/Fade'
import './App.css'

const hostname = document.location.hostname
const protocol = document.location.protocol

const ws = new WebSocket(`ws://${hostname}:8181`)

function TabContainer({ children, dir }) {
  return (
    <div dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </div>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  appbar: {
    bottom: 0,
    top: 'auto'
  }
})

class App extends Component {
  state = {
    snakeOpen: false,
    snakeText: '',
    columnData: [],
    dish: [],
    order: [],
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  updateDish = id => {
    fetch(`${protocol}//${hostname}:8000/dish/${id}`)
      .then(res => res.json())
      .then(res => {
        let dish = this.state.dish
        dish[id - 1] = res
        this.setState({ dish: dish })
      })
  }

  addOrder = id => {
    fetch(`${protocol}//${hostname}:8000/order/${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          order: this.state.order.concat([res]),
          snakeOpen: true,
          snakeText: `${res.table}号桌有新的订单`
        })
      })
  }

  urgeOrder = id => {
    this.setState({
      snakeOpen: true,
      snakeText: `${id}号桌已经等不及了`
    })
  }

  newClient = (ip, port) => {
    this.setState({
      snakeOpen: true,
      snakeText: `终端 ${ip}:${port} 已连接！`
    })
  }

  closeClient = (ip, port) => {
    this.setState({
      snakeOpen: true,
      snakeText: `终端 ${ip}:${port} 已离线！`
    })
  }

  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ snakeOpen: false })
  }

  componentWillMount() {
    fetch(`${protocol}//${hostname}:8000/columnData`)
      .then(res => res.json())
      .then(res => {
        this.setState({ columnData: res })
      })
    fetch(`${protocol}//${hostname}:8000/dish?_sort=id&_order=asc`)
      .then(res => res.json())
      .then(res => {
        this.setState({ dish: res })
      })
    fetch(`${protocol}//${hostname}:8000/order`)
      .then(res => res.json())
      .then(res => {
        this.setState({ order: res })
      })
  }

  componentDidMount() {
    let self = this
    ws.onmessage = function(e) {
      let cmd = e.data.toString().split(' ')
      switch (cmd[0]) {
        case '/update':
          self.updateDish(cmd[2])
          break
        case '/add':
          self.addOrder(cmd[2])
          break
        case '/urge':
          self.urgeOrder(cmd[1])
          break
        case '/client':
          self.newClient(cmd[1], cmd[2])
          break
        case '/close':
          self.closeClient(cmd[1], cmd[2])
          break
        default:
          break
      }
    }
  }

  render() {
    const { classes, theme } = this.props

    return (
      <div className="App">
        <Header />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.snakeOpen}
          onRequestClose={this.handleRequestClose}
          transition={Fade}
          autoHideDuration={6000}
          SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
          message={<span id="message-id">{this.state.snakeText}</span>}
        />
        <AppBar position="fixed" color="default" className={classes.appbar}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            centered
          >
            <Tab label="订单" />
            <Tab label="总览" />
            <Tab label="图像" />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <OrderTable data={this.state.order} dish={this.state.dish} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <DishTable
              columnData={this.state.columnData}
              data={this.state.dish}
            />
          </TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export { hostname, protocol }
export default withStyles(styles, { withTheme: true })(App)
