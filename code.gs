// How to connect your Telegram Bot to a Google Spreadsheet (Google Apps Script)
// https://www.youtube.com/watch?v=mKSXd_od4Lg
// 
// This code must be added to the Google Apps Script file attached to the spreadsheet script editor. 
// Full steps in the readme

var token = "";     // 1. FILL IN YOUR OWN TOKEN
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = ""; // 2. FILL IN YOUR GOOGLE WEB APP ADDRESS
var ssId = "";      // 3. FILL IN THE ID OF YOUR SPREADSHEET
var adminID = "";   // 4. Fill in your own Telegram ID for debugging

function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendText(id,text) {
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + encodeURIComponent(text);
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function doGet(e) {
  return HtmlService.createHtmlOutput("Hi there");
}

function doPost(e) {
  try {
    // this is where telegram works
    var data = JSON.parse(e.postData.contents);
    var text = data.message.text;
    var id = data.message.chat.id;
    var name = data.message.chat.first_name + " " + data.message.chat.last_name;
    var answer = "Hi " + name;
    sendText(id,answer);
    SpreadsheetApp.openById(ssId).getSheets()[0].appendRow([new Date(),id,name,text,answer]);
    
    if(/^@/.test(text)) {
      var sheetName = text.slice(1).split(" ")[0];
      var sheet = SpreadsheetApp.openById(ssId).getSheetByName(sheetName) ? SpreadsheetApp.openById(ssId).getSheetByName(sheetName) : SpreadsheetApp.openById(ssId).insertSheet(sheetName);
      var newText = text.split(" ").slice(1).join(" ");
      sheet.appendRow([new Date(),id,name,newText,answer]);
      sendText(id,"your text '" + newText + "' is now added to the sheet '" + sheetName + "'");
    }
  } catch(e) {
    sendText(adminID, JSON.stringify(e,null,4));
  }
}