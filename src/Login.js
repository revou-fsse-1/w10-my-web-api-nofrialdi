import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");

  // const [userlist, userupdate] = useState([]);

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  // useEffect(() => {
  //   fetch("https://my-json-server.typicode.com/nofrialdi/revou-members-data/users/", { method: "GET" })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       userupdate(res);
  //       console.log(res);
  //     });
  // }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      ///implentation
      // console.log('proceed');
      fetch("https://6422cfe5001cb9fc20307a5e.mockapi.io/users" + id)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter valid userid");
          } else {
            if (resp.password === password) {
              toast.success("Success");
              sessionStorage.setItem("id", id);
              usenavigate("/home");
            } else {
              toast.error("Please Enter valid credentials");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter UserId");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };
  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <form onSubmit={ProceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  Username <span className="errmsg">*</span>
                </label>
                <input value={username} onChange={(e) => usernameupdate(e.target.value)} className="form-control"></input>
              </div>
              <div className="form-group">
                <label>
                  Password <span className="errmsg">*</span>
                </label>
                <input type="password" value={password} onChange={(e) => passwordupdate(e.target.value)} className="form-control"></input>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Login
              </button>{" "}
              |
              <Link className="btn btn-success" to={"/register"}>
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
