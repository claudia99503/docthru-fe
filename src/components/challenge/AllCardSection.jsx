import Card from '../../components/challenge/Card';

import styles from './AllCardSection.module.css';

const AllCardSection = ({
  data,
  site,
}) => {
  const { meta, list } = data;

  return (
    <>
      <div className={styles.challengeTableWrapper}>
        {list.length > 0 ? (
          <>
            <div className={styles.AllCardSection}>
              {list.map((challenge) => (
                <Card key={`${challenge.id}`} data={challenge} site={site} />
              ))}
            </div>
          </>
        ) : (
          <div className={styles.noChallenges}>아직 챌린지가 없어요.</div>
        )}
      </div>
    </>
  );
};

export default AllCardSection;
