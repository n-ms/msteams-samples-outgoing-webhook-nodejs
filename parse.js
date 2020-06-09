exports.parse = (txt) => {
    const t = txt.replace("&nbsp;", " ");
	console.debug("parsing: " + t);
    // "<at>UnJargon</at> LMAO"
    const pos = t.search("</at>") + 6;
    const parsed =  t.slice(pos).trim();
    console.log("lookup value: " + parsed);
    return parsed;
};