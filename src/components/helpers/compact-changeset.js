import _ from 'lodash';

export default function compactChangeset(changeset) {
  if (!changeset) {
    return null;
  }

  const items = changeset.changesetItems;
  const groupedByOwner = _.groupBy(items, 'employee.id');
  const itemsCompacted = _.map(groupedByOwner, (items) => {
    const firstItem = _.first(items);
    const lastItem = _.last(items);

    return {
      employee: firstItem.employee,
      fromDesk: firstItem.fromDesk,
      toDesk: lastItem.toDesk
    };
  });

  const itemsWithChange = _.reduce(itemsCompacted, (acc, item) => {
    const fromDesk = _.get(item, 'fromDesk.id');
    const toDesk = _.get(item, 'toDesk.id');

    if (fromDesk === toDesk) {
      return acc;
    } else {
      return acc.concat(item);
    }
  }, []);

  // shallow clone
  return {
    ...changeset,

    changesetItems: itemsWithChange
  };
}
