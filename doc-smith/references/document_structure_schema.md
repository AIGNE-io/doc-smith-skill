# 文档结构 Schema

本参考定义了 `document_structure.yaml` 的完整 schema。

## 完整的 YAML 结构

```yaml
project:
  title: "项目名称"           # 必需：项目名称
  description: "项目概述"     # 必需：项目简要描述

documents:                    # 必需：文档对象数组
  - title: "文档标题"         # 必需：文档标题
    description: "简要摘要"   # 必需：此文档涵盖的内容
    path: "/filename.md"      # 必需：相对于 .aigne/doc-smith/docs/ 的路径
                              # 示例：/overview.md, /getting-started.md, /api/authentication.md
    sourcePaths:              # 必需：源文件路径数组（相对路径，不使用 'workspace:' 前缀）
      - "src/main.py"         # 为此文档内容提供信息的文件
      - "README.md"           # 如果没有特定源文件则使用空数组 []
    icon: "lucide:book-open"  # 仅顶层文档必需
                              # 必须是有效的 Lucide 图标名称："lucide:icon-name"
                              # 示例：lucide:book-open, lucide:settings, lucide:code
                              # 嵌套文档省略此字段
    children:                 # 可选：嵌套文档（相同结构）
      - title: "嵌套文档"
        description: "详细信息"
        path: "/section/nested.md"
        sourcePaths:
          - "src/utils.py"
        # 嵌套文档不需要 icon
```

## 字段详解

### project
- **title**：项目名称（字符串）
- **description**：项目简要概述（字符串）

### documents（数组）
每个文档对象包含：

- **title**（必需）：文档的显示标题
- **description**（必需）：内容简要摘要
- **path**（必需）：相对于 `.aigne/doc-smith/docs/` 的文件路径
  - 必须以 `/` 开头
  - 必须以 `.md` 结尾
  - 可以包含子目录：`/api/endpoints.md`
- **sourcePaths**（必需）：源文件路径数组
  - 相对于工作区根目录的路径
  - 不要包含 `workspace:` 前缀
  - 如果没有特定源文件则使用 `[]`
- **icon**（仅顶层文档必需）：Lucide 图标标识符
  - 格式：`lucide:icon-name`
  - 仅用于根级别的文档（不是子文档）
  - 示例：`lucide:home`, `lucide:file-text`, `lucide:settings`
  - 可用图标请参见 https://lucide.dev/icons
- **children**（可选）：具有相同结构的嵌套文档数组
  - 可以嵌套多层
  - 子文档不需要 icons

## 示例

### 简单扁平结构（小型项目）
```yaml
project:
  title: "简单 API 服务"
  description: "轻量级 REST API 参考和指南"

documents:
  - title: "概述"
    description: "API 介绍和核心概念"
    path: "/overview.md"
    sourcePaths:
      - "README.md"
    icon: "lucide:home"

  - title: "快速开始"
    description: "安装、配置和第一个请求"
    path: "/getting-started.md"
    sourcePaths:
      - "docs/installation.md"
      - "docs/quickstart.md"
    icon: "lucide:rocket"

  - title: "身份验证"
    description: "API 身份验证方法"
    path: "/auth.md"
    sourcePaths:
      - "src/auth/README.md"
      - "src/auth/oauth.py"
    icon: "lucide:key"
```

### 适度嵌套（中型项目）
```yaml
project:
  title: "Web 开发框架"
  description: "全功能 Web 框架文档"

documents:
  - title: "概述"
    description: "框架介绍、核心概念和设计理念"
    path: "/overview.md"
    sourcePaths:
      - "README.md"
      - "docs/philosophy.md"
    icon: "lucide:home"

  - title: "快速开始"
    description: "安装、Hello World 和基础配置"
    path: "/getting-started.md"
    sourcePaths:
      - "docs/installation.md"
      - "docs/tutorial.md"
    icon: "lucide:rocket"

  - title: "核心功能"
    description: "框架核心功能模块详解"
    path: "/core-features.md"
    sourcePaths:
      - "src/core/"
    icon: "lucide:box"
    children:
      # ✅ 合理拆分 - 每个模块都是独立的功能系统
      - title: "路由系统"
        description: "URL 路由、路由匹配、中间件和路由组"
        path: "/core-features/routing.md"
        sourcePaths:
          - "src/routing/"
          - "docs/routing.md"

      - title: "数据库 ORM"
        description: "模型定义、查询构建、关系和迁移"
        path: "/core-features/database.md"
        sourcePaths:
          - "src/database/"
          - "docs/database.md"

  - title: "部署指南"
    description: "生产环境部署和性能优化"
    path: "/deployment.md"
    sourcePaths:
      - "docs/deployment.md"
    icon: "lucide:server"
```

### 深度嵌套（大型项目）

**⚠️ 注意：** 仅在父主题内容确实丰富（5+ 章节）且子文档完全独立时才使用嵌套结构。

```yaml
project:
  title: "企业级 API 平台"
  description: "大型 API 平台文档"

documents:
  - title: "快速开始"
    description: "5 分钟快速入门：安装、首次调用、基础配置"
    path: "/getting-started.md"
    sourcePaths:
      - "docs/installation.md"
      - "docs/quickstart.md"
    icon: "lucide:rocket"
    # ✅ 不拆分子文档 - 用户需要顺序完成这些步骤

  - title: "API 参考"
    description: "完整的 API 端点文档（100+ 端点）"
    path: "/api.md"
    sourcePaths:
      - "src/api/"
    icon: "lucide:code"
    children:
      # ✅ 合理拆分 - 每个类别有 20+ 个端点
      - title: "用户管理 API"
        description: "用户认证、权限、配置相关的 25+ 端点"
        path: "/api/users.md"
        sourcePaths:
          - "src/api/users/"
          - "src/api/auth/"

      - title: "数据操作 API"
        description: "数据创建、查询、更新、删除的 30+ 端点"
        path: "/api/data.md"
        sourcePaths:
          - "src/api/data/"
```

## 最佳实践

1. **因项目制宜**：根据项目规模和内容复杂度选择合适的结构
   - 小型项目（< 8 模块）：扁平结构
   - 中型项目（9-18 模块）：1 层嵌套
   - 大型项目（18+ 模块）：最多 2 层嵌套
2. **合理嵌套**：内容丰富且独立的模块可以创建子文档
3. **避免内容重复**：如果子文档之间有重复内容，应该合并
4. **逻辑层次**：在父主题下组织相关文档
5. **清晰路径**：使用与文档标题匹配的描述性路径名称
6. **相关源文件**：包含所有为文档内容提供信息的文件
7. **合适的图标**：选择代表文档用途的图标
8. **控制深度**：避免嵌套过深（建议最多 2 层）
9. **一致的描述**：保持描述简洁但信息丰富
