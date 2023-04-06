export default function auth({ next, router }, cookies, api) {
  
  if (!cookies.get("token")) {
    return router.push({ name: 'login' });
  }

  const time = new Date(),
    tokenEndTime = new Date(cookies.get('tokenEndTime')),
    refreshTime = new Date(cookies.get('tokenEndTime'))

    tokenEndTime.setMinutes(refreshTime.getMinutes() + refreshTime.getTimezoneOffset())
    refreshTime.setMinutes(refreshTime.getMinutes() + refreshTime.getTimezoneOffset() - 30 )
    
  if (time >= tokenEndTime) {
    cookies.remove('token')
    cookies.remove('refreshToken')
    router.push({ name: 'login' });
  } else if (time > refreshTime) {
    refresh()
  }
  async function refresh() {
      let { data } = await api.auth.refreshSession({ refreshToken: cookies.get("refreshToken") }),
        expireTime = new Date(data.expireTime)
      cookies.set("token", data.accessToken, expireTime);
      cookies.set("refreshToken", data.refreshToken, expireTime);
      cookies.set("tokenEndTime", data.expireTime);
  }

  return next();
}