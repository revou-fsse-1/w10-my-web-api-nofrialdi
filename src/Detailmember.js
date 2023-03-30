import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const Detailmember = () => {
  const [displayid, displayidupdate] = useState("");
  const [memberdata, memberchange] = useState({});
  const { id } = useParams();

  const [showmenu, showmenuupdateupdate] = useState(false);
  const usenavigate = useNavigate();
  const location = useLocation();

  //get userid users (session storage)
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      showmenuupdateupdate(false);
    } else {
      showmenuupdateupdate(true);
      let id = sessionStorage.getItem("id");
      if (id === "" || id === null) {
        usenavigate("/");
      } else {
        displayidupdate(id);
      }
    }
  }, [location]);

  useEffect(() => {
    fetch("http://localhost:8000/members/" + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        memberchange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      {showmenu && (
        <div className="header">
          <Link to={"/home"}>Home</Link>
          <span style={{ marginLeft: "70%" }}>
            Welcome <b>{displayid}</b>
          </span>
          <Link style={{ float: "right" }} to={"/"}>
            Logout
          </Link>
        </div>
      )}
      <div>
        {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

        <div style={{ marginTop: 50 }} className="container">
          <div className="card row" style={{ textAlign: "left", padding: 30 }}>
            <div className="card-title">
              <h2>Detail Members</h2>
            </div>
            <div className="card-body"></div>

            {memberdata && (
              <div>
                <h2>
                  Name is : <b>{memberdata.name}</b>
                </h2>
                <h3>Contact Details</h3>
                <h5>Email is : {memberdata.email}</h5>
                <h5>Phone is : {memberdata.phone}</h5>
                <h5>Status is : {memberdata.status}</h5>
                <Link className="btn btn-danger" to="/home">
                  Back to Listing
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* </div>
            </div> */}
      </div>
    </div>
  );
};

export default Detailmember;
