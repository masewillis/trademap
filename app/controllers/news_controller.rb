class NewsController < ApplicationController

  def index

  end

  def create
      @feed = Feedjira::Feed.fetch_and_parse("http://www.joc.com/rssfeed/8995.xml")
      @articles = @feed.entries.first(30)
    end
  end

end
