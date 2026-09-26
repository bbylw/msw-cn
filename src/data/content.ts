/**
 * Single source of truth for every visible string on the page.
 * Content is a faithful Chinese rendering of the MSW README.
 */

export const site = {
  name: 'Mock Service Worker',
  headline: 'JavaScript 领域的行业标准 API 模拟方案',
  sub: '在网络层面拦截请求，用你的 mock 定义直接作答，应用代码一行都不用改。',
  primaryCta: { label: '快速上手', href: 'https://mswjs.io/docs/quick-start' },
  secondaryCta: { label: '观看演示', href: '#browser' },
} as const;

export const nav = [
  { href: '#features', label: '特性' },
  { href: '#browser', label: '浏览器' },
  { href: '#node', label: 'Node.js' },
  { href: '#docs', label: '文档' },
] as const;

export const companies = [
  { name: 'Google', file: '/media/companies/google.svg' },
  { name: 'Microsoft', file: '/media/companies/microsoft.svg' },
  { name: 'Spotify', file: '/media/companies/spotify.svg' },
  { name: 'Amazon', file: '/media/companies/amazon.svg' },
  { name: 'Netflix', file: '/media/companies/netflix.svg' },
] as const;
export const features = [
  {
    title: '无缝集成',
    body: '为你提供一层专属的请求拦截层。你的应用代码和测试都无需感知某个请求是否被模拟。',
    span: 'wide' as const,
    note: '不改应用代码，也不改数据请求层。',
  },
  {
    title: '零偏差',
    body: '请求与生产环境完全一致的真实资源，从而测试应用的真实行为。既能扩展已有 API，也能在 API 还不存在时按需设计它。',
    span: 'tall' as const,
    note: '请求头、状态码、响应体都与真实调用保持同构。',
  },
  {
    title: '熟悉且强大',
    body: '类 Express 路由语法，参数、通配符、正则都能匹配。状态码、请求头、Cookie、延迟，或完全自定义的解析函数。',
    span: 'short' as const,
    note: 'fetch, axios, react-query',
  },
] as const;

export const quote = {
  body: '这些 mock 不必写在 Service Worker 里，而是可以和应用其余部分放在一起。这让采用它变得极其简单。',
  author: 'Kent C. Dodds',
  role: 'Testing Library 作者',
  href: 'https://twitter.com/kentcdodds',
} as const;

export const browser = {
  body: '它利用 Service Worker API 在网络层面用你的 mock 定义来响应被拦截的请求，而这套 API 本来是用于缓存的。',
  apiLinks: [
    { label: 'setupWorker API', href: 'https://mswjs.io/docs/api/setup-worker' },
    { label: '浏览器集成', href: 'https://mswjs.io/docs/integrations/browser' },
  ],
  points: [
    '在请求已经发起并离开你的应用之后才拦截，所以你的全部代码照常运行。',
    '把你的应用想成一个盒子。市面上的模拟库都会打开盒子，换掉负责请求的部分。MSW 让盒子保持原样。',
    '再也不用 stub fetch、axios、react-query。',
    '同一份 mock 定义可复用于单元测试、集成测试和 E2E 测试，本地开发与调试当然也支持。',
  ],
  hint: '请求处理函数完全在客户端执行，因此可以用 TypeScript、第三方库和你的内部逻辑来写 mock。',
} as const;

export const browserCode = `// 1. 导入库
import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'

// 2. 用请求处理函数描述网络行为
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

// 3. 启动 Service Worker，开始模拟
await worker.start()`;

export const node = {
  body: 'Node.js 中并不存在 Service Worker。取而代之，MSW 实现了一套底层拦截算法，复用你在浏览器端完全相同的请求处理函数。',
  apiLinks: [
    { label: 'setupServer API', href: 'https://mswjs.io/docs/api/setup-server' },
    { label: 'Node.js 集成', href: 'https://mswjs.io/docs/integrations/node' },
  ],
  points: [
    '不 stub fetch、axios，因此你的测试对模拟过程一无所知。',
    '同一份请求处理函数复用于开发、调试和测试，成为所有环境里关于网络行为的单一事实来源。',
  ],
  code: `app.get(
  '/checkout/session',
  server.boundary((req, res) => {
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

    handleSession(req, res)
  }),
)`,
  hint: 'server.boundary() 把请求拦截限定在某个闭包范围内。',
} as const;

export const docs = [
  { label: '文档', desc: '要了解 Mock Service Worker，这是最好的起点。', href: 'https://mswjs.io/docs' },
  { label: '快速上手', desc: '在你的项目里跑起来，只需要几分钟。', href: 'https://mswjs.io/docs/quick-start' },
  { label: '常见问题', desc: '安装、配置与疑难杂症。', href: 'https://mswjs.io/docs/faq' },
  { label: '使用示例', desc: '覆盖主流框架的示例仓库。', href: 'https://github.com/mswjs/examples' },
] as const;

export const courses = [
  {
    title: '模拟 REST 与 GraphQL API',
    desc: '与 Egghead 合作的课程，学习 Web 端 API 模拟的最佳实践。版税收入用于支撑项目开发。',
    href: 'https://egghead.io/courses/mock-rest-and-graphql-apis-with-mock-service-worker-8d471ece?af=8mci9b',
  },
  {
    title: '模拟并测试 WebSocket API',
    desc: '把同一套 mock 延伸到实时通信场景，连同测试一起覆盖。',
    href: 'https://egghead.io/courses/mocking-websocket-apis-with-mock-service-worker-9933b7f5',
  },
] as const;

export const awards = [
  {
    title: '值得关注的技术方案',
    source: '技术雷达 2020 至 2021',
    href: 'https://www.thoughtworks.com/radar/languages-and-frameworks/mock-service-worker',
    img: '/media/tech-radar.png',
    alt: 'Thoughtworks 技术雷达图标',
  },
  {
    title: '最令人兴奋的技术运用',
    source: '开源大奖 2020',
    href: 'https://osawards.com/javascript/2020',
    img: '/media/os-awards.png',
    alt: '开源大奖 2020 图标',
  },
] as const;

export const thanks = {
  body: '远程构建由 Blacksmith 提供，速度快 10 倍。',
  href: 'https://www.blacksmith.sh/',
  img: '/media/blacksmith-powered-wob.png',
  alt: '由 Blacksmith 提供 CI 支持',
} as const;
