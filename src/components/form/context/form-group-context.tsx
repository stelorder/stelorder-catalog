import React, { PropsWithChildren, useMemo } from "react";

export type FormGroupContextValue = {
  controlId?: string;
};

const Ctx = React.createContext<FormGroupContextValue | undefined>(undefined);

export const FormGroupProvider: React.FC<
  PropsWithChildren<{ controlId?: string }>
> = ({ controlId, children }) => {
  const context = useMemo(() => ({ controlId }), [controlId]);
  return <Ctx.Provider value={context}>{children}</Ctx.Provider>;
};

export const useFormGroupContext = (): FormGroupContextValue => {
  return React.useContext(Ctx) ?? {};
};
