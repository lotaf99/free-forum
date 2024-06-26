/**
 * skenario test thunk login
 *
 * -  asyncLogin
 *    - should dispatch showLoading, onLoading, onSucess, hideLoading when success login
 *    - should dispatch showLoading, onLoading, onError, hideLoading when error login
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncLogin, onErrorLogin, onLoadingLogin, onSuccessLogin } from '../../rtk/feature/login/loginSlice';

const fakeLoginSuccessResponse = {
  user: {
    id: 1,
    name: 'Muhammad Latief',
    email: 'lotaf@mail.com',
    avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  },
  token: 'token',
};

const fakeLoginErrorResponse = {
  status: 'error',
  message: 'email or password is wrong',
};

describe('asyncLogin thunk', () => {
  beforeEach(() => {
    api._login = api.login;
  });

  afterEach(() => {
    api.login = api._login;

    delete api._login;
  });

  it('should dispatch showLoading, onLoading, onSuccess, hideLoading when success login', async () => {
    /// arrange
    api.login = () => Promise.resolve(fakeLoginSuccessResponse);
    const dispatch = jest.fn();

    /// act
    await asyncLogin({ email: 'lotaf@mail.com', password: '123456' })(dispatch);

    /// assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(onLoadingLogin());
    expect(dispatch).toHaveBeenCalledWith(onSuccessLogin({ token: fakeLoginSuccessResponse.token }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch showLoading, onLoading, onError, hideLoading when error login', async () => {
    /// arrange
    api.login = () => Promise.reject(fakeLoginErrorResponse);
    const dispatch = jest.fn();

    /// act
    await asyncLogin({ email: 'admin', password: 'admin' })(dispatch);

    /// assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(onLoadingLogin());
    expect(dispatch).toHaveBeenCalledWith(
      onErrorLogin({
        message: fakeLoginErrorResponse.message,
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
