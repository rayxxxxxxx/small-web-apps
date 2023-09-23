async function loadContent(url, mountPoint) {
    let response = await fetch(url, {
        'method': 'get'
    });
    let content = await response.text();
    let data = parseContent(content);
    mount(mountPoint, data.html, makeScriptNode(data.script));
}

function parseContent(text) {
    let regex = new RegExp("<script.*>");
    let matches = text.match(regex);

    let scriptBeginIndex = matches.index + matches[0].length;
    let scriptEndIndex = text.indexOf("<\/script>", scriptBeginIndex);

    return {
        'html': text.slice(0, matches.index) + text.slice(scriptEndIndex + 9, text.length),
        'script': text.slice(scriptBeginIndex, scriptEndIndex)
    }
}

function makeScriptNode(scriptText) {
    let root = document.createElement('script');
    root.setAttribute('type', 'text/javascript');

    let textNode = document.createTextNode(scriptText);
    root.appendChild(textNode);

    return root;
}

function mount(root, htmlText, scriptNode = null) {
    root.innerHTML = htmlText;
    if (scriptNode) {
        root.appendChild(scriptNode);
    }
}