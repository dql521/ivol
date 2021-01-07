import { getRequest, postRequest } from './request'

export const getTabInfo = p => postRequest('https://45.145.126.108:443/api.php/provide/vod', p)
export const getTuiVodInfo = p => getRequest('https://45.145.126.108:443/api.php/provide/vod', p)
export const getSearch = p => getRequest('https://45.145.126.108:443/api.php/provide/vod', p)
export const addChannels = p => postRequest('/channel/add', p)
export const getChannels = p => getRequest('/channel/getList', p)

// export const login = p => postRequest('/api/login', p)
export const getPostList = p => getRequest('/post', p)
