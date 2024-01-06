import React, { useContext, useEffect, useState } from "react";
// import myimg from '../images/myimg.jpg';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    try {
      const q = query(collection(db, "users"), where("name", "==", username));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  useEffect(() => {
    // Fetch all users initially
    fetchContacts();
  }, [fetchContacts]);

  const fetchContacts = async () => {
    try {
      const usersQuery = await getDocs(collection(db, "users"));
      const usersData = usersQuery.docs.map((doc) => doc.data());
      const newUsersData = usersData.filter(
        (user) => user.uid !== currentUser.uid
      );
      setAllUsers(newUsersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      //check whether the group(chats in firestore) exists, if not create
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //create users chat

        console.log(currentUser, user);
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            name: user.name,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("Testing1");

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            name: currentUser.displayname || "",
            photoURL: currentUser.photoURL || "",
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("Testing2");
      }
    } catch (err) {
      console.log(err);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search Users..."
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={() => handleSelect(user)}>
          <img src={user.photoURL} alt="myimg" />
          <div className="userChatInfo">
            <span>{user.name}</span>
          </div>
        </div>
      )}

      <h3>All Users</h3>
      {/* {console.log(allUsers)} */}
      {allUsers &&
        allUsers.map((user) => (
          <div
            className="userChat"
            onClick={() => handleSelect(user)}
            key={user.uid}
          >
            <img src={user.photoURL} alt="myimg" />
            <div className="userChatInfo">
              <span>{user.name}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Search;
