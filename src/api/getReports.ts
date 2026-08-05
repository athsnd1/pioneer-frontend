import type { Report } from "../types/Report";
import axios from "axios";

export async function getReports(): Promise<Report[]> {

    const response = await axios.get("http://localhost:3000/report/", { withCredentials: true });

    return response.data.reports;
}