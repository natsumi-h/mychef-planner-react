import { createContext, useContext, useEffect, useState } from "react";
import { ReactChildren } from "../types/types";
import { AuthContext } from "./AuthContext";
import { useShowToast } from "../hooks/useShowToast";
import { FridgeItemType, FridgeItems } from "../components/List/Fridge/types";
import { useFetchAirTable } from "../hooks/useFetchAirTable";

type FridgeContextType = {
  items: FridgeItems;
  setItems: React.Dispatch<React.SetStateAction<FridgeItems>>;
  getMyList: () => Promise<void>;
  error: string;
  loading: boolean;
  clickCreateSaveHandler: (ingredient: string) => Promise<void>;
  clickEditSaveHandler: (
    ingredient: string,
    item: FridgeItemType
  ) => Promise<void>;
  clickTrashHandler: (item: FridgeItemType) => Promise<void>;
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
};

// 初期値を設定
export const FridgeContext = createContext<FridgeContextType>(initialContext);

export const FridgeContextProvider = ({ children }: ReactChildren) => {
  const { user } = useContext(AuthContext);
  const uid = user?.uid;
  const [items, setItems] = useState<FridgeItems>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useShowToast();
  const { fetchAirTable } = useFetchAirTable();

  //  取得
  const getMyList = async () => {
    setItems([]);
    setLoading(true);
    try {
      const data = await fetchAirTable("GET", "Fridge");
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
      const data = await fetchAirTable("POST", "Fridge", body);
      setItems([data, ...items]);
      showToast("success", "Item added!");
    } catch (error) {
      showToast("error", "Something went wrong!");
    }
  };

  // 編集
  const clickEditSaveHandler = async (
    ingredient: string,
    item: FridgeItemType
  ) => {
    try {
      const body = JSON.stringify({
        fields: { ...item.fields, ingredient },
      });
      await fetchAirTable("PUT", "Fridge", body, item.id);
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
  const clickTrashHandler = async (item: FridgeItemType) => {
    try {
      await fetchAirTable("DELETE", "Fridge", undefined, item.id);

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
    <FridgeContext.Provider
      value={{
        items,
        setItems,
        getMyList,
        error,
        loading,
        clickCreateSaveHandler,
        clickEditSaveHandler,
        clickTrashHandler,
      }}
    >
      {children}
    </FridgeContext.Provider>
  );
};
