// https://edstudio.fr/project/french-replika/french-replika.js

function getLastMessage(){

    // List of message
    const MsgListContent = document.getElementsByClassName('MessageGroup__MessageGroupRoot-h4dfhv-0');
    
    // Get size of list
    const MsgListSize = MsgListContent.length;

    // Get last item of list
    const LastNodeMsg = MsgListContent[MsgListSize - 1];

    // Get text of the last item
    const LastMsgText = LastNodeMsg.getElementsByClassName('BubbleText__BubbleTextContent-sc-1bng39n-2')[0].innerText;

    // Return the text
    return LastMsgText;
}

// Synthesized a text 
function tts(text){
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
}

// Remove any characters to text
function formatMsg(text){
    return text.replace('*', '').replace('*', '').replace('.','').replace('?', '').replace('!','');
}

// Translate the text to french
function translate(text){
    var formatMessage = formatMsg(text);
    //var encodeMessage = encodeURI(message);
    //console.log(message);
    //console.log(encodeMessage);

    // Send the text to google translate service to translate to french
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=fr&hl=fr&dt=t&dt=bd&dj=1&source=icon&tk=833860.833860&q=${formatMessage}`)
    .then(res => res.json())
    .then((out) => {
        // Show the output
        console.log(out.sentences[0].trans);
        tts(out.sentences[0].trans);
    }).catch(err => console.error(err));
}

function update(){
    var tmp = getLastMessage();
    if (lastRawMsg == tmp) {
        return;
    }
    lastRawMsg = tmp;
    translate(tmp);
}

// Start the script on Ctrl+B
document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.code && evt.code == "KeyB") {
        update();
    }
};



var lastRawMsg = "";
var update = setInterval(update, 1000);
//clearInterval(update);
console.log('french-replika is loaded');
