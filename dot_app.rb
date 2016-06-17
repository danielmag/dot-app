require 'sinatra'
require 'json'

GlobalState = {
  dots: []
}

db_file = 'db.json'

def load_db(db_file)
  if File.file?(db_file)
    db = File.open(db_file, 'rb')
    GlobalState[:dots] = JSON.parse(db.read)
  end
end

def persist(db_file, dot)
  File.open(db_file, 'w') do |file|
    file.write(GlobalState[:dots].to_json)
  end
end

helpers do
  def h(text)
    Rack::Utils.escape_html(text)
  end
end

load_db(db_file)

get '/' do
  erb :index, layout: :layout, locals: {
    initial_dots: GlobalState[:dots].to_json
  }
end

post '/add-dot' do
  dot = {
    x: params['x'],
    y: params['y']
  }

  GlobalState[:dots] << dot
  persist(db_file, dot)

  200
end
