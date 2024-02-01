import React, { useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux" 
import { useAppDispatch } from "../redux/store"
import { hideMessage, loaderSelector } from "../redux/loader/loaderSlice"

const Loader = () => {
  const dispatch = useAppDispatch()
  const state = useSelector(loaderSelector)
  const { message, loading } = state
  console.log(message, loading);
  useEffect(() => {
    if (message && message !== null && !loading) {
      const { type, messageText, duration, position, onCloseAction } = message
      const toastConfig = {
        position,
        autoClose: duration || false,
        onClose: () => {
          dispatch(hideMessage())
          if (onCloseAction) {
            onCloseAction()
          }
        },
      }
      switch (type) {
        case "error":
          toast.error(messageText, toastConfig)
          break

        case "success":
          toast.success(messageText, toastConfig)
          break

        default:
          toast.info(messageText, toastConfig)
          break
      }
    }
    const handleBeforeUnload = () => {
      dispatch(hideMessage())
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch, message])
  if (loading) {
    return (
      <div className="loader-inn">
          <div className="loader"></div>
        </div>
    )
  }
  return null
}

export default Loader