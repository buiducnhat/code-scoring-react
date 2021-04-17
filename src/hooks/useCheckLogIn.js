import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUserData } from 'src/features/authen/authenSlice';

export default function useCheckLogIn() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.authenSlice.isLoggedIn);
  const userData = useSelector((state) => state.authenSlice.userData);

  useEffect(() => {
    return dispatch(fetchGetUserData());
  }, [dispatch]);

  return [isLoggedIn, userData];
}
