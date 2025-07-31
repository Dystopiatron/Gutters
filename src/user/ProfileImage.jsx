import React from "react"

export const ProfileImage = ({ user, size = "medium" }) => {
  const sizeClasses = {
    small: "profile-image-small",
    medium: "profile-image-medium", 
    large: "profile-image-large"
  }

  const defaultImage = "https://via.placeholder.com/150x150/1a1a2e/f7df03?text=" + 
                      (user?.name ? user.name.charAt(0).toUpperCase() : "?")

  return (
    <img
      src={user?.profileImageURL || defaultImage}
      alt={`${user?.name || "User"}'s profile`}
      className={`profile-image ${sizeClasses[size]}`}
      onError={(e) => {
        e.target.src = defaultImage
      }}
    />
  )
}