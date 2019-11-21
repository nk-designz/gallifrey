#!/bin/ruby

# frozen_string_literal: true

require 'yaml'
require 'aws-sdk-s3'

# will deliver an image on contruct.
class S3Controller
  def initialize
    @conf = load_config
    @s3 = init_client
  end

  def load_config
    YAML.safe_load(
      File.read('/etc/s3fetcher/config.yaml')
    )['s3']
  end

  def init_client
    Aws::S3::Client.new(
      endpoint: @conf['endpoint_adress'],
      access_key_id: @conf['access_key_id'],
      secret_access_key: @conf['secret_access_key'],
      force_path_style: true,
      region: @conf['region']
    )
  end

  def get_image(image_key)
    @s3.get_object(
      bucket: @conf['bucket_name'],
      key: 'public/' + image_key
    ).read
  end
end
