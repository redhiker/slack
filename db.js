/*
table users
id
name
password
email

table teamusers
iduserid fk
teamid fk

table channels
id
name
teamid pk
description

table messages
id
userid
channelid
teamid
description
type (team,private)
*/
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

//exports.createDatabase = createDatabase;

function createDatabase(filename){ 
    var db = new sqlite3.Database(filename);
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
    //db.close();
};

exports.connection = connection;

function connection(filename) {
    var dbexists = false;
    try {
        fs.accessSync(filename);
        dbexists = true;
    } catch (ex) {
        dbexists = false;
    }

    if (!dbexists) {
        createDatabase(filename);
    };

    var slackDatabase = new sqlite3.Database(filename);

    return slackDatabase;
};

exports.getChannels = getChannels;

function getChannels(conn, teamName) {

    return new Promise((resolve, reject) => {
		
		var query = "SELECT TEAMID, USERID FROM CHANNEL WHERE TEAMID='"+teamName+"'";

		var users = [];

		conn.serialize(function() {
			conn.each(
				query, 
				function(err, row) {
					users.push(row.USERID);
				},
				function (err, nRows) {
					if (err) {
						reject(err);
					} else {
						resolve(users);
					}					
				}
			);
		});
		//db.close();
	});    
};

exports.getUserMessages = getUserMessages;

function getUserMessages(conn, userName) {

    return ['orange','blue','red'];
    
};