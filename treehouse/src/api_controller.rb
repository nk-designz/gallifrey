#!/usr/bin/ruby
# frozen_string_literal: true

require 'sinatra'
require 'src/treehouse_controller.rb'

# Sinatra Endpoint
class App < Sinatra::Base
  configure do
    enable :logging
    set :treehouse_instance, Treehouse.new
  end

  get '/health' do
    'OK' if settings.treehouse_instance
  end

  get '/post/:key' do |key|
    content_type 'applcation/json'
    settings.treehouse_instance.get_post(key)
  end

  post '/post' do
    # send_file open(http://link)
    content_type 'application/json'
    settings.treehouse_instance.add_new_post(request.body.read)
  end

  get '/newest/:count' do |count|
    content_type 'applcation/json'
    settings.treehouse_instance.newest_list(count.to_i)
  end

  get '/random/:count' do |count|
    content_type 'applcation/json'
    settings.treehouse_instance.random_list(count.to_i)
  end
end
