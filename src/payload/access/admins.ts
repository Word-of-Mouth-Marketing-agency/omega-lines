import type { FieldAccess, PayloadRequest } from "payload";

type AccessArgs = {
  req: PayloadRequest;
};

export const authenticated = ({ req }: AccessArgs) => Boolean(req.user);
export const adminsOnly = ({ req }: AccessArgs) => Boolean(req.user);
export const adminsOnlyField: FieldAccess = ({ req }) => Boolean(req.user);
