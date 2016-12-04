import moment from 'moment';

export default function sortChangesetsByDate(changesets) {
  const sorted = changesets.sort((a, b) => {
    if (moment(a.effectiveDate).isBefore(b.effectiveDate)) {
      return -1;
    } else {
      return 1;
    }
  });

  return sorted;
};
