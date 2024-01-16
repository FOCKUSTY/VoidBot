const fs = require('node:fs');
let botReply = false;

function setBotReply(bool) {  botReply = bool };
function getBotReply() {  return botReply };

function changeReplyTxt(txt) {
    fs.writeFile('./botReply.txt', txt, (err) => 
    {
        if (err) console.error(err);
        return;
    })
};

function readReplyTxt()
{
  try
  {
    const data = fs.readFileSync('./botReply.txt');
    return data;
  }
  catch (err)
  {
    console.error(err);
  }
};

module.exports =
{
    setBotReply,
    getBotReply,
    changeReplyTxt,
    readReplyTxt
};