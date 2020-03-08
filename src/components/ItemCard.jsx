import React from "react";
import { Badge } from "reactstrap";

function ItemCard(props) {
  const { item } = props;
  const {
    Brand = "",
    Variety = "",
    Style = "",
    Country = "",
    Stars = ""
  } = item;

  return (
    <div className="ItemCard center">
      <div className="ItemCard_detail">
        <h5>
          <Badge pill color="primary">
            {Style}
          </Badge>
        </h5>
        <h4 className="marginPadding truncate-text">{Brand}</h4>
        <div className="varity truncate-text">{Variety}</div>
        <h6 className="marginPadding venue truncate-text">{Country}</h6>
      </div>
      <div className="ItemCard_stars">
        {item["Top Ten"] !== "NaN" ? (
          <>
            <div>Top ten</div>
            <div>{item["Top Ten"].slice(5)}</div>
          </>
        ) : (
          void 0
        )}
        <div>Stars</div>
        <h2 className="value">{Stars && Stars !== "NaN" ? Stars : 0}</h2>
      </div>
    </div>
  );
}

export default ItemCard;
