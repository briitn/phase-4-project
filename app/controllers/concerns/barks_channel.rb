class BarksChannel < ApplicationCable::Channel
    def subscribed
      stream_from 'barks_channel'
    end
  
    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
  
    def receive(data)
      ActionCable.server.broadcast 'barks_channel', data
    end
  end
  