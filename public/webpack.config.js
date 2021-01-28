const WebpackPwaManifest=require('webpack-pwa-manifest');
const passage=require('path');

const compass={
    entry:{
        app:'index.js',
        homepage:'index.html',
        interfaceLogic:'./index.js'
    },
    output:{
        path:__dirname+'/dist',
        filename:'[name].bundle.js',
    },
    mode:'development',
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins:[
        new WebpackPwaManifest({
            fingerprints:false,
            name:'iSpend.pwa',
            short_name:'iSpend.pwa',
            description:'An app for tracking financial transacations with offline capabilities.',
            background_color:'#fff',
            theme_color:'#fff',
            'theme-color':'light-pink',
            start_url:'/',
            icons:[
                {
                    src:passage.resolve('/icons/icon-192x192.png'),
                    sizes:[96,128,192,256,384,512],
                    destination:passage.join('/icons')//tentative rout
                }
            ]
        })
    ]
}
module.exports=compass;