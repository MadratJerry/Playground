import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Main.css'
import i1 from '~/assets/images/0109_SP18_HP_P1_CNY.jpg'
import i2 from '~/assets/images/0104_SP18_HP_P2_HUARACHE.jpg'
import i3 from '~/assets/images/0104_SP18_HP_P3_VM.jpg'
import i4 from '~/assets/images/0108_SP18_HP_P4_METCON.jpg'
import i5 from '~/assets/images/HP-PC-KYRIE.jpg'
import i6 from '~/assets/images/icononly.jpg'

class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={i1} alt="" />
            <div
              className={styles.mask}
              style={{ right: '10%', bottom: '20%' }}
            >
              <Button style={{ marginRight: 10 }}>
                <Link to="/good">立即选购</Link>
              </Button>
              <Button>了解更多</Button>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={i2} alt="" />
            <div
              className={styles.mask}
              style={{
                left: '8%',
                bottom: '20%',
                color: 'white',
                fontSize: '1.2em',
                fontFamily: 'TradeGothicW01-BoldCn20',
              }}
            >
              <p style={{ fontSize: '2.375em' }}>NIKE AIR HUARACHE </p>
              <p>舒适鞋面包裹双足，</p>
              <p>打造都市休闲风格。</p>
              <Button>立即选购</Button>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={i3} alt="" />
            <div
              className={styles.mask}
              style={{
                left: '8%',
                bottom: '20%',
                color: 'black',
                fontSize: '1.2em',
                fontFamily: 'TradeGothicW01-BoldCn20',
              }}
            >
              <p style={{ fontSize: '2.375em' }}>AIR MOVES YOU</p>
              <p>NIKE AIR VAPORMAX FLYKNIT 全新配色上市。</p>
              <p>其创新AIR缓震系统，实现非凡灵活性</p>
              <p>与轻质感，助你向前。</p>
              <Button style={{ color: 'white', backgroundColor: 'black' }}>
                立即选购
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={i4} alt="" />
            <div
              className={styles.mask}
              style={{
                left: '8%',
                bottom: '20%',
                color: 'black',
                fontSize: '1.2em',
                fontFamily: 'TradeGothicW01-BoldCn20',
              }}
            >
              <p style={{ fontSize: '2.375em' }}>全新 METCON 4</p>
              <p>舒适缓震，稳定耐穿。今年推出的</p>
              <p>创新款训练鞋匠心升级，将你的</p>
              <p>训练体验提升至新高度。</p>
              <Button style={{ color: 'white', backgroundColor: 'black' }}>
                选购 METCON 4
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={i5} alt="" />
            <div
              className={styles.mask}
              style={{ left: '5%', fontFamily: 'Heiti SC' }}
            >
              <h1>精选鞋款</h1>
            </div>
            <div
              className={styles.mask}
              style={{ left: '5%', fontFamily: 'Heiti SC' }}
            >
              <h1>精选鞋款</h1>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={i6} alt="" />
            <div
              className={styles.mask}
              style={{
                width: '100%',
                left: 0,
                fontFamily: 'Heiti SC',
                textAlign: 'center',
              }}
            >
              <h1>关注我们</h1>
              <p>抢先得知 NIKE 最新产品、独家消息及优惠资讯。</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Main
