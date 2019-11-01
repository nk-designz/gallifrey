FROM ruby:alpine
RUN apk update && apk upgrade && apk add build-base

ENV APP_ROOT /var/www/docker-sinatra
RUN mkdir -p $APP_ROOT
WORKDIR $APP_ROOT
ADD Gemfile* $APP_ROOT/
ADD config.yaml /etc/s3/config.yaml
RUN bundle install
ADD . $APP_ROOT

EXPOSE 80
CMD ["bundle", "exec", "rackup", "config.ru", "-p", "80","-o", "0.0.0.0"]
