import builder from './api-common';

/*登录接口*/
export const login = builder.build({
  baseUrl: window.BASEURL_login,
  url: '/bamSysUser/login',
  method: 'POST',
});

/*退出接口*/
export const logout = builder.build({
  baseUrl: window.BASEURL_login,
  url: '/bamSysUser/outLogin',
  method: 'POST',
});

