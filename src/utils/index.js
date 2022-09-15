export const getHeaders = (item) => {
    if (!item.request || !item.request.header) {
        return {};
    }

    const header = item.request.header;

    const defaultHeaders = {
        "Content-type": "application/json; charset=utf-8",
    };

    for (let index = 0; index < header.length; index++) {
        defaultHeaders[header[index].key] = header[index].value;
    }

    return defaultHeaders;
}