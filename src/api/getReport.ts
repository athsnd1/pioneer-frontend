import axios from "axios";

export async function getReport (id: string) {
    
    const response = await axios.get(`http://localhost:3000/report/edit/${id}`, { withCredentials: true });

    return response.data.report;
}