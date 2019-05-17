const { join } = require('path');
module.exports = {
    entry: './src/app/app.js',
    output: {
        path: join(__dirname,'public','js'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                use: ['babel-loader'],
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            }
        ]
    }
}