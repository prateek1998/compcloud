import { toast } from 'react-toastify';

const ToastElement = ({ title, msg }: any) => (
  <>
    <div className="toastify-header">
      <div className="title-wrapper">
        <h6 className="toast-title">{title}!</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        {msg}
      </span>
    </div>
  </>
);

const notifyToaster = (title: string, msg: string, id?: any) => {
  const key = title.toLowerCase();
  let tmpId;
  switch (key) {
    case 'success':
      toast.success(<ToastElement title={title} msg={msg} />, { hideProgressBar: true });
      break;
    case 'error':
      toast.error(<ToastElement title={title} msg={msg} />, { hideProgressBar: true });
      break;
    case 'warning':
      toast.warning(<ToastElement title={title} msg={msg} />, { hideProgressBar: true });
      break;
    case 'info':
      toast.info(<ToastElement title={title} msg={msg} />, { hideProgressBar: true });
      break;
    case 'loading':
      tmpId = toast.loading(<ToastElement title={title} msg={msg} />, { hideProgressBar: true });
      break;
    case 'update':
      toast.update(id, {
        render: msg,
        type: 'success',
        isLoading: false,
        hideProgressBar: true,
        autoClose: 2000,
      });
      break;
    default:
      toast.success(<ToastElement title={title} msg={msg} />, { hideProgressBar: true });
  }
  return tmpId;
};

export default notifyToaster;
