import uuid from 'uuid/v1';

export default function({ planId, effectiveDate }) {
  const newChangeset = {
    effectiveDate: effectiveDate,
    status: 'IN_PROGRESS',
    plan: {
      id: planId
    },
    changesetItems: [],
    id: uuid(),
    isNew: true,
  };

  return newChangeset;
}
