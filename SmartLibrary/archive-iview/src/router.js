const routers = [{
    path: '/',
    meta: {
        title: 'library'
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
}];
export default routers;
