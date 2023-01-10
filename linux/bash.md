<!-- @format -->

### EOF

意为 end of file (EOF), 一般配合多行文本使用

```bash
<<EOF
aaaaa
bbbb
cccc
EOF
```

### homebrew
1. homebrew 安装的应用一般放在 /opt/homebrew/Cellar/ 下
2. 查看 homebrew 应用的安装路径 brew list [name]
3. brew 安装node之后没有npm命令，先brew unlink node, 然后brew link  --overwrite node 即可