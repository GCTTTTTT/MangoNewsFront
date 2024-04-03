import axios from 'axios'

let base = '/api/load/';

export function getArtTypes(dateSel) {
    let config = {
        params: {
            dateSel: dateSel
        }
    };

    // FIX:改接口 用flask做后台
    return axios.get("http://localhost:5399/type", config);
    // return axios.get(base + 'type');
}

export function getTinyArtOnePageByType(dateSel, artType, page, pageSize) {
    let config = {
        params: {
            dateSel: dateSel,

            artType: artType,
            page: page,
            pageSize: pageSize
        }
    };
    // FIX:改接口 用flask做后台
    return axios.get("http://localhost:5399/get_data_by_type", config);
    // return axios.get(base + 'tiny', config);
}

export function getHotArtOnePage(dateSel, page, pageSize) {
    let config = {
        params: {
            dateSel: dateSel,

            page: page,
            pageSize: pageSize
        }
    };

    // FIX:改接口 用flask做后台
    return axios.get("http://localhost:5399/random_art", config);
    // return axios.get(base + 'hot', config);
}

export function getFullArt(dateSel, artId) {
    let config = {
        params: {
            dateSel: dateSel,

            artId: artId
        }
    };
    // FIX:改接口 用flask做后台
    return axios.get("http://localhost:5399/main", config);
    // return axios.get(base + 'main', config);
}

export function setArtPreference(artId, type) {
    let config = {
        params: {
            artId: artId,
            type: type
        }
    };
    return axios.get(base + 'prefer', config);
}