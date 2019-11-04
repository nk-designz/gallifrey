#!/usr/bin/ruby
# frozen_string_literal: true

# Accepts POST-Blobs, and persists them on S3.
# Returns a JSON with size, name and link of the file.
#

require 'aws-sdk-s3'
require 'json'
require 'securerandom'
require 'yaml'

# S3 Logic
class S3ImageStore
  def initialize
    @conf = read_conf('/etc/treehouse/config.yaml')['s3']
    @conf.freeze
    @s3 = init_client
    init_bucket
  end

  def read_conf(conf_path)
    YAML.safe_load(
      File.read(conf_path)
    )
  end

  def init_client()
    Aws::S3::Client.new(
      endpoint: @conf['endpoint_adress'],
      access_key_id: @conf['access_key_id'],
      secret_access_key: @conf['secret_access_key'],
      force_path_style: true,
      region: @conf['region']
    )
  end

  def init_bucket
    treehouse_bucket = @conf['bucket_name']
    puts "Using Bucket #{treehouse_bucket}..."
    begin
      @s3.head_bucket(
        bucket: treehouse_bucket,
        use_accelerate_endpoint: false
      )
    rescue StandardError
      puts 'Bucket does not exist'
      @s3.create_bucket(bucket: treehouse_bucket)
      puts "Created Bucket #{treehouse_bucket}"
      @s3.put_bucket_acl({
        acl: "public-read",
        bucket: treehouse_bucket,
      })
    end
    true
  end

  def upload_image(image_name, image_data)
    image_key = "#{SecureRandom.hex}-#{image_name}"
    begin
      @s3.put_object(
        bucket: @conf['bucket_name'],
        key: image_key,
        body: image_data
      )
      image_key
    rescue StandardError
      return Hash[
        'err' => true,
        'msg' => 'File not uploaded',
        'key' => image_key,
        'time' => Time.now
      ].to_json
    end
  end

  def get_image_url(image_key)
    begin
      obj = @s3.get_object(
        bucket: @conf['bucket_name'],
        key: image_key
      )
      URI.parse(obj.presigned_url(:get))
    rescue StandardError => e
      return Hash[
        'err' => true,
        'msg' => e,
        'key' => image_key,
        'time' => Time.now
      ].to_json
    end
  end
end
