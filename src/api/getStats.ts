import axios from "axios";

export async function getStats() {

    const response = await axios.get("http://localhost:3000/report/stats", { withCredentials: true });

    return response.data;
}