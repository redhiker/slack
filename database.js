var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var filename = 'test.db';
var dbexists = false;
try {
    fs.accessSync(filename);
    dbexists = true;
} catch (ex) {
    dbexists = false;
}

var db = new sqlite3.Database('test.db');


if (!dbexists) {
    db.serialize(function() { 
        console.log('creating database.....');     
        var createChannelTable = "CREATE TABLE IF NOT EXISTS CHANNEL " +
               "(TEAMID         CHAR(25)    PRIMARY KEY     NOT NULL," +                       
               " USERID         CHAR(25)                    NOT NULL," +                       
               " NAME           CHAR(25)                   NOT NULL, " +                        
               " DESCRIPTION       CHAR(50)                    NOT NULL)"; 

        db.run(createChannelTable); 
        console.log('creating database.....run command');
        var insertChannel = "INSERT INTO CHANNEL (TEAMID,USERID, NAME, DESCRIPTION) " +             
            "VALUES ('Team1',   'Shuvo Ahmed',      'Shuvo ','Shuvo Messages')," +                  
            "('Team2',     'Abu Moinuddin',    'Abu ','Abu Messages')," +                   
            "('Team3', 'Charles Walsek',    'Charles ','Charles Messages');"; 

        db.run(insertChannel);
        console.log('creating database.....INSERT command');       
        db.each("SELECT * FROM CHANNEL", function(err, row) {           
            console.log(row.TEAMID + ": " + row.USERID);        
        },
        function (err) {
            console.log('perhaps an error');
        });
    });
}

db.close();