import _ from 'lodash';
import compactChangeset from 'components/helpers/compact-changeset';

const james = { id: 1 };
const jenna = { id: 2};

describe('compact-changeset', function() {
  it('compacts changeset items', function() {
    const changeset = {
      changesetItems: [{
        employee: james,
        fromDesk: null,
        toDesk: { id: 1 }
      }, {
        employee: jenna,
        fromDesk: { id: 2 },
        toDesk: null
      }, {
        employee: james,
        fromDesk: { id: 1 },
        toDesk: { id: 2 }
      }]
    };

    const compacted = compactChangeset(changeset);
    const items = compacted.changesetItems;

    const jamesChange = _.find(items, [ 'employee.id', james.id ]);
    const jennaChange = _.find(items, [ 'employee.id', jenna.id ]);

    expect(items).to.have.lengthOf(2);
    expect(jamesChange).to.deep.equal({
      employee: james,
      fromDesk: null,
      toDesk: { id: 2}
    });

    expect(jennaChange).to.deep.equal({
      employee: jenna,
      fromDesk: { id: 2 },
      toDesk: null
    });
  });

  it('returns null when changeset is falsy', function() {
    expect(compactChangeset(null)).to.be.null;
  });

  it('does not include a change that results in the same desk move', function() {
    const changeset = {
      changesetItems: [{
        employee: james,
        fromDesk: null,
        toDesk: { id: 1 }
      }, {
        employee: jenna,
        fromDesk: { id: 2 },
        toDesk: null
      }, {
        employee: james,
        fromDesk: { id: 1 },
        toDesk: null
      }, {
        employee: jenna,
        fromDesk: null,
        toDesk: { id: 2 }
      }]
    };

    const compacted = compactChangeset(changeset);
    const items = compacted.changesetItems;

    expect(items).to.have.lengthOf(0);
  });
});
