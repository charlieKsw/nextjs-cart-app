import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export { apiKey, apiBaseUrl };
