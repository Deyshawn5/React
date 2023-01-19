import React, { useState, useEffect } from "react";
import { newFriend } from "../users/friendsService";
import toastr from "toastr";
import { useLocation } from "react-router-dom";

function NewFriend(props) {
  const { state } = useLocation();
  console.log("yes", state);

  const [newFriendData, setNewFriendData] = useState({
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "",
    primaryImage: "",
  });

  useEffect(() => {
    if (state?.type === "FRIEND_VIEW") {
      setNewFriendData((prevState) => {
        return {
          ...prevState,
          ...state.payload,
          primaryImage: state.payload.primaryImage.imageUrl,
        };
      });
    }
  }, [state]);
  const onFormChange = (e) => {
    const newUserValue = e.target.value;
    const nameOfField = e.target.name;
    setNewFriendData((prevState) => {
      const newUserObject = {
        ...prevState,
      };
      newUserObject[nameOfField] = newUserValue;
      return newUserObject;
    });
  };

  useEffect(() => {
    if (props.friend !== undefined) {
      setNewFriendData({
        title: props.friend.title,
        bio: props.friend.bio,
        summary: props.friend.summary,
        headline: props.friend.headline,
        slug: props.friend.slug,
        statusId: props.friend.statusId,
        primaryImage: props.friend.primaryImage,
      });
    }
  }, [props]);

  const onRegisterClick = (e) => {
    e.preventDefault();
    let payload = newFriendData;
    newFriend(payload).then(onRegisterSuccess).catch(onRegisterError);
  };

  const onRegisterSuccess = () => {
    toastr.success("User Registered Success", "Register Success");
  };
  const onRegisterError = () => {
    toastr.error("Register Was Not Valid, Try Again");
  };

  return (
    <React.Fragment>
      <h1>New</h1>
      <form>
        <div class="mb-3">
          <label for="exampleTitle" class="form-label">
            Title
          </label>
          <input
            type="title"
            name="title"
            value={newFriendData.title}
            onChange={onFormChange}
            class="form-control"
            id="title"
            aria-describedby="titleHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleBio" class="form-label">
            Biography
          </label>
          <input
            type="bio"
            name="bio"
            value={newFriendData.bio}
            onChange={onFormChange}
            class="form-control"
            id="bio"
            aria-describedby="bioHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleHeadline" class="form-label">
            Headline
          </label>
          <input
            type="headline"
            name="headline"
            value={newFriendData.headline}
            onChange={onFormChange}
            class="form-control"
            id="headline"
            aria-describedby="headlineHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleSlug" class="form-label">
            Slug
          </label>
          <input
            type="slug"
            name="slug"
            value={newFriendData.slug}
            onChange={onFormChange}
            class="form-control"
            id="slug"
            aria-describedby="slugHelp"
          />
        </div>
        <div class="mb-3">
          <label for="statusId" class="form-label">
            Status Id
          </label>
          <input
            type="statusId"
            name="statusId"
            value={newFriendData.statusId}
            onChange={onFormChange}
            class="form-control"
            id="statusId"
            aria-describedby="statusId"
          />
        </div>
        <div class="mb-3">
          <label for="primaryImage" class="form-label">
            Primary Image
          </label>
          <input
            type="primaryImage"
            name="primaryImage"
            value={newFriendData.primaryImage}
            onChange={onFormChange}
            class="form-control"
            id="primaryImage"
            aria-describedby="primaryImage"
          />
        </div>
        <button type="submit" class="btn btn-primary" onClick={onRegisterClick}>
          Add Friend
        </button>
      </form>
    </React.Fragment>
  );
}

export default NewFriend;
