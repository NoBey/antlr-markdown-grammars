# antlr-markdown-grammars


## 构建 antlr 镜像

> npm run build:dockerfile

测试生成 

> docker run -it -v ${PWD}:/antlr antlr -o test test.g4


## 生成 antlr

> npm run build:antlr