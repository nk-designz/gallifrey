FROM ubuntu as fetcher
RUN mkdir /opt/logstash
WORKDIR /opt/logstash
RUN apt update && apt install wget -y
RUN wget https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-8.0.18.tar.gz
RUN tar -xvf *
RUN rm mysql-connector-java-8.0.18.tar.gz

FROM logstash:6.8.5
COPY --from=fetcher /opt/logstash/mysql-connector-java-8.0.18 /opt
ADD ./logstash.conf /usr/share/logstash/pipeline/logstash.conf
ADD ./logstash.yaml /usr/share/logstash/config/logstash.yml