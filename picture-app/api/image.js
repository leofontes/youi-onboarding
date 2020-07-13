import axios from 'axios';

const UNSPLASH_BASE_URL = 'https://api.unsplash.com';
const API_KEY = 'HMSWJqQi9ASD-XKJ071axwkj48VcthRm3hkZFlKWs_w';

export const search = async (keyword) => {
    const res = await axios({
        url: `${UNSPLASH_BASE_URL}/search/photos?query=${keyword}`,
        method: 'GET',
        headers: {
            Authorization: `Client-ID ${API_KEY}`
        }
    })

    return res.data;
}
