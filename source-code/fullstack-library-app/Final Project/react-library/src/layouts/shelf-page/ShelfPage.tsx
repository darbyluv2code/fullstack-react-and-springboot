import { useState } from "react";
import { LoansTab } from "./components/LoansTab";
import { HistoryTab } from "./components/HistoryTab";

export const ShelfPage = () => {
  const [activeTab, setActiveTab] = useState<"loans" | "history">("loans");

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12">
          <h3>My Shelf</h3>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className={`nav-link ${activeTab === "loans" ? "active" : ""}`}
                id="nav-loans-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-loans"
                type="button"
                role="tab"
                aria-controls="nav-loans"
                aria-selected={activeTab === "loans"}
                onClick={() => setActiveTab("loans")}
              >
                Loans
              </button>
              <button
                className={`nav-link ${
                  activeTab === "history" ? "active" : ""
                }`}
                id="nav-history-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-history"
                type="button"
                role="tab"
                aria-controls="nav-history"
                aria-selected={activeTab === "history"}
                onClick={() => setActiveTab("history")}
              >
                Your History
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className={`tab-pane fade ${
                activeTab === "loans" ? "show active" : ""
              }`}
              id="nav-loans"
              role="tabpanel"
              aria-labelledby="nav-loans-tab"
            >
              <LoansTab />
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "history" ? "show active" : ""
              }`}
              id="nav-history"
              role="tabpanel"
              aria-labelledby="nav-history-tab"
            >
              <HistoryTab isActive={activeTab === "history"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
