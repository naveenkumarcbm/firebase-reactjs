import React, { useState } from 'react'
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
 
const SweetAlert = withSwalInstance(swal);
const Alert = ({ title = 'Alert', message}) =>{
const [show, setShow] = useState(false)

    return (
          <SweetAlert
            show={show}
            title={title}
            text={message}
            onConfirm={() => setShow(false)}
          />
      )
}

export default React.memo(Alert);