import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Rate,Spin,Button } from 'antd';
import { addBookToShelf } from '../../redux/actions/bookshelfAction';
import { Link } from 'react-router-dom';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import { submitRating } from '../../redux/reducers/ratingSlice';
import { Pagination } from 'antd';
import { postDataAPI } from '../../utils/fetchData';
import BookFilter from '../Bookfilter';
import Rating from './rating';
import { FavoriteButton } from './favoriteButton';
const  Booklist =({query, books, selectedBook, isLoading, error }) => {   
  const dispatch = useDispatch();
  
  const [localRating, setLocalRating] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const {user} = useSelector((state)=> state.auth)
const {auth} = useSelector(state=> state);
const [currentPage, setCurrentPage] = useState(1);
const [booksPerPage, setBooksPerPage] = useState(10);
const totalItems =books.length;
const totalPages = Math.ceil(totalItems / booksPerPage);
const indexOfLastItem = currentPage * booksPerPage;
const indexOfFirstItem = indexOfLastItem - booksPerPage;
const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);
    const handleOptionClick = (option,user_id, book_id,auth) => {
        setSelectedOption(option);
        dispatch(addBookToShelf({name:selectedOption,user_id, book_id,auth}));
      };
      const addbook =(name,user_id, book,auth) =>{
        console.log(auth.token)
      
        dispatch(addBookToShelf({name,user_id, book,auth}));
      }
      const handlePaginationChange = (page) => {
        setCurrentPage(page);
      };
  return (
    <div>  {books && currentItems.map((book)=> (
        (
       <>
         <hr className="border-b-2 my-2" />
         <div className="row"  key={book._id}>
           <div className="col-4">
             {book.cover_i && (
               <Link to={`/book/show/${book.bookId}`}>
                 <img src={`${book.cover_i}`} alt={book.title} />
               </Link>
             )}
           </div>
           <div className="col-8">
             <h4>{book.title}</h4>
             <div>By {book.author_name}</div>
             <Button.Group className='mt-3'>
             <div className="dropdown " style={{ width: '200px' }}>
               <button
                 value="Want to Read"
                 onClick={(e) => addbook(e.target.value, user._id, book, auth)}
                 className="btn btn-outline-secondary w-85 rounded-0"
               >
                 <i className="fas fa-check"></i> Want to Read
               </button>
               <button
                 className="btn btn-outline-secondary dropdown-toggle w-15 border-left-0 rounded-0"
                 type="button"
                 id="menu1"
                 data-toggle="dropdown"
               ></button>
               <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                 <li role="presentation">
                   <a
                     role="menuitem"
                     tabIndex="-1"
                     href="#"
                     onClick={() =>
                       handleOptionClick('Currently reading', user._id, book, auth)
                     }
                   >
                     Currently reading
                   </a>
                 </li>
                 <li role="presentation">
                   <a
                     role="menuitem"
                     tabIndex="-1"
                     href="#"
                     onClick={() => handleOptionClick('Read', user._id, book, auth)}
                   >
                     Read
                   </a>
                 </li>
                
               </ul>
             </div>
   
             {book.epub ? (
  <Link to={`/book/${book.bookId}`}>
    <Button className=" bg-brown text-white font-bold py-2 px-4 rounded-md flex items-center">Read online</Button>
  </Link>
) :  book.buyLink && (
  <a href={`${book.buyLink}`} className="inline-block bg-brown text-white font-bold py-2 px-4 rounded-md">Buy Link</a>
)} </Button.Group>
       <FavoriteButton added={false} auth={auth} book={book}/>
           </div>
     
           </div>
         
           <Rating isLoading={isLoading} averageRating={book.averageRating} bookId={book.bookId}/>
           </>
           
           )) )}
           <Pagination className='mt-3'
    current={currentPage}
    total={totalItems}
    pageSize={booksPerPage}
    onChange={handlePaginationChange}
    showSizeChanger={true}
    onShowSizeChange={(current, pageSize) => setBooksPerPage(pageSize)}
/>
           </div>
  )
}

export default Booklist