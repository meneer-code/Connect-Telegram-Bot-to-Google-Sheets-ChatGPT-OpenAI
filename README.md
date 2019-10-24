# Connect-Telegram-Bot-to-Google-Sheets
Connect Telegram Bot to Google Sheets via Google Apps Scripts. This video explains all steps in detail: https://www.youtube.com/watch?v=24EyItKfm50&list=PLGGHwNnXfci86dfqIVLc5l391SPk-RX1F

## Step 1: Setting up the Telegram Bot
- Go to [Telegram for Web](https://web.telegram.org/)
- Search for BothFather
- Use /newbot to create a bot. This will give you an access token to use in your script. For further Telegram information, RTFM at (https://core.telegram.org/bots/api)

## Step 2: Setting up Google Apps Script
Create a new Google Sheet in Google Drive. Go to script editor (Tools > Script Editor) and paste the code into the newly created code.gs file. Once done, deply the script as a web application. You will get a URL to use in the code.gs file.

- Run `getMe()` and `setWebhook()` to initialise the integration.

## Step 3: Add your Spreadsheet ID to the Script
Find your Google Sheet ID in the URL: `https://docs.google.com/spreadsheets/d/{ID_HERE}/edit` and past it into the code.gs file.

## Step 4: Add your Telegram ID to the Script for error catching
After you seccusfully communicated with the bot, your chat ID should be in the recording spreadsheet entries. Copy and past this into the `adminID` variable in the script