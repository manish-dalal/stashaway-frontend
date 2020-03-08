import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FaSearchMinus } from "react-icons/fa";

import orderBy from "lodash/orderBy";
import get from "lodash/get";
import set from "lodash/set";

import { getItems } from "redux/actions/getItem";
import FilterBar from "components/FilterBar";
import ItemCard from "components/ItemCard";
import SkeltonCard from "components/SkeltonCard";

const groupDataFn = items => {
  const newData = {};
  orderBy(items, "Top Ten").forEach(item => {
    if (item["Top Ten"]) {
      const year = item["Top Ten"].slice(0, 4);
      const oldYearData = get(newData, [year], []);
      const newSortedArr = [...oldYearData, item];
      set(newData, [year], newSortedArr);
    }
  });
  return newData;
};

const Home = props => {
  let { dispatch, items, history, itemsApiInProgress } = props;
  useEffect(() => {
    dispatch(getItems());
    // eslint-disable-next-line
  }, []);

  const groupData = groupDataFn(items);
  const mapKey = Object.keys(groupData).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );
  return (
    <div className="Home">
      {items.length ? (
        <>
          <FilterBar history={history} />
          <div className="center Home_body_container">
            {itemsApiInProgress ? (
              <div
                className="MatchesList"
                style={{ paddingBottom: 10 }}
                key={new Date()}
              >
                <SkeltonCard />
              </div>
            ) : (
              mapKey.map((year, index) => (
                <div className="Home_body_year" key={"year" + index}>
                  <div className="title">
                    #{year && year !== "NaN" ? year : "Not in top ten"}
                  </div>
                  {groupData[year]
                    .sort(
                      (a, b) =>
                        parseInt(a["Top Ten"].slice(6)) -
                        parseInt(b["Top Ten"].slice(6))
                    )
                    .map((item, index) => (
                      <ItemCard item={item} key={index} />
                    ))}
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div className="Home_noResult">
          <FaSearchMinus size={60} />
          <h4 className="title">No result found</h4>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loadState,
    items: state.itemsReducer.items,
    itemsApiInProgress: state.itemsReducer.itemsApiInProgress
  };
};
export default connect(mapStateToProps)(Home);
