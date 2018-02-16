# Ditto

## Todo

+ Cleanup
    + Indentation everywhere
    + html location change
    + Printing
    + Dependencies

+ Descriptive README

+ Other video formats besides mp4

+ Remove namespaces after disuse

+ Add favicon

+ Add count of watchers

+ Add chat

+ Solve loop
    + Server should not emit event to the socket that triggered it.
    + Is it caused by two clients in different states, oscillating?

+ Buy `ditto.movie` for $28

I think it's that when the player begins to play because it receives an event from the server, it triggers onplay, sending another play event to the server.

So whenever an event is received, it needs to not listen for some cooldown time.

I should only send the signal to the other users in the namespace, not the one who triggered the event.

## Update

I think I can filter by looking for onclick events for the play button to toggle pause/play and trigger events, instead of listening on onPlay.

Additionally, need to sort out selecting a file from the torrent download folder. I think I want to do this by adding the functionality on the initial page when you plug in the magnet.


