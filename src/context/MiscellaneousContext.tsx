import { createContext, useContext, useEffect, useState } from "react";
import { ReactChildren } from "../types/types";
import { AuthContext } from "./AuthContext";
import { MyItemType, MyItems } from "../components/List/Miscellaneous/types";
import { useShowToast } from "../hooks/useShowToast";
import { useFetchAirTable } from "../hooks/useFetchAirTable";

type MiscellaneousContextType = {
  items: MyItems;
  setItems: React.Dispatch<React.SetStateAction<MyItems>>;
  getMyList: () => Promise<void>;
  error: string;
  loading: boolean;
  clickCreateSaveHandler: (ingredient: string) => Promise<void>;
  clickEditSaveHandler: (ingredient: string, item: MyItemType) => Promise<void>;
  clickTrashHandler: (item: MyItemType) => Promise<void>;
  addToFridgeHandler: (item: MyItemType) => Promise<void>;
};

const initialContext = {
  items: [],
  setItems: () => {
    throw new Error("setItems is not defined");
  },
  getMyList: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
  error: "",
  loading: false,
  clickCreateSaveHandler: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
  clickEditSaveHandler: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
  clickTrashHandler: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
  addToFridgeHandler: () => {
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
};

// 初期値を設定
export const MiscellaneousContext =
  createContext<MiscellaneousContextType>(initialContext);

export const MiscellaneousContextProvider = ({ children }: ReactChildren) => {
  const { user } = useContext(AuthContext);
  const uid = user?.uid;
  const [items, setItems] = useState<MyItems>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useShowToast();
  const { fetchAirTable } = useFetchAirTable();

  //  取得
  const getMyList = async () => {
    setLoading(true);
    try {
      const data = await fetchAirTable("GET", "Miscellaneous");
      setItems(data.records);
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // 作成
  const clickCreateSaveHandler = async (ingredient: string) => {
    if (!ingredient) return;
    try {
      const body = JSON.stringify({
        fields: {
          ingredient: ingredient,
          userId: uid,
        },
      });
      const data = await fetchAirTable("POST", "Miscellaneous", body);
      setItems([data, ...items]);
      showToast("success", "Item added!");
    } catch (error) {
      showToast("error", "Something went wrong!");
    }
  };

  // Add to Fridge
  const addToFridgeHandler = async (item: MyItemType) => {
    try {
      const body = JSON.stringify({
        fields: {
          ingredient: item.fields.ingredient,
          userId: uid,
        },
      });
      await fetchAirTable("POST", "Fridge", body);

      // DELETE
      await fetchAirTable("DELETE", "Miscellaneous", undefined, item.id);
      setItems((prev) => prev.filter((prevItem) => prevItem.id !== item.id));
      showToast("success", "Item added to your fridge!");
    } catch (error) {
      showToast("error", "Something went wrong!");
    }
  };

  // 編集
  const clickEditSaveHandler = async (ingredient: string, item: MyItemType) => {
    try {
      const body = JSON.stringify({
        fields: { ...item.fields, ingredient },
      });
      await fetchAirTable("PUT", "Miscellaneous", body, item.id);
      setItems((prev) =>
        prev.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, fields: { ...prevItem.fields, ingredient } }
            : prevItem
        )
      );
      showToast("success", "Saved!");
    } catch (error) {
      showToast("error", "Something went wrong!");
    }
  };

  // 削除
  const clickTrashHandler = async (item: MyItemType) => {
    try {
      await fetchAirTable("DELETE", "Miscellaneous", undefined, item.id);
      showToast("success", "Item deleted!");
      setItems((prev) => prev.filter((prevItem) => prevItem.id !== item.id));
    } catch (error) {
      showToast("error", "Something went wrong!");
    }
  };

  useEffect(() => {
    getMyList();
  }, [uid]);

  return (
    <MiscellaneousContext.Provider
      value={{
        items,
        setItems,
        getMyList,
        error,
        loading,
        clickCreateSaveHandler,
        clickEditSaveHandler,
        clickTrashHandler,
        addToFridgeHandler,
      }}
    >
      {children}
    </MiscellaneousContext.Provider>
  );
};
