import {
  itemRequest as cb100Req,
  itemResponse as cb100Res,
} from "../api-models/cb100";

export type ItemReq = cb100Req;
export type ItemRes = cb100Res;

export type InitialStateTypes = {
  itemInitial: ItemRes;
};

export const InitialState: InitialStateTypes = {
  itemInitial: [
    {
      code: "",
      name: "",
      states: [
        {
          code: "",
          name: "",
          cities: [
            {
              name: "",
              population: "",
            },
          ],
        },
      ],
      id: "",
    },
  ],
};
