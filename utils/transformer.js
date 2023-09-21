import { encode, decode } from "js-base64";
import axios from "axios";

export const encodeData = async (obj) => {
  const encodedData = encode(JSON.stringify(obj));
  
  try {
    const response = await axios.post("https://openaid.directories.ai/api/listing", {
      data: encodedData
    });
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload listing");
  }
};

export const decodeData = (base64) => JSON.parse(decode(base64));
