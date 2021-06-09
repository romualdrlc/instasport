import { NextPage, GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Checkbox from "../components/checkBox";
import { getUserByCookie, getSportCategories } from "../utils/initDatabase";
import { useRouter } from "next/router";

// const Inscription: NextPage<{ categoriesImgArray, currentUsersEmail }> = ({
//   categoriesImgArray,
//   currentUsersEmail,
// }) => {

const Inscription: NextPage<{
  categoriesImgArray;
  currentUsersEmail;
  currentUsersName;
  currentUserCover;
  currentUsersBirthdate;
  categoriesImgDescription;
  currentUsersCategories;
}> = ({
  categoriesImgArray,
  currentUsersEmail,
  currentUsersName,
  currentUserCover,
  currentUsersBirthdate,
  categoriesImgDescription,
  currentUsersCategories,
}) => {
  //useRouter
  const router = useRouter();

  ///////////////////////////
  /////// useState /////////
  //////////////////////////
  const [userName, setUserName] = useState(currentUsersName);
  const [birthdate, setBirthdate] = useState(currentUsersBirthdate);
  const [usersEmail, setUsersEmail] = useState(currentUsersEmail);
  const [errorMessage, setErrorMessage] = useState(null);
  const [counterOfSelectedCategories, setCounterOfSelectedCategories] =
    useState(0);
  const [active, setActive] = useState(currentUsersCategories);

  ///////////////////////////
  /////// useEffect ////////
  //////////////////////////
  useEffect(() => {
    console.log(usersEmail);
  }, [userName, birthdate, active, usersEmail]);

  ///////////////////////////
  ////// registerForm //////
  //////////////////////////
  const registerform = async () => {
    const data = {
      email1: currentUsersEmail,
      email2: usersEmail,
      userName: userName,
      active: active,
      birthdate: birthdate,
    };
    await fetch("/api/registerform", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "ERROR") {
          setErrorMessage(
            "Erreur d'inscription, veuillez verifier votre adresse mail"
          );
        } else {
          router.push("/home");
        }
      });
  };



  /////////////////////////
  ////// Affichage ///////
  ////////////////////////
  return (
    <div className="page-inscription">
      {/* <br />
      <h1 className="titre-page-inscription text-center">Register</h1>
      <p className="sous-titre-page-inscription text-center">
        Welcome <span className="usersWelcomeName">{userName}</span>, please
        fill in this informations.
      </p>
      {errorMessage ? <p>{errorMessage}</p> : <></>} */}
      <div className="container profilePhotoEdit">
        <div className="row">
          <div className="col-5"></div>
          <div className="col-2">
            <div className="card" style={{ width: 280, height: 280 }}>
              <img
                src={
                  currentUserCover
                    ? currentUserCover
                    : "https://images.vexels.com/media/users/3/136558/isolated/lists/43cc80b4c098e43a988c535eaba42c53-person-user-icon.png"
                }
              />
              <div className="card-body">
                {/* <a href="#" className="btn btn-warning">
                  Edit
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-5"></div>
      </div>
      <div className="container">
        <div>
          <div className="row row-cols-1 row-cols-sm-2">
            <div className="colIncription col">
              <label htmlFor="exampleInputUserName" className="form-label">
                UserName
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail"
                placeholder="UserName"
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
              <label htmlFor="exampleInputUserName" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail"
                placeholder="Email"
                value={usersEmail}
                onChange={(event) => {
                  setUsersEmail(event.target.value);
                }}
              />
              <label htmlFor="exampleInputBirthDate" className="form-label">
                Birthdate
              </label>
              <input
                type="Date"
                name="trip-start"
                min="1921-01-01"
                max="2003-12-31"
                className="form-control"
                id="exampleInputBirthDate"
                aria-describedby="emailHelp"
                placeholder="BirthDate"
                value={birthdate}
                onChange={(event) => {
                  setBirthdate(event.target.value);
                }}
              />
            </div>
            <div className="col">
              <h6 className="titre-interests text-center">
                My favorite sports :
              </h6>
              <div className="container">
                <div className="row row-cols-3">
                  {categoriesImgArray.map((imageOfCategory, index) => {
                    return (
                      <div
                        className="imageInterest col text-center"
                        key={index}
                      >
                        <img
                          className="imageCircle"
                          src={imageOfCategory}
                          width="70"
                          height="70"
                          title={categoriesImgDescription[index]}
                        />
                        <Checkbox
                          id={index}
                          active={active}
                          setActive={setActive}
                          counterOfSelectedCategories={
                            counterOfSelectedCategories
                          }
                          setCounterOfSelectedCategories={
                            setCounterOfSelectedCategories
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div>
                {active.map((value, index) => {
                  return <div key={"tata" + index}>{value}</div>;
                })}
              </div>
              <button
                type="submit"
                className="Boutton btn"
                onClick={() => registerform()}
                // disabled={
                //   counterOfSelectedCategories < 3 ||
                //   userName === "" ||
                //   birthdate === "" ||
                //   usersEmail === ""
                // }
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .form-check-input {
            background-color: #fbe23b;
            color: black;
          }
        `}</style>
      </div>
    </div>
  );
};
export default Inscription;

//////////////////////////
//// serverSideProps ////
/////////////////////////
export const getServerSideProps: GetServerSideProps = async (context) => {
  //const c = cookies(context).fewlines;

  let currentUsersEmailFromDB = "";
  let currentUsersName = "";
  let currentUsersCover = "";
  let currentUsersBirthdate = "";
  let currentUsersCategories = [];

  const c = context.req.cookies.fewlines;
  if (c) {
    const currentUser = await getUserByCookie(c);
    currentUsersEmailFromDB = currentUser.email;
    currentUsersName = currentUser.userName;
    currentUsersCover = currentUser.Cover ? currentUser.Cover : "";
    currentUsersBirthdate = currentUser.Birthdate;
    currentUsersCategories = currentUser.Groups;
  }

  const sportCategories = await getSportCategories();
  const categoriesImgDescription = await sportCategories.map((category) => {
    return category.UserName;
  });

  const categoriesImgArrayFromDB = await sportCategories.map((category) => {
    return category.Cover;
  });

  return {
    props: {
      categoriesImgArray: categoriesImgArrayFromDB,
      categoriesImgDescription: categoriesImgDescription,
      currentUsersEmail: currentUsersEmailFromDB
        ? JSON.parse(JSON.stringify(currentUsersEmailFromDB))
        : "",
      currentUsersName: currentUsersName
        ? JSON.parse(JSON.stringify(currentUsersName))
        : "",
      currentUserCover: currentUsersCover,
      currentUsersBirthdate: currentUsersBirthdate,
      currentUsersCategories: currentUsersCategories
        ? currentUsersCategories
        : [],
    },
  };
};