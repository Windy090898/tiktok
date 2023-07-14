import React from 'react'
import classNames from 'classnames/bind'
import styles from './AccountItem.module.scss'
import Image from '~/components/Image';

const cx = classNames.bind(styles)

function AccountItem() {
    return (
      <div className={cx('wrapper')}>
        <Image
          className={cx('avatar')}
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgVFRUYGBgYGBgYGBgZGBgYGBgYGBgZGRgYGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQhISQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAP0AxwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAACAAEDBAYFBwj/xAA7EAACAQIEAwYDBgUEAwEAAAABAgADEQQSITEFQVEGImFxgZETMqEHQrHB0fBScoKS4RRiovEjssIW/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAlEQEBAAIDAAIBAwUAAAAAAAAAAQIREiExA0FREzJhBCKBkaH/2gAMAwEAAhEDEQA/AJ7RkGskgous0YJFEuYb5ZWtLOH2gcFhx350pQw/zy+RCGa0Voo8ZBKyUCRFobMALk2A3PKAHIQNZzqfGQ5PwwCobKGYkKxHzFWtsOoBvYyXD8SQnVhm1BQHMwI30G48ekei5R0AsYnW0i/1iDqP6W/TSNTxaPqrqRqLgjlvAbiyqwiICv4wzEBARjHEYwB1keJewkqiBWS41jFBh3uJYEhRABpJTAQKiGogJrJgIjCoihARQDIKYSDWOBEu8RDtJ8PIpPQ2gcHh/nnQM51D55HxrHlBZWAfcAi5c62RQNbmxOmwEILdOi9QKLsQB1JtOHxvtClKypcu4JFxkUKDbMSw2ud7HrKGN4wiKKtVjmZTlp8166DUnlcW9NJ57W4szOzlVZ3JLFrnuk6IoOwHI78+lmne23qdoWTvfHV2P3FA0NtsjHMw8QR5xP2pR0b4p74BKrugNiVIue822p16ATzqtXJOgVfBbgDw1JlbMSd4bExt+2y4/wBomAFBH7iAA2++QtiX5HvXNteUzP8ArXB7ruBzsbbaaW200lZddIR00vt9TD0a0nqYyo3zVHb+Z2P4mRtWOmuo/K1oDa6CRlIxqfbQ4HtPiKdgH0HW2vtv63mq4J9oCE5MRe5bR1Ay2OwK6bdZ5qF6RGl0huiSR9AYLiSVACjg320Iv5X39JbYz5/wHFqtE9xyBzU2ZT/S1xNpwXt6+iumb+U9dsoY6DrdreW0PT7nr1BYzjSc7hfGErKCAVJtoSpsSL2JUmdI7Q0JZfAoIZjLHbaIypiSGAp0jqYAYEUQigbJ2iXeEIgNYkgQnMb7S3Rbl6SJtvSZ/hvFM1Z2dwFUOVB0AObLr0OltevnYG9NG1QIS7GyqpYk8gBczH8f7RoqllZXq1BYFCH+HTtyOwbTfx5gCRdqO0RAZEzd5bE2K2DDcG+uh8jcTCOLbjUi/wCe35ecJT9TYnFM5LOSxPMkk+RMq5vOFpl0OvTnEkB4jdodHmeZ2/M/vrI30hUj+/IXkz1X0OpUtoIibW5c7+JkGpPmZNizZrAf4/YAj2OP0sZ7CwFvK/1MBlPO4ldHPUyVQT1+g/OVLtNx0Em0JKpBB6Rsnj9YWvhDQ6FmU3LXvyA8+cBagBuL+8JXPSJ8vPcwJs+yfalEZUrHKo+ViTYG+x00HrbynqmHxKugdGDBgCCDccuY8xPniklzbTXnew9+U3nZbGNh2QozvTchXoEFmW5+dGAsbaacwG8I+6nqXUeorGqHSPTNxGqnSJZkOklSCg0hiASRRhFA2VEQEK0jJMkkjLob7WmF7TYBxVNWncHuhsouDa1iykW0O/kPG23DmxBnA4jxMUEK5HzkNa4upOpBvqT15bHURlWD4pj2YlSwbRQTYjUAb6m55XJM5RBOussY2pmYm9/Hr1J895VzRVWPggp6RybQfjHwkbMYtq1b6dzzhK1h7/lI1hWgo/MQmNyf34RW19oGo6wJMq/7h+EK56AwA3h62BiB5j9I4mxKGHSI26QS3h+vneGSP+5aNI2e0C8K19oQp+Ikn1D0R12mw7A43JWyE3D2FsoJPeGzfdHM9csxwm++zPFJ8V6TqpLLnRiBcMujKDuLg3/plRNep0xpHZYaCM8SiURRARQNIIohFAMsIgI4jrERnUW/7mS7V4V2dPhm7kFQNNcxI3Og2Pp9dgQeUy3aTFBGzEd6xINwNiCDm5WCnzLCBV5zjqBR2RvmBIa3Ubypl6yxiq5ZvInbz6/vYSsgvJrSeJVsBtIrXOgk7jS0s4DD3YQoxp8Hwtn2E6dDs45E0vB8J3dt5oUw4tt4TK5X6bT459sH/wDnCF66zjcV4caZAI/f7E9SelM12kwoYXttv6d78resMcrvsZYTXTBC41iNTrf9+MuVsPYeR187yu1MTaRz7n2a4I09v0gMCNtoxFjCLXEY8EhvyjWPlAXwjlr7wGuzoZpuxVTLiqR5lrD13+l/pM4gmt+zekrYsBwGyozL4MCtj7ZpUTe3s6xPEsTRKIRRRQAxFFFAMvHWDeEh1iJLMz2w4fnpgKt2Hy+A0Dt6D6madZHjKYNNr8g3tbUesBXg1XfTaPTELEUipKncaH2BgI0TT6Wct7TucEwwZvKx9LtOIjaes03Zv5xp8ym39Lf5iy8LD9zWYGlYTrIukr4GnpL4WYyOi1VenOdxTC5lseen0P8AidspK2KQEeq/+wvHotvOMVhrFhbdrHzcA/Qgj1E4lRMu/r7zZ8ZQJVKsRlcWufu3BKt/eLf1CY/iLjOT4kN0vzt4c/WbY1z54qVbaAh3EJgTBQaw+xPBEX84wN5IyEa/XlAK8x6wG0tJfH9+U2H2Y0icdcfcpOTbxKqPxmNXr6/Qz1XgmDNDDJkADlQzEjZmAOtje+tossuM2eGHKvQRGac3gXEfjJZtHTRx+c6bR45TKbgyxuN1TRxFHEpJ4oiYoBlhCQayMGSIYiTCSZbqR1B/CRiWKI0gbxPtPg/h1jyDAAf0ooJ9f1nEnq/bTs6ayM6fOneC9bZiQPO/vaeVX0k1Uo1blOvwziTUmUnUA3t57zn4W2nmJ3xh6bL8o2tfpzB+kVuvRJb41PD+0tFrDPlJ5Gd6higwupB8p57huDo/ykZugInW4W70mysSR+FpFsjXGW+tkz6TicX4kUU5VJOh9jf8p1qPeEoYvBjvE87+mloj08/4pVrVtWXQXAOvPXT2lYcMYk5215215aHy/IzS4+4ICi7FhlUczcew8fGcJ8XURyhXIyXC2XMb30RsxHd8eXQysbbEZYyXuuY+HZHtYjp0YeB2M6vD+ECv8oII302vtvOpjuHvTZBmRyVVmUrlKMbXU5f3pNPwWiwFyiLffLf6yrbOixxl7cXh/ZTKpV9Qd/1BmV7QcHbDuRuh1RvDofGewZZwe1mBFTDvpqqlh4EaxTK7VljNdPMuGYcPURDszKD5XF/peetYHH03TQmx5EWIvytPPOx+GzYlRY6K506qNPxm5xeFHxFVB8wBcAaA/wARPKT8tv0v+nxll27HAUK13HVB6+P0E02UzicCp98nfKmW/U3H+faaIGX8c1iz+a7yRBDC+FDvFeaMjBBGh3jwDDrUho4vLI4fCHDPGLsgo8t0TpIk4dbmZYTCkDeBoqOrETy77Qezgw7ivTH/AI6hII5K9r2HgdT6Ger4fClSSTvOZ224Z8fB1UGrKudeZuhzWHiQCPWFEeVUeAOtjupAPip8RAweGX4oFa5QHUcvDzm14QuehTbmUW/mFsfqI9fAKLkoSABqBe5JtbKNdND6+E5+dldH6crGcT4cUrZsOUZSbrlI7l+TdPSaHAU3KgVDmZbAN/ELbnxv+U6aYBRyHtLyYcAQyy5RWOHGuhwle4LyxVpA3Bg8PGlpYcax4+C+snjuDZnzEm66CxtbUm48dfpIl4Vdw7M5I0BOUt/da819WkLXlUUhDVg6vqjguFoBt466knxnTShbaHTWT8pUhKxEq4+nmRl6qR7iXXkDC8AwHZjCOK7le6QjKD0Zwup8tJu8PRyIFvcjcncnmZzsJh0ol20DOxtc2vZdFHsZf7K4l67O70nREIyF1tnOoNutiB6xa5VPLjjpoeFYbImuhbU+A5D99ZezSK8U2k1NMbd3aTNHzSOK8ZJM0UjvFAKQMcGRXhCIJQY4MiEK8DSXjwAYgYBmDw//AE7FB8hZmTwVmLZfQkjytJxqJ1OLUM6XHzJ3h4j7w9tfScai8wymsm+F3iI04LaSwTKGJfUDqZnemk7dLh55yzVNpUwVQAWlqpUUjfWaY3+1NnaN69hARpFVsVMjpEiHIadCnHcwKbwiZRI3kYk1pERAMb2zR3q4WkiljnZ8o52KD05z1NZn+GPQOIKkr/qBTBCn5vhkm5Q89RrboJoLzTHxhn+4orxrxrykivFeDeNeAHeKBeKAVYoIhAxGIR4N48RntCAjCPAFM1jaXw6hXkdR5H9NR6TSzm8bw2ZA43Tf+U7+xsfeTnNxeF1XNRpXxGGLbSSi0uKwnPrbeXTNpSrpUJBuh5He/W86ao7jKe6OZvqR0FtvOXqjqN4L1lFjcAW3J095WMkFtocHw3JfvuwJvZmLW9Tc29ZbalBoYtG2YHyMnZx1l6ibb9o1ElWBeGsaSMhqGTsZSxL205mKh5h2q4i6Y9nRirU8mRhuLKGv7sZ672Z4uMVh0q2AY3V1GwddGt4HQjwInjnbmnlxRP8AEin2uv8A8zQfZjxnJXOHY9ysNB0qKNP7luPMLNMbuMs5qvWYo0UpJRrR4oA0Ue0UYUrx5FVrKguzBR1YgD3M5OL7VYWnvWVj0S7n/joPeIO6I8weO+0NRpSok+LsF/4re/uJnsb21xb/ACuqD/YoH1a5gXKPXWcAXJsOp2nJxnanCUrh8QlxuFOdvZbzxrF42pUN6ju/87s30J0lRyOWkNFt6tivtHwq/ItV/JQo92IP0nPX7S8xyjC3U6G9UDTnfuWnmzAGBnttEfd8er8N4ilUZkOlyLXuR4E+0uV8RlUm1zbbrPL+BcVNB8xvkbRx4cmHiJ6NhsSrgG9wdQeRB5ic2U43+HVhdz+Wa4pxatUOVUZQN76aymlWva2Xy1uJsMXhlbvc5TdCNl9hFt04cfu1xaGExB1DBfIG/vO9w7h+JcqWrtlU+He8L22lrBUb6Ne3SdumQBYTTGI+XLHzEqSkCxMsKZEI7GU5zu85+bMSeXKNiKuY5RtzP5RXAEzyy2uRg/tAojNTbmLqfLf9+czmDqMjK6GzqVZT0Km4PuJ1u1HEBWqlV1VNL9SN/wB+E415v8c1O3N8uW709/4HxRMTRSsn3h3l5q40ZT5H8pfnh3Z3tFVwpORu4xuyHVSbb25G1tfCekcF7aUK1lc/DfTf5D5Ny9ZekTKfbUxQFcHYg23sQYUSz3ijRQD55xOLeo2Z3Z26sxY+52keYmMoklo2IQIzGIvBJgAloBN47QCIlSBYGRmS6wWEmtJRLND2b4z8Mim57hPdY/cJ5fy/hM8I8VxlmqMcrjdx67Sp5he8uUsKOc8+7OdpfhWp1T3NlbfKOh8PGbfD8URhcMCDtrf2mHHje3TMuU6dJMMJOlMCUBxFesjqcYRd2EvlC1XUOk5+JxNzlB8zObX4wX7qAgdTvFQbrJuWzmK6hAmZ7W8d+GvwkPfYakfdH6ybj/GhRUhT3zt4TAFmdi7G5JuTKwx3UfJnqHUWEaERGnQ5DgyRSRrIhLVM3Av0EKCo4h1bOhKN/EhKt7ia7hXb7EoAKqrVXqe4/wDcND6iYosbmwhawg3Y9i4d22wlUd5/hN/DUGX2bY+8U8hVrePnFHo+VV1McNBJtHiIzR11gMbeUW2o2gejsJGRJgQZGdDY7HnCiAEZhDtGYSVbDaEIooAiIVN2X5WK+RI/CDEYCV1MJjGbQsSR1JM73DawOhmPRipzDl15zrYTHra+xHUj92meWLXHLTZ08ii9wJz+J8aVFOU+vj4TPYjidxq1/AEXPpOXXrFzc7DYdIscNqy+TU6PiazVHzN6CILYRU1htOiY6jlyytqMxAQrRXgWwPtJUbSQudbdIamTVfR2hK0GEsaUi6xRKIowquI1Nri3SG0gVrG8mrncTEXFpCCQbcpOwjFQd47ClBvqIVNc7BTzO/TmTIWQrqJYwtUXv0VvwiVfzBivRGmVvO/13iNaifusPf8AWCatP+FvcfpAZqfIN9If6L/FCbctuXlyjGJBewG97f5kTEkkRHIkLAc5EavQR/hwWSK7VJBoL7mHlkdEyyFjicrqoyt5GSV/QydtJXYFtYUY/wDEiVhz0k4MoFY6VCNoTL8ncJfF+IyKnXB8D++ckP46S9s7LL2iBuSYd4QoHwjVKbAXteSfVOusfOBz9pXzsYSrHKLj+UvxPCKJVijSBDIaohIY9USfYudVJSa4jyGg1payxzuJy6qIiAO6bgeB8jJikWTUeYhYJkE015of35GD8Jf4T7NOsKItBelblHwKfK5lgveAN/G/5yFqZGo1lzGiym3UfjKNOqRJvV00xts2WbrGzCWMobaV3p2ipyyhpby5eQYddZK9o8fE5d1FUa5sJHnMNVjERKmvAamP8I9JPTEOowIj4lcu+lihwxWoGoWyt8TILkZbZQTfS99T7SFcGxFgysOVmW/1IMiQXWwNiDeBkPUfWLr8H3+VsYKp0b0N/wADLGDw1QtbvHQ6EAbeJnMs/wD0RLmDxtRMx/2le9c79Nd5U1tNl17EC0b8zJVpeJlQVTCFUxbhWZLmXzilQVfGKPcHCmSExuICRGKHrsCHWW0eVOcnWKDOJc0Jdx5iAskTcec0ZuuNhI3WENvaM4/CbMIoY1e76zmtSnTx57o8/wAjKUwz7rpwtkVlYiSlri8B1h25SGl16kpaCKoIwhiVEX3YLQQuskAhrbpDQ5GWnpF8ImEaxjrWMrpG6kwmGBbUX7v5iPWwoG1/eT4A94+X5mTuLyphLE3OyuU1JhzPsIDK07Ipi2370/WcrGGzadBJyx4qxy5IgvURGiDtJUa+8IrFo+Vik1IiKXYocVfqV//Z"
          alt=""
        />
        <div className={cx('info')}>
          <p className={cx('name')}>
            Le Thi Kim Uyen <i className="fa-solid fa-circle-check"></i>
          </p>

          <span className={cx('username')}>duixinh2k5</span>
        </div>
      </div>
    );
}

export default AccountItem