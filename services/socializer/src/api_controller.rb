#!/usr/bin/ruby
# frozen_string_literal: true

require 'sinatra'
require 'sinatra/cross_origin'
require 'src/socializer_controller.rb'

# Sinatra Endpoint
class App < Sinatra::Base
  configure do
    enable :logging
    enable :cross_origin
    set :socializer_instance, Socializer.new
  end

  before do
    response.headers['Access-Control-Allow-Origin'] = '*'
  end

  options '*' do
    response.headers['Allow'] = 'GET, PATCH, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token'
    response.headers['Access-Control-Allow-Origin'] = '*'
    200
  end

  get '/health' do
    'OK' if settings.socializer_instance
  end

  get '/profile' do
    content_type 'application/json'
    settings.sozialicer_instance.get_profile(key)
  end

  get '/profile/:key' do |key|
    content_type 'application/json'
    settings.sozialicer_instance.get_profile(key)
  end

  post '/profile' do
    content_type 'application/json'
    settings.sozialicer_instance.add_profile(key, request.body.read)
  end

  patch '/profile' do
    content_type 'application/json'
    settings.sozialicer_instance.update_profile(key, request.body.read)
  end
end
