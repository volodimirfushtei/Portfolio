import React from "react";
import s from "./CardTech.module.css";

const CardTech = () => {
  const bgImage =
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=870&q=80";

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className={s.rotatingCardContainer}>
          <div className={s.cardRotate}>
            {/* FRONT */}
            <div
              className={`${s.front} ${s.cardBackground}`}
              style={{ backgroundImage: `url('${bgImage}')` }}
            >
              <div className={`card-body text-center text-white`}>
                <h6 className="card-category">Full Background Card</h6>
                <h3 className="card-title">
                  This Background Card Will Rotate on Hover
                </h3>
                <p className="card-description">
                  Don't be scared of the truth because we need to restart.
                </p>
              </div>
            </div>

            {/* BACK */}
            <div
              className={`${s.back} ${s.cardBackground}`}
              style={{ backgroundImage: `url('${bgImage}')` }}
            >
              <div className="card-body text-center text-white">
                <h5 className="card-title">Manage Post</h5>
                <p className="card-description">
                  As an Admin, you have shortcuts to edit, view or delete the
                  posts.
                </p>
                <div className="footer d-flex justify-content-center gap-2 mt-3">
                  <a
                    href="#view"
                    className="btn btn-info btn-round btn-just-icon"
                  >
                    <i className="material-icons">subject</i>
                  </a>
                  <a
                    href="#edit"
                    className="btn btn-success btn-round btn-just-icon"
                  >
                    <i className="material-icons">mode_edit</i>
                  </a>
                  <a
                    href="#delete"
                    className="btn btn-danger btn-round btn-just-icon"
                  >
                    <i className="material-icons">delete</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTech;
