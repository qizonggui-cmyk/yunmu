# 云牧商城

云牧商城是面向农产品、农场品牌和本地生活零售场景的多端商城系统。本仓库基于 CRMEB 标准版二次整理，包含后端服务、管理后台、PC 商城和移动端/小程序模板，适合用于农产品展示、在线下单、会员运营、营销活动和订单履约管理。

## 项目组成

| 目录 | 说明 | 技术栈 |
| --- | --- | --- |
| `crmeb/` | 后端服务、安装脚本、API、队列和长连接服务 | ThinkPHP 6、PHP、MySQL、Redis、Workerman |
| `template/admin/` | 商城管理后台 | Vue 2、Vue CLI、Element UI |
| `template/pc/` | PC 端商城 | Nuxt 2、Vue 2、Element UI |
| `template/uni-app/` | H5、App、小程序端商城 | uni-app、Vue |

## 核心能力

- 商品、分类、规格、库存和评价管理
- 购物车、下单、支付、售后和物流查询
- 会员、等级、标签、积分、余额和签到
- 优惠券、秒杀、拼团、砍价、抽奖等营销活动
- 分销、门店、客服、消息通知和内容管理
- 管理后台、PC 商城、H5/App/小程序多端支持

## 环境要求

后端要求以 `crmeb/README.md` 为准：

- PHP 7.1 - 7.4
- MySQL 5.7+ 或兼容版本
- Redis，可选但建议生产环境启用
- Composer
- Nginx 或 Apache，站点入口指向 `crmeb/public`

前端建议：

- Node.js 16+，管理后台兼容范围见 `template/admin/package.json`
- npm 6+
- uni-app 建议使用 HBuilderX 或对应 CLI 工具构建

## 后端启动

```bash
cd crmeb
composer install
```

配置站点入口到：

```text
crmeb/public
```

首次安装可以访问域名或 IP 触发安装向导，也可以手动导入：

```text
crmeb/public/install/crmeb.sql
```

然后按实际环境配置 `crmeb/.env`，重点包括数据库、Redis、缓存、队列等信息。

后台访问地址：

```text
https://你的域名/admin
```

H5/公众号访问地址：

```text
https://你的域名/
```

常用服务命令：

```bash
# 定时任务，自动收货、库存预警等功能会用到
php think timer start --d

# 长连接服务，客服聊天和后台消息通知会用到
php think workerman start --d
```

## 管理后台

```bash
cd template/admin
npm install
npm run dev
```

构建生产包：

```bash
npm run build
```

接口地址在以下文件中配置：

```text
template/admin/.env.dev
template/admin/.env.production
```

本地开发时通常配置为：

```text
VUE_APP_API_URL=http://你的域名/adminapi
```

## PC 商城

```bash
cd template/pc
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

静态生成：

```bash
npm run generate
```

接口环境配置在：

```text
template/pc/env.js
```

## uni-app 移动端

移动端项目位于：

```text
template/uni-app
```

主要配置文件：

```text
template/uni-app/config/app.js
template/uni-app/manifest.json
template/uni-app/pages.json
```

请在发布前替换接口域名、小程序 AppID、支付、地图、隐私协议等平台配置。

## 依赖管理

仓库不再提交安装产物和第三方依赖目录，例如：

- `crmeb/vendor/`
- `node_modules/`
- 前端构建产物目录

拉取代码后请在对应目录执行安装命令：

```bash
cd crmeb && composer install
cd template/admin && npm install
cd template/pc && npm install
```

`composer.lock`、`package-lock.json` 会保留，用于锁定依赖版本和保证环境一致性。

## 部署建议

1. 后端站点入口固定到 `crmeb/public`。
2. 后台构建后部署到后端可访问的管理后台静态目录。
3. PC 商城按 Nuxt 构建结果部署到前端静态服务或后端指定目录。
4. uni-app 按 H5、App、微信小程序等目标平台分别构建发布。
5. 生产环境关闭调试，配置 HTTPS，并开启必要的缓存、队列和定时任务。

## 安全注意事项

- 不要提交真实 `.env`、数据库账号、支付密钥、短信密钥、云存储密钥。
- 公开仓库中的 AppID、AppSecret、地图 Key 等配置需要发布前核查并按需轮换。
- 首次部署后立即修改默认后台账号和密码。
- 安装完成后删除或锁定安装入口，避免重复安装风险。
- 上线前建议执行 `composer audit`、`npm audit` 或等价安全审计。

## 参考文档

- [CRMEB 文档](https://doc.crmeb.com)
- [ThinkPHP 6 文档](https://www.kancloud.cn/manual/thinkphp6_0/content)
- [Nuxt 2 文档](https://www.nuxtjs.cn/)
- [uni-app 文档](https://uniapp.dcloud.net.cn/)
