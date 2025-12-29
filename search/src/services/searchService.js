import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchSearchResults(query) {
    const res = await axios.get(API_URL);
    const data = res.data;

    return data
        .filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        )
        .map(item => ({
            id: item.id,
            title: item.title,
            snippet: item.body.slice(0, 90) + "...",
            details: item.body
        }));
}
