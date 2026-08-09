"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Favorite = string;

type FavoriteContextType = {
  favorites: Favorite[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export function FavoriteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites for the current browser session
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("quickmenu-favorites");

      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites only for the current session
  useEffect(() => {
    if (!isLoaded) return;

    try {
      sessionStorage.setItem(
        "quickmenu-favorites",
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favorites, isLoaded]);

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  }

  function isFavorite(id: string) {
    return favorites.includes(id);
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
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