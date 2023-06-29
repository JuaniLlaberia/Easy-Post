import { ClipLoader } from 'react-spinners'

const loading = () => {
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', backgroundColor:'rgb(28, 28, 31)'}}>
      <ClipLoader color="#e981f7" size='50px'/>
    </div>
  )
}

export default loading
