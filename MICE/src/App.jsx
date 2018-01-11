import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import Nav from '@/components/Nav'
import Main from '@/components/Main'
import Good from '@/components/Good'
import Cart from '@/components/Cart'

const { Header, Content, Footer } = Layout

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout style={{ minWidth: '900px' }}>
          <Header
            style={{
              position: 'fixed',
              width: '100%',
              height: 'auto',
              overflow: 'scroll',
              zIndex: 999,
              backgroundColor: '#fff',
              padding: 0,
            }}
          >
            <Nav />
          </Header>
          <Content style={{ marginTop: Nav.height }}>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/good" component={Good} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/good/:code" component={Good.Detail} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>© 2017 Nike, Inc.</Footer>
        </Layout>
      </Router>
    )
  }
}

export default App
