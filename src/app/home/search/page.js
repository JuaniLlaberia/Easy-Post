'use client'

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import '../../../assets/search.css'
import { useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/firebase_config"
import UserItem from "@/components/userItem"
import { ClipLoader } from "react-spinners"


const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async e => {
        e.preventDefault();

        if(searchQuery.length < 1) return;
        setLoading(true);
        try {
            const dta = await getDocs(query(collection(db, 'users'), where('username', '>=', searchQuery), where('username', '<=', searchQuery + '\uf8ff')));
            const tempArr = [];
            dta.forEach(item => {
                tempArr.push(item.data())
            })
            setResults(tempArr)
            setLoading(false);
        } catch(err) {
            console.log(err);
            setLoading(false);
        }
    };

    const usersToRender = results?.map(user => {
        return <UserItem key={user.userId} userImg={user.userImg} username={user.username}/>
    })

  return (
    <main className="search-page">
      <form className='searchbar'>
        <div style={{position:'relative'}}>
            <label><FontAwesomeIcon icon={faMagnifyingGlass}/></label>
            <input type="text" value={searchQuery} placeholder="Search users" onChange={e => setSearchQuery(e.target.value)} minLength={1} maxLength={100}/>
        </div>
        <button onClick={handleSearch}>Search</button>
      </form>
      <section>
        <ul className="results-container">
            {loading ? <ClipLoader color="#e981f7" size='50px'/> : results.length > 1 && usersToRender}
        </ul>
      </section>
    </main>
  )
}

export default SearchPage
