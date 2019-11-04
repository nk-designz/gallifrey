#!/usr/bin/ruby
# frozen_string_literal: true

require 'json'
require 'src/s3_controller.rb'
require 'src/db_controller.rb'
require 'src/post_model.rb'

# Interface to database and s3
class Treehouse
  def initialize
    @s3_image_store = S3ImageStore.new
    @meta_database = MetaDatabase.new
  end

  def newest_list(count)
    count = 10 if count > 10
    list = @meta_database.list_newest(count)
    list.to_json
  end

  def random_list(count)
    count = 10 if count > 10
    list = @meta_database.list_random(count)
    list.to_json
  end

  def add_new_post(response)
    new_post = Post.from_json(response)
    image_s3_key = new_post.id + new_post.user
    image_s3_key = @s3_image_store.upload_image(image_s3_key, new_post.image)
    @meta_database.new(
      new_post.id,
      new_post.heading,
      new_post.user,
      new_post.license,
      new_post.tags.to_json,
      Time.now.strftime('%Y-%m-%d %H:%M:%S'),
      image_s3_key,
      new_post.description
    )
    [post_id: new_post.id].to_json
  end

  def get_post(post_id)
    heading = @meta_database.get(post_id, :heading)
    user = @meta_database.get(post_id, :user)
    licence = @meta_database.get(post_id, :license)
    tags = JSON.parse(@meta_database.get(post_id, :tags))
    date = @meta_database.get(post_id, :date)
    image_key = @meta_database.get(post_id, :image_s3_key)
    description = @meta_database.get(post_id, :description)
    #image_url = @s3_image_store.get_image_url(image_key)
    Post.new(heading, user, licence, tags, date, image_key, description).to_json
  end
end
