// src/assets/Worm.jsx
import React from 'react';

const WormSVG = ({ size = 30, color = "#ff5722" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    fill={color}
  >
    <g>
      <g>
        <path d="M511.809,208.897c-2.088-20.805-20.735-36.082-41.512-33.961c-51.239,5.129-81.733,22.508-117.116,50.803l-8.805,7.083
          c-24.004,19.212-35.86,25.138-55.151,27.554c-24.411,3.065-36.605-0.213-56.715-15.129c-0.833-0.62-3.366-2.583-6.602-5.074
          c-6.643-5.13-16.147-12.462-20.337-15.509c-16.573-12.046-31.503-20.647-48.396-27.888
          c-44.929-19.249-89.774-11.305-126.328,22.406c-6.778,6.259-13.041,13.24-18.62,20.74c-2.889,3.889-5.449,7.741-7.213,10.824
          c-5.028,8.796-6.328,19.018-3.662,28.795c2.667,9.768,8.976,17.916,17.773,22.944c8.796,5.028,19.027,6.314,28.795,3.666
          c9.773-2.667,17.92-8.652,22.93-17.411c0.278-0.472,1.055-2.949,2.278-2.949h0.005c2.764-4.741,5.847-7.486,9.148-10.532
          c14.393-13.277,27.851-15.951,45.012-8.599c11.523,4.935,21.907,10.872,33.67,19.427c3.185,2.315,10.995,8.301,17.333,13.189
          c4.139,3.185,7.666,5.886,8.986,6.868c29.045,21.573,54.965,31.117,87.052,31.117c7.703,0,15.763-0.56,24.305-1.625
          c38.526-4.815,62.456-19.039,93.154-43.621l8.791-7.055c29.721-23.779,47.049-31.529,77.266-34.547
          C498.657,248.33,513.893,229.701,511.809,208.897z M488.75,224.683c-3.208,3.916-7.754,6.361-12.791,6.861
          c-34.124,3.407-54.502,12.435-87.2,38.591l-8.833,7.092c-32.647,26.138-52.97,35.758-83.64,39.591
          c-39.184,4.889-65.669-2.129-97.695-25.915c-1.278-0.945-4.699-3.593-8.713-6.685c-6.495-5.009-14.499-11.175-17.763-13.546
          c-12.958-9.426-24.476-16.083-37.35-21.601c-8.713-3.741-17.069-5.611-25.133-5.611c-14.217,0-27.513,5.824-40.206,17.527
          c-4.167,3.852-8.041,8.166-11.509,12.833c-2.014,2.704-3.19,4.583-3.509,5.148c-2.514,4.398-6.592,7.555-11.476,8.889
          c-4.889,1.342-9.986,0.685-14.398-1.833c-4.398-2.518-7.555-6.592-8.884-11.472c-1.333-4.889-0.685-10,1.828-14.398
          c0.815-1.426,2.671-4.472,5.977-8.926c4.87-6.555,10.342-12.648,16.259-18.111c21.717-20.045,57.748-39.582,105.991-18.916
          c15.546,6.666,29.337,14.62,44.716,25.795c4.097,2.981,13.402,10.166,19.902,15.184c3.366,2.593,6,4.63,6.875,5.278
          c24.022,17.842,41.128,22.406,70.386,18.731c25.416-3.185,41.096-12.712,64.65-31.573l8.81-7.083
          c38.475-30.777,65.511-42.563,107.144-46.73c5.051-0.509,9.972,0.982,13.893,4.194c3.921,3.204,6.356,7.75,6.861,12.787
          C493.445,215.822,491.958,220.757,488.75,224.683z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M463.825,209.035c-0.477-1.139-1.139-2.185-1.991-3.037c-0.949-0.944-1.991-1.611-3.129-2.083
          c-2.278-0.954-4.93-0.954-7.208,0c-1.231,0.472-2.18,1.139-3.125,2.083c-0.857,0.852-1.519,1.898-1.995,3.037
          c-0.472,1.139-0.755,2.37-0.755,3.602c0,1.324,0.19,2.463,0.755,3.694c0.477,1.139,1.139,2.185,1.995,3.037
          c1.801,1.796,4.171,2.75,6.731,2.75c1.231,0,2.463-0.194,3.602-0.667c1.139-0.472,2.181-1.232,3.129-2.083
          c1.801-1.806,2.75-4.176,2.75-6.731C464.585,211.406,464.298,210.174,463.825,209.035z"/>
      </g>
    </g>
  </svg>
);

export default WormSVG;