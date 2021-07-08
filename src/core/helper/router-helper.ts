/**
 * @name 转换本地路由
 * @param {*} routeModule
 */
export function transformModuleToRoute(routeModule: any) {
	const routes: any = [];
	const getChildren = function (item: any, parent: any) {
		const path = parent + item.path;
		routes.push({
			path,
			redirect: item.redirect,
			component: item.component,
			name: `${item.routeName}`,
			meta: item.meta || {}, //把meta传给route  by chzh
		});
		item.children?.map((c: any) => {
			return getChildren(c, path);
		});
	};
	getChildren(routeModule, '');
	return routes;
}
