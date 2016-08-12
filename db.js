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

function createDatabase(){

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
        // Run 'node createSlackDatabase.js''
        // createDatabase(filename); // this does not yet work....
    };

    var slackDatabase = new sqlite3.Database(filename);

    return slackDatabase;
};

exports.getChannels = getChannels;

function getChannels(conn, teamName) {

    return new Promise((resolve, reject) => {
		
		var query = "SELECT TEAMID, USERID FROM SLACK_TEAM_MEMBERS WHERE TEAMID='"+teamName+"'";

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

    return new Promise((resolve, reject) => {

        var query = "SELECT TEAMID, USERID FROM CHANNEL WHERE TEAMID='"+userName+"'";

    });
    
};