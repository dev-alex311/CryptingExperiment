#!/usr/bin/env node

var AES = require("crypto-js/aes");
var enc = require("crypto-js/enc-utf8");
var fs = require("fs");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const vorpal = require("vorpal")();

vorpal
  .command("about")
  .description("Prints About")
  .alias("a")
  .action(function (args, callback) {
    console.log("A simple CLI for AES encryption and decryption");
    callback();
  });

vorpal
  .command("encrypt")
  .description("Encrypts text")
  .alias("e")
  .action(function (args, callback) {
    var questions = [
      {
        type: "input",
        name: "phrase",
        message: "Enter the string: ",
        validate: function validatePhrase (name) {
          return name !== '';
        }
      },
      {
        type: "password",
        name: "key",
        message: "Enter the key: ",
        validate: function validateKey (name) {
          return name !== '';
        }
      }
    ];
    this.prompt(questions, function (answers) {
      phrase = answers.phrase;
      key = answers.key;
      console.log(logSymbols.info, "Encryption Begin");
      ciphertext = AES.encrypt(phrase, key).toString();
      console.log(chalk.bold.red(ciphertext));
      console.log(logSymbols.success, "Encryption Successful");
      callback();
    });
  });

vorpal
  .command("enfile")
  .description("Converts contents of .txt file into encrypted text and writes to the same file")
  .alias("ef")
  .action(function (args, callback) {
    var questions = [
      {
        type: "input",
        name: "fileloc",
        message: "Enter the File Location: ",
        validate: function validatePhrase (name) {
          return name !== '';
        }
      },
      {
        type: "password",
        name: "key",
        message: "Enter the key: ",
        validate: function validateKey (name) {
          return name !== '';
        }
      }
    ];
    this.prompt(questions, function (answers) {
      fileloc = answers.fileloc;
      key = answers.key;
      let temp = '';
      console.log(logSymbols.info, "Encryption Begin");
      fs.readFile(fileloc, function (err, buf) {
        temp = buf.toString();
      });
      ciphertext = AES.encrypt(temp, key).toString();
      fs.writeFile(fileloc, ciphertext, function (err, data) {
        if (err) console.log(err);
      });
      console.log(logSymbols.success, "Encryption Successful");
      callback();
    });
  });

vorpal
  .command("decrypt")
  .description("Decrypts text")
  .alias("d")
  .action(function (args, callback) {
    var questions = [
      {
        type: "input",
        name: "phrase",
        message: "Enter the string: ",
        validate: function validatePhrase (name) {
          return name !== '';
        }
      },
      {
        type: "password",
        name: "key",
        message: "Enter the key: ",
        validate: function validateKey (name) {
          return name !== '';
        }
      }
    ];
    this.prompt(questions, function (answers) {
      phrase = answers.phrase;
      key = answers.key;
      console.log(logSymbols.info, "Decryption Begin");
      plaintext = AES.decrypt(phrase, key).toString(enc);
      console.log(chalk.bold.green(plaintext));
      console.log(logSymbols.success, "Decryption Successful");
      callback();
    });
  });

// Under Construction!
vorpal
  .command("defile")
  .description("Under Construction! Converts contents of encrypted .txt file into plain text and writes to the same file")
  .alias("df")
  .action(function (args, callback) {
    var questions = [
      {
        type: "input",
        name: "fileloc",
        message: "Enter the File Location: ",
        validate: function validatePhrase (name) {
          return name !== '';
        }
      },
      {
        type: "password",
        name: "key",
        message: "Enter the key: ",
        validate: function validateKey (name) {
          return name !== '';
        }
      }
    ];
    this.prompt(questions, function (answers) {
      fileloc = answers.fileloc;
      key = answers.key;
      let temp = '';
      console.log(logSymbols.info, "Decryption Begin");
      fs.readFile(fileloc, function (err, buf) {
        temp = buf.toString();
      });
      plaintext = AES.decrypt(temp, key).toString(enc);
      console.log(temp);
      fs.writeFile(fileloc, plaintext, function (err, data) {
        if (err) console.log(err);
      });
      console.log(logSymbols.success, "Decryption Successful");
      callback();
    });
  });

vorpal.delimiter(chalk.blue("az$")).show();
