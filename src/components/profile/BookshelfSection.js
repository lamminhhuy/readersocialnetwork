import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getbookshelf } from '../../redux/actions/bookshelfAction';
import Rating from '../bookresults/rating';

const BookshelfSection = ({auth,id,bookshelf, profile}) => {
  const dispatch = useDispatch()
  const { drawers,loading,error} = useSelector (state => state.bookshelf)

const renderDrawer = (drawerName) => {
  const books = drawers
    .find((drawer) => drawer.name === drawerName)
    .books.map((book) => 
    <div>
    <div class="flex items-center space-x-4">
     <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 12H3m18-4H3m18 8H3m14-6h5.5a2.5 2.5 0 110 5H17"/></svg>
     <Link to={`/book/show/${book.googleBooksId}`}>
     <div className='row'>
     
 <div className='col-2'>
   <img className="" src={book.coverImage} />
 </div>
 <div className='col-10'>
   <h3 class="text-xl font-medium">{book.title}</h3>
   <p class="text-gray-600"></p>
 </div>
</div> </Link>

<Rating averageRating={book.averageRating} bookId={book.googleBooksId} />
</div></div>);
  return (
   <div>{books}</div>
  );
};

  return (
    <div><div class="my-4  ">
    <div>
      <h2 class="text-lg font-medium mb-2">{profile.users[0]?.fullname.toUpperCase()}'s Bookshelves</h2>
    </div>
   
  </div>
        <div class="flex flex-col space-y-4">
    <div class="">
   
        <hr className="mb-2 mt-1"></hr>
            {drawers.map((drawer) => ( 
              <> <span>{drawer.name && drawer.name == "Read" ? "Finished reading": drawer.name}</span> {renderDrawer(drawer.name)}</>))}
       
    </div>  
       </div>
</div>

  )
}

export default BookshelfSection