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

function connection() {
    console.log('in connection');
};

function transaction() {
    console.log('in transaction');
};

function rollback() {
    console.log('in rollback');
};

function getChannels(conn, teamName) {

    return ['orange','blue','red'];
    
};

exports.getChannels = getChannels;
exports.connection = connection;
exports.transaction = transaction;
exports.rollback = rollback;