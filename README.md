# Open Roles — AI Startup Job Board

42 个职位，11 家 AI 创业公司。纯静态站点，零依赖。

## 部署

### GitHub Pages
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/你的用户名/job-board.git
git push -u origin main
```
然后 Settings → Pages → Branch: main → Save

### 本地预览
```bash
npx serve .
```

## 增删职位
1. 编辑 `js/data.js`
2. 运行 `node generate.js`

## License
MIT
