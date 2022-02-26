import { objectType } from "nexus";

export const SuccessMessage = objectType({
  name: "SuccessMessage",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("description");
  },
});
