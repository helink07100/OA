> enum目录下的所有js文件都会读取挂载到this.$enum上

#### 两种写法，细品

- 写法一：
```javascript
// a.js
export const __SUCCESS__ =  0;
export const __FAIL__ =  -1;
// 最终可以通过this.$enum.__SUCCESS获取
```

- 写法二：
```javascript
// b.js
export const response = {
  SUCCESS: 0,
  FAIL: -1
}
// 最终可以通过this.$enum.response.SUCCESS获取
```
