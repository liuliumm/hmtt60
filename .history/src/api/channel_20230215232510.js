/**
 * 频道请求模块
 */
import request from '@/utils/request'

/**
 * 获取所有频道
 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

/**
 * 添加用户频道
 */
//D 如果已登录，封装添加频道的请求方法
export const addUserChannel = channel => {
  return request({
    // GET POST PUT DELETE  PATCH(部分更新)
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]//这个参数必须是数组格式，但其实只需要传递一个对象过来即可
    }
  })
}

/**
 * 删除用户频道
 */
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}