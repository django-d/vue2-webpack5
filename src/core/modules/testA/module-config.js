module.exports = {
  order: 0, // 在菜单中的排序依据，按照升序排列
  menuTitle: 'UI预览', // 在菜单中显示的名称
  routeName: 'ui', // 路由名称 必须首字母大写 且不可重复
  path: '/ui',
  redirect: '',
  component: () => import('./index.vue'),

  meta: {
    title: '', // 在打开的标签页显示的名称，没有设置时认为和 menuTitle 相同
    permissionCode: '', // 权限码配置
    isSingleMenu: true,
    debug: true,
  },
};
