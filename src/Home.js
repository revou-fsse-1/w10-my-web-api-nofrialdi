import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [displayid, displayidupdate] = useState("");
  const [memberlist, memberupdate] = useState([]);
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

  //get all data members
  useEffect(() => {
    fetch("http://localhost:8000/members", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        memberupdate(res);
        console.log(res);
      });
  }, []);

  const LoadDetail = (id) => {
    usenavigate("/member/detail/" + id);
  };
  const LoadEdit = (id) => {
    usenavigate("/member/edit/" + id);
  };

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8000/members/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          // toast.success("Success Remove Data");
          alert("Removed successfully.");
          window.location.reload();
          // usenavigate("/home");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
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
      <div className="container">
        <div style={{ marginTop: 20, padding: 20, marginBottom: 20 }} className="card">
          <div className="card-haeder">
            <h3>List Data Revou FSSE </h3>
          </div>
        </div>
        <div className="card-body">
          {/* <a onClick={() => {}} className="btn btn-success">
            Add Member (+)
          </a> */}
          <Link to="/member/add" className="btn btn-primary">
            Add Member (+)
          </Link>
        </div>
        <br></br>
        <table className="table table-bordered">
          <thead className="bg-dark text-white">
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Status</td>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {memberlist &&
              memberlist.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.status}</td>
                  <td>
                    <a
                      style={{ marginRight: 5 }}
                      onClick={() => {
                        LoadEdit(item.id);
                      }}
                      className="btn btn-warning"
                    >
                      Edit
                    </a>

                    <a
                      style={{ marginRight: 5 }}
                      onClick={() => {
                        Removefunction(item.id);
                      }}
                      className="btn btn-danger"
                    >
                      Remove
                    </a>

                    <a
                      style={{ marginRight: 5 }}
                      onClick={() => {
                        LoadDetail(item.id);
                      }}
                      className="btn btn-info"
                    >
                      Details
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
