"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Favorite = string;

type FavoriteContextType = {
  favorites: Favorite[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoriteContext = createContext<FavoriteContextType | null>(null);

function loadFavorites(): Favorite[] {
  try {
    const stored = sessionStorage.getItem("quickmenu-favorites");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function FavoriteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<Favorite[]>(loadFavorites);

  // Save favorites only for the current session
  useEffect(() => {
    try {
      sessionStorage.setItem(
        "quickmenu-favorites",
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites, toggleFavorite, isFavorite]
  );

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoriteProvider"
    );
  }

  return context;
}