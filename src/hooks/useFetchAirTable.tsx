import { useContext } from "react";
import { airTableApiKey, airTableBaseId, airTableRoot } from "../config/config";
import { AuthContext } from "../context/AuthContext";

type Method = "GET" | "POST" | "DELETE" | "PUT";
type RequestOptions = {
  method: Method;
  headers: {
    Authorization: string;
    "Content-Type": "application/json";
  };
  body?: string;
};

export const useFetchAirTable = () => {
  const { user } = useContext(AuthContext);
  const uid = user?.uid;

  const fetchAirTable = async (
    method: Method,
    tableType: string,
    body?: string,
    id?: string
  ) => {
    const getUrl = (method: Method) => {
      if (method == "GET") {
        return `${airTableRoot}${airTableBaseId}/${tableType}?filterByFormula=%7BuserId%7D+%3D+%22${uid}%22`;
      } else if (method === "POST") {
        return `${airTableRoot}${airTableBaseId}/${tableType}`;
      } else {
        return `${airTableRoot}${airTableBaseId}/${tableType}/${id}`;
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

  return { fetchAirTable };
};
