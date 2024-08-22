'use client';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// import { useGSAP } from '@gsap/react';
import './styles/main.scss';
import { useRouter } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';
import SignInModal from '@/components/SignInModal';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { useSelector } from 'react-redux';
import { CURRENT_STATES } from '@/store/currentState';
import WithHeaderWrapper from '@/components/WithHeaderWrapper';
import { itemsActions } from '@/store/cartItems';
import { useDispatch } from 'react-redux';
import pang3aWhite from '../assets/pang3a.png';
import notify from '@/helpers/notify';
import PreFooter from '@/components/HomePage-subcomponents/PreFooter';
import TopContainer from '@/components/HomePage-subcomponents/TopContainer';
import SliderHeading from '@/components/HomePage-subcomponents/SliderHeading';
import SliderButtons from '@/components/HomePage-subcomponents/SliderButtons';
import DesktopLargeSwiper from '@/components/HomePage-subcomponents/DesktopLargeSwiper';
import MiddleContainer from '@/components/HomePage-subcomponents/MiddleContainer';
import BottomContainer from '@/components/HomePage-subcomponents/BottomContainer';
import DesktopSmallSwiper from '@/components/HomePage-subcomponents/DesktopSmallSwiper';

const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [women, setWomen] = useState(true);
  const [ageVerification, setageVerification] = useState(false);

  const state = useSelector((state) => state.stateFn.currentState);
  const [men, setMen] = useState(false);

  const innerSwiperRef = useRef();

  const hanldeNavigateDetails = (product) => {
    //first add slide data with every mapping product and then fetch it from here
    return router.push('/product-details?id=' + product.id);
  };
  const onAddItem = ({ product, quantity = 1 }) => {
    dispatch(itemsActions.addItem({ product, quantity }));
    notify({ product, quantity, adding: true, removing: false });
  };

  useEffect(() => {
    setageVerification(true);
    return () => {
      setageVerification(false);
    };
  }, []);

  return (
    <WithHeaderWrapper>
      <main className="home">
        {/* <Toaster position="bottom-center" /> */}
        {ageVerification && <AgeVerificationModal />}
        {state === CURRENT_STATES.LOGOUT && <SignInModal />}
        {/* <div className="topPage">
          <aside className="video-background">
            <video className="video-overlay min-w-[100%]" autoPlay muted loop>
              <source
                src="https://cdn.shopify.com/videos/c/o/v/331b4aa9d8cb4d3b984bd160fa65030b.mp4"
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
          </aside>
          <div className="content">
            <h1>New Arrivals</h1>
            <p>Amplify Reimagined</p>
            <button className="button">Shop Women</button>
            <button className="button">Shop Men</button>
          </div>
        </div> */}
        <div className="bg-img"></div>
        <TopContainer women={women} />
        {/* Upper new arrivals */}
        <SliderHeading />
        <div className="sliders overflow-x-hidden">
          <SliderButtons women={women} setWomen={setWomen} />
          <DesktopLargeSwiper
            handleNavigateDetails={hanldeNavigateDetails}
            onAddItem={onAddItem}
          />
          <MiddleContainer />
          <SliderHeading mt={'14'} women={women} />{' '}
          {/* Lower new arrivals || !mt-14 */}
          <SliderButtons women={women} />
          <DesktopSmallSwiper />
          <BottomContainer />
          <PreFooter />
        </div>
      </main>
    </WithHeaderWrapper>
  );
};

export default HomePage;

/* <Swiper
  className="mySwiper4 swiper-h"
  spaceBetween={50}
  pagination={{
    clickable: true,
  }}
  modules={[Pagination]}
>
  <SwiperSlide className="swiper-v2">
    <div className="shopLook shop1">
      <div className="shopLook-img">
        <img
          style={{ width: '100%', height: '100%' }}
          src="https://alphalete.uk/cdn/shop/files/4U8A0519_115c8311-a184-49e8-8c08-ed9fa1473b64_800x.jpg?v=1714234121"
        />
        <div className="point1 points"></div>
        <div className="point2 points"></div>
        <div className="point3 points"></div>
        <div className="point4 points"></div>
      </div>
    </div>
    <div className='vertical-container'> 
    <Swiper
      className="swiper-v"
      direction={'vertical'}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
    >
      <SwiperSlide className="swiper-part">
        <div className="slider-items">
          <div className="slider-item">
            <div className="item-image-box">
              <img
                className="item-image"
                src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                alt=""
              />
              <p className="new">NEW</p>
              <p className="plus">
                <FaPlus />
              </p>
            </div>
            <div className="item-info">
              <h5 className="hide">Amplify Gemini Bra</h5>
              <p className="hide">
                Gliese <span> 4 colors</span>
              </p>
              <p className="hide">£120.00</p>
              <div className="item-sizes-box">
                <div>
                  <p>QUICK ADD</p>
                  <FaPlus className="plus" />
                </div>
                <div className="separator"></div>
                <div className="item-sizes">
                  <p>XXS</p>
                  <p>XS</p>
                  <p>S</p>
                  <p>M</p>
                  <p>L</p>
                  <p>XL</p>
                  <p>XXL</p>
                </div>
              </div>
              <div className="item-images">
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="swiper-part">
        <div className="slider-items">
          <div className="slider-item">
            <div className="item-image-box">
              <img
                className="item-image"
                src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                alt=""
              />
              <p className="new">NEW</p>
              <p className="plus">
                <FaPlus />
              </p>
            </div>
            <div className="item-info">
              <h5 className="hide">Amplify Gemini Bra</h5>
              <p className="hide">
                Gliese <span> 4 colors</span>
              </p>
              <p className="hide">£120.00</p>
              <div className="item-sizes-box">
                <div>
                  <p>QUICK ADD</p>
                  <FaPlus className="plus" />
                </div>
                <div className="separator"></div>
                <div className="item-sizes">
                  <p>XXS</p>
                  <p>XS</p>
                  <p>S</p>
                  <p>M</p>
                  <p>L</p>
                  <p>XL</p>
                  <p>XXL</p>
                </div>
              </div>
              <div className="item-images">
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="swiper-part">
        <div className="slider-items">
          <div className="slider-item">
            <div className="item-image-box">
              <img
                className="item-image"
                src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                alt=""
              />
              <p className="new">NEW</p>
              <p className="plus">
                <FaPlus />
              </p>
            </div>
            <div className="item-info">
              <h5 className="hide">Amplify Gemini Bra</h5>
              <p className="hide">
                Gliese <span> 4 colors</span>
              </p>
              <p className="hide">£120.00</p>
              <div className="item-sizes-box">
                <div>
                  <p>QUICK ADD</p>
                  <FaPlus className="plus" />
                </div>
                <div className="separator"></div>
                <div className="item-sizes">
                  <p>XXS</p>
                  <p>XS</p>
                  <p>S</p>
                  <p>M</p>
                  <p>L</p>
                  <p>XL</p>
                  <p>XXL</p>
                </div>
              </div>
              <div className="item-images">
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </SwiperSlide>
  <SwiperSlide className="swiper-v2">
    <div className="shopLook shop1">
      <div className="shopLook-img">
        <img src="https://alphalete.uk/cdn/shop/files/aa24-apr13-01_800x.jpg?v=1713021766" />
        <div className="point5 points"></div>
        <div className="point6 points"></div>
        <div className="point7 points"></div>
        <div className="point8 points"></div>
        <div className="point9 points"></div>
      </div>
    </div>
    <Swiper
      className="swiper-v"
      direction={'vertical'}
      spaceBetween={50}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
    >
      <SwiperSlide className="swiper-part fst-swiper">
        <div className="slider-items">
          <div className="slider-item">
            <div className="item-image-box">
              <img
                className="item-image"
                src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                alt=""
              />
              <p className="new">NEW</p>
              <p className="plus">
                <FaPlus />
              </p>
            </div>
            <div className="item-info">
              <h5 className="hide">Amplify Gemini Bra</h5>
              <p className="hide">
                Gliese <span> 4 colors</span>
              </p>
              <p className="hide">£120.00</p>
              <div className="item-sizes-box">
                <div>
                  <p>QUICK ADD</p>
                  <FaPlus className="plus" />
                </div>
                <div className="separator"></div>
                <div className="item-sizes">
                  <p>XXS</p>
                  <p>XS</p>
                  <p>S</p>
                  <p>M</p>
                  <p>L</p>
                  <p>XL</p>
                  <p>XXL</p>
                </div>
              </div>
              <div className="item-images">
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="swiper-part">
        <div className="slider-items">
          <div className="slider-item">
            <div className="item-image-box">
              <img
                className="item-image"
                src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                alt=""
              />
              <p className="new">NEW</p>
              <p className="plus">
                <FaPlus />
              </p>
            </div>
            <div className="item-info">
              <h5 className="hide">Amplify Gemini Bra</h5>
              <p className="hide">
                Gliese <span> 4 colors</span>
              </p>
              <p className="hide">£120.00</p>
              <div className="item-sizes-box">
                <div>
                  <p>QUICK ADD</p>
                  <FaPlus className="plus" />
                </div>
                <div className="separator"></div>
                <div className="item-sizes">
                  <p>XXS</p>
                  <p>XS</p>
                  <p>S</p>
                  <p>M</p>
                  <p>L</p>
                  <p>XL</p>
                  <p>XXL</p>
                </div>
              </div>
              <div className="item-images">
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="swiper-part">
        <div className="slider-items">
          <div className="slider-item">
            <div className="item-image-box">
              <img
                className="item-image"
                src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                alt=""
              />
              <p className="new">NEW</p>
              <p className="plus">
                <FaPlus />
              </p>
            </div>
            <div className="item-info">
              <h5 className="hide">Amplify Gemini Bra</h5>
              <p className="hide">
                Gliese <span> 4 colors</span>
              </p>
              <p className="hide">£120.00</p>
              <div className="item-sizes-box">
                <div>
                  <p>QUICK ADD</p>
                  <FaPlus className="plus" />
                </div>
                <div className="separator"></div>
                <div className="item-sizes">
                  <p>XXS</p>
                  <p>XS</p>
                  <p>S</p>
                  <p>M</p>
                  <p>L</p>
                  <p>XL</p>
                  <p>XXL</p>
                </div>
              </div>
              <div className="item-images">
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
                <img
                  src="https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </SwiperSlide>
</Swiper> */
