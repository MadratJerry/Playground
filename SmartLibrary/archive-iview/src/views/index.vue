<style scoped lang="less">
.index {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    h1 {
        height: 50px;
        color: #666;
        margin-bottom: 32px;
        img {
            float: left;
            height: 100%;
        }
        p {
            float: left;
            margin: 8px 0 16px 16px;
        }
    }
    a {
        display: block;
        text-align: right;
    }

    .ivu-card {
        margin-bottom: 12px;
    }

    .ivu-row-flex {
        height: 100%;
    }
}
</style>
<template>
    <div class="index">
        <h1>
            <img src="../images/logo.png">
            <p>智能图书座位管理系统</p>
        </h1>
        <a href="#" slot="extra" @click.prevent="reloads()">
            <Icon type="ios-loop-strong"></Icon>
            刷新
        </a>
    
        <Card v-for="floor in AppData.data.floor">
            <Progress :status="getStatus(getFloorPercent(AppData.hash[floor.name]))" :percent="getFloorPercent(AppData.hash[floor.name])"></Progress>
            <p slot="title">
                <Icon type="ios-keypad-outline"></Icon>
                {{floor.name}}
            </p>
            <Tooltip v-for="item in floor.seats" placement="top">
                <div slot="content">
                    <p>09:00~10:00</p>
                </div>
                <Tag :key="item" :color='AppData.hash[floor.name][item-1]==0?"red":"green"'>{{floor.name}}-{{item}}</Tag>
            </Tooltip>
        </Card>
    </div>
</template>
<script>
import axios from 'axios'

let AppData = {
    data: "",
    hash: ""
}

export default {
    data() {
        axios.get('hash.json').then(response => {
            AppData.hash = response.data
            axios.get('data.json').then(response => {
                AppData.data = response.data;
            })
        })
        setInterval(function () {
            axios.get('hash.json').then(response => {
                AppData.hash = response.data
            })
        }, 500)
        return { AppData }
    },
    methods: {
        reloads() {
            window.location.reload();
        },
        getFloorPercent(a) {
            let res = 0
            for (let i of a) res += i
            return parseInt(((a.length - res) * 100 / a.length))
        },
        getStatus(a) {
            return a == 100 ? "wrong" : "normal"
        },
        handleStart() {
            this.$Modal.info({
                title: 'Bravo',
                content: 'Now, enjoy the convenience of iView.'
            });
        },
        info() {
            return this.$Message.info('wow');
        }
    }
}
</script>
