import React, { useState } from 'react';
import { Popup, Button } from 'tdesign-mobile-react';
import './style/index.less'

/** index.less
 
@keyframes fadeIn {
    from {
      opacity: 0;
    }
  
    to {
      opacity: 1;
    }
}

.fade-enter-active {
  animation: fadeIn .3s;
}

*/

export default function Base() {

  const [visible, setVisible] = useState(false)

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  }

  return (
    <div className='tdesign-mobile-demo'>
        <div className='tdesign-mobile-demo__button-group'>
            <Button variant="outline" className='tdesign-mobile-demo__button' onClick={() => setVisible(true)}>底部弹出</Button>
        </div>
        <Popup visible={visible} onVisibleChange={handleVisibleChange} placement="bottom">
            <div className="vertical"></div>
        </Popup>
    </div>
  );
}
