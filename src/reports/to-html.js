import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export default () => {
    http.get("https://test.k6.io/contacts.php");
}

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}