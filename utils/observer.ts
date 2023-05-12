export default function observer(
  className: string,
  ref: React.RefObject<HTMLDivElement>
) {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: [0.2],
  };
  const observer = new IntersectionObserver((entries) => {
    // Loop over the entries
    entries.forEach((entry) => {
      console.log(entry.intersectionRatio);
      if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add(className);
      }
    });
  }, options);
  if (ref?.current) {
    observer.observe(ref.current);
  }
}
