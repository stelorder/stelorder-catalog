import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { IconVariant } from "../icon-constants";
import { preloadIcon, preloadIcons } from "../lazy-icon-cache.tsx";

type IconPreloadContextValue = {
  preload: (variant: IconVariant) => Promise<void>;
};

const IconPreloadContext = createContext<IconPreloadContextValue>({
  preload: async () => {},
});

export const IconPreloadProvider: React.FC<
  PropsWithChildren<{ variants?: IconVariant[] }>
> = ({ variants = [], children }) => {
  useEffect(() => {
    // Dispara la carga de los iconos críticos en cuanto el provider
    // se monta, sin bloquear el render de los hijos.
    preloadIcons(variants);
  }, [variants]);

  const value = useMemo<IconPreloadContextValue>(
    () => ({
      preload: (variant) => preloadIcon(variant).then(() => undefined),
    }),
    [],
  );

  return (
    <IconPreloadContext.Provider value={value}>
      {children}
    </IconPreloadContext.Provider>
  );
};

export const useIconPreload = () =>
  useContext(IconPreloadContext) ?? {
    preload: async () => {},
  };
