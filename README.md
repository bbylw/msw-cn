<br />

<p align="center">
  <img src="https://raw.githubusercontent.com/mswjs/msw/main/media/msw-logo.svg" width="100" alt="Mock Service Worker 标志" />
</p>

<h1 align="center">Mock Service Worker</h1>
<p align="center">JavaScript 领域的行业标准 API 模拟方案。</p>

<p align="center">
   <a href="https://kettanaito.com/discord" target="_blank">加入我们的 Discord 服务器</a>
</p>

<br />
<br />

## 特性

- **无缝集成**。为你提供一层专属的请求拦截层。让你的应用代码和测试都无需感知某个请求是否被模拟。
- **零偏差**。请求与生产环境完全一致的真实资源，从而测试应用的真实行为。扩展已有的 API，或在尚不存在 API 时按需设计它。
- **熟悉且强大**。使用类 [Express](https://github.com/expressjs/express) 的路由语法来拦截请求。借助参数、通配符和正则表达式匹配请求，并以所需的状态码、请求头、Cookie、延迟或完全自定义的解析函数作出响应。

---

> “_我发现了 MSW，并惊喜地看到不仅能在 DevTools 里看到被模拟的响应，而且这些 mock 不必写在 Service Worker 里，而是可以和应用其余部分放在一起。这让采用它变得极其简单。而它还能用于测试，更让 MSW 成为一个巨大的效率倍增器。_”
>
> — [Kent C. Dodds](https://twitter.com/kentcdodds)

## 文档

本 README 会简要介绍该库，但要了解 Mock Service Worker，没有比官方文档更好的起点了。

- [文档](https://mswjs.io/docs)
- [**快速上手**](https://mswjs.io/docs/quick-start)
- [常见问题](https://mswjs.io/docs/faq)

## 示例

- 查看[**使用示例**](https://github.com/mswjs/examples)列表

## 课程

我们与 Egghead 合作，为你带来高质量的付费内容，学习 Web 端 API 模拟的最佳实践。欢迎尝试！由此获得的版税收入将支撑项目的持续开发。谢谢你们。

- 🚀 [**使用 Mock Service Worker 模拟 REST 与 GraphQL API**](https://egghead.io/courses/mock-rest-and-graphql-apis-with-mock-service-worker-8d471ece?af=8mci9b)
- 🔌 [使用 Mock Service Worker 模拟（并测试）WebSocket API](https://egghead.io/courses/mocking-websocket-apis-with-mock-service-worker-9933b7f5)

## 浏览器

- [了解更多在浏览器中使用 MSW 的方式](https://mswjs.io/docs/integrations/browser)
- [`setupWorker` API](https://mswjs.io/docs/api/setup-worker)

### 它是如何工作的？

在浏览器中使用，正是 Mock Service Worker 区别于其它工具的地方。它利用 [Service Worker API](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)（该 API 本可用于拦截请求以做缓存），在网络层面用你的 mock 定义来响应被拦截的请求。这样，你的应用对模拟过程一无所知。

**来看看这段关于 Mock Service Worker 如何在浏览器中运行的简短演示：**

[![什么是 Mock Service Worker？](https://raw.githubusercontent.com/mswjs/msw/main/media/msw-video-thumbnail.jpg)](https://youtu.be/HcQCqboatZk)

### 它有何不同？

- 本库在网络层面拦截请求，也就是说在请求已经发起并“离开”你的应用之后。因此，你的全部代码都会照常运行，让你在模拟时更有信心；
- 把你的应用想象成一个盒子。市面上的每个 API 模拟库都会打开你的盒子，移除其中负责请求的部分，取而代之放一个黑盒。Mock Service Worker 让你的盒子保持原样、与生产环境 1:1 一致。它只是住在你旁边一个独立的盒子里；
- 再也不用 stub（桩替换）`fetch`、`axios`、`react-query` 等等；
- 同一份 mock 定义可以复用于单元测试、集成测试和 E2E 测试。本地开发与调试呢？当然也支持。一切都基于同一份网络描述运行，无需适配器或臃肿的配置。

### 使用示例

```js
// 1. 导入库。
import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'

// 2. 用请求处理函数描述网络行为。
const worker = setupWorker(
  http.get('https://github.com/octocat', ({ request, params, cookies }) => {
    return HttpResponse.json(
      {
        message: 'Mocked response',
      },
      {
        status: 202,
        statusText: 'Mocked status',
      },
    )
  }),
)

// 3. 通过启动 Service Worker 来开始模拟。
await worker.start()
```

在应用中发起 `GET https://github.com/octocat` 请求，将得到一个模拟响应，你可以在浏览器的“网络”标签页中查看：

![在 Chrome DevTools 网络面板中查看被模拟的请求截图](https://github.com/mswjs/msw/blob/main/media/msw-quick-look-network.png?raw=true)

> **提示：** 你知道吗？尽管 Service Worker 运行在独立线程中，但你的请求处理函数完全在客户端执行。因此你可以使用相同的语言（如 TypeScript）、第三方库以及内部逻辑来创建所需的 mock。

## Node.js

- [了解更多在 Node.js 中使用 MSW 的方式](https://mswjs.io/docs/integrations/node)
- [`setupServer` API](https://mswjs.io/docs/api/setup-server)

### 它是如何工作的？

Node.js 中并不存在 Service Worker。取而代之，MSW 实现了一套[底层拦截算法](https://github.com/mswjs/interceptors)，它可以复用你在浏览器端完全相同的请求处理函数。这模糊了环境之间的边界，让你能专注于网络行为本身。

### 它有何不同？

- 不 stub `fetch`、`axios` 等。因此，你的测试对模拟过程一无所知；
- 同一份请求处理函数可以复用于本地开发与调试，以及测试。真正实现了跨所有环境和所有工具、关于网络行为的单一事实来源。

### 使用示例

下面是一个在开发 Express 服务器时使用 Mock Service Worker 的示例：

```js
import express from 'express'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const app = express()
const server = setupServer()

app.get(
  '/checkout/session',
  server.boundary((req, res) => {
    // 为这个 Express 路由描述网络行为。
    server.use(
      http.get(
        'https://api.stripe.com/v1/checkout/sessions/:id',
        ({ params }) => {
          return HttpResponse.json({
            id: params.id,
            mode: 'payment',
            status: 'open',
          })
        },
      ),
    )

    // 继续处理结账会话。
    handleSession(req, res)
  }),
)
```

> 此示例展示了 [`server.boundary()`](https://mswjs.io/docs/api/setup-server/boundary)，可将请求拦截限定在某个特定的闭包范围内，非常方便！

## 赞助者

Mock Service Worker 受到全球数十万名工程师的信赖，被 Google、Microsoft、Spotify、Amazon、Netflix 等无数公司使用。尽管如此，它仍然是一个利用业余时间维护的爱好项目，甚至没有能力资助哪怕一名全职贡献者。

**你可以改变这一点！** 考虑[赞助](https://github.com/sponsors/mswjs)这项围绕 API 模拟最具创新性的工作之一。向你的老板和同事提出开源赞助的话题吧。让我们一起建设可持续的开源！

### 黄金赞助者

> 成为我们的_黄金赞助者_，即可在此展示，并享受其它权益，例如问题优先处理以及与我们的专属咨询会话。
>
> **在我们的 [GitHub Sponsors 主页](https://github.com/sponsors/mswjs)了解更多信息**。

<br />

<table>
  <tr>
    <td>
      <a href="https://www.github.com/" target="_blank">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/mswjs/msw/main/media/sponsors/github-light.svg" />
          <img src="https://raw.githubusercontent.com/mswjs/msw/main/media/sponsors/github.svg" alt="GitHub" height="64" />
        </picture>
      </a>
    </td>
    <td>
      <a href="https://workleap.com/" target="_blank">
        <img src="https://raw.githubusercontent.com/mswjs/msw/main/media/sponsors/workleap.svg" alt="Workleap" height="64" width="174" />
      </a>
    </td>
    <td>
      <a href="https://www.chromatic.com/?ref=mswjs" target="_blank">
        <img src="https://raw.githubusercontent.com/mswjs/msw/main/media/sponsors/chromatic.svg" alt="Chromatic" height="64" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://stackblitz.com/" target="_blank">
        <img src="https://raw.githubusercontent.com/mswjs/msw/main/media/sponsors/stackblitz.svg" alt="StackBlitz" height="64" />
      </a>
    </td>
    <td align="center">
      <a href="https://coderabbit.link/mswjs" target="_blank">
        <img src="https://raw.githubusercontent.com/mswjs/msw/main/media/sponsors/coderabbit.svg" alt="CodeRabbit" height="64" />
      </a>
    </td>
  </tr>
</table>

### 白银赞助者

> 成为我们的_白银赞助者_，即可在此展示你的头像和链接。
>
> **在我们的 [GitHub Sponsors 主页](https://github.com/sponsors/mswjs)了解更多信息**。

<br />

<table>
  <tr>
    <td>
      <a href="https://www.replay.io/" target="_blank">
        <img src="https://raw.githubusercontent.com/mswjs/msw/main/media/sponsors/replay.svg" alt="Replay" height="64" />
      </a>
    </td>
    <td>
      <a href="https://codemod.com/" target="_blank">
        <img src="https://raw.githubusercontent.com/mswjs/msw/main/media/sponsors/codemod.svg" alt="Codemod" height="64" width="128" />
      </a>
    </td>
    <td>
      <a href="https://github.com/ryanmagoon" target="_blank">
        <img src="https://github.com/ryanmagoon.png" alt="Ryan Magoon" height="64" />
      </a>
    </td>
  </tr>
</table>

### 青铜赞助者

> 成为我们的_青铜赞助者_，即可在此板块展示你的头像和链接。
>
> **在我们的 [GitHub Sponsors 主页](https://github.com/sponsors/mswjs)了解更多信息**。

<br />

<table>
  <tr>
    <td>
      <a href="https://materialize.com/" target="_blank">
        <img src="https://raw.githubusercontent.com/mswjs/msw/main/media/sponsors/materialize.svg" alt="Materialize" height="64" />
      </a>
    </td>
    <td>
      <a href="https://trigger.dev/" target="_blank">
        <img src="https://raw.githubusercontent.com/mswjs/msw/main/media/sponsors/trigger-dev.png" alt="Trigger.dev" height="64" />
      </a>
    </td>
    <td>
      <a href="https://vital.io/" target="_blank">
        <img src="https://raw.githubusercontent.com/mswjs/msw/main/media/sponsors/vital.svg" alt="Vital" width="64" />
      </a>
    </td>
  </tr>
</table>

## 奖项与提名

能获得社区因 Mock Service Worker 为 JavaScript 生态带来的创新与影响力而授予的奖项和提名，我们深感荣幸。

<table>
  <tr valign="middle">
    <td width="124">
      <img src="https://raw.githubusercontent.com/mswjs/msw/main/media/tech-radar.png" width="124" alt="技术雷达">
    </td>
    <td>
      <h4>值得关注的技术方案</h4>
      <p><em><a href="https://www.thoughtworks.com/radar/languages-and-frameworks/mock-service-worker">技术雷达</a>（2020–2021）</em></p>
    </td>
  </tr>
  <tr>
    <td width="124">
      <img src="https://raw.githubusercontent.com/mswjs/msw/main/media/os-awards.png" width="124" alt="2020 开源大奖">
    </td>
    <td>
      <h4>最令人兴奋的技术运用</h4>
      <p><em><a href="https://osawards.com/javascript/2020">开源大奖</a>（2020）</em></p>
    </td>
  </tr>
</table>

## 特别感谢

感谢 [Blacksmith](https://www.blacksmith.sh/) 提供快 10 倍的远程构建。

<a href="https://www.blacksmith.sh/" target="_blank">
  <img src="https://raw.githubusercontent.com/mswjs/msw/main/media/blacksmith-powered-wob.png" alt="由 Blacksmith 提供 CI 支持" width="300" />
</a>
