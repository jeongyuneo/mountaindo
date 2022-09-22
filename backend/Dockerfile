FROM openjdk:8
WORKDIR /var/jenkins_home/workspace/mountainDo/backend
EXPOSE 8080
ARG JAR_FILE=./build/libs/backend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
ENV TZ=Asia/Seoul
RUN apt-get install -y tzdata