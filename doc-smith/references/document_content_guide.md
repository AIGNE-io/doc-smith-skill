# 文档内容生成指南

本指南定义了生成 markdown 文档时的内容要求和格式规范。

## 基本要求

为结构中的每个文档在 `.aigne/doc-smith/docs/` 中创建 markdown 文件：
- 使用 YAML 中的 `path` 作为文件路径
- 从 `sourcePaths` 提取信息
- 编写清晰、结构化的内容
- **在生成文档内容时主动添加图片**（参见"媒体资源"章节）

## 导航链接

在每个文档中添加导航链接，引导用户在文档之间流畅跳转。

### 文档开头导航

在文档正文开始前添加：
- **前置条件**：阅读本文档前建议先了解的内容
- **父主题**：当前文档所属的上级主题

### 文档结尾导航

在文档末尾添加：
- **相关主题**：与当前文档相关的其他文档
- **下一步**：建议阅读的后续内容
- **子文档**：当前文档包含的子主题列表

## 媒体资源

### 前置准备：查找所有媒体文件

**在开始生成文档前，必须先执行一次媒体文件查找**，了解工作区中可用的图片资源：

```bash
find . -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.svg" -o -name "*.mp4" -o -name "*.webp" \)
```

记录所有图片的路径和文件名，在生成每个文档时使用这个列表来匹配合适的图片。

### 生成文档时的图片处理

在编写每个文档的内容时，需要主动思考并添加图片：

#### 1. 识别图片需求场景

当写到以下类型的内容时，**必须考虑添加图片**：

- **架构说明**：系统架构、模块关系、组件结构等
- **流程说明**：业务流程、数据流向、状态转换等
- **时序说明**：交互时序、调用链路等
- **界面介绍**：用户界面、操作步骤、功能演示等
- **概念解释**：概念关系、层次结构等
- **数据结构**：类图、ER 图、数据模型等

**关键原则：**
- 边写内容边思考：这段内容用图片展示会不会更清晰？
- 对于技术文档、架构说明、用户指南等，图片不是可选的，而是必需的
- 宁可多用图片，也不要遗漏重要的视觉辅助

#### 2. 优先使用已有图片

当确定需要图片时：

1. **从前置准备步骤的查找结果中匹配图片**
2. 根据文件名、路径、文件夹结构分析图片用途
3. 特别关注与当前文档主题相关的图片：
   - 应用截图通常在 screenshots、images、assets 等目录
   - 架构图可能命名为 architecture、diagram、structure 等
   - 根据文件名判断图片内容（如 login.png、dashboard.png）

4. 找到合适的图片后，在文档的恰当位置引用：

```markdown
系统采用三层架构设计：

![系统架构图](../images/architecture.png)

该架构由前端、后端和数据库三部分组成...
```

**重要提醒**：不要复制媒体文件，直接从它们的工作区位置引用。

#### 3. 生成图片 Slot

如果没有找到合适的已有图片，但内容确实需要图片辅助说明，则必须生成 AFS Image Slot：

AFS Image Slot Instructions

Use an AFS image slot only when you want to generate a new image.

Slot format (single line):
<!-- afs:image id="img-001" desc="..." -->
Optional stable intent key:
<!-- afs:image id="img-001" key="afs-context-flow" desc="..." -->

Rules:

- Insert a slot only for new image generation.
  If the source already provides an image (existing URL/path/asset), reference it normally; do not create a slot.
- id is required, unique in the same document, and must match: [a-z0-9._-]+
  Use sequential ids: img-001, img-002, ...
- desc is required, concise, double-quoted, and must not contain ".
- key is optional; use a short stable token ([a-z0-9._-]+) when you want stable reuse across edits/sections.

### 媒体使用最佳实践

1. **使用描述性的 alt 文本**：准确描述图片内容
2. **保持路径简洁**：使用相对路径，便于文档移动
3. **添加上下文说明**：在图片前后添加说明文字
4. **优先使用已有资源**：先检查工作区中是否有合适的图片，避免重复生成

## 内容组织原则

1. **层次清晰**：使用恰当的标题层级（H1-H6）
2. **段落简洁**：每个段落专注于单一主题
3. **代码示例**：提供实用的代码示例和说明
4. **列表使用**：用列表组织并列信息
5. **强调重点**：使用粗体、引用等方式突出重要信息
