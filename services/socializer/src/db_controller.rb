#!/usr/bin/ruby

# frozen_string_literal: true
require 'mysql2'
require 'yaml'

# interface to the Metadata Database
class MetaDatabase
  def initialize
    @conf = read_conf('/etc/gallifrey/config.yaml')['metadb']
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
      client.query("SELECT init_date from profiles where user_name = 'admin';")
    rescue StandardError
      client.query("
            create table profiles(
              profile_id VARCHAR(40) NOT NULL,
              user_name VARCHAR(15) NOT NULL,
              first_name VARCHAR(20) NOT NULL,
              family_name VARCHAR(20) NOT NULL,
              email VARCHAR(40) NOT NULL,
              last_change DATE NOT NULL,
              init_date DATE NOT NULL,
              birthday DATE NOT NULL,
              description VARCHAR(600),
              subscriptions JSON,
              friends JSON,
              PRIMARY KEY ( profile_id )
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
    results = query("SELECT * FROM profiles WHERE post_id = '#{post_id}';")
    results.first[row_name.to_s]
  end

  def add(profile)
    query("
        INSERT INTO profiles(
          profile_id,
          user_name,
          first_name,
          family_name,
          email,
          last_change,
          init_date,
          birthday,
          description,
          subscriptions,
          friends
        ) VALUES(
          '#{profile.id}',
          '#{profile.username}',
          '#{profile.first_name}',
          '#{profile.family_name}',
          '#{profile.email}',
          '#{profile.last_change}',
          '#{profile.init_date}',
          '#{profile.birthday}',
          '#{profile.description}',
          '#{profile.subscriptions}',
          '#{profile.friends}'
        );
    ")
  end

  def update(profile_id, row_name, row_value)
    query("
        UPDATE profiles
        SET #{row_name} = #{row_value}
        WHERE profile_id = '#{profile_id}';
    ")
  end
end
