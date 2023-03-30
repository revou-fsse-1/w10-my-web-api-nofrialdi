import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Addmember = () => {
  const [displayid, displayidupdate] = useState("");

  const [showmenu, showmenuupdateupdate] = useState(false);
  const usenavigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      showmenuupdateupdate(false);
    } else {
      showmenuupdateupdate(true);
      let id = sessionStorage.getItem("id");
      if (id === "" || id === null) {
        usenavigate("/login");
      } else {
        displayidupdate(id);
      }
    }
  }, [location]);

  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [status, statuschange] = useState("");

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const memberdata = { name, email, phone, status };

    fetch("http://localhost:8000/members", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(memberdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
        <div className="row">
          <div style={{ marginTop: 30 }} className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handlesubmit}>
              <div className="card" style={{ textAlign: "left", padding: 10 }}>
                <div className="card-title">
                  <h2>Add Member</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    {/* <div className="col-lg-12">
                      <div className="form-group">
                        <label>ID</label>
                        <input value={id} disabled="disabled" className="form-control"></input>
                      </div>
                    </div> */}

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Name</label>
                        <input value={name} onChange={(e) => namechange(e.target.value)} className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input value={email} onChange={(e) => emailchange(e.target.value)} className="form-control"></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Phone</label>
                        <input value={phone} onChange={(e) => phonechange(e.target.value)} className="form-control"></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Status</label>
                        <input value={status} onChange={(e) => statuschange(e.target.value)} className="form-control"></input>
                      </div>
                    </div>
                    <div className="col-lg-12 mt-3">
                      <div className="form-group">
                        <Link to="/home" className="btn btn-danger">
                          Back
                        </Link>
                        <button className="btn btn-success mx-3" type="submit">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addmember;
