import React, { } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { assignBadgeToMember } from "../../../services/badgesServices";
import { SelectOneBadge } from './SelectOneBadge';

type AssignBadgeProps = {
  loading: () => void;
  ready: () => void;
};
const AssignBadgeComponent: React.SFC<AssignBadgeProps> = ({
  loading,
  ready
}) => {
  const assignBadge = (badgeId: number) => {
    loading();
    assignBadgeToMember(1, badgeId).then(() => {
      ready();
    }).finally(() => {
      ready();
    });
  }
  return (
    <SelectOneBadge assignBadge={assignBadge} ></SelectOneBadge>
  );
};
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const AssignBadge = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignBadgeComponent);
