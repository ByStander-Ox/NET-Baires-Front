import React, { useState } from "react";
import { newUser } from "../../../services/userServices";
import { useHistory } from "react-router";
import { EditUserComponent } from "./components/EditUserComponent";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { User } from "../../../services/models/User";
type NewUserProps = {
  loading: () => void;
  ready: () => void;
};
const NewUserComponent: React.SFC<NewUserProps> = ({ loading, ready }) => {
  const [userToEdit] = useState({} as User);
  const history = useHistory();

  const saveUser = (user: User) => {
    loading();
    newUser(user).then(x => {
      ready();
      history.push("admin/users");
    });
  };

  return (
    <>
      <EditUserComponent
        saveUser={saveUser}
        user={userToEdit}
      ></EditUserComponent>
    </>
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

export const NewUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewUserComponent);
