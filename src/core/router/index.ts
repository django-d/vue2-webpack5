import Vue from 'vue';
import VueRouter from 'vue-router';
import { transformModuleToRoute } from '@/core/helper/router-helper';

Vue.use(VueRouter);

function getModules() {
	// @ts-ignore
	const modules = require.context(
		'../modules',
		true,
		/^\.\/.*module-config.j|ts$/,
	);
	const rmodules = modules.keys().map((filename: string) => {
		const config = modules(filename);
		return config;
	});
	const routes = rmodules.reduce((arr: any[], item: any) => {
		const rs = transformModuleToRoute(item);
		console.log(rs);
		return [...arr, ...rs];
	}, []);
	return routes;
}

export const asyncRoutes = [...getModules()];
export const basicRoutes = [];

let currRouter: VueRouter | null = null;

export const createRouter = () => {
	const router = new VueRouter({
		routes: asyncRoutes,
		base: '/',
		mode: 'history',
	});
	currRouter = router;
	return router;
};

export const useRouter = () => {
	return currRouter;
};
