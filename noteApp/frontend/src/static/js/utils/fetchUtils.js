function buildURL(host, port, path, params = undefined) {
    let origin = `http://${host}:${port}`;
    let paramsList = [];
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            paramsList.push(`${k}=${v}`);
        }
    }
    return new URL(`${origin}${path}?${paramsList.join('&')}`);
}

async function fetchGetText(url) {
    const res = await fetch(url, {
        'method': 'GET',
        'mode': 'cors',
    });
    return await res.text();
}

async function fetchGetJSON(url) {
    const res = await fetch(url, {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json',
        },
        'mode': 'cors',
    });
    return await res.json();
}

async function fetchPostJSON(url, body) {
    const res = await fetch(url, {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
        },
        'mode': 'cors',
        'body': JSON.stringify(body)
    });
    return await res.status;
}

async function fetchPutJSON(url, body) {
    const res = await fetch(url, {
        'method': 'PUT',
        'headers': {
            'Content-Type': 'application/json',
        },
        'mode': 'cors',
        'body': JSON.stringify(body)
    });
    return await res.status;
}

async function fetchDelete(url) {
    const res = await fetch(url, {
        'method': 'DELETE',
        'mode': 'cors',
    });
    return await res.status;
}