import React from "react";
import Person from "../../images/person.png";
import "./CardLoader.css";
function UserCardLoader() {
  return (
    <div className="user--card--skeleton center--flexed">
      <div className="img"></div>
      <div className="user--info">
        <div className="div1"></div>
        <div className="div2"></div>
      </div>
    </div>
  );
}

export default UserCardLoader;
