const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./settings.json');
const wiki = require('./modules/warframe-wiki.js');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return;
    }

    if (receivedMessage.content.trim().toLowerCase().startsWith(prefix)) {
        processCommand(receivedMessage);
    }
    
});

function processCommand(receivedMessage) {
    const author = receivedMessage.author.toString();
    receivedMessage = processRecievedMessage(receivedMessage);
   
    let fullCommand = receivedMessage.content; // Remove the leading exclamation mark !help @bit#3453
    let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage);
    } else if (primaryCommand == "wiki") {
        wiki.search(arguments, receivedMessage);
        console.log('arguments: ' + arguments + ", " + "message: " + receivedMessage); 
    } else {
        receivedMessage.channel.send("I don't understand the command.");
    }
}

function processRecievedMessage(message) {
    message.content = message.content.substr(1);
    return message;
}

client.login(token);