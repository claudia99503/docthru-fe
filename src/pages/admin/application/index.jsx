import { useState, useEffect } from "react";
import Head from "next/head";
import SearchBarWithDropdown from "../../../components/challenge/SearchBarWithDropdown";
import ChallengeTable from "../../../components/application/ChallengeTable";
import Pagination from "../../../components/application/Pagination";
import { getAllChallengeApplications } from "../../../service/api/challenge";
import Loader from "../../../components/common/Loader";
import styles from "../../../styles/pages/application/AdminApplicationPage.module.css";

export default function AdminApplicationPage() {
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

      const response = await getAllChallengeApplications({
        status,
        keyword: searchTerm,
        page: currentPage,
        limit: itemsPerPage,
      });

      if (response && response.challenge) {
        setApplications(response.challenge);
        setTotalPages(response.totalPages || 1);
      } else {
        setApplications([]);
        setTotalPages(1);
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 문제: 응답을 받았지만 에러가 발생", error.response);
      } else if (error.request) {
        console.error("요청을 보냈지만 서버 응답이 없습니다.", error.request);
      } else {
        console.error("API 요청 문제입니다.", error.message);
      }
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Head>
        <title>챌린지 신청 관리</title>
        <meta
          name="description"
          content="관리자가 챌린지 신청을 관리하는 페이지입니다."
        />
      </Head>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>챌린지 신청 관리</h1>
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
            <ChallengeTable
              data={applications}
              routerPath="/admin/application/"
            />
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

