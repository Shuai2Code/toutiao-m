// 本地存储封装模块
export const getItem = (name, value) => {
  const data = window.localStorage.getItem(name)
  // data 可能不是Json 格式的字符串，不是就原样返回，是就parse
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
