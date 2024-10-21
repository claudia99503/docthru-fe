import { useState, useEffect } from "react";
import Head from "next/head";
import TabNavigation from "../../../components/layouts/TabNavigation";
import SearchBarWithDropdown from "../../../components/challenge/SearchBarWithDropdown";
import ChallengeTable from "../../../components/application/ChallengeTable";
import Pagination from "../../../components/application/Pagination";
import { getChallengeApplications } from "../../../service/api/user";
import Loader from "../../../components/common/Loader";
import styles from "../../../styles/pages/application/MyApplicationPage.module.css";

export default function MyApplicationPage() {
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [applications, setApplications] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const fetchApplications = async () => {
    setLoading(true);
    try {
      let status;
      if (selectedOption === "승인 대기") status = "WAITING";
      else if (selectedOption === "신청 승인") status = "ACCEPTED";
      else if (selectedOption === "신청 거절") status = "REJECTED";

      const response = await getChallengeApplications({
        status,
        search: searchTerm,
        page: currentPage,
        limit: itemsPerPage,
      });

      setApplications(response.challenges);
      setTotalPages(response.meta.totalPages);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [selectedOption, searchTerm, currentPage]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setCurrentPage(1);
  };
린
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onOptionChange={handleOptionChange}
          />
        </div>
        <div className={styles.challengeTableWrapper}>
          {loading ? (
            <Loader msg="챌린지를 불러오는 중" />
          ) : applications && applications.length > 0 ? (
            <ChallengeTable data={applications} />
          ) : (
            <div className={styles.noChallengesMessage}>
              아직 챌린지가 없어요.
            </div>
          )}
        </div>
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

