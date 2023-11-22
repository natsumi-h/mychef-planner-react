import { useContext } from "react";
import { airTableApiKey, airTableBaseId, airTableRoot } from "../config/config";
import { AuthContext } from "../context/AuthContext";

type Method = "GET" | "POST" | "DELETE" | "PUT";
type TableType = "Dish" | "Favorite" | "Miscellaneous" | "Fridge";
type RequestOptions = {
  method: Method;
  headers: {
    Authorization: string;
    "Content-Type": "application/json";
  };
  body?: string;
};

type ApiParams = {
  method: Method;
  tableType: TableType;
  body?: string;
  id?: string;
};

export const useFetchAirTable = () => {
  const { user } = useContext(AuthContext);
  const uid = user?.uid;

  const fetchAirTable = async (apiParams: ApiParams) => {
    const { method, tableType, body, id } = apiParams;

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
      return error;
    }
  };

  return { fetchAirTable };
};
