/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-30.
 */

import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      {...props}>
      <Path
        d="M28.3587 8.36552C28.3431 8.29204 28.3131 8.22236 28.2706 8.16046C28.228 8.09856 28.1737 8.04565 28.1107 8.00475C28.0477 7.96385 27.9773 7.93577 27.9034 7.9221C27.8295 7.90844 27.7537 7.90946 27.6802 7.92511L26.0186 8.27909C26.1456 8.1 26.2709 7.91966 26.3944 7.7381C26.5436 7.51793 26.6876 7.29429 26.8263 7.06736C26.8978 6.95003 26.9664 6.83096 27.0321 6.71027L27.131 6.51683C27.1638 6.45003 27.1949 6.37242 27.2259 6.29991C27.2671 6.20392 27.2787 6.09782 27.2592 5.9952C27.2398 5.89257 27.1902 5.79807 27.1167 5.72379C27.0433 5.64951 26.9494 5.59882 26.847 5.57821C26.7446 5.5576 26.6384 5.568 26.5419 5.60808L26.4502 5.64627C26.3197 5.69215 26.1914 5.73984 26.0617 5.7837C25.9294 5.82316 25.7996 5.86576 25.6669 5.90244C25.5328 5.93622 25.4012 5.97365 25.2667 6.00412C25.1311 6.03256 24.9979 6.06483 24.8621 6.09017C24.7252 6.11382 24.5906 6.141 24.4534 6.16193C24.3158 6.18138 24.1796 6.2034 24.0419 6.22083C23.9508 6.23239 23.8592 6.24176 23.7678 6.25147C23.4108 5.89671 23.002 5.59822 22.5553 5.3662C21.957 5.05553 21.303 4.87311 20.6497 4.80962C19.9959 4.74559 19.3415 4.79697 18.715 4.94377C18.0879 5.09118 17.4873 5.33444 16.9344 5.66497C16.3815 5.99547 15.8761 6.41499 15.4516 6.91598C15.0275 7.41584 14.6873 7.9996 14.47 8.62959C14.2511 9.25885 14.1586 9.92941 14.1821 10.5822C14.1878 10.7659 14.2038 10.9475 14.227 11.1274C14.138 11.1173 14.0488 11.1077 13.9599 11.0956C13.7062 11.0636 13.4536 11.0241 13.2023 10.9772C12.9503 10.9323 12.6997 10.8801 12.4507 10.8209C11.9509 10.7037 11.4573 10.5614 10.9719 10.3944C10.4843 10.2267 10.0052 10.0353 9.5363 9.82094C7.65312 8.9623 5.92614 7.73314 4.39144 6.28562C4.32776 6.21611 4.24737 6.16405 4.1579 6.13437C4.06843 6.10469 3.97285 6.09839 3.88026 6.11606C3.78766 6.13373 3.70113 6.17479 3.62887 6.23533C3.55662 6.29588 3.50105 6.37389 3.46744 6.46196L3.45349 6.49847C3.39148 6.6607 3.3324 6.82459 3.2856 6.99232C3.23879 7.15984 3.19749 7.32941 3.16867 7.501C3.13657 7.67205 3.11548 7.84507 3.10245 8.01813C3.08741 8.19136 3.08355 8.36497 3.08502 8.5382C3.08775 8.71126 3.09732 8.88432 3.11363 9.05663C3.13143 9.22838 3.15567 9.39941 3.18631 9.56935C3.24915 9.90838 3.33779 10.2421 3.45148 10.5676C3.50781 10.7308 3.57063 10.8916 3.63978 11.0498C3.70782 11.2091 3.78269 11.3655 3.8642 11.5184C3.94468 11.6733 4.03187 11.8246 4.12553 11.9719C4.21875 12.1219 4.319 12.2675 4.42594 12.4081C4.47935 12.4795 4.53448 12.5496 4.59127 12.6184C4.45329 12.6369 4.31469 12.6522 4.17561 12.6622C4.05083 12.6713 3.9257 12.676 3.80676 12.6738C3.74546 12.6738 3.68731 12.6713 3.63223 12.6665C3.57151 12.6641 3.52874 12.6549 3.47534 12.6496C3.42274 12.6239 3.36452 12.6119 3.30606 12.6147C3.24759 12.6174 3.19076 12.6348 3.14079 12.6653C3.09082 12.6957 3.04931 12.7383 3.0201 12.789C2.99089 12.8397 2.97491 12.897 2.97363 12.9555L2.97308 12.983C2.96922 13.1566 2.96977 13.3317 2.98539 13.5079C3.00079 13.6853 3.02813 13.8615 3.0672 14.0353C3.14759 14.3887 3.277 14.7292 3.45168 15.0468C3.62601 15.3658 3.8431 15.6601 4.08553 15.9249C4.32697 16.1867 4.59169 16.426 4.87643 16.6398C5.39233 17.03 5.94925 17.3394 6.51739 17.6037C6.48676 17.6127 6.4563 17.6224 6.42546 17.6308C6.35555 17.6492 6.2858 17.6706 6.21517 17.6849C6.14471 17.6998 6.07387 17.7195 6.00286 17.7312C5.86064 17.7585 5.71729 17.7808 5.57343 17.7975C5.42956 17.8132 5.28587 17.8219 5.14143 17.8264C5.04202 17.8134 4.94095 17.8281 4.8494 17.869C4.75785 17.9099 4.6794 17.9753 4.62273 18.058C4.56606 18.1407 4.53338 18.2375 4.52832 18.3376C4.52326 18.4377 4.546 18.5373 4.59404 18.6253L4.61787 18.6688C4.90819 19.1993 5.29541 19.6555 5.71896 20.0504C6.14396 20.4461 6.60806 20.7837 7.09031 21.0812C7.54038 21.3558 8.0078 21.601 8.48963 21.8151C8.45363 21.8387 8.41876 21.8637 8.38262 21.8868C7.88234 22.2085 7.35602 22.4877 6.80919 22.7216C6.26433 22.953 5.70149 23.1341 5.13281 23.2428C4.99114 23.2692 4.84871 23.2914 4.7058 23.3098C4.56392 23.3264 4.42156 23.3387 4.27893 23.3466C4.13753 23.3526 3.99597 23.3539 3.85449 23.3505C3.71432 23.3451 3.5744 23.3346 3.435 23.3191H3.43459L3.42874 23.318C3.27014 23.2955 3.10869 23.3299 2.97305 23.4152C2.8374 23.5004 2.73631 23.6309 2.68771 23.7835C2.63911 23.9361 2.64614 24.1011 2.70754 24.249C2.76895 24.397 2.88077 24.5184 3.02317 24.5918C3.57517 24.8766 4.14423 25.1498 4.73661 25.3884C5.33278 25.6302 5.94589 25.828 6.571 25.9802C7.19695 26.1301 7.83276 26.2353 8.47363 26.2951C8.79202 26.321 9.11059 26.3448 9.42789 26.3534C9.5859 26.3621 9.74755 26.3625 9.90871 26.3636C10.0685 26.3643 10.2355 26.3678 10.3836 26.3625L10.8402 26.3522L11.325 26.3254C11.6421 26.3133 11.9581 26.2742 12.2747 26.2445C12.9061 26.1674 13.5373 26.0688 14.1594 25.9195C14.7836 25.7814 15.3977 25.5917 16.0023 25.3759C16.607 25.1583 17.1945 24.8916 17.7698 24.6002C18.3381 24.2952 18.895 23.9654 19.4215 23.5887C19.9445 23.2085 20.456 22.808 20.9219 22.3571C21.391 21.9106 21.8371 21.4379 22.2381 20.9289C22.4473 20.6806 22.6295 20.4126 22.8226 20.1528C22.9994 19.882 23.1868 19.6171 23.3474 19.3364C23.6863 18.7847 23.9752 18.2054 24.2391 17.6169C24.5015 17.0267 24.719 16.42 24.9118 15.8062C25.0935 15.1898 25.2563 14.5673 25.3699 13.9366C25.4341 13.6251 25.4807 13.2998 25.5277 12.9751C25.5545 12.8083 25.5688 12.6599 25.5851 12.5087L25.596 12.411C25.6396 12.3714 25.6855 12.3332 25.727 12.2925L25.9516 12.0745C26.0276 12.0031 26.0964 11.9247 26.1693 11.8502C26.2401 11.7742 26.314 11.7014 26.3814 11.6226L26.5867 11.3894C26.6559 11.3127 26.7187 11.2303 26.7847 11.1512C26.8502 11.0714 26.9161 10.9923 26.9774 10.9095C27.2299 10.5853 27.4654 10.2482 27.6828 9.8995C27.7921 9.72537 27.8965 9.54828 27.9961 9.36842C28.0455 9.27683 28.095 9.18729 28.142 9.09314C28.1921 8.99525 28.24 8.89625 28.2857 8.79622L28.3191 8.72391C28.3705 8.61183 28.3845 8.48613 28.3587 8.36552H28.3587ZM25.8288 9.88702C25.7651 9.95106 25.6978 10.0113 25.6312 10.072C25.5642 10.132 25.5 10.1951 25.4302 10.2524L25.2251 10.4267C25.1577 10.4858 25.0847 10.5383 25.0151 10.5944C24.9439 10.6486 24.8762 10.7071 24.803 10.7578L24.5862 10.9139C24.4427 11.0182 24.2912 11.1103 24.1451 11.209C24.0408 11.28 23.9535 11.3731 23.8893 11.4817C23.825 11.5902 23.7855 11.7116 23.7735 11.8372L23.7707 11.8678L23.7293 12.3227C23.7157 12.4745 23.7028 12.6294 23.6826 12.7637C23.6463 13.0423 23.6127 13.3205 23.5586 13.607C23.4665 14.1773 23.3299 14.737 23.1776 15.2914C23.0152 15.8423 22.8311 16.3868 22.6078 16.914C22.3827 17.4398 22.1369 17.9578 21.8459 18.4491C21.7097 18.7005 21.5473 18.9352 21.3965 19.1778C21.23 19.4089 21.0746 19.6489 20.8942 19.8697C20.5501 20.3246 20.1645 20.7459 19.7591 21.1463C19.3571 21.551 18.9123 21.9101 18.4573 22.2546C17.9988 22.5953 17.5108 22.8954 17.0116 23.1759C16.5048 23.443 15.9862 23.6909 15.4478 23.895C14.9093 24.0976 14.3606 24.2792 13.7976 24.4136C13.2376 24.5591 12.6648 24.6584 12.0892 24.7391C11.7999 24.7709 11.5118 24.8127 11.2202 24.8285L10.7935 24.8604L10.3372 24.879C10.181 24.8872 10.0435 24.8852 9.89876 24.8874C9.75544 24.8889 9.61247 24.8914 9.46621 24.8861C9.17442 24.8832 8.88539 24.8666 8.59637 24.8485C8.02313 24.8054 7.45367 24.7216 6.8923 24.5978C6.7528 24.5672 6.61397 24.5337 6.47589 24.4972C6.7825 24.4209 7.08559 24.331 7.38426 24.2278C8.03461 24.0006 8.66479 23.7194 9.2682 23.387C9.87124 23.0551 10.45 22.677 11.0005 22.2364C11.1324 22.1307 11.2327 21.9906 11.2902 21.8317C11.3478 21.6727 11.3604 21.501 11.3268 21.3353C11.2932 21.1697 11.2146 21.0165 11.0996 20.8926C10.9846 20.7686 10.8377 20.6788 10.675 20.6329L10.6043 20.6134L10.6042 20.6131C9.64368 20.4528 8.68426 20.1741 7.79903 19.7694C7.35732 19.5665 6.93394 19.3296 6.55076 19.0516C6.53537 19.0404 6.52122 19.0281 6.5058 19.0169C6.55298 19.0138 6.60016 19.0104 6.64731 19.0077C6.82689 18.9954 7.0059 18.9758 7.18389 18.949C7.54702 18.8956 7.90515 18.8125 8.25466 18.7005C8.43687 18.6428 8.61571 18.575 8.79035 18.4973C8.87972 18.4608 8.96925 18.4128 9.05883 18.3685C9.1484 18.3236 9.23832 18.2676 9.32802 18.2164C9.47537 18.1321 9.59528 18.0071 9.6734 17.8563C9.75153 17.7056 9.78455 17.5356 9.76852 17.3666C9.75249 17.1976 9.68808 17.0368 9.58301 16.9034C9.47794 16.7701 9.33666 16.6698 9.17609 16.6147L8.98173 16.5477C8.3789 16.4606 7.78635 16.3477 7.21326 16.1904C6.64105 16.0328 6.08703 15.831 5.58351 15.5595C5.08084 15.2883 4.62977 14.9444 4.29469 14.5082C4.12568 14.2892 3.98824 14.0476 3.88638 13.7905C3.85838 13.7194 3.83316 13.6472 3.81076 13.5741C3.89008 13.6017 3.96802 13.6317 4.04861 13.6552C4.33227 13.7387 4.62041 13.8063 4.91165 13.8574C5.20981 13.9116 5.51125 13.9459 5.81397 13.9599C5.89103 13.9653 5.97329 13.9633 6.05384 13.9643C6.13349 13.9665 6.22026 13.9595 6.30522 13.9551C6.38799 13.9529 6.48399 13.9367 6.57517 13.925C6.66584 13.9136 6.77667 13.8824 6.87739 13.8578C7.15763 13.7874 7.40355 13.5802 7.50522 13.2867V13.2865C7.58203 13.0645 7.56751 12.8211 7.46485 12.6098C7.36219 12.3985 7.1798 12.2366 6.9578 12.1598L6.84823 12.1218C6.76276 12.0923 6.67059 12.0622 6.57537 12.0091C6.47992 11.962 6.38324 11.8992 6.28635 11.833C6.09346 11.6948 5.90481 11.525 5.72919 11.3355C5.37739 10.9552 5.07664 10.499 4.8485 10.0105C4.73399 9.76578 4.63835 9.51265 4.56242 9.25335C4.52538 9.12378 4.49306 8.99292 4.46553 8.861C4.43941 8.72932 4.41847 8.59666 4.40276 8.46333C4.38732 8.33037 4.37826 8.19675 4.37561 8.06292C4.37378 8.00158 4.3736 7.9402 4.37507 7.87885C5.70792 9.15957 7.20515 10.2935 8.86997 11.1705C9.37043 11.4346 9.88347 11.6741 10.4073 11.8882C10.9332 12.1032 11.4697 12.2916 12.0146 12.4525C12.2875 12.534 12.5625 12.6078 12.8395 12.6738C13.1164 12.7417 13.3952 12.8016 13.6756 12.8535C13.9559 12.9067 14.2375 12.9527 14.5201 12.9915C14.8027 13.0311 15.0864 13.061 15.3705 13.0886C15.5234 13.0999 15.6768 13.0732 15.8169 13.0108C15.957 12.9484 16.0794 12.8523 16.1733 12.7311C16.2672 12.6098 16.3296 12.4672 16.3549 12.316C16.3803 12.1647 16.3678 12.0096 16.3185 11.8644L16.3125 11.8466C16.1625 11.4052 16.0655 10.9569 16.053 10.517C16.0376 10.0773 16.0985 9.64661 16.2389 9.24234C16.5152 8.43304 17.1208 7.73276 17.8943 7.27253C18.6649 6.80952 19.5964 6.58712 20.4666 6.67338C20.9013 6.71577 21.3188 6.83468 21.6921 7.02825C22.0661 7.22135 22.3944 7.49017 22.6669 7.81977L22.8829 8.00456C22.9761 8.08335 23.0877 8.13736 23.2073 8.16158C23.3269 8.1858 23.4507 8.17945 23.5672 8.14312C23.8628 8.05168 24.1563 7.95365 24.4475 7.84911C24.5931 7.79629 24.7382 7.73847 24.8826 7.6834C25.027 7.62671 25.1701 7.56323 25.3133 7.5034C25.3941 7.4687 25.4742 7.43147 25.5543 7.39382C25.3406 7.80837 25.118 8.2183 24.8868 8.62336H24.8867C24.846 8.67382 24.8206 8.73483 24.8134 8.79922C24.8062 8.86361 24.8175 8.92872 24.846 8.98691C24.8746 9.04509 24.9191 9.09393 24.9744 9.1277C25.0297 9.16147 25.0935 9.17876 25.1582 9.17755L25.2263 9.17608L26.5267 9.14801C26.306 9.40535 26.0731 9.65197 25.8288 9.88702H25.8288Z"
        fill={props.color}
      />
    </Svg>
  )
}
const SvgIcon = React.memo(SvgComponent)
export default SvgIcon