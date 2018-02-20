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

+ Add count of watchers
    + I built the sockets.io infra for this. Just need to design it into the app.

+ Add chat

+ Solve loop
    + Is it caused by two clients in different states, oscillating? *This should be solved now; I check on the last time at which the video was played and check that it isn't the same. I should also check for proximity, but this hack should work for now. You can get identical play times when you, for example, start from the beginning of a video.*

+ Buy `ditto.movie` for $28

+ Colorize logs

I think it's that when the player begins to play because it receives an event from the server, it triggers onplay, sending another play event to the server.

So whenever an event is received, it needs to not listen for some cooldown time.

I should only send the signal to the other users in the namespace, not the one who triggered the event.

## Update

I think I can filter by looking for onclick events for the play button to toggle pause/play and trigger events, instead of listening on onPlay.

Additionally, need to sort out selecting a file from the torrent download folder. I think I want to do this by adding the functionality on the initial page when you plug in the magnet.

## Debugging

Hmm, I tried [this magnet](magnet:?xt=urn:btih:1d82c75adef98fc3f44bc39f2a9c8f94dfb6e6b0&dn=Thor.Ragnarok.2017.720p.TS.x264.DUBLADO-.mp4&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969) using the WebTorrent desktop application, and it didn't work at all. Couldn't seem to fetch the metadata. Could this be a reason my torrent attempts are failing?

It's hard to tell whether this is a bad torrent listing or a product of the networks I'm on. And it's somewhat hard to hash out which is which. Is the "can't find files" issue common to a lot of torrents?

When I'm downloading Sintel, it logs torrent download progress; when I'm downloading the above magnet, I don't get any progress reported. Additionally, `client.torrents[0].files` is an empty list.

The second time I tried it in WebTorrent Desktop, it did successfully recognize the file (though it didn't do much downloading).

## Update

Given some of the difficulties of using WebTorrent for large videos in the browser, I think it makes more sense to port the WebTorrent desktop client and bolt on the sockets functionality (using some dedicated webserver to do so).

