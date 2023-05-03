import { Spin } from 'antd'
import { Button, Modal, Form, Input } from 'antd';

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
  const  [reviewlikelength,setreviewlikelength] = useState("");
  const [visible, setVisible] = useState(false); // state để quản lý trạng thái hiển thị của Modal
  const [form] = Form.useForm(); // sử dụng Form của antd để quản lý thông tin nhập vào

  const showModal = () => {
    setVisible(true);
  };

  useEffect(()=> {
dispatch(fetchReviews(bookId))
  },[bookId])
  if (isLoading) {
    return <Spin/>;
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

  const reportReviewHandler = async (reviewId) => {
    try {
      const response = await axios.post(`/api/reviews/${reviewId}/report`, {
        userId:user?._id,
      });
      console.log(response.data.message); // In ra thông báo từ server nếu thành công
    } catch (error) {
      console.error(error.response.data.error); // In ra thông báo lỗi từ server nếu có
    }
  }

  const handleOk = (reviewId) => {
    form.validateFields().then(async(values) => {
      // Lấy thông tin báo cáo từ values.reason
      const report = {
        userId: user._id,
        content: values.reason
      };
      try {
      const response = await axios.post(`/api/reviews/${reviewId}/report`,report)
      }
      catch (error) {
        console.error(error.response.data.error); // In ra thông báo lỗi từ server nếu có
      }
      setVisible(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
   
        <div class="border-t pt-4">
    <h3 class="text-lg font-bold mb-2">Các đánh giá đã được đăng</h3>
 {error ?
     (<p> {error}</p> ):(<>
    <ul>{ reviews && reviews.map((review) => (  <li key ={review.author ? review.author._id:null} class="mb-2">
    <div class="flex items-center">
  <UserCard 
    user={review ? review.author : null} 
    border=""
  />
  <div class="flex-1">
    <div class="text-gray-700">{review.content}</div>
  </div>
  <div class="text-gray-600 text-sm">
    <div className='flex-col'>
      <div className='ml-0.5'>{review.likes.length}</div>
      <HeartOutlined 
        className={isLiked ? 'mr-3 text-danger' : 'mr-3'} 
        onClick={() => likeReviewHandler(user._id, review._id)} 
      />
    </div>
  </div>
  <div className='flex'>

   {review.author._id != user._id ? (  <Button type="primary" style={{ backgroundColor: 'red', color: 'white' }}  onClick={showModal}>
  Report
</Button>): ""}

      <Modal
        title="Báo cáo review"
        visible={visible}
        onOk={()=>handleOk(review._id)}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="reason"
            label="Lí do báo cáo"
            rules={[{ required: true, message: 'Vui lòng nhập lý do báo cáo!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
   
  </div>
  <div className='flex-col'>
  </div>
</div>

      </li>))}
    </ul></>)}
  </div></div>
  )
}

export default Reviewscommunity