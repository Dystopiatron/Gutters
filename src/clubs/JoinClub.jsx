import React from "react";
import { joinClub } from "./ClubServices";

export const ClubSignUp = ({ clubId, onJoined }) => {
    const user = JSON.parse(localStorage.getItem("gutters_user"));

    const handleJoin = () => {
        joinClub(clubId, user.id).then(() => {
            if (onJoined) onJoined();
            alert("You have successfully joined the club!");
        });
    };

    return (
        <button className="btn-secondary" onClick={handleJoin}>
            Join Club
        </button>
    );
};