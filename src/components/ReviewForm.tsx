import useScrollLock from "../../hooks/useScrollLock";
import cross from "./../assets/img/icons/cross.svg";
import arrow from "./../assets/img/icons/left-arrow.svg";
import emptyStar from "./../assets/img/icons/star-empty.svg";
import fullStar from "./../assets/img/icons/star.svg";
import image from "./../assets/img/icons/image.svg";
import video from "./../assets/img/icons/video.svg";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import star1 from "./../assets/animation/star1.json";
import star2 from "./../assets/animation/star2.json";
import star3 from "./../assets/animation/star3.json";
import star4 from "./../assets/animation/star4.json";

export default function ReviewForm({
  setIsFormOpen,
}: {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { unlockScroll } = useScrollLock();
  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState(0);
  const [active2, setActive2] = useState(0);
  const [text, setText] = useState("");
  const mapper = [0, 1, 2, 3, 4];
  const condition = (i: number) =>
    i === 2 && activeIndex === 2
      ? "50%"
      : i === 2 && activeIndex >= 3
      ? "100%"
      : i < 2 && activeIndex >= i
      ? "100%"
      : i === 3 && activeIndex >= 4
      ? "100%"
      : i === 4 && activeIndex === 5
      ? "100%"
      : "0";
  const [rating, setRating] = useState(0);
  const [animate, setAnimate] = useState(false);
  const starCondition = (i: number) =>
    rating === 1 && i < 1
      ? fullStar
      : rating === 2 && i < 2
      ? fullStar
      : rating === 3 && i < 3
      ? fullStar
      : rating === 4 && i < 4
      ? fullStar
      : rating === 5 && i < 5
      ? fullStar
      : emptyStar;

  const starAnimation = (i: number) =>
    rating === 1 && i < 1 ? (
      <Lottie animationData={star1} loop={false} />
    ) : rating === 2 && i < 2 ? (
      <Lottie animationData={star1} loop={false} />
    ) : rating === 3 && i < 3 ? (
      <Lottie animationData={star2} loop={false} />
    ) : rating === 4 && i < 4 ? (
      <Lottie animationData={star3} loop={false} />
    ) : rating === 5 && i < 5 ? (
      <Lottie animationData={star4} loop={false} />
    ) : (
      <img src={emptyStar} alt="" />
    );

  const handleClick = (n: number) => {
    setAnimate(false);
    setRating(n);
    setAnimate(true);
    setActiveIndex(1);
  };
  // const image = document.querySelector("#image_uploads") as HTMLInputElement;
  // const files = image?.files;

  // useEffect(() => {
  //   console.log(text);
  // }, [text]);

  return (
    <div className="review-form">
      <div className="review-form__modal">
        <button
          className="review-form__modal__close"
          style={{
            visibility: `${activeIndex === 0 ? "visible" : "hidden"}`,
            opacity: `${activeIndex === 0 ? "100%" : "0"}`,
          }}
          onClick={() => {
            setIsFormOpen(false);
            unlockScroll();
          }}
        >
          <img src={cross} alt="" />
        </button>

        <div
          className="review-form__modal__action"
          style={{
            visibility: `${activeIndex > 0 ? "visible" : "hidden"}`,
            translate: `${activeIndex > 0 ? "-50% 0" : " -50% 100px"}`,
          }}
        >
          <button
            className="review-form__modal__action__back"
            onClick={() => {
              if (activeIndex - 1 >= 0) {
                setActiveIndex(activeIndex - 1);
              }
            }}
          >
            <img src={arrow} alt="" />
            Back
          </button>
          <div className="review-form__modal__action__progression">
            {mapper.map((i) => {
              return (
                <div>
                  <div
                    style={{
                      height: "100%",
                      width: `${condition(i)}`,
                      backgroundColor: "black",
                      borderRadius: "50px",
                      transition: "all 0.3s ease-in-out",
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
          <button
            className={`review-form__modal__action__skip ${
              activeIndex === 4 ? (text === "" ? " disabled" : "") : ""
            }
            `}
            style={{
              color: `${activeIndex === 5 ? "white" : "black"}`,
              backgroundColor: `${activeIndex === 5 ? "black" : ""}`,
            }}
            onClick={() => {
              if (activeIndex + 1 < 6) {
                setActiveIndex(activeIndex + 1);
              }
              if (activeIndex === 5) {
                setIsFormOpen(false);
              }
            }}
            disabled={activeIndex === 4 ? (text === "" ? true : false) : false}
          >
            {activeIndex === 4 ? "Next" : activeIndex === 5 ? "Done" : "Skip"}
          </button>
        </div>

        <div
          className="review-form__modal__inner"
          //   style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          <div
            className="review-form__modal__inner__frame"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            <div className="review-form__modal__inner__frame__one">
              <h1>What do you think about your product?</h1>
              <div className="review-form__modal__inner__frame__one__stars">
                {mapper.map((i) => {
                  return (
                    <button
                      className="review-form__modal__inner__frame__one__stars__star"
                      onClick={() => handleClick(i + 1)}
                    >
                      {animate ? (
                        starAnimation(i)
                      ) : (
                        <img src={starCondition(i)} alt="" />
                      )}
                      {/* <img src={starCondition(i)} alt="" /> */}
                    </button>
                  );
                })}
                <p className="review-form__modal__inner__frame__one__stars__min">
                  Not happy at all
                </p>
                <p className="review-form__modal__inner__frame__one__stars__max">
                  Love it!
                </p>
              </div>
            </div>
            <div className="review-form__modal__inner__frame__two">
              <h1>Show it off</h1>
              <p>We'd love to see it in action!</p>
              <div className="review-form__modal__inner__frame__two__inputs">
                <label htmlFor="image_uploads">
                  <img src={image} alt="" /> Add photo
                </label>

                <input
                  type="file"
                  name="image_uploads"
                  id="image_uploads"
                  accept="image/png, image/jpeg"
                />
                <label htmlFor="image_uploads">
                  <img src={video} alt="" /> Add video
                </label>
                <input
                  type="file"
                  name="video_uploads"
                  id="video_uploads"
                  accept="video/*"
                />
                {/* <input type="image"> Add photo</input>
                <input type="file">Add video</input> */}
              </div>
            </div>
            <div className="review-form__modal__inner__frame__three">
              <h1>Happy with shopping and shipping?</h1>
              <div className="review-form__modal__inner__frame__three__btns">
                <button
                  className={`${active === 1 ? "active" : ""}`}
                  onClick={() => {
                    setActiveIndex(3);
                    setActive(1);
                  }}
                >
                  All good
                </button>
                <button
                  className={`${active === 2 ? "active" : ""}`}
                  onClick={() => {
                    setActiveIndex(3);
                    setActive(2);
                  }}
                >
                  Issue with the site
                </button>
                <button
                  className={`${active === 3 ? "active" : ""}`}
                  onClick={() => {
                    setActiveIndex(3);
                    setActive(3);
                  }}
                >
                  Shipping problems
                </button>
              </div>
            </div>
            <div className="review-form__modal__inner__frame__three">
              <h1>Happy with the product?</h1>
              <div className="review-form__modal__inner__frame__three__btns">
                <button
                  className={`${active2 === 1 ? "active" : ""}`}
                  onClick={() => {
                    setActiveIndex(4);
                    setActive2(1);
                  }}
                >
                  Looks great
                </button>
                <button
                  className={`${active2 === 2 ? "active" : ""}`}
                  onClick={() => {
                    setActiveIndex(4);
                    setActive2(2);
                  }}
                >
                  Could be improved
                </button>
                <button
                  className={`${active2 === 3 ? "active" : ""}`}
                  onClick={() => {
                    setActiveIndex(4);
                    setActive2(3);
                  }}
                >
                  Didn't like it
                </button>
              </div>
            </div>
            {/* <div className="review-form__modal__inner__frame__four">3</div> */}
            <div className="review-form__modal__inner__frame__five">
              <h1>Tell us more!</h1>
              <textarea
                onChange={(e) => {
                  setText(e.target.value);
                }}
                value={text}
                placeholder="Do you like the design? How's the fit? How's the quality?..."
              ></textarea>
              {/* <input
                type="text"
                size={500}
                placeholder="Do you like the design? How's the fit? How's the quality?..."
              /> */}
            </div>
            <div className="review-form__modal__inner__frame__six">
              <h1>About you</h1>
              <div className="review-form__modal__inner__frame__six__inputs">
                <div className="review-form__modal__inner__frame__six__inputs__name">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                    }}
                  >
                    <label htmlFor="FirstName">
                      First name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input name="FirstName" type="text" />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                    }}
                  >
                    <label htmlFor="LastName">Last name </label>
                    <input name="LastName" type="text" />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="email">
                    Email<span style={{ color: "red" }}>*</span>
                  </label>
                  <input name="email" type="text" />
                </div>
                <p
                  style={{
                    height: "fit-content",
                    width: "500px",
                    textAlign: "center",
                    whiteSpace: "pre-wrap",
                    fontSize: "12px",
                    color: "grey",
                    fontWeight: "100",
                  }}
                >
                  By submitting, I acknowledge the Terms of Service and Privacy
                  Policy and that my review will be publicly posted and shared
                  online
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
