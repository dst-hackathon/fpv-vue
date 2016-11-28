import _ from 'lodash';

function assignOwner(desk, owner) {
  if (desk) {
    desk.employee = owner;
  }
}

function removeOwner(desk) {
  if (desk) {
    desk.employee = null;
  }
}

export default function resolveFutureDesks(desks, changeset) {
  const futureDesks = _.cloneDeep(desks);
  const findDeskById = id => _.find(futureDesks, { id });
  const { changesetItems = []} = changeset || {};

  changesetItems.forEach(change => {
    const newOwner = change.employee;
    const origin = change.fromDesk && findDeskById(change.fromDesk.id);
    const target = change.toDesk && findDeskById(change.toDesk.id);

    if (origin) {
      const existingOwner = origin.employee;
      const sameOwner = existingOwner && existingOwner.id === newOwner.id;

      if (sameOwner) {
        removeOwner(origin);
      }
    }

    if (target) {
      assignOwner(target, newOwner);
    }
  });

  return futureDesks;
};
