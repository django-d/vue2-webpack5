import Vue from 'vue';
import App from './app.vue';
import Composition from '@vue/composition-api';
import './styles/tailwind.css';
import { createRouter } from './core/router';
import { Button } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Button);
Vue.use(Composition);

export default new Vue({
	router: createRouter(),
	render: (h) => h(App),
}).$mount('#app');
