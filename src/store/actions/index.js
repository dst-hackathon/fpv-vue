import deskAssignments from './desk-assignments';
import changesets from './changesets';
import changesetItems from './changeset-items';
import sessions from './sessions';
import desks from './desks';
import plans from './plans';

export default {
  ...plans,
  ...desks,
  ...deskAssignments,
  ...changesets,
  ...changesetItems,
  ...sessions,
};
