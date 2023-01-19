import React, { useState, useEffect, useCallback } from "react";
import * as friendsService from "../users/friendsService";
import Person from "../person/Person";
import { Link } from "react-router-dom";

function Friends() {
  const [friendsData, setFriendsData] = useState({
    arrayOfFriends: [],
    friendsComponents: [],
  });

  const [count, setCount] = useState(0);

  // false && console.log(friendsData);

  const OnDeleteRequest = useCallback((myFriend, e) => {
    console.log(myFriend.id, { myFriend, e });

    const handler = getDeleteSuccessHandler(myFriend.id);

    friendsService.deleteFriend(myFriend.id).then(handler).catch(onDeleteError);
  }, []);

  const getDeleteSuccessHandler = (idToBeDeleted) => {
    console.log("getDeleteSuccessHandler", idToBeDeleted);

    return () => {
      console.log("onDeleteSuccess", idToBeDeleted);

      setFriendsData((prevState) => {
        const pd = { ...prevState };

        pd.arrayOfFriends = [...pd.arrayOfFriends];

        const idxOf = pd.arrayOfFriends.findIndex((friend) => {
          let result = false;

          if (friend.id === idToBeDeleted) {
            result = true;
          }
          return result;
        });

        if (idxOf >= 0) {
          pd.arrayOfFriends.splice(idxOf, 1);
          pd.friendsComponents = pd.arrayOfFriends.map(mapFriend);
        }
        return pd;
      });
    };
  };

  const mapFriend = (aFriend) => {
    // console.log("mapping", aFriend);

    return (
      <Person
        friend={aFriend}
        key={aFriend.id}
        onFriendClick={OnDeleteRequest}
      />
    );
  };

  useEffect(() => {
    console.log("firing effect");

    friendsService
      .getFriends(0, 10)
      .then(onGetFriendsSuccess)
      .catch(onGetFriendsError);
  }, []);

  const onGetFriendsSuccess = (response) => {
    console.log(response);

    //conditional chaining js*** mozilla
    //if (response?.data?.item?.pagedItems){

    let arrayOfPeeps = response.data.item.pagedItems;
    console.log({ arrayOfPeeps });

    setFriendsData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfFriends = arrayOfPeeps;
      pd.friendsComponents = arrayOfPeeps.map(mapFriend);
      return pd;
    });
  };

  const onGetFriendsError = (err) => {
    console.error(err);
  };

  const onDeleteError = (err) => {
    console.error("Deleting", err);
  };

  const onHeaderClicked = () => {
    setCount((prevState) => {
      return prevState + 1;
    });
  };

  const [toggle, setToggle] = useState(true);

  return (
    <React.Fragment>
      <h1>Friends </h1>
      <div>
        <button
          type="submit"
          onClick={() => setToggle(!toggle)}
          className="btn btn-primary"
          id="renderFriendsBtn"
        >
          Toggle
        </button>
        <div>
          <Link to="/friends/new">
            <button type="submit" className="btn btn-primary">
              Add Friend
            </button>
          </Link>
        </div>
      </div>
      {toggle && (
        <div className="container">
          <h3 onClick={onHeaderClicked}>Rendering{count}</h3>
          <div className="row">{friendsData.arrayOfFriends.map(mapFriend)}</div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Friends;
