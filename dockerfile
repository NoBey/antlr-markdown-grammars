FROM openjdk:slim
MAINTAINER NoBey <nobey@nobey.cn>
WORKDIR /
ADD antlr-4.9.2-complete.jar antlr.jar
ENV CLASSPATH=.:/antlr.jar:$CLASSPATH
RUN echo 'alias antlr4="java -jar /antlr.jar"' >> ~/.bashrc
RUN echo 'alias antlr="java -jar /antlr.jar"' >> ~/.bashrc
RUN echo 'alias grun="java org.antlr.v4.gui.TestRig"' >> ~/.bashrc
RUN mkdir -p /antlr
WORKDIR /antlr
ENTRYPOINT [ "java", "-jar" ,"/antlr.jar" ]

