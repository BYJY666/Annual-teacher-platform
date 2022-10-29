import Vue from 'vue'
import { Message, Container, Header, Aside, Main, Button, Menu, Submenu, MenuItem } from 'element-ui';

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)

Vue.prototype.$message = Message