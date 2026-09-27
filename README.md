# 李昆蓉个人主页与博客

基于 Astro 7、TypeScript、原生 CSS 与 Markdown Content Collections 的中英双语静态网站。中文位于根路径，英文位于 `/en/`；目标站点为 [lkrr1213.github.io](https://lkrr1213.github.io/)。

## 本地开发

需要 Node.js 24 和 npm。在 Windows PowerShell 中使用 `npm.cmd`：

```powershell
npm.cmd ci
npm.cmd run dev
```

开发服务器默认使用 `http://localhost:4321/`。提交前运行：

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview
```

`check` 同时检查内容的 `lang + slug` 唯一性、文件名、日期及项目双语排序，再执行 `astro check`。`build` 也会先校验内容，产物位于 `dist/`。`preview` 用于在本地查看构建后的页面。

## 更新内容

项目放在 `src/content/projects/`，文章放在 `src/content/posts/`，使用 `slug.zh.md` 和 `slug.en.md` 命名。同一内容的两种语言使用相同的 `slug`，它也是公开网址的一部分。修改标题不需要改网址；已经发布的 slug 应保持稳定。

新增文章时复制 `src/content/posts/writing-template.zh.md`，换成新的 slug、标题、摘要、标签、真实发布日期和正文。英文版放在同目录的 `slug.en.md`。新增项目时参考现有项目文件，填写 `period`、`role`、`order`、`featured` 等字段并写正文。项目正文按「背景 → 我的角色与贡献 → 方法与实现 → 已有成果」组织。英文正文忠实对应，不臆造数据或链接。

`draft: true` 的内容不会生成公开路由，也不会进入列表或 sitemap。准备发布时，先核对事实与翻译，设置 `draft: false`，按实际首次发布日期更新 `publishedAt`，然后运行 `check` 和 `build`。若某一语言尚未完成，另一语言的详情页会显示无译文提示，语言切换不会链接到草稿。

导航和全站文案在 `src/lib/site.ts` 中维护；项目及文章元数据在 Markdown 中维护。站点地址和邮箱也集中在该文件。修改站点地址时，还需同步 `astro.config.mjs` 的 `site`。

## 发布与回退

公开仓库使用 `lkrr1213/lkrr1213.github.io`，主分支为 `main`。GitHub Pages 来源设为 **GitHub Actions**。推送到 `main` 会运行 `.github/workflows/deploy.yml`：先安装、内容校验与类型检查，再构建并部署；Actions 页面也可用 `workflow_dispatch` 手动运行。检查失败时部署不会启动。

日常流程是修改 Markdown → `npm.cmd run check` → `npm.cmd run build` → 提交并推送 → 查看 Actions 与线上网站。若部署失败，打开该次 Actions 运行记录，先检查 `Validate content and types` 与 `Build and upload site` 的日志，再确认仓库 Settings → Pages 的来源为 GitHub Actions，以及工作流拥有 Pages 权限。回退时恢复到已知正常内容，创建新提交并推送；不要强制推送主分支。

不要将原始简历、个人证件照、手机号、令牌或 `.env` 文件提交到公开仓库。`dist/`、`node_modules/` 和本地验收截图目录 `verification/` 已被忽略。
