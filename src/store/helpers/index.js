import _ from 'lodash';

export function findPlanById(state, planId) {
  return _.find(state.plans, { id: planId });
};

export function findChangesetById(state, csId) {
  const changeset = _
    .chain(state.plans)
    .flatMap('changesets')
    .find({ id: csId })
    .value();

  return changeset;
};

export function findFloorById(state, floorId) {
  const floor = _
    .chain(state.plans)
    .flatMap('buildings')
    .flatMap('floors')
    .find({ id: floorId })
    .value();

  return floor;
};

export function findDeskById(state, deskId) {
  const desk = _
    .chain(state.plans)
    .flatMap('buildings')
    .flatMap('floors')
    .flatMap('desks')
    .find({ id: deskId })
    .value();

  return desk;
};
