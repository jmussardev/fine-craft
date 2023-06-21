import { useState } from "react";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";

export default function Tabs({
  currentVariant,
  productId,
}: {
  currentVariant: any;
  productId: number;
}) {
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };
  return (
    <div className="tabs">
      <ul className="tabs__nav">
        <li
          className={`tabs__nav__tab ${
            activeTab === "tab1" ? "tabs__nav__tab--active" : ""
          }`}
          onClick={handleTab1}
        >
          significant others
        </li>
        <li
          className={`tabs__nav__tab ${
            activeTab === "tab2" ? "tabs__nav__tab--active" : ""
          }`}
          onClick={handleTab2}
        >
          déja vu
        </li>
      </ul>
      <div className="tabs__outlet">
        {activeTab === "tab1" ? (
          <FirstTab currentVariant={currentVariant} productId={productId} />
        ) : (
          <SecondTab />
        )}
      </div>
    </div>
  );
}
