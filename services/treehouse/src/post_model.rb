#!/usr/bin/ruby
# frozen_string_literal: true
require 'securerandom'
require 'json'
require 'base64'

# A Post
class Post
  attr_reader :id, :heading, :user, :license, :tags, :date, :image, :description
  def initialize(
    heading, user, license, tags, image, description,
    id = nil, date = nil
  )
    @id = id || SecureRandom.hex
    @heading = heading
    @user = user
    @license = license
    @date = date || Time.now
    @tags = tags
    @image = image
    @description = description
  end

  def to_json(obj)
    {
      user: @user,
      date: @date,
      license: @license,
      tags: @tags,
      id: @id,
      heading: @heading,
      image: @image,
      description: @description
    }.to_json(obj)
  end

  def self.from_json(response)
    response = JSON.parse(response)
    Post.new(
      response['heading'],
      response['user'],
      response['license'],
      response['tags'],
      Base64.decode64(response['image']),
      response['description'],
      response['date'],
      response['id']
    )
  end
end
