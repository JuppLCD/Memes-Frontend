import toast from 'react-hot-toast';

function useNotification() {
	const notifyLoading = (msgLoading = 'Loading') => toast.loading(msgLoading);
	const notifySuccess = (msgSucces = 'Successfully') => toast.success(msgSucces);
	const notifyError = (msgError = 'Error') => toast.error(msgError);

	return { notifyLoading, notifySuccess, notifyError };
}

export { useNotification };
