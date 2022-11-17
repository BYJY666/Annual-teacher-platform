import Vue from 'vue'
import { Upload, Steps, Step, Image, Message, Notification, Container, Header, Aside, Main, Button, Menu, Submenu, MenuItem, Tooltip, Breadcrumb, BreadcrumbItem, Card, Input, Row, Col, Table, TableColumn, Pagination, Switch, Dialog, Form, FormItem } from 'element-ui';

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Image)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Upload)

Vue.prototype.$message = Message
Vue.prototype.$notify = Notification