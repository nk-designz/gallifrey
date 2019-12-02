#!/usr/bin/ruby
# frozen_string_literal: true

require 'json'
require 'src/db_controller.rb'
require 'src/post_model.rb'

# Interface to database and s3
class Socializer
  def initialize
    @meta_database = MetaDatabase.new
  end

  def get_profile(key)
    puts key
  end

  def update_profile(key)
    puts key
  end

  def add_profile(key)
    puts key
  end

  def del_profile(key)
    puts key
  end
end
