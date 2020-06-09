

// Source is jargon file compiled by Eric Raymond at http://www.catb.org/jargon/html/T/talk-mode.html
const acronyms = new Map();
acronyms.set("brb", "Be right back.");
acronyms.set("afk", "Away from keyboard.");
acronyms.set("rotfl", "Rolling on the floor laughing.");
acronyms.set("lmao", "Laughing my ass off.");
acronyms.set("afaik", "As far as I know.");
acronyms.set("bcnu", "be seeing you ...");
acronyms.set("btw","by the way ...");
acronyms.set("imo","In my opionion.");
acronyms.set("imho","In my humble opionion.");
acronyms.set("lmgtfy","Let me get|google that for you.");

exports.lookUpJargon =  (abrv) => {
    return acronyms.get(abrv.toLowerCase())
       || "Sorry, dont know that one, **either**. [lmgtfy](https://www.google.com/search?q="
        + encodeURI(abrv) +"%20jargon"
        + ")";
};