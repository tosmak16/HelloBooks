import React from 'react';


class ActivityLoader extends React.Component {
  render() {
    return (
      <div className="preloader-wrapper activity-loader big active">
        <div className="gap-patch activity-gap2">
          <div className="spinner-layer activity-spinner spinner-red-only">
            <div className="circle-clipper left">

              <div className="circle" />
            </div><div className="gap-patch activity-gap" />

            <div className="circle" />
          </div><div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    );
  }
}
export default ActivityLoader;
