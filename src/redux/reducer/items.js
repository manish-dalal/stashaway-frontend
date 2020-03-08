import ActionTypes from "../constants/ActionTypes";
import get from "lodash/get";

const initialState = {
  items: [],
  itemsApiInProgress: false,
  filters: {
    search: "",
    region: ""
  }
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ITEMS:
      return Object.assign({}, state, {
        itemsApiInProgress: true
      });
    case ActionTypes.GET_ITEMS_FAILURE:
      return Object.assign({}, state, {
        itemsApiInProgress: false
      });
    case ActionTypes.GET_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        items: [...state.items, ...get(action, "payload", [])],
        itemsApiInProgress: false,
        filters: {
          ...state.filters
        }
      });
    case ActionTypes.CLEAR_ITEMS_LIST:
      return Object.assign({}, state, {
        items: []
      });
    case ActionTypes.ITEMS_FILTER_CHANGE: {
      return Object.assign({}, state, {
        filters: { ...state.filters, ...action.payload }
      });
    }
    default:
      return state;
  }
};

export default itemsReducer;
