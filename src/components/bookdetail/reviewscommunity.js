import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commentReview, fetchReviews, likeReview } from '../../redux/reducers/reviewSlice'
import UserCard from '../UserCard'
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import axios from 'axios'
import { postDataAPI } from '../../utils/fetchData'

const Reviewscommunity = ({bookId}) => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const {reviews,isLoading,error} = useSelector(state =>  state.review)
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const  [inputcomment, setInpucomment] = useState("");
  useEffect(()=> {
dispatch(fetchReviews(bookId))
  },[])
  if (isLoading) {
    return <Spin/>;
  }
  if (error) {
    return <p> {error}</p>;
  }
  const handleCommentClick = () => {
    setIsCommentBoxVisible(!isCommentBoxVisible);
  }
  const likeReviewHandler = async (userId,reviewId) => {
    dispatch(likeReview({userId,reviewId}))
    if(!isLiked )
        {
        setIsLiked(true);
        }else {
          setIsLiked(false);
  }}
  const createComment = async (userId, reviewId, content) => {
  dispatch(commentReview({userId,reviewId,content}))
  }
  const commentHandler = (e)=> {
    setInpucomment(e.target.value)
  }
  return (
    <div>
        <div class="bg-white p-6 rounded-lg shadow-md">
  <h1 class="text-2xl font-bold mb-4">Community Reviews</h1>
  <p class="text-3xl font-bold text-yellow-500 mb-2">4.47</p>
  <p class="text-gray-500 mb-6">9,203,060 ratings · 145,749 reviews</p>
  <ul className="flex flex-wrap justify-between mb-6">
  <li className="w-1/5">
    <p className="text-2xl font-bold text-green-500 mb-2">5 stars</p>
    <p className="text-gray-500">{Math.round(5970327/9203060*100)}%</p>
  </li>
  <li className="w-1/5">
    <p className="text-2xl font-bold text-green-500 mb-2">4 stars</p>
    <p className="text-gray-500">{Math.round(2116536/9203060*100)}%</p>
  </li>
  <li className="w-1/5">
    <p className="text-2xl font-bold text-green-500 mb-2">3 stars</p>
    <p className="text-gray-500">{Math.round(779241/9203060*100)}%</p>
  </li>
  <li className="w-1/5">
    <p className="text-2xl font-bold text-yellow-500 mb-2">2 stars</p>
    <p className="text-gray-500">{Math.round(179528/9203060*100)}%</p>
  </li>
  <li className="w-1/5">
    <p className="text-2xl font-bold text-red-500 mb-2">1 star</p>
    <p className="text-gray-500">{Math.round(157428/9203060*100)}%</p>
  </li>
</ul>

 
</div>
        <div class="border-t pt-4">
    <h3 class="text-lg font-bold mb-2">Các đánh giá đã được đăng</h3>
    
    <ul>{ reviews && reviews.map((review) => (  <li key ={review.author ? review.author._id:null} class="mb-2">
        <div class="flex items-center">
        <UserCard 
                         
                        user={ review ? review.author: null} 
                        border=""
                        />
          <div class="flex-1">
           
            <div class="text-gray-700">{review.content}</div>
          </div>
          <div class="text-gray-600 text-sm">Điểm đánh giá</div>
        </div>
        <div className='flex  '>
        <div className='flex-col'><div>{review.likes.length}</div>
        <HeartOutlined className={isLiked ? 'mr-3 text-danger' : 'mr-3'} onClick={() => likeReviewHandler(user._id, review._id)} />
        </div>
        <div  className='flex-col'>
        <div>{review.comments.length}</div>
        <CommentOutlined onClick={handleCommentClick} /> 
        {isCommentBoxVisible && (<>
        <div>
           <input type="text" placeholder="Enter your comment" onChange={commentHandler} value={inputcomment} />
   <button onClick={()=> createComment(user._id,review._id,inputcomment)}>Submit</button>
        </div>
   
      <div>
        {review.comments.map(comment => (
          <div key={comment.id}>
            <p> {comment.content}</p>
          </div>
        ))}
      </div> </>  )}
        </div>
        </div>
      </li>))}
    </ul>
  </div></div>
  )
}

export default Reviewscommunity