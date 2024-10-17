import styles from './ParticipationStatus.module.css';

const ParticipationStatus = ({ data }) => {
  const pageList = data?.meta;

  return (
    <>
    {data ? (
      <div className={styles.ParticipationStatus}>
        {data.list[0].userId}aa
      </div>
    ) : (
      <> no challenge </>
    )}
    </>
  );
};

export default ParticipationStatus;
