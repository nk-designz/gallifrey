#!/usr/bin/ruby
# frozen_string_literal: true

require 'sinatra'
require 'sinatra/cross_origin'
require 'src/s3_controller.rb'

# Sinatra Endpoint
class App < Sinatra::Base
  configure do
    enable :logging
    enable :cross_origin
    set :s3_instance, S3Controller.new
  end

  before do
    response.headers['Access-Control-Allow-Origin'] = '*'
  end

  options '*' do
    response.headers['Allow'] = 'GET, PUT, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token'
    response.headers['Access-Control-Allow-Origin'] = '*'
    200
  end

  get '/health' do
    'OK' if settings.s3_instance
  end

  get '/public/:key' do |key|
    resp = settings.s3_instance.get_image(key)
    content_type resp[0]
    resp[1]
  end
end
