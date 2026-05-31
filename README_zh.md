
# gal3d-docs

[gal3d](https://github.com/GalaxySimAnalytics/gal3d) 的文档仓库。

[English](README.md)

## 环境要求

- Python >= 3.11
- `uv`
- 本地 `gal3d` 源码目录位于 `../gal3d`

## 初始化

```bash
make setup
```

## 常用命令

初始化环境：

```bash
make setup
```

生成 API 文档页面：

```bash
make api
```

构建英文文档：

```bash
make docs
```

构建中文文档：

```bash
make docs-zh
```

启动实时预览：

```bash
make live
make live-zh
```

更新翻译条目：

```bash
make i18n
```

编译翻译文件：

```bash
make -C docs compile-translations
```

清理构建产物：

```bash
make clean
```

## 工作流程

普通文档更新：

```bash
make setup
make api
make docs
```

翻译更新：

```bash
make setup
make i18n
make -C docs compile-translations
make docs-zh
```

RTD 构建步骤：

```bash
make api
make -C docs compile-translations
```