import axios from 'axios'

let base = '/api/load/';

export function getArtTypes() {

    // FIX:改接口 用flask做后台
    return axios.get("http://localhost:9997/type");
    // return axios.get(base + 'type');
}

export function getTinyArtOnePageByType(artType, page, pageSize) {
    let config = {
        params: {
            artType: artType,
            page: page,
            pageSize: pageSize
        }
    };
    // FIX:改接口 用flask做后台
    return axios.get("http://localhost:9997/get_data_by_type", config);
    // return axios.get(base + 'tiny', config);
}

export function getHotArtOnePage(page, pageSize) {
    let config = {
        params: {
            page: page,
            pageSize: pageSize
        }
    };

    // FIX:改接口 用flask做后台
    return axios.get("http://localhost:9997/random_art", config);
    // return axios.get(base + 'hot', config);
}

export function getFullArt(artId) {
    let config = {
        params: {
            artId: artId
        }
    };
    // FIX:改接口 用flask做后台
    return axios.get("http://localhost:9997/main", config);
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