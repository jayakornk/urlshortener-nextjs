import { Transition } from '@headlessui/react';
import { signIn } from 'next-auth/client';
import {
  GithubLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';

// import { LINELoginButton } from './LINE';

interface LoginModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const LoginModal = (props: LoginModalProps): JSX.Element => {
  const { open, setOpen } = props;

  return (
    <Transition show={open}>
      <div className={`fixed inset-0 overflow-y-auto z-20`}>
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="fixed inset-0 transition-opacity"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 bg-gray-500 opacity-75 cursor-default"
              onClick={() => setOpen(false)}
              role="button"
              tabIndex={0}
              aria-hidden="true"
            ></div>
          </Transition.Child>

          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}
          {/* <Transition
          show={open}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        > */}
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              <div className="flex flex-col mx-auto w-60">
                <GithubLoginButton onClick={() => signIn('github')} />
                <GoogleLoginButton onClick={() => signIn('google')} />
                {/* <LINELoginButton
                  iconSize="26px"
                  onClick={() => signIn('line')}
                /> */}
                <button
                  type="button"
                  className="px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
              <div className="w-4/5 mx-auto mt-3 text-center">
                <p className="text-xs text-gray-500">
                  Your information will be shared with the app if you choose to
                  proceed to login. If you do not approve, click Cancel, in
                  which case no information will be shared with the app.
                </p>
              </div>
            </div>
          </Transition.Child>
          {/* </Transition> */}
        </div>
      </div>
    </Transition>
  );
};
