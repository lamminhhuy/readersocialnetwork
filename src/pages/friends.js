import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoadIcon from '../images/loading.gif'
import UserCard from '../components/UserCard'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import { getDataAPI } from '../utils/fetchData'

export const Friends = () => {
  
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()
  const [load, setLoad] = useState(false)

  const handleSearch = async (e) => {
      e.preventDefault()
      if(!search) return;

      try {
          setLoad(true)
          const res = await getDataAPI(`search?username=${search}`, auth.token)
          setUsers(res.data.users)
          setLoad(false)
      } catch (err) {
          dispatch({
              type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
          })
      }
  }
  const handleClose = () => {
      setSearch('')
      setUsers([])
  }
  return (
    <div>
 <div className='row'>
  <div className='col-8'>
  <div class=" font-bold mb-4">Find Friends</div>
  <form className="search_form" onSubmit={handleSearch}>
  <div className="search_icon" style={{opacity: search ? 0 : 0.3}}></div>
                <span>Enter to Search: </span>
          <input type="text" name="search" value={search} id="search"  className=" border rounded-md"title="Enter to Search"
            onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} />

            <div className="close_search" onClick={handleClose}
            style={{opacity: users.length === 0 ? 0 : 1}} >
                &times;
            </div>

            <button type="submit" style={{display: 'none'}}>Search</button>

            { load && <img className="loading" src={LoadIcon} alt="loading"  /> }

            <div className="users">
                {
                    search && users.map(user => (
                        <UserCard 
                        key={user._id} 
                        user={user} 
                        border="border"
                        handleClose={handleClose} 
                        />
                    ))
                }
            </div>
        </form>
  <div class=" font-bold mb-4">Friends</div>
  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <li class="bg-white p-4 rounded-md shadow-md">
      <div class="flex items-center mb-2">
        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Friend avatar" class="w-10 h-10 rounded-full mr-2" />
        <div class="font-semibold text-lg">John Doe</div>
      </div>
      <div class="text-gray-500">Online</div>
    </li>

  </ul>
    
    </div>
  <div className='col-4'>  <div className=" font-bold mb-4">People I'm Following</div>
      <div className=" font-bold mb-4">My Followers</div>
      <div className=" font-bold mb-4">Books My Friends Are Reading</div>
      <div className=" font-bold mb-4">FIND FRIENDS FROM</div>
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-white p-2 rounded-md shadow flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M17 4v-.5A1.5 1.5 0 0015.5 2H4.5A1.5 1.5 0 003 3.5V4H2v2h1v9.5A1.5 1.5 0 004.5 17h11a1.5 1.5 0 001.5-1.5V6h1V4h-1zM5.5 4h9v1H5.5V4zm9 2v8H5.5V6h9zm-5.5 5.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              clipRule="evenodd"
            />
          </svg>
          Gmail
        </div>
        <div className="bg-white p-2 rounded-md shadow flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 0a10 10 0 100 20 10 10 0 000-20zm1 14.23V6.083L6.83 9.23l4.17 4.17zm-1 .77l-4.17-4.17L11 5.917v8.083zm4.17-5.905l-4.17-4.17-1.413 1.415L11.583 5l3.584 3.584-1.413 1.414zM6.83 10.77l-1.415 1.415 4.17 4.17v-2.357l-2.755-2.228z"
              clipRule="evenodd"
            />
          </svg>
          Facebook
        </div>
      </div>
      <div className=" font-bold mb-4">Friends of friends</div>
      <div className="mb-4">
        <input type="text" placeholder="find by name or email"/>
</div>
<div className=" font-bold mb-4">INVITE FRIEND LINK</div>
<div className="mb-4">
<input type="text" value="https://example.com/invite-friend" readOnly className="bg-gray-100 rounded-md p-2" />
</div>
<div className="text-sm text-gray-600">Send this link to your friends to connect with them.</div>
<div>
<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-4">Get link</button>
</div></div>
 </div>
</div>
  )
}
