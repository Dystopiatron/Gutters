import React, { useState, useEffect } from "react";
import { joinClub } from "./ClubServices";

export const ClubSignUp = ({ clubId, onJoined, memberships }) => {
    const [isMember, setIsMember] = useState(false);
    const user = JSON.parse(localStorage.getItem("gutters_user"));

    useEffect(() => {
        // Check if user is already a member
        fetch(`http://localhost:8088/memberships?clubId=${clubId}&userId=${user.id}`)
            .then(res => res.json())
            .then(memberships => {
                setIsMember(memberships.length > 0);
            });
    }, [clubId, user.id, memberships]); // Add memberships as dependency

    const handleJoin = () => {
        joinClub(clubId, user.id).then(() => {
            setIsMember(true);
            if (onJoined) onJoined();
        });
    };

    // Don't show button if already a member
    if (isMember) return null;

    return (
        <button className="btn-secondary" onClick={handleJoin}>
            Join Club
        </button>
    );
};