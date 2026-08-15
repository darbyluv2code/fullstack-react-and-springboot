import { useState } from "react";
import { QandA } from "./components/QandA";
import { SubmitQuestion } from "./components/SubmitQuestion";

export const MessagesPage = () => {
  const [activeTab, setActiveTab] = useState<"submit" | "qa">("submit");

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className={`nav-link ${activeTab === "submit" ? "active" : ""}`}
                type="button"
                role="tab"
                onClick={() => setActiveTab("submit")}
              >
                Submit Question
              </button>
              <button
                className={`nav-link ${activeTab === "qa" ? "active" : ""}`}
                type="button"
                role="tab"
                onClick={() => setActiveTab("qa")}
              >
                Q/A Response/Pending
              </button>
            </div>
          </nav>
          <div className="tab-content">
            <div
              className={`tab-pane fade ${
                activeTab === "submit" ? "show active" : ""
              }`}
              role="tabpanel"
            >
              <SubmitQuestion />
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "qa" ? "show active" : ""
              }`}
              role="tabpanel"
            >
              <QandA isActive={activeTab === "qa"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
