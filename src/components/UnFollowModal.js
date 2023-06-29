import { unFollowUser } from "@/utils/unFollow";

const UnFollowModal = ({user, toggleModal, userId, myId}) => {

    const unfollow = () => {
        toggleModal();
        unFollowUser(userId, myId)
    };

  return (
    <>
    <div className='unfollow-modal'>
      <p>Are you sure you want to stop following @{user}?</p>
      <div style={{display:'flex', justifyContent:'center', gap:'10px', marginTop:'15px'}}>
        <button onClick={toggleModal}>Cancel</button>
        <button className="remove" onClick={unfollow}>Unfollow</button>
      </div>
    </div>
    <div className="overlay-profile" onClick={toggleModal}></div>
    </>
  )
}

export default UnFollowModal
