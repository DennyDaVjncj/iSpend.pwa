const xprss=request('express');
const app=xprss();
const CHANNEL=process.env.CHANNEL||3948;

app.use(xprss.static('client'));
app.use(xprss.urlencoded({extended:true}));
app.use(xprss.json());
require('./routs/display');

app.lilsten(CHANNEL,()=>{
    console.log(`live connection achieved via: http://localhost:${CHANNEL}`)
});