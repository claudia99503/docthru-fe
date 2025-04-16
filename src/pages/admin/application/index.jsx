import { useState, useEffect, useCallback, useReducer } from "react";
import Head from "next/head";
import SearchBarWithDropdown from "@/components/challenge/SearchBarWithDropdown";
import ChallengeTable from "@/components/application/ChallengeTable";
import Pagination from "@/components/application/Pagination";
import { getAllChallengeApplications } from "@/service/api/challenge";
import Loader from "@/components/common/Loader";
import styles from "@/styles/pages/application/AdminApplicationPage.module.css";
import { debounce } from "lodash";
import { STATUS_MAP } from "@/constants/statusMap";

const initialState = {
  selectedOption: "",
  searchTerm: "",
  currentPage: 1,
  applications: [],
  totalPages: 1,
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_OPTION":
      return { ...state, selectedOption: action.payload, currentPage: 1 };
    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_APPLICATIONS":
      return { ...state, applications: action.payload.applications, totalPages: action.payload.totalPages };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default function AdminApplicationPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchApplications = useCallback(
    debounce(async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const response = await getAllChallengeApplications({
          status: STATUS_MAP[state.selectedOption] || undefined,
          keyword: state.searchTerm,
          page: state.currentPage,
          limit: 10,
        });

        dispatch({
          type: "SET_APPLICATIONS",
          payload: { applications: response?.challenge || [], totalPages: response?.totalPages || 1 },
        });
      } catch (error) {
        console.error("API 요청 실패:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }, 300),
    [state.selectedOption, state.searchTerm, state.currentPage]
  );

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return (
    <>
      <Head>
        <title>챌린지 신청 관리</title>
        <meta name="description" content="관리자가 챌린지 신청을 관리하는 페이지입니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>챌린지 신청 관리</h1>
        <div className={styles.applicationSearchDropdownContainer}>
          <SearchBarWithDropdown
            searchTerm={state.searchTerm}
            setSearchTerm={(value) => dispatch({ type: "SET_SEARCH", payload: value })}
            onOptionChange={(option) => dispatch({ type: "SET_OPTION", payload: option })}
          />
        </div>
        <div className={styles.challengeTableWrapper}>
          {state.loading ? (
            <Loader msg="챌린지를 불러오는 중" />
          ) : state.applications.length > 0 ? (
            <ChallengeTable data={state.applications} routerPath="/admin/application/" />
          ) : (
            <div className={styles.noChallengesMessage}>아직 챌린지가 없어요.</div>
          )}
        </div>
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={state.currentPage}
            totalPages={state.totalPages}
            onPageChange={(page) => dispatch({ type: "SET_PAGE", payload: page })}
          />
        </div>
      </div>
    </>
  );
}

