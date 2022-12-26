Connect Telegram Bot to Google Sheets via Google Apps Scripts. Includes integration with OpenAI for a ChatGPT Telegram bot

See (1) for a simple Telegram to Google Sheets integration
See (2) for an integration from Telegram > Google Sheets > OpenAI > Google Sheets > Telegram integration

# 1. Integrate Telegram Bot with Google Sheets (sheets-simple.gs)
## Connect Telegram Bot to Google Sheets
This video explains all steps in detail: https://www.youtube.com/watch?v=24EyItKfm50&list=PLGGHwNnXfci86dfqIVLc5l391SPk-RX1F

### Step 1: Setting up the Telegram Bot
- Go to [Telegram for Web](https://web.telegram.org/)
- Search for BotFather
- Use /newbot to create a bot. This will give you an access token to use in your script. For further Telegram information, RTFM at (https://core.telegram.org/bots/api)

### Step 2: Setting up Google Apps Script
Create a new Google Sheet in Google Drive. Go to script editor (Tools > Script Editor) and paste the code into the newly created code.gs file. Once done, deply the script as a web application. You will get a URL to use in the code.gs file.

- Run `getMe()` and `setWebhook()` to initialise the integration.

### Step 3: Add your Spreadsheet ID to the Script
Find your Google Sheet ID in the URL: `https://docs.google.com/spreadsheets/d/{ID_HERE}/edit` and past it into the code.gs file.

### Step 4: Add your Telegram ID to the Script for error catching
After you seccusfully communicated with the bot, your chat ID should be in the recording spreadsheet entries. Copy and past this into the `adminID` variable in the script

# 2. Create OpenAI ChatGPT like bot in Telegram (openai.gs)
A simple Google Apps Script that provides an output to a user input in Telegram, and saving the question + answer + error (if applicable) to a Google Sheet.
Please note that this script can not (yet) 'remember' the conversation or take feedback to previous questions. It will evaluate a single inout with a single output.
This script will serve as a starting point for those who want to add extra functionality, and I welcome you to add features with pull requests.

The script starts by defining a list of allowed user IDs that are authorized to chat with the bot, as well as some constants such as the bot token, OpenAI API key, and Spreadsheet ID.

The script uses the `completions` API enpoint with the `text-davinci-003` set to `max_tokens` = 100.

Below is an example of the Telegram Chat and response:
![Script Properties](https://github.com/meneer-code/Connect-Telegram-Bot-to-Google-Sheets/blob/master/screenshots/telegram-chat.png?raw=true)

Below is an example of the questions and answers saved to Google Sheets:
![Script Properties](https://github.com/meneer-code/Connect-Telegram-Bot-to-Google-Sheets/blob/master/screenshots/openai-google-sheets.png?raw=true)

Script Inputs:
- `ALLOWED_USER_IDS`: A list of user IDs that are allowed to chat with the bot
- `BOT_TOKEN`: Script Property with key *bot_token* defined in Settings > Script Properties. Get this from @BotFather in Telegram
- `OPENAI_API_KEY`: Script Property with key *openai_api_key* defined in Settings > Script Properties. Get this from https://beta.openai.com/account/api-keys
- `SPREADSHEET_ID`: To get this, go to your sheet URL and grab the id from here: https://docs.google.com/spreadsheets/d/{ID_HERE}/edit
- `WEBHOOK_URL`: After deploying the script as web app, copy the URL and paste it here


The script then includes a number of functions that handle different tasks:
- `getMe`: Sends a request to the Telegram API to get information about the bot.
- `setWebhook`: Sends a request to the Telegram API to set up a webhook for the bot.
- `doPost`: Handles webhook requests from Telegram. This function is called whenever the bot receives a message from a user. It parses the request body, gets the message from the request, and writes the question to the 'question' column in a Google Sheets document. It then sends the question to the OpenAI API using the sendToOpenAI function, writes the answer to the 'answer' column in the Google Sheets document, and sends the answer back to the Telegram chat using the sendToTelegram function.

The script also includes the following functions:
- `sendToOpenAI`: Sends a request to the OpenAI API with the specified text and returns the response.
- `sendToTelegram`: Sends a message to the specified Telegram chat with the specified text.
- `writeToSheet`: Writes the specified text to the specified column in the Google Sheets document.

## 🚨 Please Note 🚨
I'm not entirely sure if it's the best idea to define sensitive data in the Script Properties section of Google Apps Script. Please be aware of this.
![Script Properties](https://github.com/meneer-code/Connect-Telegram-Bot-to-Google-Sheets/blob/master/screenshots/script-properties.jpg?raw=true)
