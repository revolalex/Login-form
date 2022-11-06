import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

const Waves = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) => {
  return (
    <>
      <div className="header">
        <div className="inner-header flex">{props.children}</div>

        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
      <div className="content flex">
        <a style={{color: "lightgray"}} href="https://github.com/revolalex/">By RevolALex </a>
      </div>
      <style jsx>{`
        .header {
          position: relative;
          text-align: center;
          background: linear-gradient(
            60deg,
            rgba(84, 58, 183, 1) 0%,
            rgba(0, 172, 193, 1) 100%
          );
          color: white;
        }
        .logo {
          width: 50px;
          fill: white;
          padding-right: 15px;
          display: inline-block;
          vertical-align: middle;
        }

        .inner-header {
          height: 65vh;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .flex {
          /*Flexbox for containers*/
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .waves {
          position: relative;
          width: 100%;
          height: 15vh;
          margin-bottom: -7px; /*Fix for safari gap*/
          min-height: 100px;
          max-height: 150px;
        }

        .content {
          position: relative;
          height: 20vh;
          text-align: center;
          background-color: white;
        }

        /* Animation */

        .parallax > use {
          animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5)
            infinite;
        }
        .parallax > use:nth-child(1) {
          animation-delay: -2s;
          animation-duration: 7s;
        }
        .parallax > use:nth-child(2) {
          animation-delay: -3s;
          animation-duration: 10s;
        }
        .parallax > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 13s;
        }
        .parallax > use:nth-child(4) {
          animation-delay: -5s;
          animation-duration: 20s;
        }
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px, 0, 0);
          }
          100% {
            transform: translate3d(85px, 0, 0);
          }
        }
        /*Shrinking for mobile*/
        @media (max-width: 768px) {
          .waves {
            height: 40px;
            min-height: 40px;
          }
          .content {
            height: 30vh;
          }
          h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
};
export default Waves;
