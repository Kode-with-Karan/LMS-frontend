import React, { useMemo } from 'react'

export default function AvatarUploader({ currentAvatar, preview, onSelect }){
  const displaySrc = useMemo(() => preview || currentAvatar || '', [preview, currentAvatar])
  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if(file){
      onSelect(file)
    }
  }

  return (
    <div className="avatar-uploader">
      <div className="avatar-uploader__preview">
        {displaySrc ? (
          <img src={displaySrc} alt="Avatar preview" />
        ) : (
          <div className="avatar-uploader__placeholder">You</div>
        )}
      </div>
      <label className="avatar-uploader__button">
        <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} />
        Upload new photo
      </label>
    </div>
  )
}
