import Http from './http'

// 封装各种接口请求
// export const 接口名 = () => Network.get('/路由',参数对象);
//参数可以以{}接收，方便操作
export const getMenusList = () => Http.get('/menus')
export const getUserList = ({ query = '', pagenum = 1, pagesize = 7 }) => Http.get('/users', { query, pagenum, pagesize })
export const getGoodsList = (pagenum = 7, pagesize = 7) => Http.get('/goods', { pagenum, pagesize });
export const addGoods = (goods_name = '张狗子', goods_cat = " '0',啊啊,'0'", goods_price = '11', goods_number = '11', goods_weight = '11') => Http.post('/goods', { goods_name, goods_cat, goods_price, goods_number, goods_weight });

export const LoginIn = (username, password) => Http.get('/login', { username, password })
export const getRole = () => Http.get('roles')

//查
export const personInfo = (userId) => Http.get(`users/${userId}`)
    //增
export const adduser = ({ username, password, email, phone }) => Http.post('/users', { username, password, email, phone })
    //改
export const editUserStatus = (userId, userType) => Http.put(`users/${userId}/state/${userType}`)
export const editUserinfo = (userId, email, mobile) => Http.put(`users/${userId}`, { email, mobile })
    // 删
export const deleteUser = (userId) => Http.delete(`users/${userId}`)