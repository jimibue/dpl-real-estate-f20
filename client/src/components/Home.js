import Axios from "axios";
import React from "react";

const Home = () => {
  const update = () => {
    Axios.put("/api/auth/password", {
      password_confirmation: "6543210",
      password: "6543210",
    })
      .then((res) => {
        // dostuff
      })
      .catch((err) => {
        // dostuff
      });
    Axios.put("/api/auth", {
      email: "xxtest34@test.com",
      // password_confirmation: "123456",
      // password: "654321",
    })
      .then((res) => {
        // dostuff
      })
      .catch((err) => {
        // dostuff
      });
  };
  return (
    <>
      <div onClick={update}>Home</div>
    </>
  );
};

export default Home;
