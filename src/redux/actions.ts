import { createAsyncAction } from "typesafe-actions";
import * as types from "./types";
import { ItemReq, ItemRes } from "./models";

export const getItem = createAsyncAction(
  types.GET_ITEM_REQUEST,
  types.GET_ITEM_SUCCESS,
  types.GET_ITEM_FAILED
)<ItemReq, ItemRes, Error>();
