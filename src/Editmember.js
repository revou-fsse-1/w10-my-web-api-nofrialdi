import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Editmember = () => {
  const [displayid, displayidupdate] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:8000/members/" + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        // idchange(resp.id);
        namechange(resp.name);
        emailchange(resp.email);
        phonechange(resp.phone);
        statuschange(resp.status);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [status, statuschange] = useState("");

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const memberdata = { id, name, email, phone, status };

    fetch("http://localhost:8000/members/" + id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(memberdata),
    })
      .then((res) => {
        // alert("Saved successfully.");
        toast.success("Success");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //   const [statuslist, statusupdate] = useState([]);

  //   useEffect(() => {
  //     fetch("http://localhost:8000/status", { method: "GET" })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         statusupdate(res);
  //         console.log(res);
  //       });
  //   }, []);

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
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form style={{ marginTop: 50 }} className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left", padding: 20 }}>
              <div className="card-title">
                <h2>Member Edit</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input required value={name} onChange={(e) => namechange(e.target.value)} className="form-control"></input>
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

                  {/* <div className="col-lg-12">
                    <label>Status</label>
                    <select class="form-select" aria-label="Default select example">
                      <option selected>-- Select Status --</option>
                      <option value="Instructure">Instructure</option>
                      <option value="Team Leader">Team Leader</option>
                      <option value="Student">Student</option>
                    </select>
                  </div> */}

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
  );
};

export default Editmember;
