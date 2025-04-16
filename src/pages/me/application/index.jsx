import { useEffect, useCallback, useReducer } from "react";
import Head from "next/head";
import TabNavigation from "@/components/layouts/TabNavigation";
import SearchBarWithDropdown from "@/components/challenge/SearchBarWithDropdown";
import ChallengeTable from "@/components/application/ChallengeTable";
import Pagination from "@/components/application/Pagination";
import { getChallengeApplications } from "@/service/api/user";
import Loader from "@/components/common/Loader";
import styles from "@/styles/pages/application/MyApplicationPage.module.css";
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
      return {
        ...state,
        applications: action.payload.applications,
        totalPages: action.payload.totalPages,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default function MyApplicationPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const itemsPerPage = 10;

  const fetchApplications = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await getChallengeApplications({
        status: STATUS_MAP[state.selectedOption] || undefined,
        search: state.searchTerm,
        page: state.currentPage,
        limit: itemsPerPage,
      });

      dispatch({
        type: "SET_APPLICATIONS",
        payload: {
          applications: response.challenges,
          totalPages: response.meta.totalPages,
        },
      });
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [state.selectedOption, state.searchTerm, state.currentPage]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return (
    <>
      <Head>
        <title>신청한 챌린지</title>
        <meta
          name="description"
          content="사용자가 신청한 모든 챌린지를 확인하는 페이지입니다."
        />
      </Head>
      <div className={styles.pageContainer}>
        <div className={styles.tabNavigationWrapper}>
          <TabNavigation activeTab="applications" />
        </div>
        <div className={styles.applicationSearchDropdownContainer}>
          <SearchBarWithDropdown
            searchTerm={state.searchTerm}
            setSearchTerm={(value) =>
              dispatch({ type: "SET_SEARCH", payload: value })
            }
            onOptionChange={(option) =>
              dispatch({ type: "SET_OPTION", payload: option })
            }
          />
        </div>
        <div className={styles.challengeTableWrapper}>
          {state.loading ? (
            <Loader msg="챌린지를 불러오는 중" />
          ) : state.applications.length > 0 ? (
            <ChallengeTable data={state.applications} />
          ) : (
            <div className={styles.noChallengesMessage}>
              아직 챌린지가 없어요.
            </div>
          )}
        </div>
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={state.currentPage}
            totalPages={state.totalPages}
            onPageChange={(page) =>
              dispatch({ type: "SET_PAGE", payload: page })
            }
          />
        </div>
      </div>
    </>
  );
}

