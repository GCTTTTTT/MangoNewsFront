import axios from 'axios'

// let base = '/api/search/';

export function searchContentSimple(date_sel, key, page, pageSize) {
    let config = {
        params: {
            dateSel: date_sel,
            key: key,
            page: page,
            pageSize: pageSize
        }
    };
    return axios.get("http://localhost:5399/search", config);
    // return axios.get(base + 'simple', config);
}

// export function searchContentByKeyAndTagTypePage(key, tag, type, page, pageSize) {
//     return axios.get('/api/search/key?key=' + key + '&tag=' + tag + '&type=' + type + '&page=' + page + '&pageSize=' + pageSize)
// }