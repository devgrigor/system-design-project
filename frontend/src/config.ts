export const configs = {
    apiUrl: 'http://localhost:8000',
};

export const postFetchObj: any = {
    method: 'post',
    // mode: 'no-cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    referrerPolicy: 'no-referrer',
    headers: {
        'Content-type': 'application/json',
    },
};
