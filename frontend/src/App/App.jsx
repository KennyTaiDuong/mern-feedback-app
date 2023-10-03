// React
import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import Feed from "../pages/feed/Feed/Feed";

// Components
import Global from "../globalStyles";
import Layout from "../components/Layout/Layout";
import FeedbackDetail from "../pages/feedback/FeedbackDetail/FeedbackDetail";
import NewFeedback from "../pages/feedback/NewFeedback/NewFeedback";
import EditFeedback from "../pages/feedback/EditFeedback/EditFeedback";
import Roadmap from "../pages/roadmap/Roadmap";
import NotFound from "../pages/notfound/NotFound";

export const GlobalContext = createContext();

function App() {
  const [feedbackArray, setFeedbackArray] = useState([]);
  const [allFeedback, setAllFeedback] = useState([]);
  const [plannedArray, setPlannedArray] = useState([]);
  const [progressArray, setProgressArray] = useState([]);
  const [liveArray, setLiveArray] = useState([]);
  const [suggestionArray, setSuggestionArray] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Most Upvotes");

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const response = await fetch("http://3.135.141.179:27017/api/feedback");

        const data = await response.json();

        setAllFeedback(
          data.sort((a, b) => {
            return b.upvotes - a.upvotes;
          })
        );

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
      } catch (error) {
        console.error(error);
      }
    }
    fetchFeedbacks();
  }, [refreshCount]);

  useEffect(() => {
    function setArrays() {
      setPlannedArray(
        allFeedback.filter((obj) => {
          return obj.status === "planned";
        })
      );
      setProgressArray(
        allFeedback.filter((obj) => {
          return obj.status === "in-progress";
        })
      );
      setLiveArray(
        allFeedback.filter((obj) => {
          return obj.status === "live";
        })
      );
      setSuggestionArray(
        allFeedback.filter((obj) => {
          return obj.status === "suggestion";
        })
      );
    }

    setArrays();
  }, [feedbackArray]);

  return (
    <BrowserRouter>
      <Global />
      <GlobalContext.Provider
        value={{
          feedbackArray,
          setFeedbackArray,
          allFeedback,
          sort,
          setSort,
          plannedArray,
          progressArray,
          liveArray,
          suggestionArray,
          filter,
          setFilter,
          refreshCount,
          setRefreshCount,
          isOpen,
          setIsOpen,
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
