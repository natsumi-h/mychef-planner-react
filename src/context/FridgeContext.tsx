import { createContext, useContext, useEffect, useState } from "react";
import { ReactChildren } from "../types/types";
import { AuthContext } from "./AuthContext";
import { MyItemType, MyItems } from "../components/List/Miscellaneous/types";
import { airTableApiKey, airTableBaseId, airTableRoot } from "../config/config";
import { useShowToast } from "../hooks/useShowToast";

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
export const FridgeContext = createContext<{
  items: MyItems;
  setItems: React.Dispatch<React.SetStateAction<MyItems>>;
  getMyList: () => Promise<void>;
  error: string;
  loading: boolean;
  clickCreateSaveHandler: (ingredient: string) => Promise<void>;
  clickEditSaveHandler: (ingredient: string, item: MyItemType) => Promise<void>;
  clickTrashHandler: (item: MyItemType) => Promise<void>;
}>(initialContext);

export const FridgeContextProvider = ({ children }: ReactChildren) => {
  
  const { user } = useContext(AuthContext);
  const uid = user?.uid;
  const [items, setItems] = useState<MyItems>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useShowToast();

  //  取得
  const getMyList = async () => {
    setItems([]);
    setLoading(true);
    try {
      const res = await fetch(
        `${airTableRoot}${airTableBaseId}/Fridge`,
        {
          headers: {
            Authorization: `Bearer ${airTableApiKey}`,
          },
        }
      );
      const data = await res.json();

      const filteredItems = data.records.filter(
        (item: {
          fields: {
            userId: string;
          };
        }) => item?.fields?.userId === uid
      );

      setItems(filteredItems);
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
      const res = await fetch(
        `${airTableRoot}${airTableBaseId}/Fridge/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${airTableApiKey}`,
          },
          body: JSON.stringify({
            fields: {
              ingredient: ingredient,
              userId: uid,
            },
          }),
        }
      );
      const data = await res.json();
      setItems([data, ...items]);
      showToast("success", "Item added!");
    } catch (error) {
      showToast("error", "Something went wrong!");
    }
  };

  // 編集
  const clickEditSaveHandler = async (ingredient: string, item: MyItemType) => {
    try {
      await fetch(`${airTableRoot}${airTableBaseId}/Fridge/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${airTableApiKey}`,
        },
        body: JSON.stringify({
          fields: { ...item.fields, ingredient },
        }),
      });
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
      const res = await fetch(
        `${airTableRoot}${airTableBaseId}/Fridge/${item.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${airTableApiKey}`,
          },
        }
      );
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        throw new Error(data.error);
      }

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
