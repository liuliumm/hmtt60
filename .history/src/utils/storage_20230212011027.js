/**
 * 封装本地存储操作模块
 */

/**
 * 存储数据
 */
export const setItem = (key, value) => {
    // 将数组、对象类型的数据转换为 JSON 格式字符串进行存储
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    
    window.localStorage.setItem(key, value)
  }
  
  /**
   * 获取数据
   */
  export const getItem = key => {
    const data = window.localStorage.getItem(key)
    // 判断如果是json字符串，parse解析成json对象返回去用
    // 否则直接返回

    // 因为没有办法判断一个字符串是不是json字符串，所以采用直接解析看是否报错的方案
    try {
      return JSON.parse(data)
    } catch (err) {
      return data
    }
  }
  
  /**
   * 删除数据
   */
  // export const removeItem = key => {
  //   window.localStorage.removeItem(key)
  // }
  