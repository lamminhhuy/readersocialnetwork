import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Rate, Spin, Button } from 'antd';
import { addBookToShelf } from '../redux/actions/bookshelfAction';
import { searchBooks, getBookDetails } from "../redux/reducers/booksSlice";
import { postDataAPI } from '../utils/fetchData';
import { Link } from 'react-router-dom';
import BookFilter from './Bookfilter';
import { submitRating } from '../redux/reducers/ratingSlice';
import Booklist from './bookresults/booklist';

export const BookSection = React.memo(({ keyword }) => {
  const dispatch = useDispatch();
  const { query, books, selectedBook, isLoading, error } = useSelector(
    (state) => state.book
  );

  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      dispatch(searchBooks(selectedCategory));
    } else {
      dispatch(searchBooks(keyword));
    }
  }, [selectedCategory, keyword, dispatch]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const renderBookList = () => (
    <Booklist query={query} books={books} selectedBook={selectedBook} isLoading={isLoading} error={error} />
  );

  const renderLoadingError = () => {
    if (isLoading) {
      return <Spin tip="Loading..." />;
    } else if (error) {
      return <p>{error}</p>;
    } else {
      return null;
    }
  };

  return (
    <div className='container w-2/3'> 
      <div className='row'> 
        <div className='col-8'>
          {renderLoadingError()}
          <BookFilter onSelectCategory={handleCategorySelect} keyword={keyword}/>
          {renderBookList()}
        </div>
        <div className='col-4'>
          <div class="bg-white shadow rounded p-4">
            <h3 class="text-lg font-bold mb-2">Danh sách thể loại sách</h3>
            <ul class="list-disc ml-6">
              <li><a href="#" class="text-blue-500 hover:underline" onClick={() => handleCategorySelect('Khoa học')}>Khoa học</a></li>
              <li><a href="#" class="text-blue-500 hover:underline" onClick={() => handleCategorySelect('Văn học')}>Văn học</a></li>
              <li><a href="#" class="text-blue-500 hover:underline" onClick={() => handleCategorySelect('Truyện tranh')}>Truyện tranh</a></li>
              
              <li><a href="#" class="text-blue-500 hover:underline" onClick={() => handleCategorySelect('Chính trị')}>Chính trị</a></li>
              <li><a href="#" class="text-blue-500 hover:underline" onClick={() => handleCategorySelect('Lịch sử')}>Lịch sử</a></li>
              <li><a href="#" class="text-blue-500 hover:underline" onClick={() => handleCategorySelect('Tôn giáo')}>Tôn giáo</a></li>
              <li><a href="#" class="text-blue-500 hover:underline" onClick={() => handleCategorySelect('Khác')}>Khác</a></li>

</ul>
</div>
</div>
</div>
</div>
);
});

export default BookSection;