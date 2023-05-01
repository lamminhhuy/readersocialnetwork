import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getbookshelf } from '../../redux/actions/bookshelfAction';
import Rating from '../bookresults/rating';
import { Drawers } from './Drawer';

const BookshelfSection = ({user,id,bookshelf, profile}) => {
  const dispatch = useDispatch()
  const { drawers,loading,error} = useSelector (state => state.bookshelf)

  return (
    <div class="my-4 flex flex-col justify-center  h-full">
    <div>
      <h2 class="text-lg font-medium mb-2">{profile.users[0]?.fullname.toUpperCase()}'s Bookshelves</h2>
    </div>
   

        <div class="flex flex-col space-y-4  bg-white rounded-lg shadow-md hover:shadow-lg p-4  h-full">
    <div class="">
   
        
            {drawers?.map((drawer) => ( 
              <> <span className="text-xl font-medium ">{drawer.name && drawer.name === "Read" ? "Finished reading" : drawer.name}</span>
              <Drawers drawer={drawer}/>
              <hr className="mb-2 mt-1"></hr></>) )}
       
{drawers&& drawers.length ==0  &&( <span>{user && user.fullname} doesn't have any book yet </span>)}
    </div>   </div>  
  
</div>

  )
}

export default BookshelfSection