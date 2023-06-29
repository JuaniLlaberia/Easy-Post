const ProfileSkeleton = () => {
  return (
    <section className='personal-info'>
            <div className='profile-top'>
                <div className='loading-skeleton medium'></div>
                <div className='profile-user-info'>
                    <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                      <h1 className='loading-skeleton big'></h1>
                    </div>
                    <p className='loading-skeleton small'></p>
                    <p className='loading-skeleton small'></p>
                </div>
            </div>
            <section className='post-section'>
                <div className="loading-skeleton box"></div>
            </section>
    </section>
  )
}

export default ProfileSkeleton
