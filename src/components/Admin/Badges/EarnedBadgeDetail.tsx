import React, { useEffect, useContext, useState } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { connect } from 'react-redux';
import { loading, ready } from '../../../store/loading/actions';
import { CardHeaderWrapper } from '../../Common/CardHeaderWrapper';
import { CardWrapper } from '../../Common/CardWrapper';
import { getBadgeFromMeber } from '../../../services/membersServices';
import { UserContext } from '../../../contexts/UserContext';
import { useParams } from 'react-router-dom';
import { BadgeMemberViewModel } from '../../../services/models/BadgeDetail';
import { isEmpty } from '../../../services/objectsservices';
import { formatStringDate } from '../../../helpers/DateHelpers';
import { makeStyles, createStyles } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { ShareInSocialNetwork } from '../components/ShareInSocialNetwork';
import { ShareProfile } from '../../Profile/ShareProfile';

type AssignBadgeProps = {
  loading: () => void;
  ready: () => void;
};
const EarnedBadgeDetailComponent: React.SFC<AssignBadgeProps> = ({
  ready,
  loading,
}) => {
  const classes = useStyles();
  const [badgeDetail, setBadgeDetai] = useState({} as BadgeMemberViewModel);
  const user = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    loading();
    getBadgeFromMeber(user.user.userId, +id!).then((b) => {
      setBadgeDetai(b);
      ready();
    });
  }, []);
  return (
    <>
      {!isEmpty(badgeDetail) && (
        <>
          <div className="row">
            <CardHeaderWrapper cardTitle="Detalle de Badge"></CardHeaderWrapper>
          </div>
          <div className="row">
            <CardWrapper colSize={4} cardTitle="Badge">
              <div className={classes.imageBadgeContainer}>
                <img
                  className={classes.imageBadge}
                  src={badgeDetail.badge.imageUrl}
                ></img>
              </div>
            </CardWrapper>
            <CardWrapper colSize={8} cardTitle="Detalle">
              <div className="row">
                <div className="col-md-12">
                  <h3>{badgeDetail.badge.name}</h3>
                </div>
                <div className="col-md-12">
                  <h5>Asignado:</h5>
                  <h6>{formatStringDate(badgeDetail.assignmentDate)}</h6>
                </div>
                <hr></hr>
                <div className="col-md-12">
                  {ReactHtmlParser(badgeDetail.badge.description)}
                </div>
              </div>
            </CardWrapper>
          </div>
          <div className="row">
            <ShareProfile
              urlToShare={`${window.location.origin}/members/${user.user.userId}/badges/${id}`}
              title="Compartí este badge en tus redes."
            ></ShareProfile>
            {/* <CardWrapper
              colSize={8}
              cardTitle="Agregar Reconocimiento a Linkedin"
            >
              <div className="row">
                <div className="col-md-4">
                <div>
                    <h6>Nombre</h6><p>{badgeDetail.badge.name}</p>
                  </div>
                  <div>
                    <h6>Organización</h6><p>NET-Baires</p>
                  </div>
                  <div>
                    <h6>Dirección de Credencial</h6><p>{window.location.origin}/members/{user.user.userId}/badges/{id}</p>
                  </div>
                </div>
                <div className="col-md-7">
                  <img
                    style={{ width: '100%' }}
                    src="https://cdn.youracclaim.com/packs/media/src/images/linkedin_share-b188bee1edd250e14530621b6647da5c.png"
                  ></img>
                  >
                </div>
              </div>
            </CardWrapper> */}
          </div>
        </>
      )}
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
  },
});

export const EarnedBadgeDetail = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EarnedBadgeDetailComponent);

const useStyles = makeStyles(() =>
  createStyles({
    imageBadgeContainer: {
      textAlign: 'center',
    },
    imageBadge: {
      maxWidth: '200px',
      textAlign: 'center',
    },
  }),
);
