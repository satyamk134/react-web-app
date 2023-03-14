import { useState } from 'react';
function useDialog() {
  const [isOpen, setOpen] = useState(false);

  const openDialog = ()=>{
      setOpen(true)
  }
  const closeDialog = ()=>{
      setOpen(false)
  }

  return {
    open:isOpen,
    openDialog: openDialog,
    closeDialog: closeDialog
  }
}

export default useDialog