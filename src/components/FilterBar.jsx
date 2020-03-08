import React from "react";
import { FormGroup, CustomInput } from "reactstrap";
import { connect } from "react-redux";

import { getItems, itemsFilterChange, clearItems } from "redux/actions/getItem";
import { regions } from "utils/common";

function FilterBar(props) {
  const {
    filters: { region = "" },
    dispatch
  } = props;

  const onRegionChange = event => {
    dispatch(itemsFilterChange({ region: event.target.value }));
    dispatch(clearItems());
    dispatch(getItems());
  };
  return (
    <div className="Home_filterBar center">
      <h5 className="title">Ramen restaurants</h5>
      <FormGroup className="Home_filterBar_form">
        <CustomInput
          className="input"
          type="select"
          name="venu"
          id="venu"
          onChange={onRegionChange}
          value={region}
        >
          <option value="">Filter by Country</option>
          {regions.map((regionName, key) => (
            <option key={key}>{regionName}</option>
          ))}
        </CustomInput>
      </FormGroup>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    filters: state.itemsReducer.filters
  };
};
export default connect(mapStateToProps)(FilterBar);
