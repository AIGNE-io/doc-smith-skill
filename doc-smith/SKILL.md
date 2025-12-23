---
name: doc-smith
description: "从工作区数据源生成全面的文档，包括代码仓库、文本文件和媒体资源。当用户请求以下操作时使用此技能：(1) 从代码或文件创建或生成文档，(2) 构建文档结构或文档详情，(3) 分析工作区内容以生成有组织的文档，(4) 将代码/项目内容转换为可读文档。支持技术文档、用户指南、API 参考和一般文档需求。"
---

# DocSmith

从工作区数据源生成结构化文档。

## 概述

DocSmith 分析工作区内容（代码、文件、媒体）并生成：
1. 用户意图描述（`user_intent.md`）
2. 文档结构计划（`document_structure.yaml`）
3. 按层次组织的 Markdown 文档文件

所有输出都创建在 `.aigne/doc-smith/` 目录中。

## 工作流程

按以下步骤依次执行：

### 1. 分析工作区

探索工作区以了解可用的数据源：

```bash
# 查找相关文件
find . -type f -name "*.md" -o -name "*.py" -o -name "*.js" # 等

# 或使用 Glob/Grep 工具发现：
# - 包含文档的代码文件
# - README 文件
# - 现有文档
# - 媒体资源（图片、视频）
```

**需要收集的关键信息：**
- 项目目的和结构
- 主要模块/组件
- 现有文档
- 代码注释和文档字符串
- 可引用的媒体资源

### 2. 推断用户意图

**⚠️ 这是文档规划的关键前置步骤。**

基于工作区分析结果，自动推断并生成用户意图描述。用户意图将指导后续的文档结构规划，避免生成大而全、不聚焦的文档。

**推断内容：**
1. **目标用户**：谁会阅读这份文档？（开发者、最终用户、运维人员等）
2. **主要使用场景**：用户在什么情况下查阅文档？
3. **文档侧重点**：使用指南型、参考手册型、快速上手型或架构说明型

**生成文件：** `.aigne/doc-smith/output/user_intent.md`

**交互策略：**
- 自动生成用户意图，向用户展示完整意图
- 用户可通过自然语言提出调整建议
- 每次修改后重新展示完整意图并询问确认
- 支持多轮调整，直到用户确认
- 用户确认后才进入下一步（规划文档结构）

**详细指南：** 参见 [user_intent_guide.md](references/user_intent_guide.md)，包含：
- 如何推断目标用户、使用场景和文档侧重点
- user_intent.md 模板和示例
- 交互策略和示例交互流程

### 3. 规划文档结构

**基于用户意图**，设计聚焦且实用的文档层次结构。

**核心原则：**
- 目标用户决定文档类型
- 使用场景决定文档范围
- 侧重点决定详细程度

**规划策略：**
- **最小必要原则**：只规划用户意图中明确需要的文档
- **聚焦核心场景**：优先覆盖用户的主要使用场景
- **适度深度**：根据用户需求决定嵌套层级

**拆分判断：**
- 应该拆分：内容量大、独立性强、无重复、可独立查阅
- 不应拆分：内容单薄、有重复依赖、顺序步骤、父文档变空壳

**详细指南：** 参见 [structure_planning_guide.md](references/structure_planning_guide.md)，包含：
- 常见问题及避免方法
- 详细的拆分判断标准和清单
- 正确与错误的示例对比

### 4. 生成 document_structure.yaml

按照 schema 创建 `.aigne/doc-smith/output/document_structure.yaml`。

**结构评估：** 使用 [structure_planning_guide.md](references/structure_planning_guide.md) 中的评估清单权衡是否拆分。

**Schema 参考：** 完整格式和示例请参见 [document_structure_schema.md](references/document_structure_schema.md)。

**快速模板：**
```yaml
project:
  title: "项目名称"
  description: "项目简要描述"

documents:
  - title: "文档标题"
    description: "此文档涵盖的内容"
    path: "/filename.md"
    sourcePaths:
      - "path/to/source/file.py"
    icon: "lucide:icon-name"  # 仅顶层文档需要
    children:  # 可选的嵌套
      - title: "嵌套文档"
        description: "详细信息"
        path: "/section/nested.md"
        sourcePaths: []
```

**关键要求：**
- `path`：必须以 `/` 开头，以 `.md` 结尾
- `sourcePaths`：相对路径，不要使用 `workspace:` 前缀，如果没有则使用 `[]`
- `icon`：顶层文档必需，格式为 `lucide:icon-name`，参见 https://lucide.dev/icons
- 子文档不需要 icons

**⚠️ 生成 YAML 后，不要立即开始生成文档内容，先进入确认步骤。**

### 5. 确认文档结构

**⚠️ 这是避免浪费资源的关键检查点。**

生成 `document_structure.yaml` 后，必须先向用户展示规划的文档结构，获得确认后再继续。

**展示内容：**
- 文档总数
- 文档层次结构（使用 emoji 和缩进）
- 每个文档的标题、描述和主要源文件

**处理反馈类型：**
1. 删除文档
2. 添加文档
3. 调整层次（合并/拆分/调整父子关系）
4. 修改内容范围
5. 确认无误（继续生成）

**关键原则：**
- 每次修改后必须重新展示完整结构
- 支持多轮调整，直到用户确认满意
- 绝对不要在用户确认前开始生成文档内容

**详细指南：** 参见 [structure_confirmation_guide.md](references/structure_confirmation_guide.md)，包含：
- 展示格式示例和 emoji 使用建议
- 处理各类用户反馈的详细操作步骤
- 完整的多轮交互示例

### 6. 生成文档内容

为结构中的每个文档在 `.aigne/doc-smith/docs/` 中创建 markdown 文件：

**文件命名：** 使用 YAML 中的 `path`（例如：`/api/auth.md` → `docs/api/auth.md`）

**内容指南：**
- 从 `sourcePaths` 列出的文件中提取信息
- 根据需要读取更多文件内容补充上下文
- 使用相对路径或 markdown 语法引用媒体资源
- 编写清晰、结构化的内容，包含标题和章节

**示例：**
```markdown
# 身份验证

学习如何验证 API 请求。

## 概述
[从源文件中提取]

## 方法
[文档化身份验证方式]

## 示例
[来自 sourcePaths 的代码片段]

---
**相关：** [API 参考](/api.md) | [快速开始](/getting-started.md)
```

### 7. 链接相关文档

**在文档开头和结尾**，添加指向相关文档的导航链接：

```markdown
<!-- 开头 -->
**前置条件：** [快速开始](/getting-started.md)

[主要内容]

<!-- 结尾 -->
---
**相关文档：**
- [API 参考](/api.md)
- [示例](/examples.md)
- [故障排查](/troubleshooting.md)
```

**链接策略：**
- 开头：前置条件、父主题
- 结尾：相关主题、下一步、子文档
- 使用与文档 `path` 值匹配的相对路径

## 输出结构

完成后：

```
.aigne/doc-smith/
├── output/
│   ├── user_intent.md             # 用户意图描述
│   └── document_structure.yaml    # 文档计划
└── docs/
    ├── overview.md                # 生成的文档
    ├── getting-started.md
    └── api/
        └── authentication.md
```

## 媒体资源

当工作区中存在媒体文件（图片、视频）时：

**发现：**
```bash
find . -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.gif" -o -name "*.mp4" \)
```

**在 markdown 中引用：**
```markdown
![架构图](../path/to/diagram.png)

<!-- 或相对于文档位置 -->
![截图](../../screenshots/ui.png)
```

**不要复制**媒体文件。直接从它们的工作区位置引用。

## 最佳实践

1. **始终基于用户意图**：先生成 `user_intent.md`，所有后续规划和生成都应参考它
2. **最小必要原则**：只生成用户意图中明确需要的文档，避免大而全
3. **多轮确认机制**：
   - 用户意图：自动生成后展示，支持多轮调整，用户确认后才规划结构
   - 文档结构：生成后展示，支持多轮调整，用户确认后才生成内容
4. **因项目而异**：小型项目扁平，中大型项目合理嵌套，以用户体验为准
5. **避免内容重复**：如果子文档之间或与父文档有重复，说明拆分不合理
6. **用户视角思考**：考虑用户的阅读习惯和查阅需求
   - 顺序任务（如快速开始）→ 单一文档
   - 独立模块（如不同 API 类别）→ 可以嵌套
7. **基于源文件结构**：如果工作区已有清晰的模块划分，可以映射到文档结构
8. **批量执行**：生成文档内容相对独立，优先批量执行，缩短执行时间
9. **使用源上下文**：从 `sourcePaths` 文件中提取实际内容
10. **保持一致性**：如果存在现有文档，遵循其风格
11. **验证路径**：确保所有文件路径和链接都正确
12. **检查 schema**：在生成文档之前验证 YAML 是否符合所需格式
