'use strict';

const request = require('./request');
const querystring = require('querystring');

module.exports = {
    badges: (data, callback) => {
        // Authentication: none
        // Required Parameters: channelID
        // Optional Parameters: none

        if(!data.channelID) return callback('channelID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/chat/${data.channelID}/badges`;

        request('GET', options, callback);
    },

    emoteSet: (data, callback) => {
        // Authentication: none
        // Required Parameters: none
        // Optional Parameters: emotesets

        let params = {};
        if(data.emotesets) params.emotesets = data.emotesets;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/chat/emoticon_images?${querystring.stringify(params)}`;

        request('GET', options, callback);
    },

    emotes: (data, callback) => {
        // Authentication: none
        // Required Parameters: none
        // Optional Parameters: none

        if(typeof data === 'function') callback = data;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/chat/emoticons`;

        request('GET', options, callback);
    },

    rooms: (data, callback) => {
      // Authentication: Any
      // Required Parameters: channelID
      // Optional Parameters: none

        if(typeof data === 'function') callback = data;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/chat/${data.channelID}/rooms`;

        request('GET', options, callback);
    }
};