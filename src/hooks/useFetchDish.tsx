import { useContext } from "react";
import { airTableApiKey, airTableBaseId, airTableRoot } from "../config/config";
import { AuthContext } from "../context/AuthContext";

type Method = "GET" | "POST" | "DELETE" | "PUT";
// type Body = unknown;
type RequestOptions = {
  method: Method;
  headers: {
    Authorization: string;
    "Content-Type": "application/json";
  };
  body?: string;
};

export const useFetchDish = () => {
  const { user } = useContext(AuthContext);
  const uid = user?.uid;

  const fetchDish = async (method: Method, body?: string, id?: string) => {
    const getUrl = (method: Method) => {
      if (method == "GET") {
        return `${airTableRoot}${airTableBaseId}/Dish?filterByFormula=%7BuserId%7D+%3D+%22${uid}%22`;
      } else {
        return `${airTableRoot}${airTableBaseId}/Dish/${id}`;
      }
    };
    const url = getUrl(method);

    try {
      const requestOptions: RequestOptions = {
        method,
        headers: {
          Authorization: `Bearer ${airTableApiKey}`,
          "Content-Type": "application/json",
        },
      };
      // bodyが存在する場合のみ、requestOptionsに追加
      if (body) {
        requestOptions.body = body;
      }

      const res = await fetch(url, requestOptions);

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchDish };
};
