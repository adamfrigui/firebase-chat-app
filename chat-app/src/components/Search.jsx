import React, { useContext, useState } from 'react'
import './Search.scss'
import { collection, query, where, getDocs, setDoc, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext';

const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    const usersRef = collection(db, "users");
    // Create a query against the collection.
    const q = query(usersRef, where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
        console.log(user)
      });
    } catch (error) {
      setErr(true)
    }
  }
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) { }

    setUser(null);
    setUsername("")
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch()
  }
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder='Find a User' onKeyDown={handleKey} onChange={e => setUsername(e.target.value)} value={username} />
      </div>
      {err && <span>User not found</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
          <p>Hello</p>
        </div>
      </div>}
    </div>
  )
}

export default Search