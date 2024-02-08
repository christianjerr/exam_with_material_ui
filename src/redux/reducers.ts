import { produce, Draft } from "immer";
import { combineReducers } from "redux";
import { getType, ActionType } from "typesafe-actions";
import * as models from "./models";
import * as actions from "./actions";

const itemInitial = produce(
  (draft: Draft<models.ItemRes>, action: ActionType<typeof actions>) => {
    switch (action.type) {
      case getType(actions.getItem.request):
        draft = models.InitialState.itemInitial;
        return draft;
      case getType(actions.getItem.success):
        draft = action.payload;
        return draft;
      default:
        return draft;
    }
  },
  models.InitialState.itemInitial
);

export const rootReducer = combineReducers({
  itemInitial,
});
export default rootReducer;
