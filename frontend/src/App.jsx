// React
import { useState, useEffect, createContext, Profiler } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Feed from "./pages/feed/Feed";

// Components
import Global from "./globalStyles";
import Layout from "./components/Layout";
import FeedbackDetail from "./pages/feedback/FeedbackDetail";
import NewFeedback from "./pages/feedback/NewFeedback";
import EditFeedback from "./pages/feedback/EditFeedback";
import Roadmap from "./pages/roadmap/Roadmap";
import NotFound from "./pages/NotFound";

export const GlobalContext = createContext();

function App() {
  const [feedbackArray, setFeedbackArray] = useState([]);
  const [plannedArray, setPlannedArray] = useState([]);
  const [progressArray, setProgressArray] = useState([]);
  const [liveArrary, setLiveArray] = useState([]);
  const [suggestionArray, setSuggestionArray] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Most Upvotes");

  useEffect(() => {
    async function fetchFeedbacks() {
      const response = await fetch("http://localhost:4000/api/feedback/");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (filter === "All") {
        setFeedbackArray(
          data.sort((a, b) => {
            return b.upvotes - a.upvotes;
          })
        );
      } else if (filter === "UI") {
        setFeedbackArray(
          data.filter((obj) => {
            return obj.category === "ui";
          })
        );
      } else if (filter === "UX") {
        setFeedbackArray(
          data.filter((obj) => {
            return obj.category === "ux";
          })
        );
      } else if (filter === "Enhancement") {
        setFeedbackArray(
          data.filter((obj) => {
            return obj.category === "enhancement";
          })
        );
      } else if (filter === "Bug") {
        setFeedbackArray(
          data.filter((obj) => {
            return obj.category === "bug";
          })
        );
      } else if (filter === "Feature") {
        setFeedbackArray(
          data.filter((obj) => {
            return obj.category === "feature";
          })
        );
      }
    }

    function setArrays() {
      setPlannedArray(
        feedbackArray.filter((obj) => {
          return obj.status === "planned";
        })
      );
      setProgressArray(
        feedbackArray.filter((obj) => {
          return obj.status === "in-progress";
        })
      );
      setLiveArray(
        feedbackArray.filter((obj) => {
          return obj.status === "live";
        })
      );
      setSuggestionArray(
        feedbackArray.filter((obj) => {
          return obj.status === "suggestion";
        })
      );
    }

    fetchFeedbacks();
    setArrays();
  }, [refreshCount]);

  return (
    <BrowserRouter>
      <Global />
      <GlobalContext.Provider
        value={{
          feedbackArray,
          setFeedbackArray,
          sort,
          setSort,
          plannedArray,
          progressArray,
          liveArrary,
          suggestionArray,
          filter,
          setFilter,
          refreshCount,
          setRefreshCount,
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Feed />} />
            <Route path="/:id" element={<FeedbackDetail />} />
            <Route path="/edit/:id" element={<EditFeedback />} />
            <Route path="/newfeedback" element={<NewFeedback />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
