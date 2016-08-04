import React from 'react';
import {REPO_URL} from '../constants/projectURL';


const ForkMeRibbon = () => {
  let style = {
    position: 'absolute',
    right: 0,
    border: 0,
    top: 0
  };

  return (
    <div>
      <a href={REPO_URL}>
          <img
            style={style}
            src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67"
            target="_blank"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"/>
        </a>
    </div>
  );
};

export default ForkMeRibbon;
