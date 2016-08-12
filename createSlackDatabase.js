var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var filename = 'slack.db';
var dbexists = false;
try {
    fs.accessSync(filename);
    dbexists = true;
} catch (ex) {
    dbexists = false;
}

var db = new sqlite3.Database('slack.db');


if (!dbexists) {
    db.serialize(function() { 
        console.log('creating database.....'); 

        var createSlackTeamsTable = "CREATE TABLE IF NOT EXISTS SLACK_TEAMS " +
               "(TEAMID         CHAR(25)    PRIMARY KEY     NOT NULL," +                                             
               " DESCRIPTION    CHAR(50)                    NOT NULL)"; 

        db.run(createSlackTeamsTable); 
        
        var insertSlackTeam = "INSERT INTO SLACK_TEAMS (TEAMID, DESCRIPTION) " +             
            "VALUES ('Team1', 'Team1 description')," +                  
            "('Team2', 'Team2 description')," +                   
            "('Team3', 'Team3 description');"; 

        db.run(insertSlackTeam);

        db.each("SELECT * FROM SLACK_TEAMS;", function(err, row) {           
            console.log(row.TEAMID + ": " + row.DESCRIPTION);        
        },
        function (err) {
            console.log('perhaps an error on select on SLACK_TEAMS...');
        });

        var createSlackMembersTable = "CREATE TABLE IF NOT EXISTS SLACK_MEMBERS " +
               "(USERID         CHAR(25)    PRIMARY KEY     NOT NULL," +                                             
               " PASSWORD    CHAR(50)                    NOT NULL," +
               " EMAIL      CHAR(50)    NOT NULL)"; 

        db.run(createSlackMembersTable); 
        
        var insertSlackMembers = "INSERT INTO SLACK_MEMBERS (USERID, PASSWORD, EMAIL) " +             
            "VALUES ('alice', 'alicep', 'alice@gmail.com')," +                  
            "('betsy', 'betsyp', 'betsy@gmail.com')," +                   
            "('carol', 'carolp', 'carol@gmail.com')";

        db.run(insertSlackMembers);

        db.each("SELECT * FROM SLACK_MEMBERS;", function(err, row) {           
            console.log(row.USERID + ": " + row.EMAIL);        
        },
        function (err) {
            console.log('perhaps an error on select from SLACK_MEMBERS...');
        });

        var createSlackTeamMembersTable = "CREATE TABLE IF NOT EXISTS SLACK_TEAM_MEMBERS " +
               "(USERID    CHAR(25)         NOT NULL," +                                             
               " TEAMID    CHAR(25)         NOT NULL)"; 

        db.run(createSlackTeamMembersTable); 
        
        var insertSlackTeamMembers = "INSERT INTO SLACK_TEAM_MEMBERS (USERID, TEAMID) " +             
            "VALUES ('alice', 'Team1')," +                  
            "('betsy', 'Team1')," + 
            "('betsy', 'Team2')," +                  
            "('carol', 'Team3')";

        db.run(insertSlackTeamMembers);

        db.each("SELECT * FROM SLACK_TEAM_MEMBERS;", function(err, row) {           
            console.log(row.USERID + ": " + row.TEAMID);        
        },
        function (err) {
            console.log('perhaps an error on select from SLACK_TEAM_MEMBERS...');
        });
    });
}

db.close();