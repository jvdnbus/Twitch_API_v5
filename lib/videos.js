'use strict';

const request = require('./request');
const querystring = require('querystring');

module.exports = {
    getVideo: (data, callback) => {
        // Authentication: none
        // Required Parameters: videoID
        // Optional Parameters: none

        if (!data.videoID) return callback('videoID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/videos/${data.videoID}`;

        request('GET', options, callback);
    },

    getVideoChat: (data, callback) => {
        // Authentication: none
        // Required Parameters: videoID
        // Optional Parameters: offset, cursor

        if (!data.videoID) return callback('videoID is required');

        let params = {};
        if (data.cursor) params.cursor = data.cursor;
        else params.content_offset_seconds = data.offset || 0;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/videos/${data.videoID}/comments?${querystring.stringify(params)}`;

        request('GET', options, callback);
    }

    top: (data, callback) => {
        // Authentication: none
        // Required Parameters: none
        // Optional Parameters: limit, offset, game, period, broadcast_type, language, sort

        let params = {};
        if (data.limit) params.limit = data.limit;
        if (data.offset) params.offset = data.offset;
        if (data.game) params.game = data.game;
        if (data.period) params.period = data.period;
        if (data.broadcast_type) params.broadcast_type = data.broadcast_type;
        if (data.language) params.language = data.language;
        if (data.sort) params.sort = data.sort;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/videos/top?${querystring.stringify(params)}`;

        request('GET', options, callback);
    },

    followed: (data, callback) => {
        // Authentication: user_read
        // Required Parameters: none
        // Optional Parameters: limit, offset, broadcast_type, language, sort

        if (!data.auth) return callback('auth is required');

        let params = {};
        if (data.limit) params.limit = data.limit;
        if (data.offset) params.offset = data.offset;
        if (data.broadcast_type) params.broadcast_type = data.broadcast_type;
        if (data.language) params.language = data.language;
        if (data.sort) params.sort = data.sort;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/videos/followed?${querystring.stringify(params)}`;
        options.auth = data.auth;

        request('GET', options, callback);
    },

    create: (data, callback) => {
        // Authentication: channel_editor
        // Required Parameters: channelID, title
        // Optional Parameters: description, game, language, tag_list

        if (!data.auth) return callback('auth is required');
        if (!data.channelID) return callback('channelID is required');
        if (!data.title) return callback('title is required');

        let params = {};
        if (data.description) params.description = data.description;
        if (data.game) params.game = data.game;
        if (data.language) params.language = data.language;
        if (data.tag_list) params.tag_list = data.tag_list;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/videos?channel_id=${data.channelID}&title=${data.title}&${querystring.stringify(params)}`;

        request('POST', options, callback);
    },

    upload: (data, callback) => {
        // Authentication: none
        // Required Parameters: content-length, videoData, videoID, part, token
        // Optional Parameters: none

        if (!data.content) return callback('content is required');
        if (!data.videoData) return callback('videoData is required');
        if (!data.videoID) return callback('videoID is required');
        if (!data.part) return callback('part is required');
        if (!data.token) return callback('token is required');

        let options = {};
        options.url = `https://uploads.twitch.tv/upload/${data.videoID}?part=${data.part}&upload_token=${data.token}`;
        options.body = data.videoData;
        options['content-length'] = data['content-length'];

        request('PUT', options, callback);
    },

    complete: (data, callback) => {
        // Authentication: none
        // Required Parameters: videoID, token
        // Optional Parameters: none

        if (!data.videoID) return callback('videoID is required');
        if (!data.token) return callback('token is required');

        let options = {};
        options.url = `https://uploads.twitch.tv/upload/${data.videoID}/complete?upload_token=${data.token}`;

        request('POST', options, callback);
    },

    update: (data, callback) => {
        // Authentication: channel_editor
        // Required Parameters: videoID
        // Optional Parameters: description, game, language, tag_list, title

        if (!data.auth) return callback('auth is required');
        if (!data.videoID) return callback('videoID is required');

        let params = {};
        if (data.description) params.description = data.description;
        if (data.game) params.game = data.game;
        if (data.language) params.language = data.language;
        if (data.tag_list) params.tag_list = data.tag_list;
        if (data.title) params.title = data.title;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/videos/${data.videoID}?${querystring.stringify(params)}`;

        request('PUT', options, callback);
    },

    delete: (data, callback) => {
        // Authentication: channel_editor
        // Required Parameters: videoID
        // Optional Parameters: none

        if (!data.auth) return callback('auth is required');
        if (!data.videoID) return callback('videoID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/videos/${data.videoID}`;

        request('DELETE', options, callback);
    },
};