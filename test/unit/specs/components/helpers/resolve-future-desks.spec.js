import _ from 'lodash';
import resolveFutureDesks from 'components/helpers/resolve-future-desks';

const james = { id: 1, nickname: 'james' };
const mary = { id: 2, nickname: 'mary' };

const findOwnerByDeskId = (desks, id) => {
  const desk = _.find(desks, { id });

  return desk && desk.employee;
};

describe('resolve-future-desk', function() {

  it('is correct when there is a single change item', function() {
    const desks = [{
      id: 1,
      employee: james
    }, {
      id: 2,
      employee: mary
    }];

    const changeset = {
      changesetItems: [{
        employee: james,
        fromDesk: { id: 1 },
        toDesk: { id: 2 }
      }]
    };

    const futureDesks = resolveFutureDesks(desks, changeset);

    expect(findOwnerByDeskId(futureDesks, 1)).to.be.null;
    expect(findOwnerByDeskId(futureDesks, 2)).to.equal(james);
  });

  it('is correct when there are many change items', function() {
    const desks = [{
      id: 1,
      employee: james
    }, {
      id: 2,
      employee: mary
    }, {
      id: 3,
      employee: null
    }];

    const changeset = {
      changesetItems: [{
        employee: james,
        fromDesk: { id: 1 },
        toDesk: { id: 2 }
      }, {
        employee: mary,
        fromDesk: { id: 2 },
        toDesk: { id: 1 }
      }, {
        employee: mary,
        fromDesk: { id: 1 },
        toDesk: { id: 3 }
      }]
    };

    const futureDesks = resolveFutureDesks(desks, changeset);

    expect(findOwnerByDeskId(futureDesks, 1)).to.be.null;
    expect(findOwnerByDeskId(futureDesks, 2)).to.equal(james);
    expect(findOwnerByDeskId(futureDesks, 3)).to.equal(mary);
  });

  (() => {
    const changesets = {
      'empty': {},
      'undefined': undefined,
      'null': null
    };

    _.forEach(changesets, (value, scenario) => {
      it(`returns current desks when changeset is ${scenario}`, function() {
        const desks = [{
          id: 2
        }, {
          id: 5
        }];

        const futureDesks = resolveFutureDesks(desks, value);

        expect(futureDesks).to.deep.equal(desks);
      });
    });
  })();

  it('ignores a desk that is not in the changeset', function() {
    const desks = [{
      id: 1,
      employee: james
    }, {
      id: 6
    }];

    const sara = { id: 3, nickname: 'sara' };
    const changeset = {
      changesetItems: [{
        employee: james,
        fromDesk: { id: 1 },
        toDesk: { id: 11 }
      }, {
        employee: mary,
        fromDesk: { id: 15 },
        toDesk: { id: 12 }
      }, {
        employee: sara,
        fromDesk: { id: 9 },
        toDesk: { id: 1 }
      }]
    };

    const futureDesks = resolveFutureDesks(desks, changeset);

    expect(findOwnerByDeskId(futureDesks, 1)).to.equal(sara);
    expect(findOwnerByDeskId(futureDesks, 6)).to.be.undefined;
  });

});
