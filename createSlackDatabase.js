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

        // SQL for table creation

        var createSlackTeamsTable = "CREATE TABLE IF NOT EXISTS SLACK_TEAMS " +
               "(TEAMID         CHAR(25)    PRIMARY KEY     NOT NULL," +                                             
               " DESCRIPTION    CHAR(50)                    NOT NULL)";

        var createSlackMembersTable = "CREATE TABLE IF NOT EXISTS SLACK_MEMBERS " +
               "(USERID         CHAR(25)    PRIMARY KEY     NOT NULL," +                                             
               " PASSWORD    CHAR(50)                    NOT NULL," +
               " EMAIL      CHAR(50)    NOT NULL)";

        var createSlackTeamMembersTable = "CREATE TABLE IF NOT EXISTS SLACK_TEAM_MEMBERS " +
               "(USERID    CHAR(25)         NOT NULL," +                                             
               " TEAMID    CHAR(25)         NOT NULL)";

        var createSlackMessagesTable = "CREATE TABLE IF NOT EXISTS SLACK_MESSAGES " +
               "(USERID    CHAR(25)         NOT NULL," +                                             
               " TEAMID    CHAR(25)         NOT NULL," +
               " MESSAGE    CHAR(140) )";

        // SQL for table insertions               

        var insertSlackTeam = "INSERT INTO SLACK_TEAMS (TEAMID, DESCRIPTION) " +             
            "VALUES ('Team1', 'Team1 description')," +                  
            "('Team2', 'Team2 description')," +                   
            "('Team3', 'Team3 description');";

        var insertSlackMembers = "INSERT INTO SLACK_MEMBERS (USERID, PASSWORD, EMAIL) " +             
            "VALUES ('alice', 'alicep', 'alice@gmail.com')," +                  
            "('betsy', 'betsyp', 'betsy@gmail.com')," +                   
            "('carol', 'carolp', 'carol@gmail.com')";

        var insertSlackTeamMembers = "INSERT INTO SLACK_TEAM_MEMBERS (USERID, TEAMID) " +             
            "VALUES ('alice', 'Team1')," +                  
            "('betsy', 'Team1')," + 
            "('betsy', 'Team2')," +                  
            "('carol', 'Team3')";

        var insertSlackMessages = "INSERT INTO SLACK_MESSAGES (USERID, TEAMID, MESSAGE) " +             
            "VALUES ('alice', 'Team2', 'hello 2....')," +                  
            "('betsy', 'Team2', 'good morning 2...')," + 
            "('betsy', 'Team3', 'nice day outside 3....')," +  
            "('betsy', 'Team1', 'nice day outside 1....')," +                
            "('carol', 'Team1', 'good evening 1....')";        
        
        console.log('creating database.....'); 

        // CREATING TABLES         

        db.run(createSlackTeamsTable);   
        db.run(createSlackMembersTable);    
        db.run(createSlackTeamMembersTable);  
        db.run(createSlackMessagesTable);

        // initial insertions

        db.run(insertSlackTeam);
        db.run(insertSlackMembers);
        db.run(insertSlackTeamMembers);
        db.run(insertSlackMessages);

        // selects

        db.each("SELECT * FROM SLACK_TEAMS", function(err, row) {
            if (err) {
                console.log('error');
            } else {           
                console.log(row.TEAMID + ": " + row.DESCRIPTION);    
            }    
        });      

        db.each("SELECT * FROM SLACK_MEMBERS", function(err, row) {
            if (err) {
                console.log('error');
            } else {           
                console.log(row.USERID + ": " + row.EMAIL);  
            }      
        });        

        db.each("SELECT * FROM SLACK_TEAM_MEMBERS", function(err, row) { 
            if (err) {
                console.log('error');
            } else {          
                console.log(row.USERID + ": " + row.TEAMID);    
            }    
        });        

        db.each("SELECT * FROM SLACK_MESSAGES", function(err, row) { 
            if (err) {
                console.log('error');
            } else {        
                console.log(row.USERID + ": " + row.MESSAGE);  
            }    
        });
    });
}

db.close();