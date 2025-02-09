var mysql = require("mysql")

var con = mysql.createConnection({
    host: '<host_name>',
    user: '<user_name>',
    password: '<password>',
    database: '<database>'
});

con.connect(function(error){
    if(error) throw error;
    console.log("Connected to CampaignInfo Database...");

    con.query("select * from campaigns",function(error,result){
        if(error) throw error;
        console.log(result);
    });

});