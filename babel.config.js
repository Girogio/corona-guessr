module.exports = function (api) {
    api.cache(true);

    return {
        plugins: [
            // other plugins
            [
                'babel-plugin-rewrite-require',
                {
                    aliases: {
                        stream: 'readable-stream',
                    },
                },
            ],
        ],
        presets: ['babel-preset-expo'],
    };
};
