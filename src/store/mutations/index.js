import sessions from './sessions';
import plans from './plans';
import deskAssignments from './desk-assignments';
import changesets from './changesets';
import changesetItems from './changeset-items';
import desks from './desks';
import selections from './selections';
import notifications from './notifications';

export default {
  ...plans,
  ...sessions,
  ...deskAssignments,
  ...changesets,
  ...changesetItems,
  ...desks,
  ...selections,
  ...notifications,
};
