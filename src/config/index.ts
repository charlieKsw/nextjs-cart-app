import dotenv from "dotenv";
dotenv.config();

const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
const apiKey: any = process.env.NEXT_PUBLIC_API_KEY;
export { apiEndpoint, apiKey };
