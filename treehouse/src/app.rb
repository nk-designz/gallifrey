#!/usr/bin/ruby
# frozen_string_literal: true

require 'sinatra'
require 'src/treehouse.rb'

# Sinatra Endpoint
class App < Sinatra::Base
  configure do
    enable :logging
    set :treehouse_instance, Treehouse.new
  end

  get '/health' do
    'OK' if settings.treehouse_instance
  end

  get '/:key' do |key|
    data = settings.treehouse_instance.get_image(key)
    content_type(data.class == String ? 'applcation/json' : 'image/jpeg')
    data
  end

  post '/:key' do |key|
    # send_file open(http://link)
    content_type 'application/json'
    settings.treehouse_instance.upload_image(key, request.body.read)
  end
end
