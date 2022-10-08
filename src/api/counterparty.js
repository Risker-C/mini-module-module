import http from "yh-request"

const ccRequest = new http("http://117.122.241.106:8201")
// 查询供应商列表
export function listCounterparty(data) {
  return ccRequest.post('/srm/category/page', {
    data
  })
}

// 查询供应商详细
export function getCounterparty(id) {
  return ccRequest({
    url: '/counterparty/one/' + id,
    method: 'get'
  })
}

// 新增供应商
export function addCounterparty(data) {
  return ccRequest({
    url: '/counterparty/create',
    method: 'post',
    data: data
  })
}

// 修改供应商
export function updateCounterparty(data) {
  return ccRequest({
    url: '/counterparty/update',
    method: 'post',
    data: data
  })
}
// 启用
export function enableCounterparty(id) {
  return ccRequest({
    url: '/counterparty/enable/' + id,
    method: 'get',
  })
}
// 禁用
export function disableCounterparty(id) {
  return ccRequest({
    url: '/counterparty/disable/' + id,
    method: 'get',
  })
}

// 删除供应商
export function delCounterparty(id) {
  return ccRequest({
    url: '/counterparty/' + id,
    method: 'delete'
  })
}

// 导入供应商
export const importCounterparty = "/cc/counterparty/upload";