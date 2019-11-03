$LOAD_PATH.unshift(File.dirname(__FILE__))

at_exit do
  puts <<~MESSAGE
    It seems someone has visited `/exit` or triggered TERM signal.
    Bye...
  MESSAGE
  exit false
end

require 'src/api_controller.rb'
run App
