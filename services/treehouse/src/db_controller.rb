#!/usr/bin/ruby

# frozen_string_literal: true
require 'mysql2'
require 'yaml'

# interface to the Metadata Database
class MetaDatabase
  def initialize
    @conf = read_conf('/etc/treehouse/config.yaml')['metadb']
    @conf.freeze
    @mysql = init_db
  end

  def read_conf(conf_path)
    YAML.safe_load(
      File.read(conf_path)
    )
  end

  def init_db
    client = Mysql2::Client.new(
        :host => @conf['endpoint_adress'],
        :username => @conf['user'],
        :password => @conf['password'],
        :database => @conf['database']
    )
    begin
      client.query('SELECT * from posts;')
    rescue StandardError
      client.query("
            create table posts(
            post_id VARCHAR(100) NOT NULL,
            heading VARCHAR(200) NOT NULL,
            user VARCHAR(40) NOT NULL,
            license VARCHAR(40),
            tags JSON,
            date DATE NOT NULL,
            image_s3_key VARCHAR(200) NOT NULL,
            description VARCHAR(300),
            PRIMARY KEY ( post_id )
            );
    ")
    end
    client
  end

  def query(query_string)
    begin
      @mysql.query(query_string)
    rescue StandardError => e
      @mysql = init_db
      puts e
      query(query_string)
    end
  end


  def get(post_id, row_name)
    results = query("SELECT * FROM posts WHERE post_id = '#{post_id}';")
    results.first[row_name.to_s]
  end

  def new(post_id, heading, user, license, tags, date, image_s3_key, description)
    query("
        INSERT INTO posts(post_id, heading, user, license, tags, date, image_s3_key, description)
        VALUES('#{post_id}','#{heading}','#{user}','#{license}','#{tags}','#{date}','#{image_s3_key}','#{description}');
    ")
  end

  def update(post_id, row_name, row_value)
    query("
        UPDATE posts
        SET #{row_name} = #{row_value}
        WHERE post_id = '#{post_id}';
    ")
  end

  def list_random(count)
    i = 0
    result = {}
    query("
        SELECT post_id FROM posts
        ORDER BY RAND() LIMIT #{count};
    ").each do |row|
      result[i.to_s] = row
      i += 1
    end
  end

  def list_newest(count)
    i = 0
    result = {}
    query("
        SELECT post_id FROM posts
        ORDER BY date DESC LIMIT #{count};
    ").each do |row|
      result[i.to_s] = row
      i += 1
    end
  end

  def list_user(user_id, count)
    i = 0
    result = {}
    query("
      SELECT post_id FROM posts WHERE user = '#{user_id}'
      ORDER BY date DESC LIMIT #{count};
    ").each do |row|
      result[i.to_s] = row
      i += 1
    end
  end
end
