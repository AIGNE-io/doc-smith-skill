# 项目自定义要求

## 项目概述

本项目用于维护和管理 Claude Code Agent Skills。

## 核心规则

1. **项目结构**
   - 每个文件夹是一个独立的 Skill
   - 每个 Skill 必须包含 `SKILL.md` 文件作为主文档

2. **语言要求**
   - 所有 Skill 的提示词必须使用中文编写

3. **开发规范**
   - 创建或修改 Skill 时，必须使用 `/skill-creator` 获取最佳实践和开发指导
   - 遵循 skill-creator 中定义的所有规范和要求

## 工作流程

### 创建新 Skill

```bash
# 1. 使用 skill-creator 获取指导
/skill-creator

# 2. 按照 skill-creator 的指导创建 Skill 文件夹和内容
```

### 修改现有 Skill

```bash
# 1. 如需要，使用 skill-creator 获取更新指导
/skill-creator

# 2. 编辑 Skill 文件
```

## 重要提醒

- 具体的 Skill 开发规范、文件结构、内容要求等，请通过 `/skill-creator` 动态获取
- skill-creator 会提供最新的最佳实践和详细指导
